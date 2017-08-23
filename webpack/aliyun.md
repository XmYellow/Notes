# 使用aliyun

标签： aliyun webpack

---

> 生产环境使用cdn等加速，以下使用aliyun

      webpackConfig.plugins.push(
       ...
        new WebpackMd5Hash()
        new AliyunossWebpackPlugin({
          buildPath:'dist/*',
          region: config.ali.region,
          accessKeyId: config.ali.accessKeyId,
          accessKeySecret: config.ali.accessKeySecret,
          bucket: config.ali.bucket,
          getObjectHeaders: function(filename) {
            return {
              Expires: 6000
            }
          }
        })
      )
      webpackConfig.output.filename = `[name].[chunkhash].js`
      webpackConfig.output.publicPath = "http://cdnsource.oss-cn-hangzhou.aliyuncs.com/"
      

> 配置如下

    module.exports = {
        region : 'oss-cn-hangzhou',
        accessKeyId: '',
        accessKeySecret:'',
        bucket:''
    }

[参考链接]

[qiniu-webpack-plugin][1]
[aliyunoss-webpack-plugin][2]


  [1]: https://github.com/longtian/qiniu-webpack-plugin
  [2]: https://github.com/iAmHades/aliyunoss-webpack-plugin