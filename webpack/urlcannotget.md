# prod环境下,刷新浏览器url，页面cannot get

标签（空格分隔）： prod url cannot get

---

> 可能是服务端路由和客户端路由的原因

    app.get('*', function (request, response){
      response.sendFile(path.resolve(project.basePath, 'dist', 'index.html'))
    });
