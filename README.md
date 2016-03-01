# wechat-h5-boilerplate

「让制作H5像制作PPT一样简单！」

Wechat-H5-Boilerplate(以下简称WHB）是一个H5动效模板，专门为微信优化，适合快速构建全屏滚动型H5宣传页。

![效果图][1]

## 目录

 - [实时预览](#实时预览)
 - [依赖列表](#依赖列表)
 - [项目结构](#项目结构)
 - [开发流程](#开发流程)
 - [发布流程](#发布流程)
 - [开发指南](#开发指南)
 - [待办事项](#待办事项)

## 实时预览

使用手机访问下面的地址或扫描下方二维码

[http://panteng.me/demos/whb][2]

![此处输入图片的描述][3]

## 依赖列表
1. [Swiper][4] --> 用于实现页面的整屏滚动
2. [Animate.css][5] --> 用于提供CSS动画
3. [jQuery][6] --> 用于操作DOM
4. [Normalize.css][7] --> 用于CSS Reset

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

    注意1：由于大陆网络环境恶劣，下载NPM上的包速度很慢，建议使用国内NPM镜像[TAONPM][8]。TAONPM的安装方法请参考[官网使用说明][9]。安装完成后，在控制台中运行`cnpm install -d`（加入 -d  是为了显示第三方包安装过程中的详细信息，我个人经常用这种方法来判断安装过程是否因为网络或其他问题卡住了）。

    注意2：WHB所需的一些第三方包依赖于[node-gyp][10]，在安装这些包之前，请先确认你的机器已经正确安装node-gyp。请参考[node-gyp官方文档][11]来进行安装。Windows用户可能会遇到一些麻烦，因为在Windows上安装node-gyp是一件很痛苦的事。
    
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

    H5页面通常包含大量图片和背景音乐，因此一个好看的加载动画是必要的。
    你可以自己制作一些CSS3动画，将动画相关的HTML代码放在app/src/index.html中的`<div class="loading-overlay"></div>`中，并将相关样式整合进app/src/sass中即可。
    图省事的话，这个网站可以帮你生成现成的加载动画：[loading.io][12]（打不开请翻墙），建议生成svg格式的动画图像文件，将文件改为为loading.svg替换app/src/images/下的同名文件即可。
    还有一些资源也许可以帮到你：
    [Spinkit][13]
    [CSS Loaders][14]

2. 页面切换效果
    
    页面切换目前只支持Swiper自带的四种slide，fade, flip和coverflow（cube不支持，因为不符合此场景）。详见[Swiper文档][15]中关于effect的部分。
    
    目前WHB尚无法对不同页面指定不同的切换方式，我将在后续版本考虑加入此功能以及更多更酷的切换方式。

3. 页面内元素动画

    在WHB中设置元素动画十分简单。
    例如在第一页中有一段文字需要以动画显示，代码如下：
        
        <div class="swiper-slide slide-1">
            <p class="animated" data-ani-name="slideInRight" data-ani-duration="1s" data-ani-delay="0.3s">I'm a coder!</p>
        </div>
    
    只需要在这段文字上添加类名`animated`，并指定`data-ani-name`（动画名称）,`data-ani-duration`（动画执行时间），`data-ani-delay`（动画延迟时间）三个属性即可。
    WHB的动画由Animate.css提供，支持的动画名称可以在[Animate.css官网][16]上查看。
    
4. 字体图标

    WHB自带的字体图标文件中只有两个图标，分别是右上角的音乐符号，和屏幕中间下方的向上提示符号。如果你需要更多图标，建议使用[Icomoon.io][17]进行定制，只选择你需要的图标，打包成字体文件即可。
    这里不建议使用Font-awesome等通用字体包的原因是，font-awesome中的图标很多，大部分是用不到的，较大的字体文件会拖慢网页在用户手机上的加载速度。

5. 图像优化

    WHB中自带对app/src/images下的图片进行有损压缩的功能，但我仍然建议在你将自己的图片扔进app/src/images文件夹前，对图片进行必要的手动优化，例如将图片调整为合适的尺寸，将部分小图片做成精灵图等。
    这个网站也是一个很好用的在线图片压缩工具：[TinyPNG][18]。

6. 背景音乐

    建议背景音乐的文件格式为mp3，且大小尽量不要超过1MB。建议使用[Adobe Audition][19]等专业音频编辑软件对背景音乐进行截取和压缩。

7. Gulp任务

    在开发过程中，如果你发现明明已经修改或替换了app/src文件下的图片、音频、字体等文件，而浏览器中的页面却没有做出相应的改变的话，请尝试在控制台中重新运行`gulp dev`任务。

8. config/vendors.js说明

    vendors.js文件用来登记第三方CSS、JS和Fonts信息，凡在vendors.js中登记过的第三方文件，均会以某种形式被添加到项目中。举个例子：
    假如现在vendors.js是这样的：
    
        module.exports = {
            stylesheets: [
                'node_modules/normalize.css/normalize.css',
                'node_modules/swiper/dist/css/swiper.css',
                'node_modules/animate.css/animate.css',
                'node_modules/font-awesome/css/font-awesome.css'
            ],
            javascripts: [
                'node_modules/jquery/dist/jquery.js'
            ],
            fonts: [
                'node_modules/font-awesome/fonts/fontAwesome-webfont.eot',
                'node_modules/font-awesome/fonts/fontAwesome-webfont.svg',
                'node_modules/font-awesome/fonts/fontAwesome-webfont.ttf',
                'node_modules/font-awesome/fonts/fontAwesome-webfont.woff',
                'node_modules/font-awesome/fonts/fontAwesome-webfont.woff2'
            ]
        };

    vendors.js的stylesheets中所有的css文件均会被加入项目最终生成的bundle.css中，vendors.js的javascripts中所有的js文件均会被加入项目最终生成的bundle.js中，vendors.js的fonts中所有的文件均会被复制到app/dist/fonts文件夹中。
    
    vendors.js中登记的文件会被优先加入bundle.css和bundle.js中，因此你无需担心自己写的SCSS中的样式被覆盖或者在main.js中发现某个第三方库的对象未定义的情况。另外vendors.js中的文件本身会按照登记顺序依次加入bundle.css和bundle.js。
    
    注意1：文件路径是相对于gulpfile.js的，不是相对于vendors.js的。
    注意2：虽然可以通过这种方式引入第三方JS文件，但还是推荐使用CommonJS的require写法来引入。`var jQuery = $ = require('jquery');`

## 待办事项
1. 完善开发文档
2. 优化动画效果
3. 优化元素定位方式
4. 增加更多Slide切换效果

## Lisence
[MIT][20]


  [1]: https://raw.githubusercontent.com/panteng/wechat-h5-boilerplate/master/demo.png
  [2]: http://panteng.me/demos/whb
  [3]: https://raw.githubusercontent.com/panteng/wechat-h5-boilerplate/master/QR-Code.png
  [4]: https://github.com/nolimits4web/swiper/
  [5]: https://github.com/daneden/animate.css
  [6]: https://github.com/jquery/jquery
  [7]: https://github.com/necolas/normalize.css
  [8]: http://npm.taobao.org/
  [9]: http://npm.taobao.org/
  [10]: https://github.com/nodejs/node-gyp
  [11]: https://github.com/nodejs/node-gyp#installation
  [12]: http://loading.io/
  [13]: http://tobiasahlin.com/spinkit/
  [14]: http://projects.lukehaas.me/css-loaders/
  [15]: http://idangero.us/swiper/api
  [16]: https://daneden.github.io/animate.css/
  [17]: https://icomoon.io/#icon-font
  [18]: https://tinypng.com/
  [19]: http://www.adobe.com/products/audition.html
  [20]: http://opensource.org/licenses/mit-license.html