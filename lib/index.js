const { NodeSSH } = require('node-ssh')
const { validate } = require('schema-utils')
const schema  = require("./upload-schema.json")
const log = require('./log')


class AutoUploadFileWebpackPlugin {
  constructor(options) {
    // 校验参数 schema, options, configuration
    validate(schema, options, {
      name: 'AutoUploadWebpackPlugin',
      baseDataPath: 'options',
    })

    this.ssh = new NodeSSH()
    this.options = options
  }

  apply(compiler) {
    // 注册 hooks 监听事件，等输出 asset 到 output 目录之后，自动完成上传功能
    compiler.hooks.afterEmit.tapAsync("AutoUploadFilePlugin", async (compilation, callback) => {
      // 1、获取资源输出目录路径 和 远程目录路径
      const outputPath = compilation.outputOptions.path 
      const remotePath = this.options.remotePath

      // 2、连接远程服务器 SSH
      try {
        await this.connectServer()
      } catch (error) {
        log.error('服务器连接失败~')
      }
      
      // 3、 删除原有的文件中的内容
      try {
        this.ssh.execCommand(`rm -rf ${remotePath}/*`)
        log.hint('删除远程文件成功~')
      } catch (error) {
        log.error('删除远程文件失败~')
      }

      // 4、将目录中资源上传到服务器中
      try {
        await this.uploadFiles(outputPath, remotePath)
      } catch (error) {
        log.error('上传文件资源失败~', error)
      }

      // 5、关闭 ssh 连接
      this.ssh.dispose()

      // 完成所有的操作后，调用 callback()
      callback()
    })
  }

  async connectServer() {
    await this.ssh.connect({
      host: this.options.host,
      username: this.options.username,
      password: this.options.password
    })
    log.hint('服务器连接成功')
  }

  async uploadFiles(localPath, remotePath) {
    const status = await this.ssh.putDirectory(localPath, remotePath, {
      recursive: true, // 递归
      concurrency: 10 // 并发
    })
    if (status) {
      log.hint("文件上传服务器成功~")
    }
  }
}

module.exports = AutoUploadFileWebpackPlugin