# 网络

### OSI 和、TCP/IP 和五层协议



现实中的五层：

1. 应用层
2. 传输层
3. 网络层
4. 

test

osi七层，每一层的常用协议



###  TCP 三次握手和四次挥手

test

送个分，来谈谈四次挥手和time_wait?

- 
- 四次挥手的状态转移，为什么要四次

### TCP和UDP的区别

UDP 在传送数据之前不需要先建立连接，远地主机在收到 UDP 报文后，不需要给出任何确认。虽然 UDP 不提供可靠交付，但在某些情况下 UDP 确是一种最有效的工作方式（一般用于即时通信），比如： QQ 语音、 QQ 视频 、直播等等



TCP 提供面向连接的服务。在传送数据之前必须先建立连接，数据传送结束后要释放连接。 TCP 不提供广播或多播服务。由于 TCP 要提供可靠的，面向连接的传输服务（TCP的可靠体现在TCP在传递数据之前，会有三次握手来建立连接，而且在数据传递时，有确认、窗口、重传、拥塞控制机制，在数据传完后，还会断开连接用来节约系统资源），这一难以避免增加了许多开销，如确认，流量控制，计时器以及连接管理等。这不仅使协议数据单元的首部增大很多，还要占用许多处理机资源。TCP 一般用于文件传输、发送和接收邮件、远程登录等场景。



### HTTP和HTTPS

#### 浏览器中输入url地址到显示主页的过程

```
DNS解析
TCP连接
发送HTTP请求
服务器处理请求并返回HTTP报文
浏览器解析渲染页面
连接结束
```

#### 状态码

```
200 OK：请求成功。成功的含义取决于HTTP方法
204 No Content
206 Partial Content
301 Moved Permanently
302 Found
400 Bad Request：1.语义有误，当前请求无法被服务器理解。除非进行修改，否则客户端不应该重复提交这个请求。2、请求参数有误。
403 Forbidden
404 Not Found
405 Method Not Allowed
500 Internal Server Error：服务器遇到了不知道如何处理的情况。
501 Not Implemented：此请求方法不被服务器支持且无法被处理。只有GET和HEAD是要求服务器支持的，它们必定不会返回此错误代码。
502 Bad Gateway：此错误响应表明服务器作为网关需要得到一个处理这个请求的响应，但是得到一个错误的响应。
503 Service Unavailable：服务器没有准备好处理请求。 常见原因是服务器因维护或重载而停机。
504 Gateway Timeout：当服务器作为网关，不能及时得到响应时返回此错误代码。
505 HTTP Version Not Supported：服务器不支持请求中所使用的HTTP协议版本。

参见：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status
```

#### HTTP长连接,短连接

在HTTP/1.0中默认使用短连接。也就是说，客户端和服务器每进行一次HTTP操作，就建立一次连接，任务结束就中断连接。当客户端浏览器访问的某个HTML或其他类型的Web页中包含有其他的Web资源（如JavaScript文件、图像文件、CSS文件等），每遇到这样一个Web资源，浏览器就会重新建立一个HTTP会话。

而从HTTP/1.1起，默认使用长连接，用以保持连接特性。使用长连接的HTTP协议，会在响应头加入这行代码：

```
Connection:keep-aliveCopy to clipboardErrorCopied
```

在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，客户端再次访问这个服务器时，会继续使用这一条已经建立的连接。Keep-Alive不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。



#### HTTP是不保存状态的协议,如何保存用户状态?

```
session/cookie
```

#### HTTP 1.0和HTTP 1.1的主要区别是什么?

HTTP1.0最早在网页中使用是在1996年，那个时候只是使用一些较为简单的网页上和网络请求上，而HTTP1.1则在1999年才开始广泛应用于现在的各大浏览器网络请求中，同时HTTP1.1也是当前使用最为广泛的HTTP协议。 主要区别主要体现在：

1. **长连接** : **在HTTP/1.0中，默认使用的是短连接**，也就是说每次请求都要重新建立一次连接。HTTP 是基于TCP/IP协议的,每一次建立或者断开连接都需要三次握手四次挥手的开销，如果每次请求都要这样的话，开销会比较大。因此最好能维持一个长连接，可以用个长连接来发多个请求。**HTTP 1.1起，默认使用长连接** ,默认开启Connection： keep-alive。 **HTTP/1.1的持续连接有非流水线方式和流水线方式** 。流水线方式是客户在收到HTTP的响应报文之前就能接着发送新的请求报文。与之相对应的非流水线方式是客户在收到前一个响应后才能发送下一个请求。
2. **错误状态响应码** :在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除。
3. **缓存处理** :在HTTP1.0中主要使用header里的If-Modified-Since,Expires来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略例如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等更多可供选择的缓存头来控制缓存策略。
4. **带宽优化及网络连接的使用** :HTTP1.0中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，HTTP1.1则在请求头引入了range头域，它允许只请求资源的某个部分，即返回码是206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。



