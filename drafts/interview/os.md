# 操作系统

### 什么是系统调用呢

```
我们运行的程序基本都是运行在用户态，如果我们调用操作系统提供的系统态级别的子功能咋办呢？那就需要系统调用了！

也就是说在我们运行的用户程序中，凡是与系统态级别的资源有关的操作（如文件管理、进程控制、内存管理等)，都必须通过系统调用方式向操作系统提出服务请求，并由操作系统代为完成。

这些系统调用按功能大致可分为如下几类：

1. 设备管理。完成设备的请求或释放，以及设备启动等功能。
2. 文件管理。完成文件的读、写、创建及删除等功能。
3. 进程控制。完成进程的创建、撤销、阻塞及唤醒等功能。
4. 进程通信。完成进程之间的消息传递或信号传递等功能。
5. 内存管理。完成内存的分配、回收以及获取作业占用内存区大小及地址等功能。
```



### 进程和线程

```

```

