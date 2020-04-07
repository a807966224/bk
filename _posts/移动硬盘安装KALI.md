---
layout: mypost
title: 移动硬盘安装KALI
categories: [网络安全]
---

##### 使用移动硬盘安装kali linux 2018.2系统，以下是我安装流程（简要）：

1. 使用windows管理器，将移动硬盘压缩一个空卷，作为系统的硬盘；(此处建议做，不做的话，你会发现vware会将你整个的移动硬盘占用，这导致你的移动硬盘只能做系统盘符了！)

2. 使用vmware虚拟机安装系统
    * 第一个注意点：装系统到移动硬盘里，此处需要将vmware默认提供的硬盘移除掉，进入vmware点击右下角链接移动硬盘；
    * 第二个注意点：在分区位置，请注意硬盘大小，一定要是你空卷的大小;

3. 安装完成后，使用移动硬盘作为系统启动盘（参照各主板厂商不同，设置U启的方式不同，如：华硕：ESC，宏碁：F12）
    * 由于使用虚拟机安装的kali系统，可能会莫名原因导致引导文件内容中引导盘符错误（我安装的时候出现了），出现此提示（initramfs）,原因是grub路径不对，输入blkid查看所有的列举磁盘，在其中找到type='ext4'的区，记下/dev/sdb5 这个名字，按ctrl + del + alt重启，在启动界面参照下面的文字提示，按E编辑引导文件，找到一行linux后面..... /dev/sda5 ro 位置，将其改为刚才记下的内容 如：/dev/sdb5 rw，注意：ro改为rw，最后按F10保存后会重新使用引导文件进入系统（如果不出意外的话），出意外了的情况，我遇到了个：我使用usb转换头进行与移动硬盘的链接，这个转换头将引导文件搞成了乱码，此处提醒下各位，轻易不要使用外接工具，谁知道那鬼有问题！！！

4. 我是安装了有4-5次左右吧，都是可以的，主要是上面的注意点（坑），了解了应该很好通关

---

#### 系统基础配置

1. 更新源
    *  leafpad /etc/apt/sources.list 
        * deb http://http.kali.org/kali kali-rolling main non-free contrib
	*  apt-get update & apt-get upgrade    
	*  apt-get dist-upgrade 
	*  apt-get clean 
    *  reboot 
2. 安装google输入法（个人习惯，补充：https://ywnz.com/linuxjc/2891.html）
    * apt-get install fcitx
    * apt-get install fcitx-googlepinyin
    * im-config(输入法配置，注意点选择fcitx，其他全部ok)
    * reboot
    * fcitx-config-gtk3，添加google-pinyin输入法，ctrl+space即可切换输入法
    ````
    搜狗官网下载deb文件
        dpkg -i sogoupinyin_2.2.0.0108_amd64.deb
        apt install --fix-broken
        dpkg -i sogoupinyin_2.2.0.0108_amd64.deb
        fcitx cofig配置下搜狗输入法
        谷歌拼音输入法：https://www.fujieace.com/kali-linux/input.html
    ````
3. 安装aptitude（这个软件包管理命令，我是觉得必须要装，因为我好多次使用apt-get install **的时候报错，都是改为aptitude install **来解决的）
    * apt-get install aptitude

4. 安装字体

5. 安装MAVEN环境
    * M2_HOME=/opt/maven3
    * export MAVEN_OPTS="-Xms256m -Xmx512m"
    * export PATH=$M2_HOME/bin:$PATH

6. 安装虚拟机
    * apt-get install virtualbox

7. 科学上网
    1. 下载软件，https://github.com/shadowsocks/shadowsocks/wiki/Shadowsocks-%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E
    2. 安装genpac
        * apt-get install python-pip 
        * pip install genpac 
    3. 利用genpac生成pac文件，输入前确保ss处于打开状态。
        * genpac -p "SOCKS5 127.0.0.1:1080" --output="autoproxy.pac" 
        * 此时会生成一个名为autoproxy.pac的文件目录为/home/xxx/, xxx为用户名
    4. 点击电脑右上方电源键选择system settings，选择Network->Network proxy，method改为automatic，configuration URL改为
file:///home/root/autoproxy.pac

8. 安装filezilla
    * apt-get install filezilla

9. 安装截图工具
    * apt-get install scrot
        * scrot:截取整个桌面
        * scrot -s:截取特定窗口或矩形区域

10. 安装jdk8
    * 官网下载：https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
    * update-alternatives --config javac
    * update-alternatives --install /usr/bin/java java /opt/jdk1.8.0_211/bin/java 3

11. 安装Node
12. 安装ZooKeeper
    ````
    官网下载：http://mirror.bit.edu.cn/apache/zookeeper/zookeeper-3.5.5/
    tar -zxvf apache-zookeeper-3.5.5-bin.tar.gz
    mv apache-zookeeper-3.5.5-bin /opt
    cd apache-zookeeper-3.5.5-bin/
    mkdir data
    cd conf/
    cp zoo_sample.cfg zoo.cfg
    leafpad zoo.cfg
    修改dataDir路径地址
    ./zkServer.sh status
    ./zkServer.sh start
    ./zkCli.sh
    ./zkServer.sh stop
    修改：zoo.cfg中增加admin.serverPort=没有被占用的端口号
    ````
13. 安装Mysql客户端
    ````
    官网下载：https://dev.mysql.com/downloads/file/?id=485463
    dpkg -i mysql-workbench-community_8.0.16-1ubuntu18.04_amd64.deb
    apt install -f
    dpkg -i mysql-workbench-community_8.0.16-1ubuntu18.04_amd64.deb
    ````
14. 安装redis客户端工具
    * github下载：https://github.com/cc20110101/RedisView解压运行即可

15. 安装Postman




{{ page.date | date_to_string }}