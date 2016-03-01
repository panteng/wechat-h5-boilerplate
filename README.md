# wechat-h5-boilerplate

「让制作H5像制作PPT一样简单！」

Wechat-H5-Boilerplate(以下简称WHB）是一个H5动效模板，专门为微信优化，适合快速构建全屏滚动型H5宣传页。

![效果图][1]

## 目录

 - [实时预览](#实时预览)
 - [项目结构](#项目结构)
 - [开发流程](#开发流程)
 - [发布流程](#发布流程)
 - [开发指南](#开发指南)
 - [依赖列表](#依赖列表)
 - [待办事项](#待办事项)

## 实时预览

使用手机访问下面的地址或扫描下方二维码

[http://panteng.me/demos/whb][2]

![此处输入图片的描述][3]

## 项目结构

        /app
            /dist               --> 项目文件的分发版本，所有的文件均有Gulp任务生成，请勿手动修改
                /audios         --> 从app/src/audios复制而来
                /fonts          --> 从app/src/fonts和在config/vendors.js中指定的第三方字体复制而来
                /images         --> 由app/src/images下的图片经Imagemin压缩优化生成
                /javascripts    --> 由app/src/javascripts下的文件经Browserify打包生成
                /stylesheets    --> 由app/src/sass下的文件编译生成
                index.html      --> 由app/src/index.html经Gulp-inject插入bundle.(min.).css和bundle.(min.).js后生成
            /src                --> 项目的源码，所有文件都可编辑
                /audios         --> 存放音频、视频文件
                /fonts          --> 存放字体文件
                /images         --> 存放图片文件
                /javascripts    --> JS源文件，经Browserify打包后生成app/dist/javascripts/bundle.js
                /sass           --> SCSS文件，经过编译后生成app/dist/stylesheets/bundle.css
                index.html      --> 页面HTML，经过Gulp-inject处理后生成app/dist/index.html
        /config
            vendors.js          --> 第三方CSS、JS、Fonts列表，详见vendors.js说明
        .gitignore
        gulpfile.js             --> Gulp任务
        package.json
        

## 开发流程

1. 将本项目clone到本地

    在控制台中运行：

        git clone --depth=1 https://github.com/panteng/wechat-h5-boilerplate.git <your-project-name>
        cd <your-project-name>

2. 安装第三方包

    WHB使用NPM管理第三方包    

    在控制台中运行：

        npm install

    注意1：由于大陆网络环境恶劣，下载NPM上的包速度很慢，建议使用国内NPM镜像[TAONPM][4]。TAONPM的安装方法请参考[官网使用说明][5]。安装完成后，在控制台中运行`cnpm install -d`（加入 -d  是为了显示第三方包安装过程中的详细信息，我个人经常用这种方法来判断安装过程是否因为网络或其他问题卡住了）。

    注意2：WHB所需的一些第三方包依赖于[node-gyp][6]，在安装这些包之前，请先确认你的机器已经正确安装node-gyp。请参考[node-gyp官方文档][7]来进行安装。Windows用户可能会遇到一些麻烦，因为在Windows上安装node-gyp是一件很痛苦的事。
    
    注意3：Windows用户，请不要将本项目放在路径太深的目录中。因为Windows只支持长度为255个字符以内的路径，所以如果你将本项目放在路径很深的目录中，有很大可能会造成node-gyp编译失败。
    
    注意4：Windows用户，如果你已经正确安装了node-gyp，但在运行`cnpm install -d`时依然报错，且报错信息为“EPERM, operation not permitted”的话，请尝试`cnpm install -d --force`。
    
3. 开始开发

    在控制台运行：

        gulp dev
        
    稍等片刻，浏览器窗口会自动打开并指向地址`localhost:3000`，当你修改app/src下的任意文件时，浏览器均会自动刷新。

## 发布流程

1. 执行prod任务

   在控制台中运行：

        gulp prod

    该任务将在app/dist文件夹中生成两个新文件bundle.min.css和bundle.min.js，并删除原有的bundle.css和bundle.js。
    
2. 发布时，只需要将app/dist文件夹中的文件上传到服务器即可，其他文件都不是必需的。app/dist中的css和js文件时经过压缩的，图片也是经过优化的。

## 开发指南

1. 加载动画

2. 页面切换效果

3. 页面内元素动画

4. 字体图标

5. 图像优化

6. 背景音乐

## 依赖列表
1. [Swiper][8] --> 用于实现页面的整屏滚动
2. [Animate.css][9] --> 用于提供CSS动画
3. [jQuery][10] --> 用于操作DOM
4. [Normalize.css][11] --> 用于CSS Reset

## 待办事项
1. 完善开发文档
2. 优化动画效果
3. 优化元素定位方式
4. 增加更多Slide切换效果

## Lisence
[MIT][12]


  [1]: https://raw.githubusercontent.com/panteng/wechat-h5-boilerplate/master/demo.png
  [2]: http://panteng.me/demos/whb
  [3]: https://raw.githubusercontent.com/panteng/wechat-h5-boilerplate/master/QR-Code.png
  [4]: http://npm.taobao.org/
  [5]: http://npm.taobao.org/
  [6]: https://github.com/nodejs/node-gyp
  [7]: https://github.com/nodejs/node-gyp#installation
  [8]: https://github.com/nolimits4web/swiper/
  [9]: https://github.com/daneden/animate.css
  [10]: https://github.com/jquery/jquery
  [11]: https://github.com/necolas/normalize.css
  [12]: http://opensource.org/licenses/mit-license.html