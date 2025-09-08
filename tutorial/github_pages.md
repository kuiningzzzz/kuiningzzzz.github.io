---
layout: default
title: GitHub Pages的构建方法
---

# GitHub Pages的构建方法

GitHub Pages是GitHub提供的静态网页托管平台，一般分为个人Page和仓库Page，其中个人Page对于每个GitHub账号来说是唯一的。你当前访问的我的主页正是我GitHub账号的个人Page。

接下来本文会以我的个人主页为例，讲解GitHub Pages的搭建方法。

ps：注意：下面的某些代码语句中你会看到反斜杠和大括号在一起，那是作为转义字符使用的，实际编写时你程序中只需要输入大括号，复制粘贴时也请记得删掉反斜杠，这里加了反斜杠是因为尽管身处代码块中，Jekyll依然会将两对大括号中间的内容加载为其指代的内容。

## 一、关于模板的使用

搭建GitHub Pages有两个路子可以走：找模板fork一下再填内容，或者自己从零开始编写HTML、CSS、JS三件套。主页模板在GitHub上可以找到很多，网上搜索可以搜到各种模板，你要做的只是跟随模板的README指引，了解哪个参数是用来做什么的，然后将其改为自己的信息即可。套模板填内容比较容易，网上能搜到的教程大多也都是这种，本文不再说明，这里推荐我的一位学长的[个人主页模板](https://github.com/ICUlizhi/academicpages-stu-)，比较适合学生使用。

本文主要侧重于讲通过自己编写网页三件套来搭建个人网站。

## 二、建仓并使用GitHub Pages

自己的GitHub账号是必须的。有了账号之后，进到自己的GitHub主页，点击上边栏的Repositories进到自己的仓库目录，新建仓库。将仓库名字务必设置为 你的GitHub名称.github.io （注意：这里的名称不是你的昵称，是你账户的不可修改的名字，是你新建仓库时修改名字前面显示的那个默认owner）。visibility务必设置为public，否则日后你的主页可能会出问题。如果你是fork了别人的模板，则将新建仓库替换为fork仓库，fork过来的仓库名字和可见度要求和上述新建仓库要求一样。

建好仓库之后进到仓库界面，新建一个名为index.md的文件并随便编写几行markdown格式的语句保存提交。点击上边栏的Settings，点击左边的Pages，右边将Build and deployment的Source选项改为GitHub Actions，之后点击弹出的Jekyll框架的Configure（Jekyll是一种前端框架，负责将markdown文件在网页中渲染成前端界面），会自动生成一堆工作流的代码。在这个界面我们直接点击右上角的Commit changes后将文件提交。之后回到仓库主页，我们会看到项目的工作流正在运行（仓库名旁边黄色的圆）或者已经运行完毕（仓库名旁边绿色的钩），刷新几次，运行完毕就表示网页已经生成完了。新开一个浏览器标签页访问 你的GitHub名称.github.io ，即可看到你已经渲染好的刚才编写的index.md的内容了。

至此你的主页已经搭建完毕，技术性的工作已经完成。接下来就是不断的润色、充实你的主页，并结构化的管理和设计主页仓库的结构。

## 三、Jekyll的使用以及站点目录的标准结构

你可以本地安装Jekyll并本地构建网页进行调试，但是通过push到仓库中利用GitHub自带的Jekyll直接构建在你的主页上也是可以的。如需本地安装Jekyll的话可以自行查阅相关资料和使用指令。

Jekyll生成站点时，会读取仓库目录中的以下内容：
- index.html/.md：主页的默认首页，
- _config.yml：Jekyll的配置文件，
- _includes目录：一些在不同界面复用的组件，比如网站的页脚和页眉。
- _layouts目录：一些HTML格式的模板文件。
- _posts目录：一些博客文章，通常为markdown格式。
- _sass目录：一些scss文件，会被自动编译为css文件。
- _drafts目录：一些草稿文件，这些不会被Jekyll自动构建出来。
- assets目录：存放站点资源的地方，比如.css、图片、JS脚本等

我们不必把这些内容都添加上，但也有些核心的组件是不可或缺的。接下来我简单介绍一下并带你编写好相关配置。

### _config.yml

首先要做的就是Jekyll配置。以下是我的配置的一部分：
```yml
theme: jekyll-theme-minimal
title: xxx的个人主页
description: Bookmark this to keep an eye on my project updates!
url: "https://kuiningzzzz.github.io"
baseurl: ""
```
- theme：网页的主题风格，更多主题风格可以查阅互联网相关信息，minimal轻量简约又基础，我比较喜欢
- title：在html文本里通过`\{\{site.title\}\}`语句指代的内容，字面意思，是你网页的标题
- description：字面意思，网页的描述或介绍，在我的主页中用处不大
- url/baseurl：寻址，会涉及到你之后编写其他页面时网页去哪里读取你的网页资源信息等问题。一般对于每个GitHub账号仅有一个的个人主页而言，url就写https://你的GitHub名称.github.io，baseurl打一对双引号留空即可。

此外还有markdown参数可以设置项目中markdown文本的语法规则，plugins参数可以设置拓展的Jekyll插件等等。

### index.html/.md

这是你刚才写好的主页文件。下面请在这个主页文件的最前面加上以下代码：（上下共六个短横线也要加喔）

```text
---
layout: default
title: 首页
---
```

- layout后跟的参数是你接下来要在_layout目录中新建的html文件的去拓展名名字，这里我们姑且假设你在_layouts文件夹里新建了一个名为default.html的文件
- title仍是字面意思，和_config.yml中的title不同的是这个title的内容通过`\{\{page.title\}\}`进行访问

### _layouts目录

然后是模板文件，我认为这几乎是项目中最重要的文件了，因为只有在这个文件中你会直观的看到整个网页的结构——这是一个以`<!DOCTYPE html>`开头、以`</html>`结尾的完整的HTML文件。

和刚才在index.html的信息中说的一样，我们先在这个目录下新建一个default.html文件。

那么还是先放上样例：
```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <title>\{\{ page.title \}\} | \{\{ site.title \}\}</title>
  <link rel="stylesheet" href="\{\{ '/assets/css/style.css' | relative_url \}\}">
</head>
<body>
  \{\% include header.html \%\}
  <div class="container">
    <main>
      \{\{ content \}\}
    </main>
  </div>
  \{\% include footer.html \%\}
</body>
</html>
```

学过一些HTML的同学应该能看懂这个网页的结构了。整个HTML元素分为两个元素：head和body。在head中，我们进行了字符编码方式的设定、网页标题的设定（这就是为什么你现在正在看的这个界面叫做“攻略 \| xxx的个人主页”了），并且链接了一份style.css文件，这个文件是建立在assets目录下的css文件夹内的，我们之后谈css配置的时候再说，现在可以先去建个空的文件。

重要的是body中的内容，这是整个网站的主干结构。我们希望我们的每个页面都由同样的页眉页脚和不同的展示内容组成。于是我们也是这样设计的：`\{\% include header.html \%\}`和`\{\% include footer.html \%\}`对应的是_includes目录下的header.html和footer.html文件的内容（这俩文件也是需要我们自己新建自己编写的），中间夹着的container容器中，则放着我们不同界面要展示的内容content。

这个content是代指什么呢？用个通俗易懂的说法，代指的是这个模板文件default.html的使用者——还记得我们的首页文件最前面加上了一句`layout: default`吗？这样，当我们访问首页时，看到的其实是模板文件将content置换为首页内容的代码，这样的模板实现了代码复用，因为对于每个使用这一模板的界面而言，除了content以外其他的部分都是完全相同的（当然，content并不是直接替换为使用者，至少还得经过一个把使用者的markdown格式转换为html格式的步骤）。

至此，我们至少已经了解了我们做的个人主页的HTML元素结构了，并且已经了解了使用模板的方法和效果。

上述内容中埋了两个坑：css和_includes，让我们继续。

### css配置

这里给没学过网页的同学科普一下：网页三件套一般是指html、css、JavaScript。HTML负责产生元素，比如标题、文本、图片、链接、脚本、风格格式等。而风格格式的元素一般是通过css语法或者调用.css文件进行完成；脚本元素则一般是通过编写JavaScript脚本完成。我们的主页暂时不需要过多的逻辑运算和处理，没有编写JS的需求。但是为了美观整洁，优秀的css配置是必须的。

首先我们在assets目录下新建一个css文件夹，并在里面新建文件style.css。文件的编写和调试难度不大但是相当繁琐漫长，并且需要精妙的设计知识支撑，不建议手动完成。我的建议是将这个工作交给AI完成后，再由自己进行一些距离上的微调和喜欢颜色上的设定。

如果你的文件本身就是HTML文件，那么直接把文件复制下来喂给AI让他帮你修改这个HTML文件（主要是做一些容器化的规划和class的标注），并让他生成一个看起来美观的.css文件（具体希望什么颜色什么风格也可以直接跟AI讲）。如果你的文件是markdown，让AI给markdown写css是容易出问题的，因为AI并不了解你markdown在网页上转为html时的具体规则和class标签，这时正确的做法是：用浏览器打开你的网页，按F12打开开发者界面，点击源代码（在我用的edge浏览器中是一个小虫子的标志），看到的这个目录里面会找到这个网页的html源码文件，你会看到你的markdown被渲染为html格式的内容，将其复制之后喂给AI，之后的操作就和刚才一样了。

这里还是附上一部分我自己的.css文件的内容供参考：
```css
/* 全局基础样式 */
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #fdfdfd;
  color: rgba(0, 0, 0, 0.7);
  line-height: 1.6;
}

/* 容器和布局 */
.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 头像 */
.avatar {
  width: 100%;
  border-radius: 50%;
  display: block;
}

/* 多列布局 */
.columns {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.card a {
  text-decoration: none;
  color: #0c65ff;
}

.card a:hover {
  text-decoration: underline;
  color: #0a45aa;
}

/* and more css */

```

当你的css过多时，为了项目结构清晰你当然也可以分文件编写.css，不过要记得把新的.css文件在default.html（模板文件）的head元素中，用和原来的.css文件类似的语句添加进去。

### _include目录

然后是可复用模块，在我们的个人主页中主要是页眉和页脚。在_includes文件夹中新建两个文件：header.html和footer.html。

我自己的header和footer的一小部分如下（经过一些删减）：

```html
<header class="site-header">
  <nav class="navbar">
    <div class="logo"><a href="\{\{ '/' | relative_url \}\}">\{\{ site.title \}\}</a></div>
  </nav>
</header>
```

```html
<footer>
  <p>© 2025 我的个人主页 | Powered by GitHub Pages & Jekyll</p>
</footer>
```

其中的class设置都是为了呼应.css文件中的一些部分，这里不再解释。

我们在header中看到了`<a>`元素，这是链接的意思；`\{\{ site.title \}\}`之前说过是_config文件中title的内容。所以不考虑css的情况下，这个页眉的效果是：有一行字内容为你设置的title，点击title时，网页会跳转至`\{\{ '/' | relative_url \}\}`。这是哪里？Jekyll解析时，relative_url的值受到我们在_config中设置的url/baseurl的影响，在这里，这个地址会解析为我们在网页的根地址后跟一个前面的斜杠，这就是我们主页本身，所以跳转的结果是还会回到这一首页界面。

受此启发，我们可以制作一个导航栏。于是我们的header.html文件或许可以变成这样：

```html
<header class="site-header">
  <nav class="navbar">
    <div class="logo"><a href="\{\{ '/' | relative_url }}">\{\{ site.title \}\}</a></div>
    <ul class="nav-links">
      <li><a href="\{\{ '/' | relative_url \}\}">首页</a></li>
      <li><a href="\{\{ '/projects' | relative_url \}\}">项目</a></li>
      <li><a href="\{\{ '/note' | relative_url \}\}">笔记</a></li>
    </ul>
  </nav>
</header>
```

与此同时，我们会在项目的根目录下与index.md并列新建几个文件：`projects.md`、`note.md`。注意，在html的双大括号中，文件名没有加.md后缀，但是实际我们建立的文件是需要有.md或者.html后缀的，这是Jekyll解析的语法规则问题。我们看到链接指向了`\{\{ '/projects' | relative_url \}\}`这个地址。实际上，在访问网页时，当你在网址栏输入 你的GitHub名称.github.io/projects 时，进入到的正是这一界面。似乎对寻址和链接有些感觉了？那我们再继续看看自己新建的文件夹和新建文件夹的寻址。

### 自建文件夹

我自己的主页中有一个板块是[项目](https://kuiningzzzz.github.io/projects)，进去之后你会看到有若干项目卡片，拿个人主页的项目举例，我们点进去“项目详情”，随后看到我们的网页地址栏跳转到这样一个网址：`https://kuiningzzzz.github.io/project/personal_pages`。如果你去看这个主页的仓库就会看到源码结构：我新建了一个名为project的仓库并放入了personal_pages.md文件，而在按钮的跳转链接中我写的地址是`\{\{ '/project/personal_pages' | relative_url \}\}`。以此类推，你也可以自己新建文件夹寻址。

### 至此，再将你新增的部分的css配置好，你就已经拥有了一个比较健全完整（至少能用了）的个人主页了！

## 四、让它更精彩！

第四段会持续更新一些有趣的主页小组件搭建方式，敬请期待！

### 基于Issues的评论区系统：Utterances

我们知道，GitHub Pages支持托管的是静态网页，实时评论区这种功能其实已经属于动态网页的范畴了。不过除了使用服务器作为后端数据平台以外，我们还有别的办法搭建评论区，比如使用Utterances。Utterances是一个GitHub APP，使用Utterances的开发者的服务器对信息进行处理，并将评论保存在你自己仓库的Issues中。

首先我们要开启仓库的Issues功能并安装Utterances。首先我们进入Utterances的[安装页面](https://github.com/apps/utterances)，订阅并经过一系列认证之后，你会进到你账号的设置界面，右边是关于你使用这一APP的相关信息。我们选择Only select repositories，并勾选自己的主页仓库，即可为自己的主页安装这一功能了。随后进到你的仓库，看你主页的仓库上边栏是否有Issues模块，如果有就不用动，没有的话，点击上边栏的Settings模块，直接往下翻（在General选项下），找到Feature并将其中的Issues选项勾选即可开启Issues功能。

随后我们来到Utterances官方的[评论区文件配置页面](https://utteranc.es/)，在configuration的下方，从repo填上“账号名/账号名.github.io”开始到后面所有内容全部填写完整，即可在下方看到自动生成的script脚本元素和copy按钮，把它copy放到你想要放到的位置即可，这就是评论区。至于填写内容的攻略如下：

- Repository：账号名/账号名.github.io
- Blog Post ↔️ Issue Mapping：可以开翻译自行查看选项含义，主要控制评论之后在你Issues中生成的Issue的名字。比如我选择了第一项，那么当有人在我的名为pojects的页面进行评论时，就会产生一个名为projects（新文件夹内的界面是路径，即 文件夹名/界面文件名）的Issue。
- Issue Label：GitHub的Issue本身就可以挂标签Label，功能就是如此，可以直接默认设置为“Comment”即可
- Theme：评论区的主题款式。

之后你可以找几个朋友去给你评论测试一下。正如我下方评论区所说，评论之后，评论者的GitHub账号会在仓库的Issues模块留下评论，此时有可能会自动关注这条Issue，之后再有人有新的评论时，可能会向GitHub账号的邮箱发送提醒。我的这个问题尚未得到解决，目前的做法是在评论区给观看者提醒并教其如何取消订阅和取消自动订阅（哭），如果有友友提出了解决方案可以联系我！（当然，直接更换评论区的构建方式用别家的或者自己搭建肯定是能解决问题的了，不过Utterances也有它的好嘛）

### 持续更新中！


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