# redis

### 问题

* redis 持久化有哪几种方式，怎么选？

  ```
  粗略分为RDB和AOF,即快照方式和日志方式，可并存，加载时优先采用AOF。
  详细参见：
  	1. https://redis.io/topics/persistence
  	2. http://origin.redisbook.com/internal/rdb.html
  	3. http://origin.redisbook.com/internal/aof.html
  ```

* redis复制（主从）、redis哨兵（Sentinel）、redis集群

  ```
  主从：https://redis.io/topics/replication
  哨兵：https://redis.io/topics/sentinel
  集群：https://redis.io/topics/cluster-tutorial
  ```

* 聊一下redis的事务？

  ```
  参见：http://origin.redisbook.com/feature/transaction.html
  ```

* redis存储了哪些数据？

  ```
  1. 用户session缓存
  2. 热点数据
  3. 利用过期机制，限时业务的运用
  4. 计数器
  5. 利用SortedSet制作排行榜
  6. 利用setnx做分布式锁
  7. 利用list push和list pop做队列
  ……
  ```

  

  

* redis 的 zset 怎么实现的？,zset的原理，跳表的原理以及时间空间复杂度优缺点；

* redis怎么实现主从同步，说出具体过程，并且需要注意些什么问题；

* Redis 相关：缓存穿透问题的解决；

* 事务和pipline

  ```
  pipline实际上只是做了多条命令一次提交，不保证ACID。
  1. redis的事务不可回滚
  2. ACID（atomic
  https://blog.csdn.net/Severn_Zhou/article/details/95235667
  ```

* 谈一谈redis如何LRU

  ```
  redis可以设置内存使用上限，当内存达到上限时，redis根据配置的策略淘汰数据。redis采用的是近似LRU，基本原理就是随机采样N个key，淘汰其中空闲最久的。
  参考链接：
  	1. https://redis.io/topics/lru-cache
  ```

* redis如何删除过期数据？

  ```
  惰性删除和定期删除
  参考链接：http://origin.redisbook.com/internal/db.html
  ```

* redis单线程还是多线程？有什么优劣？

  ```
  redis命令的核心模块是单线程的，而不是整个 redis 实例就一个线程，redis 其他模块还有各自模块的线程。
  redis基于reactor模式开发了网络事件处理器，这个处理器被称为文件事件处理器。它的组成结构为4部分：多个套接字、IO多路复用程序、文件事件分派器、事件处理器。因为文件事件分派器队列的消费是单线程的，所以redis才叫单线程模型。
  redis 6新版本加入了多线程IO。
  ```

* redis为什么性能好？

  ```
  1.完全基于内存，绝大部分请求是纯粹的内存操作，非常快速。数据存在内存中，类似于HashMap，HashMap的优势就是查找和操作的时间复杂度都是O(1)；
  
  2.数据结构简单，对数据操作也简单，Redis中的数据结构是专门进行设计的；
  
  3.采用单线程，避免了不必要的上下文切换和竞争条件，也不存在多进程或者多线程导致的切换而消耗 CPU，不用去考虑各种锁的问题，不存在加锁释放锁操作，没有因为可能出现死锁而导致的性能消耗；
  
  4.使用多路I/O复用模型，非阻塞I/O；
  
  5.Redis直接自己构建了VM机制 ，因为一般的系统调用系统函数的话，会浪费一定的时间去移动和请求；
  ```

* 为什么不采用多进程或多线程处理？

  ```
  1.多线程处理可能涉及到锁
  2.多线程处理会涉及到线程切换而消耗CPU
  ```

* 单线程处理的缺点？

  ```
  1.耗时的命令会导致并发的下降，不只是读并发，写并发也会下降
  2.无法发挥多核CPU性能，不过可以通过在单机开多个Redis实例来完善
  ```

  

### 参考链接

* [redis官网](https://redis.io/)

* [Redis 设计与实现](http://origin.redisbook.com/)

  
