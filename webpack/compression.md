# 开启gzip

标签： gzip compression

---

> 开启gzip压缩要在 static 之前才有效，下面以 compression 为例子

    var path = require('path');
    var express = require('express');
    const compression = require('compression')
    var app = express();
    
    ...
    
    app.use(compression());
    //compression 要在static之前
    app.use(express.static(path.join(__dirname, 'dist')));




