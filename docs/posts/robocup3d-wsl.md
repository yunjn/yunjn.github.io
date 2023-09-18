# WSL下RoboCup3D环境搭建
::: info 
对不方便使用或对双系统不适应的同学可以在 windows 子系统下完成 robocup3d 环境的搭建，体验还不错。
:::

## install wsl

地址：\<<https://www.jianshu.com/p/2bcf5eca5fbc>\>  

## deps

```bash
sudo apt install g++ git cmake libfreetype6-dev libode-dev libsdl-dev ruby ruby-dev libdevil-dev libboost-dev libboost-thread-dev libboost-regex-dev libboost-system-dev qt4-default
```

## simspark & rcsserver3d

* 地址：\<<http://robocup-sim.gitlab.io/SimSpark/downloads.html>\>  

### decompress

都选择Latest Version下载即可。  
下载完后解压(选择你开心的方式)参考  
`tar xvf file_name`

:::tip 

若你在windows下解压，后可通过在wsl的终端中 `explorer.exe .` 打开wsl所在的目录，然后将你解压后的目录拖到 `home/your_name/` 下。
:::

### complie & install

```bash
#simspark
cd simspark
mkdir build
cd build
cmake ..
make
sudo make install
sudo ldconfig
```

```bash
#rcsserver3d
cd rcsserver3d
mkdir build
cd build
cmake ..
make
sudo make install
sudo ldconfig
```

```bash
echo -e '/usr/local/lib/simspark\n/usr/local/lib/rcssserver3d' | sudo tee /etc/ld.so.conf.d/spark.conf
sudo ldconfig
```

* 启动： `rcsoccersim3d`

## roboviz

:::tip 

电脑得有 [Java 环境](https://www.runoob.com/w3cnote/windows10-java-setup.html)
:::

* [点我下载上面那玩意~](https://github.com/magmaOffenburg/RoboViz/releases/download/1.7.0/RoboViz.tar.gz)
  
* 选择合适的位置解压然后点击运行 `roboviz.bat` 即可

* 关闭运行时黑乎乎cmd窗口的方法
  

修改`roboviz.bat`内容为

```bash
@echo off

if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("""%~nx0"" h",0)(window.close)&&exit
:begin
REM

set prev=%cd%
cd /D "%~dp0"

java -jar RoboViz.jar %*

cd %prev%

```

然后新增`robo.vbs`文件，内容为

```bash
Set shell = Wscript.CreateObject("WScript.Shell")

a = shell.run ("E:\instruction\roboviz.bat",0)
```

:::tip 

注意`E:\instruction\roboviz.bat`是你的`roboviz.bat`地址，别搞错了。
:::

::: details Reference
* [开源代码](http://www.cs.utexas.edu/~AustinVilla/sim/3dsimulation/)
* [UT的底层](https://github.com/LARG/utaustinvilla3d)
* [球员动作编辑器](https://github.com/AIUT3D/aiut3d-motion-editor)
* [wsl命令参考](https://docs.microsoft.com/zh-cn/windows/wsl/reference)
* [Windows Terminal](https://docs.microsoft.com/zh-cn/windows/terminal/) 
  :::