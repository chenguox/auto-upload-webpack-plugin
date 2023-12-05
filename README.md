# Auto Upload File Webpack Plugin

Automatically upload static files to the server.

## Installation

Install the plugin with npm:

> npm install --save-dev auto-upload-webpack-plugin

## Basic Usage

**Demo**

Add the plugin to your webpack config as follows:

```javascript
const AutoUploadFileWebpackPlugin = require('auto-upload-file-webpack-plugin')

module.exports = {
 ...
  plugins: [
    new HtmlWebpackPlugin(),
    new AutoUploadFileWebpackPlugin({
      host: "xxxx",
      username: "xxx",
      password: "xxx",
      remotePath: "xxxx"
    })
  ]
}
```

## Options

**`host`**

Your server ip.

`username`

Your remote username.

`password`

Your remote password.

`remotePath`

Your remote directory.

## End

If you have any questions or issues using this function, please don't hesitate to reach out for support.
