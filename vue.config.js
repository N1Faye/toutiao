const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // spa
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '黑马头条'
        return args
      })
  }
})
