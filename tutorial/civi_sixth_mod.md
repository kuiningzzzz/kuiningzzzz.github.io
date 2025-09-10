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

进到工具界面，点击上边栏的TOOLS，点击Options，在Civilization VI下的General选项中，你会在后边看到四个路径，第一个路径便是你的游戏文档路径，你平时游戏内的存档、我们之后在开发工具中生成的mod文件都会放在这里，请先记住它；第二个路径是你游戏原文件的路径；第三个路径是你开发工具原文件的路径（游戏和开发工具都是Steam上安装的话，SDK和游戏文件夹大概率是并列位于Steam内的游戏文件夹中）；第四个路径是Sid Meier's Civilization VI Development Assets的路径。这四个路径都必须填写！不过，由于Sid Meier's Civilization VI Development Assets的体量高达几十GB，在不打算使用其中资源而是自己编写artdef（这是模型配置文件，我们在第四步的时候第一次用到，并且也会在第四步时教大家如何从游戏源文件中借用相关代码来完成我们自己的artdef编写）的情况下，也可以不安装。但是路径设置又不能不填写，该如何解决呢？这是[B站Hemmelfort](https://www.bilibili.com/opus/408873391864907657/?from=readlist)H佬的相关解决方案和资源包。H佬的视频几乎是b站最早且最为完善的的文明六Mod搭建教程视频，现在文明六主流的不少Mod，其作者都或多或少通过H佬的视频入坑学习，向巨人致敬！

## 第二步：了解原游戏文件的结构

首先我要说，我们当然可以直接修改游戏文件的各种参数来直接达到修改游戏的目的，但这种行为容易出现问题，一方面你会忘记你修改了哪些部分导致游戏难以恢复只能重装，另一方面贸然修改游戏可能会影响已有数据的稳定性甚至是整个游戏的稳定性，容易出现更多的bug，所以我们通过mod的方式修改游戏参数。

我们要找到文明六游戏源文件的路径。去找到你Steam的文件夹，你的游戏大概在类似这一路径上：E:\\Steam\\steamapps\\common\\Sid Meier's Civilization VI。

进去游戏目录。在这里我们把游戏目录结构先完全解析一下，这部分内容你可以先跳过，等看后面的步骤找不到位置了再回来查看。当然你也可以选择你先在这里搞懂你玩的游戏到底是怎样的结构。

我们先点击进入`Base`，再进入`Assets`，再进入`Text`，这里的内容是游戏的部分文本，文件名中带有“zh”“CN”字样的文件即为简体中文文本资源。

依然是`Assets`文件夹，其中的`Gameplay`的`Data`文件夹中，这里有大量的.xml文件，包括游戏内的各种参数（`GlobalParameters.xml`）、游戏中的单位（`Units.yml`）等。

依然是`Assets`文件夹，`UI`中的`Icons`，这里的文件大多是游戏图标的数据，比如单位的图标（`Icons_Units.xml`）、单位的头像（`Icons_UnitPortraits.xml`）。

回到`Base`目录下，进到`ArtDefs`文件夹，这里放的是游戏的模型文件，比如单位的模型（`Units.artdef`）

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

这样我们就完成Mod的代码编写了！但是为了Mod能正常发布和运行，我们还需要设置Mod的各种属性。右键左边的项目名，点击最下方的Properties进入设置界面，首先看到的是Mod Info界面，Mod Id是系统给你分配好的不用动，剩下的内容包括版本、名字、作者、感谢、主页、简介、详细介绍等内容。这些可以自由设置。最重要的是Mod Info这一列最下方的In-Game Actions设置，点进去之后先Add Action，在右半设置Action的名字，对这个Mod而言类型设置为UpdateText即可，下面File的右半有个Add，我们Add进去我们刚刚编写的.xml文件。这就算设置完成了。（这里有FrontEnd Actions和In-Game Actions，前者是在游戏启动时就会进行的action，后者是选择好了领袖进入到一局游戏时才会加载的action）

点击上边栏的BUILD并选择Build Solution，等待完成Build之后，去到第一步中我们看到的路径下，进入这一目录中的Mod路径，就能看到我们生成的内容成品了。这时进入游戏，在额外内容中就能找到自己刚刚写的mod了，启用之后，mod就会在游戏中生效了。

## 第四步：第二个简易Mod：自制替换单位

这个步骤里，我们的目标是制作一个特色兵种：超级棒子，我们设定它是替代普通棒子兵的特色兵种，拥有更强的数值。

在开发界面，点击右上角的FILE，到New到Project，新建一个Starter - New Unit类型的项目。在自动生成的项目目录中删除掉Getting Start文件。

剩下的目录中，带有Art字样的文件依然是建模等艺术效果需要用到的，我们暂且不管。

点开Gameplay文件进行设置。首先在最上方两行type中间夹着的row元素上，将Type参数自定义为一个名字，我们这里先写为：UNIT_SUPERWARRIOR，意即为超级勇士。

随后为超级勇士设置ai类型，我们在刚刚两行type元素的下行写上`<UnitAiInfos>`和`</UnitAiInfos>`，在这俩的中间加入AI设置，这里我们设置为和原来的勇士一致即可。我们找到第二步中提到的Units.yml，用ctrl+f寻找warrior，不断向下查找直到找到这样一串文本：

```xml
<Row UnitType="UNIT_WARRIOR" AiType="UNITAI_COMBAT"/>
<Row UnitType="UNIT_WARRIOR" AiType="UNITAI_EXPLORE"/>
<Row UnitType="UNIT_WARRIOR" AiType="UNITTYPE_MELEE"/>
<Row UnitType="UNIT_WARRIOR" AiType="UNITTYPE_LAND_COMBAT"/>
```
这告诉我们原版的棒子兵有这四种不同的AI类型。将这串文本粘贴到刚才写下的两个元素中间，并把每行的UnitType参数都改为自己刚自定义的名字UNIT_SUPERWARRIOR。

同样，继续在AI类型的元素设置下面写上`<UnitReplace>`和`</UnitReplace>`，在中间输入如下内容：

```xml
<Row CivUniqueUnitType="UNIT_SUPERWARRIOR" ReplaceUnitType="UNIT_WARRIOR"/>
```

如果你不想替换单位的话可以跳过UnitReplace编写这一步骤。

同样的同样，`<TypeTags>`和`</TypeTags>`，在中间加入以下内容，来说明我们的单位是近战单位：

```xml
<Row Type="UNIT_SUPERWARRIOR" Tag="CLASS_MELEE"/>
```

至此以上均为在`<Units>`元素之前添加的内容。现在我们修改这一元素来控制我们兵种的数值。将原有的文件中Units元素中间的内容删除，我们自己编写参数。参数如下：
- UnitType
- Name：名字，一般要求写作`LOC_UNIT_单位名_NAME`
- Description：描述，一般要求写作`LOC_UNIT_单位名_DESCRIPTION`
- BaseSightRange：基本视野范围
- BaseMoves：基本移动力
- Domain：单位类型（海陆空）
- FormationClass：编队类型
- Cost：建造花费的生产力
- Maintenance：每回合维护费
- ZoneOfControl：只有true值和false值，决定是否具备区域控制功能
- Combat：近战攻击力
- RangedCombat：远程攻击力
- Ranged：远程攻击范围
- PromotionClass：升级路线
- AdvisorType：顾问提示类型
- PurchaseYield：购买方式（金币或信仰）
- PrereqTech：解锁该单位所需的科技
- MandatoryObsoleteTech：淘汰该单位的科技
- TraitType：某文明独有单位时才有用

可以将下面这段代码直接粘贴到两个Units元素中间，如果你要做其他兵种的设置可以参考并自行修改和添加更多参数。

```xml
<Row UnitType="UNIT_SUPERWARRIOR" Cost="5" Maintenance="0" BaseMoves="4" BaseSightRange="4" ZoneOfControl="true" Domain="DOMAIN_LAND" Combat="40" FormationClass="FORMATION_CLASS_LAND_COMBAT" PromotionClass="PROMOTION_CLASS_MELEE" AdvisorType="ADVISOR_CONQUEST" Name="LOC_UNIT_SUPERWARRIOR_NAME" Description="LOC_UNIT_SUPERWARRIOR_DESCRIPTION" PurchaseYield="YIELD_GOLD" MandatoryObsoleteTech="TECH_GUNPOWDER"/>
```
最后在两个Units元素后再加上`<UnitUpgrades>``</UnitUpgrades>`，并在中间加入`<Row Unit="UNIT_SUPERWARRIOR" UpgradeUnit="UNIT_SWORDSMAN"/>`指明升级后的单位是什么。

接下来打开项目目录中带有Text字样的文件，开始设置Name和Description的具体内容。首先把两个Tag都设置为你刚刚参数中写的内容（即把原文本中的PEON换成SUPERWARRIOR），而后即可修改上下两个text内容了。

我们观察到，这个文件中的语言设置是英文。我们把两段row元素复制一份，将`en-US`改为`zh_Hans_CN`，并修改文本内容即可。

接下来设置图标和头像（图标是地图中显示在头顶上的，头像是点击单位后显示在右下角的）。前两行的参数可以修改如下：（第一行意思是用了蒙特祖玛的雄鹰战士图标；第二行意思是用了原版棒子兵的头像，这主要由Index值决定，想了解更多Index值可以去查阅第二步中提到的单位图标文件和头像文件）
```xml
<Row Name="ICON_UNIT_SUPERWARRIOR" Atlas="ICON_ATLAS_UNITS" Index="25"/> 
<Row Name="ICON_UNIT_SUPERWARRIOR_PORTRAIT" Atlas="ICON_ATLAS_UNIT_PORTRAITS" Index="18"/>
```

后四行是不同种族的头像，可以不管，把Name参数中的PEON换成自己起的名字就行了。

然后是模型。工作目录中由给ArtDefs文件夹，点开里面的文件。我们会找到`<m_Fields>`元素，如果没找到的话就用Ctrl+f查找。在第一个这个元素所在行的最前面点击减号，可以将这一团元素折叠起来。折叠后我们看到紧接着就是`<m_ChildCollections>`元素，把这个元素也折叠起来，再紧接着就是名字了。这里具体的模型设置较为复杂，我们直接套用原版自带的模型。去第二步中提到的单位模型文件中Ctrl+f查找`<m_Name text="UNIT_WARRIOR"/>`，这个文件极大，肉眼寻找是不现实的。找到之后，你会看到查找定位到的行，上一行就是m_ChildCollections，折叠后再往上就是m_Fields，结构与我们的开发项目中结构如出一辙。我们直接复制查找定位到的这一行所在的最内层的Element元素（内部包括m_Fields、m_ChildCollections、m_Name、m_AppendMergedParameterCollections），替换在我们项目模型文件中相对应的位置，并将m_Name修改为我们自己自制单位的名字。

到这里，我们Mod的编写终于结束了！接下来和第三步一样，我们要设置Mod信息并生成。依然是右键项目名称，点击Properties，设置好Mod Info后点击In-Game Actions，我们发现项目已经帮我们设置好了内容，我们可以检查一下每个Action中的文件是否和我们的文件一致，如果不一致的话可以remove掉再重新add。于是我们直接跳过到build的步骤，build solution之后，我们的mod就新鲜出炉了！

如果你完全没有跟上，这里我把我的代码原文都放在这里：

NewUnit1_Gameplay.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<GameData>
  <!-- Almost all gameplay types should first be added to the types table. -->
  <!-- This serves as a central way to reference any type -->
  <Types>
    <Row Type="UNIT_SUPERWARRIOR" Kind="KIND_UNIT" />
  </Types>

	<UnitAiInfos>
		<Row UnitType="UNIT_SUPERWARRIOR" AiType="UNITAI_COMBAT"/>
		<Row UnitType="UNIT_SUPERWARRIOR" AiType="UNITAI_EXPLORE"/>
		<Row UnitType="UNIT_SUPERWARRIOR" AiType="UNITTYPE_MELEE"/>
		<Row UnitType="UNIT_SUPERWARRIOR" AiType="UNITTYPE_LAND_COMBAT"/>
	</UnitAiInfos>

	<UnitReplace>
		<Row CivUniqueUnitType="UNIT_SUPERWARRIOR" ReplaceUnitType="UNIT_WARRIOR"/>
	</UnitReplace>

	<TypeTags>
		<Row Type="UNIT_SUPERWARRIOR" Tag="CLASS_MELEE"/>
	</TypeTags>
	
	
  <!-- Define the actual unit here. For examples of additional properties and values, look at Units.xml in /Base/Assets/Gameplay/Data/-->
  <Units>
	  <Row UnitType="UNIT_SUPERWARRIOR" Cost="5" Maintenance="0" BaseMoves="4" BaseSightRange="4" ZoneOfControl="true" Domain="DOMAIN_LAND" Combat="40" FormationClass="FORMATION_CLASS_LAND_COMBAT" PromotionClass="PROMOTION_CLASS_MELEE" AdvisorType="ADVISOR_CONQUEST" Name="LOC_UNIT_SUPERWARRIOR_NAME" Description="LOC_UNIT_SUPERWARRIOR_DESCRIPTION" PurchaseYield="YIELD_GOLD" MandatoryObsoleteTech="TECH_GUNPOWDER"/>
  </Units>

	<UnitUpgrades>
		<Row Unit="UNIT_SUPERWARRIOR" UpgradeUnit="UNIT_SWORDSMAN"/>
	</UnitUpgrades>
</GameData>
```

NewUnit1_Icons.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<GameData>
  <!-- For simplicity sake, we're going to reuse existing icons. -->
  <IconDefinitions>
    <!-- This is the unit icon for the unit. -->
    <Row Name="ICON_UNIT_SUPERWARRIOR" Atlas="ICON_ATLAS_UNITS" Index="25"/>

    <!-- This is the portrait of the unit. -->
    <Row Name="ICON_UNIT_SUPERWARRIOR_PORTRAIT" Atlas="ICON_ATLAS_UNIT_PORTRAITS" Index="18"/>

    <!-- Ethnic specific portrait of the unit.  This changes based on the leader. -->
    <Row Name="ICON_ETHNICITY_ASIAN_UNIT_SUPERWARRIOR_PORTRAIT" Atlas="ICON_ATLAS_ASIAN_UNIT_PORTRAITS" Index="1"/>
    <Row Name="ICON_ETHNICITY_MEDIT_UNIT_SUPERWARRIOR_PORTRAIT" Atlas="ICON_ATLAS_MEDITERRANEAN_UNIT_PORTRAITS" Index="1"/>
    <Row Name="ICON_ETHNICITY_SOUTHAM_UNIT_SUPERWARRIOR_PORTRAIT" Atlas="ICON_ATLAS_SOUTH_AMERICAN_UNIT_PORTRAITS" Index="1"/>
    <Row Name="ICON_ETHNICITY_AFRICAN_UNIT_SUPERWARRIOR_PORTRAIT" Atlas="ICON_ATLAS_AFRICAN_UNIT_PORTRAITS" Index="1"/>
  </IconDefinitions>
</GameData>
```

NewUnit1_Text.xml
```xml
<?xml version="1.0" encoding="utf-8"?>
<GameData>
  <LocalizedText>
    <!-- The name of the unit. -->
    <Row Tag="LOC_UNIT_SUPERWARRIOR_NAME" Language="en_US">
      <Text>Superwarrior</Text>
    </Row>

    <!-- It's description. -->
    <Row Tag="LOC_UNIT_SUPERWARRIOR_DESCRIPTION" Language="en_US">
      <Text>Very strong.</Text>
    </Row>

	<Row Tag="LOC_UNIT_SUPERWARRIOR_NAME" Language="zh_Hans_CN">
		<Text>超级棒子兵</Text>
	</Row>

	<!-- It's description. -->
	<Row Tag="LOC_UNIT_SUPERWARRIOR_DESCRIPTION" Language="zh_Hans_CN">
		<Text>非常强</Text>
	</Row>
  </LocalizedText>
</GameData>
```

Units.artdef过于长就不放在这里了，按照上述提到的直接替换一下原文件和我们工作目录的文件的同样位置下的Element元素即可。


## 第五步：手搓一个新文明

这个太肝了，先不写了，先饶我一命

施工中......




