# wechat-h5-boilerplate

「让制作H5像制作PPT一样简单！」

Wechat-H5-Boilerplate(以下简称WHB）是一个H5动效模板，专门为微信优化，适合快速构建H5宣传页。

![效果图][1]

## 目录

 - [实时预览](#live-preview)
 - [项目结构](#project-structure)
 - [开发指南](#development)
 - [发布流程](#production)
 - [依赖列表](#dependencies)
 - [待办事项](#to-dos)

## 实时预览

使用手机访问下面的地址或扫描下方二维码

[http://panteng.me/demos/whb][2]

![此处输入图片的描述][3]

## 项目结构

## 开发指南

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
    
    注意4：Windows用户，如果你已经正确安装了node-gyp，但在运行`cnpm install -d`时依然报错，请尝试`cnpm install -d --force`。
    
    注意5：Windows用户，如果资金充足，请更换为MAC。:laughing::laughing::laughing:
    
3. 开始开发

    在控制运行：

        gulp dev

## 发布流程

1. 执行prod任务

   在控制台中运行：

        gulp prod

    该任务将在app/dist文件夹中生成两个新文件bundle.min.css和bundle.min.js，并删除原有的bundle.css和bundle.js。
    
2. 发布时，只需要将app/dist文件夹中的文件上传到服务器即可，其他文件如app/src/**/*，config/config.js等等都不是必需的。app/dist中的css和js文件时经过压缩的，图片也是经过优化的。

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


  [1]: https://raw.githubusercontent.com/panteng/wechat-h5-boilerplate/master/demo.jpg
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