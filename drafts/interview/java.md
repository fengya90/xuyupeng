## java

### JVM

#### java内存区域

[java内存区域](https://snailclimb.gitee.io/javaguide-interview/#/./docs/b-4jvm?id=_241-%e4%bb%8b%e7%bb%8d%e4%b8%8b-java-%e5%86%85%e5%ad%98%e5%8c%ba%e5%9f%9f%e8%bf%90%e8%a1%8c%e6%97%b6%e6%95%b0%e6%8d%ae%e5%8c%ba)



### java集合

#### Arraylist 与 LinkedList 区别?





### hashmap系列



```
hashmap十连问：hashtable和hashmap的区别，为什么hashtable是线程安全的，在什么情况下使用hashmap体现非安全的，什么时候用concurrentHashMap，读锁和写锁互斥性，hashmap的底层是什么。

ynchronized和lock的区别，在实现原理上以及用法上谈。

springAOP的原理以及如何使用，动态代理cglib和jdk的代理在代理类和接口上会有区别。

IOC？

springcloud的微服务组件有哪些，分别有什么作用；


配置中心如何同步配置；

JVM的结构
2.栈帧的大小是什么时候确定的？
3.Java编译后的.class文件是什么？
4.系统是如何给进程分配内存的？是否有地址是无效的？
5. 系统调用的过程是怎样的？他是通过什么机制触发的？
6. 多线程编程的锁你了解哪些锁？
7. 读写锁如果发生饿死怎么办？公平锁的机制是怎样的？
8. TCP如果一直用短连接会有什么问题？
https://snailclimb.gitee.io/javaguide-interview/#/./docs/b-1%E9%9D%A2%E8%AF%95%E9%A2%98%E6%80%BB%E7%BB%93-Java%E5%9F%BA%E7%A1%80

说一下hashmap的扩容机制吧
GC过程
讲讲volatile关键字的作用
SpringIOC
SpringAOP
log4j
mybtais连接池
Spring容器

3、const关键字。
4、vector和list的区别。
说一下java的内存分布。

10、final关键字。
11、乐观锁和悲观锁。

volatile的理解
有序性
主存，缓存


5.ArrayList和LinkedList的区别
6.讲讲hashmap
7.hashmap的线程不安全体现在哪里
8.hashmap的扩容机制
9.堆的结构是怎么样的
介绍一下主要的几种Java容器类，Collection和Map接口
ArrayList扩容机制、和LinkedList之间的实现区别
有哪几种set？HashSet、TreeSet、LinkedHashSet之前的实现区别，如果遍历的话，会是怎么样一个顺序？（第一次没太听懂，再描述了下才发现意思是hash tree和link hash下存储方式的区别）
Map呢？三种map的实现
介绍一下hashtable、hashmap、concurrenthashmap之间的区别
说一下synchronize和Lock（不记得是让说区别还是只说前面那个了）
多线程几个问题（这里记不太清了）
https://github.com/Snailclimb/JavaGuide
https://snailclimb.gitee.io/javaguide-interview/#/
redis 和 memcached 的区别
hadoop
java类加载机制
java问题定位
java命令行工具

```



### JIT

```
有些方法和代码块是经常需要被调用的(也就是所谓的热点代码)，所以后面引进了 JIT 编译器，而 JIT 属于运行时编译。当 JIT 编译器完成第一次编译后，其会将字节码对应的机器码保存下来，下次可以直接使用。而我们知道，机器码的运行效率肯定是高于 Java 解释器的。这也解释了我们为什么经常会说 Java 是编译与解释共存的语言。

HotSpot 采用了惰性评估(Lazy Evaluation)的做法，根据二八定律，消耗大部分系统资源的只有那一小部分的代码（热点代码），而这也就是 JIT 所需要编译的部分。JVM 会根据代码每次被执行的情况收集信息并相应地做出一些优化，因此执行的次数越多，它的速度就越快。JDK 9 引入了一种新的编译模式 AOT(Ahead of Time Compilation)，它是直接将字节码编译成机器码，这样就避免了 JIT 预热等各方面的开销。JDK 支持分层编译和 AOT 协作使用。但是 ，AOT 编译器的编译质量是肯定比不上 JIT 编译器的。
```



### 字符型常量和字符串常量的区别?

```
形式上: 字符常量是单引号引起的一个字符; 字符串常量是双引号引起的若干个字符
含义上: 字符常量相当于一个整型值( ASCII 值),可以参加表达式运算; 字符串常量代表一个地址值(该字符串在内存中存放位置)
占内存大小 字符常量只占 2 个字节; 字符串常量占若干个字节 (注意： char 在 Java 中占两个字节)
```



### 构造器 Constructor 是否可被 override?

```
Constructor 不能被 override（重写）,但是可以 overload（重载）,所以你可以看到一个类中有多个构造函数的情况。
```



### 重载和重写的区别

```
重载就是同样的一个方法能够根据输入数据的不同，做出不同的处理

重写就是当子类继承自父类的相同方法，输入数据一样，但要做出有别于父类的响应时，你就要覆盖父类方法

重载：发生在同一个类中，方法名必须相同，参数类型不同、个数不同、顺序不同，方法返回值和访问修饰符可以不同。
重写：重写发生在运行期，是子类对父类的允许访问的方法的实现过程进行重新编写。
1. 返回值类型、方法名、参数列表必须相同，抛出的异常范围小于等于父类，访问修饰符范围大于等于父类。
2. 如果父类方法访问修饰符为 private/final/static 则子类就不能重写该方法，但是被 static 修饰的方法能够被再次声明。
3. 构造方法无法被重写
```

| 区别点     | 重载方法 | 重写方法                                       |
| ---------- | -------- | ---------------------------------------------- |
| 发生范围   | 同一个类 | 子类 中                                        |
| 参数列表   | 必须修改 | 一定不能修改                                   |
| 返回类型   | 可修改   | 一定不能修改                                   |
| 异常       | 可修改   | 可以减少或删除，一定不能抛出新的或者更广的异常 |
| 访问修饰符 | 可修改   | 一定不能做更严格的限制（可以降低限制）         |
| 发生阶段   | 编译期   | 运行期                                         |

### String StringBuffer，StringBuilder，String

```
1. 简单的来说：String 类中使用 final 关键字修饰字符数组来保存字符串，private final char value[]，所以 String 对象是不可变的。在 Java 9 之后，String 类的实现改用 byte 数组存储字符串 private final byte[] value
2. 而 StringBuilder 与 StringBuffer 都继承自 AbstractStringBuilder 类，在 AbstractStringBuilder 中也是使用字符数组保存字符串char[]value 但是没有用 final 关键字修饰，所以这两种对象都是可变的。
3. String 中的对象是不可变的，也就可以理解为常量，线程安全。AbstractStringBuilder 是 StringBuilder 与 StringBuffer 的公共父类，定义了一些字符串的基本操作，如 expandCapacity、append、insert、indexOf 等公共方法。StringBuffer 对方法加了同步锁或者对调用的方法加了同步锁，所以是线程安全的。StringBuilder 并没有对方法进行加同步锁，所以是非线程安全的。
```



### 自动装箱与拆箱

- **装箱**：将基本类型用它们对应的引用类型包装起来；
- **拆箱**：将包装类型转换为基本数据类型；

更多内容见：[深入剖析Java中的装箱和拆箱](https://www.cnblogs.com/dolphin0520/p/3780005.html)



### 接口和抽象类的区别是什么？（note！！！！！！！）

```
接口的方法默认是 public，所有方法在接口中不能有实现(Java 8 开始接口方法可以有默认实现），而抽象类可以有非抽象的方法。
接口中除了 static、final 变量，不能有其他变量，而抽象类中则不一定。
一个类可以实现多个接口，但只能实现一个抽象类。接口自己本身可以通过 extends 关键字扩展多个接口。
接口方法默认修饰符是 public，抽象方法可以有 public、protected 和 default 这些修饰符（抽象方法就是为了被重写所以不能使用 private 关键字修饰！）。
从设计层面来说，抽象是对类的抽象，是一种模板设计，而接口是对行为的抽象，是一种行为的规范。
备注：

在 JDK8 中，接口也可以定义静态方法，可以直接用接口名调用。实现类和实现是不可以调用的。如果同时实现两个接口，接口中定义了一样的默认方法，则必须重写，不然会报错。(详见 issue:https://github.com/Snailclimb/JavaGuide/issues/146。
jdk9 的接口被允许定义私有方法 。
总结一下 jdk7~jdk9 Java 中接口概念的变化（相关阅读）：

在 jdk 7 或更早版本中，接口里面只能有常量变量和抽象方法。这些接口方法必须由选择实现接口的类实现。
jdk8 的时候接口可以有默认方法和静态方法功能。
Jdk 9 在接口中引入了私有方法和私有静态方法。
```







### 参考资料

* [java面试突击版本](https://snailclimb.gitee.io/javaguide-interview/#/)