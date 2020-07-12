# 常用命令

## 文本

### awk

#### 命令行格式

```shell
awk [-Fs] 'program' optional list of filenames
awk [-Fs] -f progfile optional list of filenames
```

参数 -Fs 把字段分隔符 FS 设置成 s, 如果没有提供文件名, awk 就从标准输入读取数据。

其中，program格式为：

```shell
pattern { action }
```



#### 内建变量

| 变量     | 解释                                                         |
| ---- | ---- |
| $0 | 当前记录（这个变量中存放着整个行的内容） |
| $1~$n    | 当前记录的第n个字段，字段间由FS分隔                          |
| FS       | 输入字段分隔符 默认是空格或Tab                               |
| NF       | 当前记录中的字段个数，就是有多少列                           |
| NR       | 已经读出的记录数，就是行号，从1开始，如果有多个文件话，这个值也是不断累加中。 |
| FNR      | 当前记录数，与NR不同的是，这个值会是各个文件自己的行号       |
| RS       | 输入的记录分隔符， 默认为换行符                              |
| OFS      | 输出字段分隔符， 默认也是空格                                |
| ORS      | 输出的记录分隔符，默认为换行符                               |
| FILENAME | 当前输入文件的名字                                           |
| ARGC | 命令行参数的个数 |
| ARGV | 命令行参数组成的数组 (ARGV[0..ARGC-1]) |




#### 例子

* 直接打印行：	` { print }`等价于` { print $0}`

* 打印第一个字段和第二个字段的乘积：`{ print $1*$2 }`
* 字符串拼接：`echo 'Bob 14' | awk '{print "My name is",$1,"and I am ",$2,"years old"}'`输出`My name is Bob and I am  14 years old`

- 输入行的总行数：`END { print NR }`

- 打印第 10 行：`NR == 10`

- 打印每一个输入行的最后一个字段：`{ print $NF }`

- 打印最后一行的最后一个字段：`{ field = $NF };END { print field }`

- 打印字段数多于 4 个的输入行：`NF > 4`

- 打印最后一个字段值大于 4 的输入行：`$NF > 4`

-  打印所有输入行的字段数的总和：`{ nf = nf + NF };END { print nf }`

- 打印包含 key 的行，最后打印出数量：` /key/ {print;n=n+1};END {print n}`

-  打印具有最大值的第一个字段, 以及包含它的行 (假设 $1 总是 正的)：`$1 > max { max = $1; maxline = $0 };END { print max, maxline }`

- 打印至少包含一个字段的行：`NF > 0`

- 打印长度超过 80 个字符的行：`length($0) > 80`

- 在每一行的前面加上它的字段数：`{ print NF, $0 }`

- 打印每一行的第 1 与第 2 个字段, 但顺序相反：`{ print $2, $1 }`

- 交换每一行的第 1 与第 2 个字段, 并打印该行：`{ temp = $1; $1 = $2; $2 = temp; print }`

- 将每一行的第一个字段用行号代替：`{ $1 = NR; print }`

- 打印删除了第 2 个字段后的行：`{ $2 = ""; print }`

- 将每一行的字段按逆序打印：`{ for (i = NF; i > 0; i = i - 1) printf("%s ", $i);printf("\n")}`

- 打印每一行的所有字段值之和：`{ sum = 0;for (i = 1; i <= NF; i = i + 1) sum = sum + $i;print sum}`

- 将所有行的所有字段值累加起来：`{ for (i = 1; i <= NF; i = i + 1) sum = sum + $i };END { print sum }`

- 将每一行的每一个字段用它的绝对值替换：`{ for (i = 1; i <= NF; i = i + 1) if ($i < 0) $i = -$i;print}`

  



### sed

#### 命令行格式

```shell
sed SCRIPT INPUTFILE...
```

参考链接：[sed, a stream editor](http://www.gnu.org/software/sed/manual/sed.html)



#### 例子

```shell
$ echo "My name is xxx\nI am from xxx" | sed "s/My\|I/Xu/"
Xu name is xxx
Xu am from xxx

```



### grep

略



### wc & sort & uniq

```shell
➜  /tmp awk '{for (i=1;i<=NF;i=i+1) print $i}' test.txt  | sort |uniq | wc -l  #统计test.txt里有多少个不同的单词
14
➜  /tmp awk '{for (i=1;i<=NF;i=i+1) print $i}' test.txt  | sort  |uniq -c |sort -k1,1nr | head -n 3  # 统计test.txt数量前3的单词
     13 f
      3 d1
      3 d3
```



该命令统计给定文件中的字节数、字数、行数。

```shell
➜  /tmp wc -c test.txt  #字节数
53 test.txt
➜  /tmp wc -m test.txt  #字符数
53 test.txt
➜  /tmp wc -w test.txt #单词数
15 test.txt
➜  /tmp wc -l test.txt #行数
5 test.txt
➜  /tmp 
```




## 网络

### wget



### curl



## 系统



## 其他

### xargs

从标准输入构建和执行命令行。由于很多命令不支持|管道来传递参数，所以日常工作中这个命令很有必要。格式如下：

```shell
xargs [-options] [command]
```

##### 举例

```
➜  /tmp echo hi |  xargs echo
hi
➜  /tmp echo dirname | xargs mkdir 


```



### rsync

```shell
rsync -avzP root@37.11.214.24:~/ss book # 远端服务器上的ss目录会同步到book目录下，book里会生成一个ss

参数解释：
-a, --archive          归档模式，表示以递归方式传输文件，并保持所有文件属性，等于 -rlptgoD。
-v, --verbose          详细模式输出。
-z, --compress         对备份的文件在传输时进行压缩处理。
-P                     等同于 -partial -progress。
--progress             显示传输过程。
--partial              保留那些因故没有完全传输的文件，以便实现断点续传。
```

