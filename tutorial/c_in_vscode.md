# vscode中的c/c++环境配置

## 入门篇：能跑helloworld就算成功

### 第一步：安装VScode

建议尽量直接去[官网](https://code.visualstudio.com/)下载安装

### 第二步：安装编译器g++

去[这个仓库](https://github.com/niXman/mingw-builds-binaries/releases)选择对应自己系统的版本，x86_64对应64位系统，i686对应32位系统。大多数同学一般下载x86_64-x.x.x-release-posix-seh-ucrt-rt_vxx-revx.7z（这里面的x基本替换数字，一般都是你下载时候发行出的最新版本）

下载安装完后将其解压缩，并保存在一个你确定直到具体路径的地方，这个路径我们之后要用。注意：绝对路径（即以盘符为起点的路径）整个不要出现中文，否则可能会出现bug！

### 第三步：配置环境变量

我们希望编译器能够在电脑的任何一个目录下使用，所以需要将编译器的位置告诉电脑。
右键“此电脑”选择“属性”-高级系统设置，或直接按键盘windows徽标，搜索环境变量。在系统变量中有个名为Path的变量，双击打开，新建路径，将你刚才mingw文件夹中的bin目录的绝对路径加进去（下载路径\mingw64\bin），然后一路点击确定确定确定直到把所有设置窗口关闭。
- ps：到这一步，你可以测试一下是否成功：win+r，输入*cmd*调出命令行窗口，输入*gcc -v*，回车，如果出现了一堆gcc的版本信息就算是成功了。

### 第四步：Vscode内的操作

首先安装插件。点左边栏那个像俄罗斯方块图标，打开扩展，一般会安装如下插件：
<img src="/tutorial/c_in_vscode_assets/extension.png"></img>
在vscode中打开的项目目录新建一个.c/.cpp文件，写段helloworld代码。写完之后点击右上角运行的三角号。此时vscode上方会弹出调试程序的配置设置，.c文件选择gcc，.cpp文件选择g++，此时应该顺利的运行了程序（第一次运行或许有点慢，稍作等待）。如果你看到输出了helloworld，那么你的环境配置就基本成功啦！

### 第五步：关于json文件中参数的含义与设置

当你成功完成了第四步时，你的项目目录下应该自动创建了一个名为.vscode的文件夹，并且其中还有一个名为tasks.json的文件。


## 进阶篇：Cmake工程构建更加系统的多文件项目

TODO



<script src="https://utteranc.es/client.js"
        repo="kuiningzzzz/kuiningzzzz.github.io"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>