##### URI和URL的区别是什么

- URI(Uniform Resource Identifier) 是统一资源标志符，可以唯一标识一个资源。
- URL(Uniform Resource Location) 是统一资源定位符，可以提供该资源的路径。它是一种具体的 URI，即 URL 可以用来标识一个资源，而且还指明了如何 locate 这个资源。

URI的作用像身份证号一样，URL的作用更像家庭住址一样。URL是一种具体的URI，它不仅唯一标识资源，而且还提供了定位该资源的信息。

#### HTTP 和 HTTPS 的区别

1. **端口** ：HTTP的URL由“http://”起始且默认使用端口80，而HTTPS的URL由“https://”起始且默认使用端口443。

2. 安全性和资源消耗： 

   HTTP协议运行在TCP之上，所有传输的内容都是明文，客户端和服务器端都无法验证对方的身份。HTTPS是运行在SSL/TLS之上的HTTP协议，SSL/TLS 运行在TCP之上。所有传输的内容都经过加密，加密采用对称加密，但对称加密的密钥用服务器方的证书进行了非对称加密。所以说，HTTP 安全性没有 HTTPS高，但是 HTTPS 比HTTP耗费更多服务器资源。

   - 对称加密：密钥只有一个，加密解密为同一个密码，且加解密速度快，典型的对称加密算法有DES、AES等；
   - 非对称加密：密钥成对出现（且根据公钥无法推知私钥，根据私钥也无法推知公钥），加密解密使用不同密钥（公钥加密需要私钥解密，私钥加密需要公钥解密），相对对称加密速度较慢，典型的非对称加密算法有RSA、DSA等。

#### HTTP Header里都有什么？

可以有零个或多个首部，每个首部都包含一个名字，后面跟着一个冒号（:），然后是一个可选的空格，接着是一个值，最后是一个 CRLF。首部是由一个空行（CRLF）结束的，表示了首部列表的结束和实体主体部分的开始。有些 HTTP 版本，比如 HTTP/1.1，要求有效的请求或响应报文中必须包含特定的首部。

| Requests Header | 解释                                                   | 示例                                            |
| --------------- | ------------------------------------------------------ | ----------------------------------------------- |
| Accept          | 指定客户端能够接收的内容类型                           | Accept: text/plain, text/html                   |
| Accept-Charset  | 浏览器可以接受的字符编码集。                           | Accept-Charset: iso-8859-5                      |
| Accept-Encoding | 指定浏览器可以支持的web服务器返回内容压缩编码类型。    | Accept-Encoding: compress, gzip                 |
| Accept-Language | 浏览器可接受的语言                                     | Accept-Language: en,zh                          |
| Cache-Control   | 指定请求和响应遵循的缓存机制                           | Cache-Control: no-cache                         |
| Connection      | 表示是否需要持久连接。                                 | （HTTP 1.1默认进行持久连接） Connection: close  |
| Cookie          | 请求时，把保存在该请求域名下的所有cookie发送给服务器。 | Cookie: $Version=1;                             |
| Content-Length  | 请求的内容长度                                         | Content-Length: 348                             |
| Content-Type    | 请求的与实体对应的MIME信息                             | Content-Type: application/x-www-form-urlencoded |
| Host            | 指定请求的服务器的域名和端口号                         | Host: www.baidu.com                             |
| Referer         | 先前网页的地址                                         | Referer: www.baidu.com                          |
| User-Agent      | User-Agent的内容包含发出请求的用户信息                 | User-Agent: Mozilla/5.0 (Linux; X11)            |

| Responses Header | 解释                                     | 示例                                   |
| ---------------- | ---------------------------------------- | -------------------------------------- |
| Cache-Control    | 告诉所有的缓存机制是否可以缓存及哪种类型 | Cache-Control: no-cache                |
| Content-Encoding | web服务器支持的返回内容压缩编码类型。    | Content-Encoding: gzip                 |
| Content-Language | 响应体的语言                             | Content-Language: en,zh                |
| Content-Length   | 响应体的长度                             | Content-Length: 348                    |
| Content-Type     | 返回内容的MIME类型                       | Content-Type: text/html; charset=utf-8 |
| Set-Cookie       | 设置Http Cookie                          | 设置Http Cookie                        |
| Location         | 用来重定向                               | Location: http://google.com            |



