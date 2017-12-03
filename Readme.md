#### vue-server-music-test

这是一个使用vue-server来测试页面，在实际项目中，如果前端人员在后端接口文档编写完之前，可以使用vue-server来测试数据。

#### 配置

下载package.json中的依赖，或者直接使用内部的node_modules包，其中除了json-server以外的包都是全局安装，所以在使用的时候，可以在任何命令窗口调用;

为了使用json-server等非全局变量，在package.json文件中，scripts下增加属性`dev、build、a`等属性，你可以使用`npm run`来运行`scripts`里的任何条目(配合01_data_server.cmd和02_vue_dev.cmd使用)。

使用`npm run`的方便之处在于，npm会自动把`node_modules/.bin`加入`$PATH`(设置 为临时环境变量,既主机中的Path环境变量)，这样你可以直接运行依赖程序和开发依赖程序，不用全局安装了

#### 使用npm run 的原因

在实际项目中，会在当前目录中下载好全部的依赖，不可能让用户自己下载webpack命令行工具，所以可以使用npm run，可以让用户直接双击.cmd后缀的文件来启动程序。