---
layout: default
title: Linux命令行常用指令
---


下用`xxxx`或`nnnn`代表具体内容

## 信息获取基础指令

- 当前目录内容：`ls`
	- 可后跟后缀：
		- 详细显示日期权限等信息：`-l`或`--format=long`
		- 显示隐藏文件：`-a`或`--all`
		- 显示隐藏文件，但不显示`.`和`..`：`-A`或`--almost-all`
		- 显示本目录本身的信息，而非目录内，通常结合`-l`使用：`-d`或`--directory`

## 文件操作

- 创建文件：`touch xxxx`
- 创建文件夹：`mkdir`
- 向文件写入内容：`echo "内容" >> 文件路径`

## 解压：

- tar文件：`tar -xvf xxxx.tar`

## 构建：

- 使用makefile构建：`make`
- 清除上次make的文件：`make clean`

## 反汇编：

- 查看函数、全局变量的名称和地址：`objdump -t`
- 反汇编所有代码：`objdump -d xxxx`
- 反汇编所有代码并保存到本地文件：`objdump -d xxxx > xxxx.asm`

## gdb调试工具：

- 启动调试：`gdb xxxx`
- 运行程序直到下一个断点或程序结束：`r`或`run`
- 退出gdb：`q`或`quit`
- 停止程序：`kill`
- 断点：
	- 在函数入口处：`b`或`break 函数名`
	- 在某地址处：`break * 地址`
	- 删除断点：`delete breakpoints 断点序号`
	- 删除所有断点：`delete`
- 执行指令：
	- 执行一条指令，如果是函数调用就进入函数：`si`或`step instruction`
	- 执行n条指令：`stepi n`
	- 执行一个指令但是不进入函数：`nexti`
	- 继续执行：`continue`
	- 运行到当前函数返回：`finish`
- 检查代码：
	- 反汇编当前函数：`disas`
	- 反汇编特定函数：`disas xxxx`
	- 反汇编特定地址附近的函数：`disas 地址`
	- 反汇编特定地址范围内的代码：`disas 地址 地址`
	- 十六进制输出程序计数器的值：`print /x $rip`
- 检查数据：
	- 十进制输出rax内容：`p`或`print $rax`或`p/d $rax`
	- 十六进制输出rax内容：`p/x $rax`
	- 二进制输出rax内容：`p/t $rax`
	- 十进制输出一个十六进制数：`print 0xnnnn`
	- 十六进制输出一个十进制数：`print /x nnnn`
	- 十六进制输出寄存器加n的数据：`print /x ($寄存器+ n)`
	- 输出位于某地址的长整数：`print *(long *) 地址`
	- 检查从某地址开始的双字（8字节）：`x/2g 地址`
	- 检查某函数的前20字节：`x/20b 函数名`
	- （关于斜杠：数字表示要检查的单位数量，c表示以字符格式检查，d表示以十进制格式检查，x表示以十六进制检查，s表示作为c风格字符串检查；b/h/w/g表示作为1/2/4/8字节为单位检查，且直到下次修改之前都会保持这一设置）
- 当前栈帧信息：`info frame`
- 所有寄存器的值：`info registers`
- 所有断点：`info breakpoints`
- 获取更多指令信息：`help`
- 跳转：`j 地址`
- 打开视图：`layout asm`
- 打开寄存器视图：`layout regs`
- 关闭视图：Ctrl+X后按A