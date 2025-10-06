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

conda的作用实际上是将你不同的python环境打包成虚拟环境供程序运行。先不说不同的程序可能需要的python解释器版本不同的情况，当我们在程序中用import语句导入第三方库的时候，通常需要先通过pip或其他包管理工具等将某些库安装至本地（注：pip是下载python后通常会自带的包管理工具，通常可以使用pip install/uninstall命令进行第三方库的自动下载安装），而不同的程序需要的库往往不同，我们不能总是让所有程序都运行在同一个环境下，给每个程序都单独配置一遍环境单独安装一堆库也是低效、浪费、不现实的。同时，你会经常遇到这个程序“在我的电脑上没问题啊为什么带到这个电脑上就跑不了了”，这往往是因为程序身处的环境不同引起的问题，如果我们能直接把环境作为文件同样打包出去就好了。所以我们需要虚拟环境出场（当然，解决可移植性问题的更好的办法是使用docker，但在这篇文章中我们暂且不谈）。总而言之，我们可以暂时认为，conda有两个作用：1，平替或者某些时候上位替代pip进行包的下载安装；2，帮助构建和管理虚拟环境

### 第一步：安装anaconda

可以直接去[官网](https://www.anaconda.com/download)下载，不过更方便的做法是去[清华大学镜像站](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)下载，挑选适合自己操作系统的版本即可。下载好后双击安装包进行安装，记得勾选Add PATH和Register as default两个Advanced Options选项。安装后依然去cmd控制台测试，输入`conda --version`返回版本号即成功。（如果conda指令不好用的话，可能是环境变量没能成功添加，将conda原位置的文件夹以及文件夹下的condabin文件夹的绝对路径都加到PATH环境变量里即可）

### 第二步：使用conda指令构建环境并在vscode中使用

接下来的操作均需要在命令行中进行，你可以继续使用Windows自带的cmd终端，也可以去电脑搜索栏搜索anaconda prompt，这是你下载的anaconda自带的终端。我们不妨在接下来的操作时试用一下anaconda prompt。

在prompt终端输入`conda create -n name_of_venv python=3.13 -y`，其中name可以替换为任何纯英文的名字，在本文我们姑且用name_of_venv代替；python的值是你想要的解释器版本。这个语句会建立一个名为name_of_venv的虚拟环境，并在其中自动安装一个python3.13的解释器。构建完成后，输入`conda activate name_of_venv`，成功激活并进入到这一虚拟环境后，你会发现你命令行前面的(base)变成了(name_of_venv)。之后你可以在这个虚拟环境中尽情安装你需要的库了，这些在虚拟环境中的库并不能在其他环境中使用，是独立使用在这个虚拟环境下的。

之后回到你的vscode，点开你写好的.py测试文件，点击右下角下边框3.xx.x的python解释器版本标识（如果没有标识的话就直接去点击运行你的.py程序），这样vscode上方会跳出选择解释器的选项，在这里你能看到你不同解释器和虚拟环境的所在路径，选择你刚刚配好的虚拟环境即可。如果你在这里没看到你的虚拟环境也没关系，可以点击Enter interpreter path手动添加解释器的位置，Windows系统中的conda解释器一般位于C:\\Users\\用户名\\Anaconda3\\envs\\虚拟环境名\\python.exe。

当你成功运行了程序，成功使用了虚拟环境中的第三方库时，你的虚拟环境就确定可以正常使用了！

### 第三步：了解更多的conda指令

刚才我们接触了一共三个conda指令：
- conda --version
- conda create
- conda activate

create语句-n（或者--name）后跟的是创建的环境名字和python版本的设置，可以在版本设置后紧接着用空格分隔填入若干库名，创建时会自动将这些库添加在虚拟环境中。-y是为了方便自动确认，原则上可以去掉，去掉的话，在输入完create语句后会跳出将要安装的包列表，并询问是否继续（类似于Proceed \(\[y\]/n\)?），你需要手动再输入一个y。create语句也具备复制功能，使用`conda create -n 新环境 --clone 旧环境`即可

更多的常用conda指令：
- conda deactivate：退出当前虚拟环境
- conda info --envs ///或/// conda info -e ///或/// conda env list：查看已有的虚拟环境列表
- conda remove --name 环境名 --all ///或/// conda remove -p 环境所在位置的绝对路径（与环境同名的文件夹） --all：删除某一环境
- conda list ///或/// conda list --name 环境名：查看你当前环境/指定环境已安装的python包
- conda install 包名 ///和/// conda unstall 包名：一种类似于pip的使用包管理器安装python包的安装方式

更多内容可以去查阅官方文档或相关教程。

### 第四步：更多设置

该模块仍在火热更新中，欢迎更多评论反馈需求！

#### 移动虚拟环境的默认创建位置

虚拟环境一般会创建于C盘下，通过`conda env list`可以看到每个环境所在的路径位置。此外，一些缓存文件也会默认存储在C盘。这些事情有时会让人产生C盘焦虑。

输入`conda info`，返回的信息中，`package cache`和`envs directories`后的内容就是anaconda相关文件的默认存储路径。我们的目的就是修改这些。

去路径`C:/Users/用户名`中找到一个名为`.condarc`的文件，如果没找到的话，在anaconda prompt里运行`conda config --set show_channel_urls yes`即可。使用记事本或者vscode等文本编辑器打开这个文件，或许会看到一些已有的内容，这是用于配置包源、代理、存储等设置的文件。已有的其他内容不用修改，我们要修改`envs_dirs`和`pkgs_dirs`这两个参数，如果没有的话就在后面添加即可，内容如下：

```yaml
envs_dirs:
        - 一个绝对路径，这个是你设置的虚拟环境的存储位置
pkgs_dirs:
        - 一个绝对路径，这个是你设置的缓存的存储位置
```

保存退出之后即生效，可以通过`conda info`指令去看之前的两个信息是否发生改动。

## 结语

至此，你应该已经可以流畅的使用vscode进行python项目的编写和运行了。如果你也给你的vscode配置了C环境，那你或许对vscode这个软件拥有了更深刻的了解和认识。vscode只是一款可以加插件的文本编辑器，没有插件的话和记事本没什么区别，优秀的是生态，是不断从生态中受益并不断为生态提供活水的开发者们。好好和你的IDE磨合磨合，多写多练，一同做优秀的开发者，祝学习愉快、工作顺利！




# 评论区
PS：评论之后，你的GitHub账号会在我的仓库的Issues模块留下评论，此时有可能会自动关注这条Issue，之后再有人有新的评论时，可能会向你GitHub账号的邮箱发送提醒。

如果你不想接收这一提醒，可以去到[我仓库的Issue界面](https://github.com/kuiningzzzz/kuiningzzzz.github.io/issues)，找到你评论所在区域对应的Issue，并点进去后在右下角的Notifications选项中取消掉Subscribe。

如果你想一劳永逸再也不自动订阅这一提醒，可以去你自己账号的Settings界面，点击左边Notifications，在右半Subscriptions中的Customize email updates中取消掉Comments on Issues选项并点击Save保存确定即可。

<script src="https://utteranc.es/client.js"
        repo="kuiningzzzz/kuiningzzzz.github.io"
        issue-term="pathname"
        label="Comment"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>