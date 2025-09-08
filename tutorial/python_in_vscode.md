---
layout: default
title: vscode中的python环境配置
---

# vscode中的python环境配置

关于为什么要使用vscode的话我在[配置C环境的攻略](https://kuiningzzzz.github.io/tutorial/c_in_vscode)的开头提过，感兴趣的可以去看看。在vscode上配置“能跑就行”的python环境非常容易，所以本文和C环境那篇攻略一样会分为入门篇和进阶篇，并会在进阶篇中教大家使用一种更清晰有效的python环境管理方式：conda。

## 入门篇：跑个HelloWorld

### 第一步：安装与配置环境变量

vscode的下载安装也在C环境的攻略中提到过。我们需要去[官网](https://www.python.org/)挑个版本的python解释器下载（我使用的是3.13版本的解释器）。下载后双击下载得到的文件进行安装，注意勾选Add python.exe to PATH选项，这样我们就不必再配置环境变量。当然如果你忘记勾选，也可以像配置C环境的攻略中的添加环境变量一样将python解释器加到PATH中。检测成功的方式仍然是win+r后cmd打开控制台，输入`python --version`，得到版本号信息即算成功。

### 第二步：vscode中的操作

如果你是之前跟我装过C环境的同学，或许你会读到我那篇攻略的结语：你可以设置多套配置文件进行不同环境下的程序运行。这里不妨点击左下角的小齿轮，点开配置文件，新建一套配置文件之后跟着我们接下来的步骤进行。

安装拓展，点左边栏那个像俄罗斯方块图标，打开扩展，一般会安装如下插件：
- Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code：汉化插件，之前跟我装过C环境的同学应该已经见过了
- Python
- Pylance
- Python Debugger
- Python Environments
- 以及你自己想装的一些其他功能性或美化性的插件

在工作目录下新建一个.py文件并写入`print("helloworld")`，直接点击右上角的运行按钮，vscode上方会弹出解释器的选项，这里应该自动检测到了你刚刚安装并加入到环境变量中的解释器，选择之后运行即可输出helloworld。

至此，你就成功在vscode上搭建好了基础的python环境了！

## 进阶篇：conda的使用和管理

