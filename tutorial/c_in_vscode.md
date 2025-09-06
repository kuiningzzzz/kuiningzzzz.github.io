---
layout: default
title: vscode中的c/c++环境配置
---

# vscode中的c/c++环境配置

## 入门篇：能跑helloworld就算成功

### 第一步：安装VScode

建议尽量直接去[官网](https://code.visualstudio.com/)下载安装。

### 第二步：安装编译器g++

去[这个仓库](https://github.com/niXman/mingw-builds-binaries/releases)选择对应自己系统的版本，x86_64对应64位系统，i686对应32位系统。大多数同学一般下载x86_64-x.x.x-release-posix-seh-ucrt-rt_vxx-revx.7z（这里面的x基本替换数字，一般都是你下载时候发行出的最新版本）。

下载安装完后将其解压缩，并保存在一个你确定直到具体路径的地方，这个路径我们之后要用。注意：绝对路径（即以盘符为起点的路径）整个不要出现中文，否则可能会出现bug！

### 第三步：配置环境变量

我们希望编译器能够在电脑的任何一个目录下使用，所以需要将编译器的位置告诉电脑。
右键“此电脑”选择“属性”-高级系统设置，或直接按键盘windows徽标，搜索环境变量。在系统变量中有个名为Path的变量，双击打开，新建路径，将你刚才mingw文件夹中的bin目录的绝对路径加进去（下载路径\mingw64\bin），然后一路点击确定确定确定直到把所有设置窗口关闭。
- ps：到这一步，你可以测试一下是否成功：win+r，输入 `cmd` 调出命令行窗口，输入 `gcc -v` ，回车，如果出现了一堆gcc的版本信息就算是成功了。

### 第四步：Vscode内的操作

首先安装插件。点左边栏那个像俄罗斯方块图标，打开扩展，一般会安装如下插件：

![插件图片](./c_in_vscode_assets/extension.png)

在vscode中打开的项目目录新建一个.c/.cpp文件，写段helloworld代码。写完之后点击右上角运行的三角号。此时vscode上方会弹出调试程序的配置设置，.c文件选择gcc，.cpp文件选择g++，此时应该顺利的运行了程序（第一次运行或许有点慢，稍作等待）。如果你看到输出了helloworld，那么你的环境配置就基本成功啦！

### 第五步：关于json文件中参数的含义与设置

当你成功完成了第四步时，你的项目目录下应该自动创建了一个名为`.vscode`的文件夹，并且其中还有一个名为`tasks.json`的文件。将页面切换至你的.cpp文件并点击左侧的运行与调试按钮，你会看到蓝字“创建launch.json”，点击，并在上方弹出的选项中选择C++(GDB/LLDB)。进入`launch.json`，右下角点击添加配置，选择C/C++:(gdb)启动，会自动生成模板。此外，你可以自己在`.vscode`文件夹中新建名为`c_cpp_properties.json`和`settings.json`的文件，这两个文件不影响你的编译过程，而是影响你的编辑器对你的代码进行检查、理解、提示、警告等功能，是针对vscode的c/c++插件的设置。前者为插件提供了*头文件路径、编译器路径、宏定义、编译器目标平台*等信息，后者为插件提供了*代码格式化、智能提示、构建任务、调试配置、外观和编辑器行为*等方面的设置。

下面我们来看一下各个.json文件中的常用到的重要参数的含义：

**task.json**

- command：编译器`gcc.exe`的路径。
- args：对编译器投入的参数与选项（相当于在命令行中输入`gcc xxxx`）。
    - -g后的是被编译的文件。
    - -o后的是生成的文件路径名。
    - $\{\}中间的内容是一些特定的宏，比如file是启动时所在的文件名，fileDirname是file所在的目录，fileBasenameNoExtension就如同字面意思是去掉了拓展名的file，workspaceFolder是当前工作目录等等。
    当你有多个文件（比如多个.c）文件需要编译时，可以将被编译的文件处写作"*.c"，表示编译所有的.c文件并链接起来成为一个.exe文件，当然也可以不直接到.exe而是按照预处理-编译-汇编-链接的次序一步步来，详细的请自行查阅C编译器的指令规则。

**launch.json**

- program：是编译后生成的可执行文件，即对应上述`task.json`中-o后的内容，一般设置为相同即可。
- externalConsole：只有true和false两个值，决定了程序运行时是以黑框框的外置控制台运行，还是通过vscode自带的内部终端运行。
- miDebuggerPath：编译器中`gdb.exe`工具的路径，这一工具一般和上述`task.json`中command对应的`gcc.exe`程序位于同一个目录下。

**c_cpp_properties.json**

- 一个针对Windows端的示例：
```json
{
  "configurations": [
    {
      "name": "Win32",
      "includePath": [
        "${workspaceFolder}/**",
        "C:/mingw64/lib/gcc/x86_64-w64-mingw32/8.1.0/include", // 编译器自带头文件路径（通常compilerPath会自动添加）
        "C:/mingw64/include" // MinGW 自带的头文件
      ],
      "defines": [
        "_DEBUG",
        "UNICODE"
      ],
      "compilerPath": "C:/mingw64/bin/gcc.exe", // 关键！设置后很多路径会自动填充
      "cStandard": "c17",
      "cppStandard": "c++17",
      "intelliSenseMode": "windows-gcc-x64"
    }
  ],
  "version": 4
}
```
- configurations: 一个数组，允许你为不同的平台或环境（如 Linux、Windows、Mac）创建不同的配置。VSCode 会根据你当前的操作系统自动选择匹配的 "name"。
- name: 配置的名称，例如 "Win32", "Linux-GCC", "Mac-Clang"。
- includePath: 最重要的设置之一。它是一个路径列表，告诉智能感知在哪里查找 #include 的头文件。
    - ${workspaceFolder}: 是一个预定义的变量，代表当前打开的工作区根目录。
    - /**: 表示递归匹配所有子目录。
    - 对于系统库或第三方库（如 OpenCV, Boost），你需要将它们对应的 include 目录添加到这里。
- compilerPath: 指定编译器完整的绝对路径（如 C:/mingw64/bin/gcc.exe, /usr/bin/clang）。设置后，C/C++ 插件会自动从该编译器获取系统包含路径和预定义宏，大大减少了手动配置 includePath 和 defines 的工作量。
- defines: 预编译宏列表，例如 ["DEBUG", "MY_VALUE=1"]。
- cStandard，cppStandard: 语言标准，如 "c17", "gnu99", "c++20", "gnu++17"。
- intelliSenseMode: 指定智能感知引擎模仿哪种编译器行为。常见的值有：
    - linux-gcc-x64
    - macos-clang-x64
    - windows-msvc-x64
    - windows-gcc-x64 (用于 MinGW)
    - 通常，设置了 compilerPath 后，插件会自动为你选择正确的模式。

**settings.json**

- 内容较多不再赘述，锦上添花的作用，可以自己问问AI或者查查文档，需要的话可以联系我要我自己的settings文件

以下都是作者或朋友踩过的坑：
-复制粘贴路径时记得留心，反斜杠在.json文件中变成了转义字符，需要使用两个反斜杠表示一个反斜杠
-如果对.json文件做了修改，记得顺手按一下Ctrl+S保存，否则文件可能不会生效。如果保存之后还未生效，可以关闭vscode界面重新打开试试。

## 进阶篇：Cmake工程构建更加系统的多文件项目

施工中......



<script src="https://utteranc.es/client.js"
        repo="kuiningzzzz/kuiningzzzz.github.io"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>