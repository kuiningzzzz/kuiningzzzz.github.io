---
layout: default
title: 文明六mod编写
---

# 文明六mod编写

受够了开局三蛮寨披甲战士围剿首都？看见AI选了巴比伦直接跳水？还是说看见神AI虚空产能秒起城墙气的砸鼠标？这篇攻略教你手搓文明六mod，无论是拓展玩法，还是纯爽开局，甚至辅助外挂，总之爽就完了！

本攻略针对Steam端的文明六玩家，其他平台可能有类似的开发工具，可以自行发掘。

## 第一步：工具准备

当你购买了文明六这款游戏之后，你的库中的一个隐藏的角落里其实就已经有了文明六mod的开发工具了。让我们打开steam，进到自己的库界面，在左上方搜索栏的上方有个选项，我们取消掉游戏和软件的勾选，并勾选上“工具”，之后就可以在下方的列表里找到“Sid Meier's Civilization VI Development Tools”，下载安装即可。此外还有一个“Sid Meier's Civilization VI Development Assets”，这个是给建模佬用来建人物模型的，我们暂时不管。

下载安装后点击启动，在弹出的界面里点击ModBuddy，如果你没有安装过Visual Studio 2013的话，接下来安装程序会引导你安装（因为开发要用的工具其实就是VS2013套了个壳子，绷不住了）。安装完成之后再次点击ModBuddy，会进到开发工具界面。我们的工具到这里就算准备完成了。

进到工具界面，点击上边栏的TOOLS，点击Options，在Civilization VI下的General选项中，你会在后边看到四个路径，第一个路径便是你的游戏文档路径，你平时游戏内的存档、我们之后在开发工具中生成的mod文件都会放在这里，请先记住它。

## 第二步：了解原游戏文件的结构

我们要找到文明六游戏源文件的路径。去找到你Steam的文件夹，你的游戏大概在类似这一路径上：E:\\Steam\\steamapps\\common\\Sid Meier's Civilization VI。

进去游戏目录。在这里我们把游戏目录结构先完全解析一下，这部分内容你可以先跳过，等看后面的步骤找不到位置了再回来查看。当然你也可以选择你先在这里搞懂你玩的游戏到底是怎样的结构

我们先点击进入`Base`，再进入`Assets`，再进入`Text`，这里的内容是游戏的部分文本，文件名中带有“zh”“CN”字样的文件即为简体中文文本资源。

## 第三步：第一个简易Mod：修改游戏文本。

在开发工具界面，点击左上角的FILE，到new，到project，我们先选择新建一个最普通的EmptyMod开始。全部默认设置直接创建即可。新建的project会自带一个`项目名.Art.xml`文件，正如名字所示这文件影响的是艺术效果，我们暂时不需要额外引入新的模型和图片之类的，可以将其直接删除。随后我们右键左侧列表中的项目名，到Add，到New Item，选择DataBase(xml)文件类型即可。我们去到游戏源文件的Text目录下打开简体中文资源，看到了一些被尖括号包着的英文代码和一些游戏中的文本，比如蹴球场、休伊神庙等，每个文本被两个Text包着，两个Text元素外又被两个Replace包着，在前面的Replace后还有Tag、Language等参数，这便是一个替换文本的单元。一个单元的Tag参数唯一决定了替换文本出现的位置，而Language元素决定了替换文本在游戏设置为哪种语言时出现。

如何使用Mod的方式修改文本呢？我们回到开发界面，看到我们新建的.xml文件中也有两个尖括号的元素标签：GameData。在这个标签中间，我们再输入两个标签：`<LocalizedText>`和`</LocalizedText>`（细心的同学应该发现了游戏源xml文件中所有替换文本的单元外侧也有一层LocalizedText），再在这两个标签中间，加入刚才我们提到的一个替换文本的单元，将文本修改即可。比如我想把`休伊神庙`改为`伊休神庙`，那你的.xml文件内的内容应该大致如下：

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- GameData1 -->
<!-- Author: 你的作者名 -->
<!-- DateCreated: 9/9/2025 12:38:41 PM -->
<GameData>
	<LocalizedText>
		<Replace Tag="LOC_BUILDING_HUEY_TEOCALLI_NAME" Language="zh_Hans_CN">
			<Text>伊休神庙</Text>
		</Replace>
	</LocalizedText>
</GameData>
```

这样我们就完成Mod的代码编写了！但是为了Mod能正常发布和运行，我们还需要设置Mod的各种属性。右键左边的项目名，点击最下方的Properties进入设置界面，首先看到的是Mod Info界面，Mod Id是系统给你分配好的不用动，剩下的内容包括版本、名字、作者、感谢、主页、简介、详细介绍等内容。这些可以自由设置。最重要的是Mod Info这一列最下方的In-Game Actions设置，点进去之后先Add Action，在右半设置Action的名字，对这个Mod而言类型设置为UpdateText即可，下面File的右半有个Add，我们Add进去我们刚刚编写的.xml文件。这就算设置完成了。

点击上边栏的BUILD并选择Build Solution，等待完成Build之后，去到第一步中我们看到的路径下，进入这一目录中的Mod路径，就能看到我们生成的内容成品了。


