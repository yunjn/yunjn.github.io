# Git基础
![关系图](assets/git/git_relation.jpg)

::: tip 

名词：Remote：远程仓库  Repository：本地仓库  Index：暂存区 Workspace：工作区

:::

::: warning

文章写于2020年，内容可能存在部分过时。

:::

## 初始化

``` bash
git config --global user.name "name"
git config --global user.email "email@gmail.com"
git config --list
#只需要配置一次
```

```bash
git init
git init [project-name]
git clone url
#选一个
```

## Git大致流程

* 工作区修改文件，添加文件
* 需要管理的文件提交至暂存区，不需要管理的使用[.gitignore](#01)文件来忽略
* 暂存区文件提交到git仓库
* 提交远程仓库

## 提交

```shell
#提交至暂存
git add filename
#提交至仓库
git commit -m"文件描述"
#修改最后一次提交
git commit --amend
#修改上一次提交（包括新文件变化）
gti commit --amemd <file1> <...>
#显示diff内容
 git commit -v
```

提交的[信息查询](#03)

## 文件删除

[强制删除敏感文件及记录](#02)

```shell
git rm -f
git rm --cached <file>#删除暂存区文件
#改名,并放入index
git mv <> <>
```

## 回滚

```shell
#将暂存区文件恢复到先前状态
git reset HEAD <file>

#将暂存区文件覆盖工作区
git checkout file

#移动HEAD的指向，指向上一个快照
#将HEAD移动后指向的快照回滚到暂存区
git reset --mixed HEAD~

#移动HEAD的指向，上一个快照
git reset --soft HEAD~

#移动HEAD的指向，指向上一个快照
#将HEAD移动后指向的快照回滚到暂存区
#将暂存区文件恢复到工作目录
git reset --hard HEAD~
```

## 比较

* 快捷键  

```shell
j：左              k：右
b：向前一页        f：向后一页
u：向上半页        d：向下半页
g：跳转第一行      G：跳转最后一行
3g：跳转至第三行
/：从上向下搜索    ?：从下向上搜索
h：进入帮助文档    q：退出
```

* diff

```shell
git diff #比较在那村去和工作目录
git diff id1 id2 #比较连个历史快照
git diff id #比较工作区和仓库中的快照
git diff --cached id #比较暂存区和仓库快照
```

## 分支

* 创建  

```shell
#创建
git branch <分支名>
git branch #列出蹦迪分支
-r         #列出远程分支
-a         #列出所有分支
-d         #删除分支
# 新建一个分支，与指定的远程分支建立追踪关系
git branch --track [branch] [remote-branch]
#切换
git checkout <分支名>
#创建并切换
git checkout -b <分支名>

#显示master分支昨天的状态
git show master@{yesterday}
```

* 合并

```shell
#将指定的分支名合并到本分支
git merge <分支名>
```

* 冲突
  1. 进入存在冲突的文件进行修改
  2. 提交
* 其它

```shell
git log --decorate --oneline
git log --decorate --oneline --graph --all
```

## 远程仓库

* clone  

`git clone url`

* 别名

```shell
git remote -v      #查看当前别名
git remote add origin url #链接
```

* 推送  

`git push origin master`

* 拉取

***pull =fetch + merge***

```shell
git fetch [远程库地址别名] [远程分支名]#拉取
git checkout #切换分支
git merge [远程库地址别名/远程分支名] #合并
```

* ssh

```shell
#检查是否存在ssh
cd ~/.ssh

#生成ssh
ssh-keygen -t rsa -C "Your email"
```

具体用法不过多赘述附上[完整方法](https://blog.csdn.net/u013778905/article/details/83501204 )

## <a id="01">忽略文件</a>

```shell
“/” 开头表示目录
“*” 通配多个字符
“?” 通配单个字符
“[]” 包含单个字符的匹配列表
“!” 表示不忽略(跟踪)匹配到的文件或目录
```

## <a id="03">信息查询及其它</a>

* checkout
  1. 从历史快照（或者暂存区域）中拷贝文件到工作目录
  2. 切换分支

```shell
#提交状态
git status

#显示当前分支版本历史
git log
git log --decorate --oneline
git log --decorate --oneline --graph --all

#操作历史
git reflog
```

## <a id="02">误传敏感文件</a>

```shell
#FILE_PATH：文件目录
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch FILE_PATH' --prune-empty --tag-name-filter cat -- --all

git push origin master --force

rm -rf .git/refs/original/

git reflog expire --expire=now --all

git gc --prune=now

git gc --aggressive --prune=now
```

## 附

* [另一位大佬的](https://www.yuque.com/yunyoujun/notes/git-learn-note)稍微进阶
* [小甲鱼的Git视频](https://www.bilibili.com/video/BV1bs411N7ny?from=search&seid=12246059426223190437)
* [Git 奇技淫巧](https://github.com/521xueweihan/git-tips )