# wechat-h5-boilerplate

> 「让制作H5像制作PPT一样简单！」

Wechat-H5-Boilerplate(以下简称WHB）是一个H5动效模板，专门为微信优化，适合快速构建全屏滚动型H5宣传页。

![效果图][1]

例如让一段文字动起来只需要一行代码：

    <p class="animated" data-ani-name="slideInRight" data-ani-duration="1s" data-ani-delay="0.3s">I'm a coder!</p>


## 目录

 - [实时预览](#实时预览)
 - [依赖列表](#依赖列表)
 - [项目结构](#项目结构)
 - [开发流程](#开发流程)
 - [发布流程](#发布流程)
 - [开发指南](#开发指南)
 - [待办事项](#待办事项)

## 实时预览

**使用手机**访问下面的地址或扫描下方二维码

[https://panteng.github.io/wechat-h5-boilerplate/][2]

![此处输入图片的描述][3]

## 依赖列表
1. [Swiper][4] --> 用于实现页面的整屏滚动
2. [Animate.css][5] --> 用于提供CSS动画
3. [jQuery][6] --> 用于操作DOM
4. [Normalize.css][7] --> 用于CSS Reset

## 项目结构

        /app
            /dist               --> 项目文件的分发版本，所有的文件均由Gulp任务生成，请勿手动修改
                /audios         --> 从app/src/audios复制而来
                /fonts          --> 从app/src/fonts和在config/vendors.js中指定的第三方字体复制而来
                /images         --> 由app/src/images下的图片经Imagemin压缩优化生成
                /javascripts    --> 由app/src/javascripts下的文件经Browserify打包生成
                /stylesheets    --> 由app/src/scss下的文件编译生成
                index.html      --> 由app/src/index.html经Gulp-inject插入bundle.(min.).css和bundle.(min.).js后生成
            /src                --> 项目的源码，所有文件都可编辑
                /audios         --> 存放音频、视频文件
                /fonts          --> 存放字体文件
                /images         --> 存放图片文件
                /javascripts    --> JS源文件，经Browserify打包后生成app/dist/javascripts/bundle.js
                /scss           --> SCSS文件，经过编译后生成app/dist/stylesheets/bundle.css
                index.html      --> 页面HTML，经过Gulp-inject处理后生成app/dist/index.html
        /config
            vendors.js          --> 第三方CSS、JS、Fonts列表，详见vendors.js说明
        .gitignore
        gulpfile.js             --> Gulp任务
        package.json
        

## 开发流程

1. **将本项目clone到本地**

    在控制台中运行：

        git clone --depth=1 https://github.com/panteng/wechat-h5-boilerplate.git <your-project-name>
        cd <your-project-name>
        
    或者你也可以直接在[Release](https://github.com/panteng/wechat-h5-boilerplate/releases)页面下载WHB的源码压缩包。

2. **安装第三方包**

    WHB使用NPM管理第三方包    

    在控制台中运行：

        npm install

    注意1：由于大陆网络环境恶劣，下载NPM上的包速度很慢，建议使用国内NPM镜像[CNPM][8]。CNPM的安装方法请参考[官网使用说明][9]。CNPM v4.2.0在Windows系统上有Bug（参考[#97](https://github.com/cnpm/cnpm/issues/97)），Windows用户请勿使用该版本，虽然官方说已经修复，但我在Windows上使用CNPM安装需要node-gyp编译的包时仍然会报错。我也不建议使用CNPM v3.4.1，因为其内置的NPM版本过旧。推荐`npm install --registry=https://registry.npm.taobao.org -d`这种直接使用镜像仓库的方式安装。（加入 -d 是为了显示安装过程中的详细信息，我个人经常用这种方法来判断安装过程是否因为网络或其他问题卡住了）。

    注意2：WHB所需的一些第三方包依赖于[node-gyp][10]，在安装这些包之前，请先确认你的机器已经正确安装node-gyp。请参考[node-gyp官方文档][11]来进行安装。Windows用户可能会遇到一些麻烦，因为在Windows上安装node-gyp是一件很痛苦的事。
    
    注意3：Windows用户，请不要将WHB放在路径太深的目录中。因为Windows只支持长度为255个字符以内的路径，所以如果你将本项目放在路径很深的目录中，有很大可能会造成node-gyp编译失败。
    
    注意4：Windows用户，如果你已经正确安装了node-gyp，但在运行`npm install -d`时依然报错，且报错信息为“EPERM, operation not permitted”的话，请尝试`npm install -d --force`。
    
3. **开始开发**

    在控制台运行：

        gulp dev
        
    稍等片刻，浏览器窗口会自动打开并指向地址`localhost:3000`，当你修改app/src下的任意文件时，浏览器页面会自动刷新。

## 发布流程

1. 执行gulp prod任务

   在控制台中运行：

        gulp prod

    该任务将在app/dist文件夹中生成两个新文件bundle.min.css和bundle.min.js，并删除原有的bundle.css和bundle.js。
    
2. 发布时，只需要将app/dist文件夹中的文件上传到服务器即可，其他文件都不是必需的。app/dist中的CSS、JS和图片文件都是经过压缩优化的。

## 开发指南

1. **加载动画**

    H5页面通常包含大量图片和背景音乐，因此一个好看的加载动画是必要的。
    
    你可以自己写一些CSS3动画，将动画相关的HTML代码插入在app/src/index.html中的`<div class="loading-overlay"></div>`中，并将相关的CSS3 Animation代码整合进app/src/scss中。
    
    想省事的话，[loading.io][12]这个网站可以帮你生成现成的加载动画（打不开请翻墙）。建议生成SVG格式的动画图像文件，将文件改为为loading.svg并替换app/src/images/下的同名文件即可。
    
    此外分享一些优秀的CSS3加载动画库：
    
    - [Spinkit][13]
    - [CSS Loaders][14]

2. **页面切换效果**
    
    页面切换暂时只支持Swiper自带的四种：slide，fade, flip和coverflow（cube不支持，因为不符合此场景）。详见[Swiper文档][15]中关于effect的部分。
    
    WHB尚无法对不同页面指定不同的切换方式，我将在后续版本中考虑加入此功能以及更多更酷的切换方式。

3. **页面内元素（图片、文字）动画**

    在WHB中为图片和文字添加动画非常简单。
    
    例如在第一页中有一段文字需要以动画显示，代码如下：
        
        <div class="swiper-slide slide-1">
            <p class="animated" data-ani-name="slideInRight" data-ani-duration="1s" data-ani-delay="0.3s">I'm a coder!</p>
        </div>
    
    只需要在这段文字上添加类名`animated`，并指定`data-ani-name`（动画名称）,`data-ani-duration`（动画执行时间），`data-ani-delay`（动画延迟时间）三个属性即可。
    
    WHB的动画由Animate.css提供，支持的动画名称可以在[Animate.css官网][16]上查看。
    
4. **字体图标**

    WHB自带的字体图标文件中只有两个图标，分别是右上角的音乐符号，和屏幕下方的上划提示符号。如果你需要更多图标，建议使用[Icomoon.io][17]进行定制，选择你需要的图标（也可以自己设计并上传），打包成字体文件即可。
    
    这里不建议使用Font-Awesome等通用字体包的原因是，Font-Awesome中的图标非常多，所以字体文件会比较大，而其中大部分图标是用不到的。较大的字体文件会拖慢网页在用户设备上的加载速度。

5. **图像优化**

    WHB中自带对app/src/images下的图片进行有损压缩的功能，但我仍然建议在你将图片扔进app/src/images文件夹前，对图片进行必要的手动优化，例如将图片调整为合适的尺寸，将部分小图片整合成精灵图等。
    
    分享一些好用的图片优化处理网站：
    - 图片压缩：[TinyPNG][18]
    - 精灵图生成器（包括生成图片和CSS代码）：[CSS Sprite Generator][19]
    - 精灵图CSS代码生成器（自动识别精灵图中的元素并生成CSS代码）：[Sprite Cow][20]
    
6. **背景音乐**

    建议背景音乐的文件格式为mp3，且大小尽量不要超过1MB。可使用[Adobe Audition][21]等专业音频编辑软件对背景音乐进行截取和压缩。
    
    如非必要，请不要设置背景音乐来打扰用户。

7. **移动端调试**

    首先，运行`gulp dev`任务，在控制台的输出信息中找到下面这段：
    
        [BS] Access URLs:
         ----------------------------------------
               Local: http://localhost:3000
            External: http://192.168.187.101:3000
         ----------------------------------------
                  UI: http://localhost:3001
         UI External: http://192.168.187.101:3001
         ----------------------------------------
    
    然后，确保你的移动设备（手机、平板等）和电脑处于同一局域网内（最简单的方式就是让电脑、手机和平板连接同一个WIFI；或者电脑用网线连接路由器，手机和平板连接同是这个路由器发出的WIFI）。
    
    最后，在你的移动设备上打开浏览器，访问上面第三行中External对应的URL（注意你的URL可能跟我上面写的不一样，以你自己的控制台中显示的External URL为准）。
    
    现在只要你修改app/src下的文件，所有访问这个URL的移动设备和电脑都会自动刷新浏览器页面。你在其中一个设备上进行的操作也会实时同步到其他设备（比如用手指向上划动页面）。

8. **响应式设计**

    建议使用rem替代px来设置元素的尺寸、边距和字体大小。
    
    在WHB中，1rem对应的px数值会随着设备屏幕尺寸的不同而变化。
    
    在屏幕宽度小于400px的设备上，1rem = 16px；
    
    在屏幕宽度大于400px且小于600px的设备上，1rem = 22px；
    
    在屏幕宽度大于600px的设备上，1rem = 32px；
    
    参见app/src/scss/base/_base.scss中关于Media Query的代码。

9. **config/vendors.js说明**

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
                'node_modules/jquery/dist/jquery.js'，
                'node_modules/swiper/dist/js/swiper.jquery.js'
            ],
            fonts: [
                'node_modules/font-awesome/fonts/*'
            ]
        };

    vendors.js的stylesheets中所有的css文件均会被加入项目最终生成的bundle.css中；
    
    vendors.js的javascripts中所有的js文件均会被加入项目最终生成的bundle.js中；
    
    vendors.js的fonts中所有的文件均会被复制到app/dist/fonts文件夹中。
    
    记住vendors.js中登记的文件会被优先加入bundle.css和bundle.js中，因此你无需担心自己写的SCSS中的样式被覆盖或者在main.js中发现某个第三方库的对象未定义的情况。而在vendors.js中登记的文件会按照登记顺序依次加入bundle.css和bundle.js，因此你要确保登记顺序正确，比如jquery.js一定要在swiper.jquery.js前面登记，因为swiper.jquery.js是依赖于jquery.js的。
    
    注意1：文件路径是相对于gulpfile.js的，不是相对于vendors.js的。
    
    注意2：如果你不喜欢通过这种方式引入第三方JS文件，而想使用CommonJS的require写法来引入，也是可以的。例如在app/src/javascripts/main.js中用这种方式引入jQuery：
    
        var $ = require('jquery');


10. **Gulp任务**

    在开发过程中，如果你发现明明已经修改或替换了app/src文件下的图片、音频、字体等文件，但浏览器中的页面却没有做出相应改变的话，请尝试在控制台中重新运行`gulp dev`任务。

## 待办事项
1. 完善开发文档
2. 优化动画效果
3. 优化元素定位方式
4. 增加更多Slide切换效果

## Lisence
[MIT][22]


  [1]: https://raw.githubusercontent.com/panteng/wechat-h5-boilerplate/master/demo.jpg
  [2]: https://panteng.github.io/wechat-h5-boilerplate/
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
  [19]: http://spritegen.website-performance.org/
  [20]: http://www.spritecow.com/
  [21]: http://www.adobe.com/products/audition.html
  [22]: http://opensource.org/licenses/mit-license.html
