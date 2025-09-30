---
layout: default
title: Git常用指令
---

以下用`xxxx`或`nnnn`代表具体内容

## 本地仓库管理

- 创建仓库：`git init xxxx`
- 暂存：`git add xxxx`
- 暂存全部内容：`git add .`
- 提交：`git commit -m "xxxx"`
- 查看历史提交：`git log`
- 查看简洁的历史提交：`git log --oneline`
- 查看图形化分支和历史提交：`git log --oneline --gragh`
- 回退到某一次提交：
	- 仅仅将指针指向某一次提交并丢失其后的所有提交：`git reset --soft 提交id`
	- 在上述基础上重置暂存区：`git reset --mixed 提交id`
	- 在上述基础上重置工作目录，完全回到当时节点的状态：`git reset --hard 提交id`
- 新开一个分支：`git checkout -b xxxx`
- 切换分支：`git checkout xxxx`
- 合并分支：`git merge xxxx`
- 查看当前分支状态：`git status`
- 删除本地分支：`git branch -d xxxx`
- 修改上次提交：`git commit --amend`

## 远程仓库管理

- 在本地关联远程仓库：
	1. `git remote add origin url地址`
	2. `git branck -M main`
	3. `git push -u origin main`
- 分支推送至远程：`git push origin xxxx`
- 拉取远程分支：`git pull origin xxxx`
- 删除远程分支：`git push origin --delete xxxx`

## 团队开发

- 克隆他人的库：`git clone url地址`