#### HTTP报文组成

报文由三部分组成：对报文进行描述的起始行（start line）、包含属性的首部（header）块，以及可选的、包含数据的主体（body）部分

start line 和 header都是由行分隔的ASCII文本，标准http中以CRLF（换行符和回车符 \n\r）标记结尾。 body则可以是文本和二进制数据，也可以为空。header中标记body的一些信息，例如Content-Type说明body类型，都是MIME类型，Content-Length标记body长度等。



#### HTTP哪些method

| 名字                                                         | 解释                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/GET) | GET方法请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据. |
| [HEAD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/HEAD) | HEAD方法请求一个与GET请求的响应相同的响应，但没有响应体.     |
| [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) | POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用. |
| [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) | PUT方法用请求有效载荷替换目标资源的所有当前表示。（和post相比，put要求完全替换和幂等） |
| [DELETE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) | DELETE方法删除指定的资源。                                   |
| [CONNECT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/CONNECT) | CONNECT方法建立一个到由目标资源标识的服务器的隧道。          |
| [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) | OPTIONS方法用于描述目标资源的通信选项。                      |
| [TRACE](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/TRACE) | TRACE方法沿着到目标资源的路径执行一个消息环回测试。          |
| [PATCH](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PATCH) | PATCH方法用于对资源应用部分修改。                            |



```
GET
GET方法请求一个指定资源的表示形式. 使用GET的请求应该只被用于获取数据.
HEAD
HEAD方法请求一个与GET请求的响应相同的响应，但没有响应体.
POST
POST方法用于将实体提交到指定的资源，通常导致在服务器上的状态变化或副作用. 
PUT
PUT方法用请求有效载荷替换目标资源的所有当前表示。
DELETE
DELETE方法删除指定的资源。
CONNECT
CONNECT方法建立一个到由目标资源标识的服务器的隧道。
OPTIONS
OPTIONS方法用于描述目标资源的通信选项。
TRACE
TRACE方法沿着到目标资源的路径执行一个消息环回测试。
PATCH
PATCH方法用于对资源应用部分修改。
```

#### HTTP2.0新特性

```
二进制分帧
首部压缩
流量控制
多路复用
请求优先级
服务器推送
二进制分帧
```



#### 跨域资源共享 CORS 详解

CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）。

它允许浏览器向跨源服务器，发出XMLHttpRequest请求，从而克服了AJAX只能同源使用的限制。



#### XSS和CSRF

XSS全称Cross Site Scripting（为啥不叫CSS？为了和层叠样式表Cascading Style Sheets区分），即跨站脚本攻击。

恶意用户将恶意脚本装作普通文本的样式上传到服务器，这些文本将被渲染到目标用户的页面上，从而被执行，这样的流程称之为‘跨站脚本攻击’。

作为网站建设方，我们通常可以采取以下手段来防止XSS攻击：

```
1. 转义 &lt; &gt; 这些特殊字符为实体字符
2. 利用正则判断攻击脚本
3. 尽量修改节点文本而不是修改节点内容html
```

CSRF全称Cross-site request forgery（跨站请求伪造）是指恶意用户将某些需要他人权限的接口埋藏在自己的脚本中，将脚本利用XSS相同的注入方式或诱导用户点击执行等方式令拥有权限者执行，从而达到自己的目的。

例如，恶意用户想要给某个人刷票，而一个微信号只能投一张票，他发现了刷票的接口为A，则将对A进行Ajax请求的XSS脚本注入某网站（方法1）,或者利用像色情等吸引眼球的方法（方法2）将此段脚本内嵌入自己写的网页中诱使他人点击，从而实现不断有有效用户访问这个接口的目的。

```
尽量使用POST，限制GET
将cookie设置为HttpOnly，如果您在cookie中设置了HttpOnly属性，那么通过js脚本将无法读取到cookie信息
增加token
通过Referer识别
```





1. TCP流量控制？滑动窗口那一套……结果忘记讲每次都会告诉对方自己的窗口了……血崩

   18、TCP连接、断开时一些标志位的改变，说一下。

   6.5.我1.X也有connect：keep-alive 怎么就不能实现服务端推送了？

   - 说一下可靠连接
   - TCP有哪些措施保证可靠性

   - TCP UDP区别，简述一下三次握手过程

     

   




### 参考资料

* [java面试突击版本](https://snailclimb.gitee.io/javaguide-interview/#/)