# Dark Web

## What is Dark Web

refer to: [wikipedia:Dark Web](https://en.wikipedia.org/wiki/Dark_web)

> The dark web is the World Wide Web content that exists on darknets: overlay networks that use the Internet but require specific software, configurations, or authorization to access. Through the dark web, private computer networks can communicate and conduct business anonymously without divulging identifying information, such as a user's location. 



## What is Tor

refer to: [wikipedia:Tor](https://en.wikipedia.org/wiki/Tor_(network))

> Tor, short for The Onion Router, is free and open-source software for enabling anonymous communication. It directs Internet traffic through a free, worldwide, volunteer overlay network, consisting of more than six thousand relays, for concealing a user's location and usage from anyone conducting network surveillance or traffic analysis. . 



Although Tor and the dark web are two different concepts, for the most part, we think of the dark web as the World Wide Web content built on top of Tor.



For more information, refer to [torproject home page](https://www.torproject.org/)



## How to visit a dark web site(based on Tor)

The URL of a dark website is usually like something like 'xxxx.onion'. In Tor, we call such a website an onion service

we need to use a special browser: [Tor Browser](https://www.torproject.org/download/)

We can visit normal websites using Tor Browser, but 'xxxx.onion' must be accessed through Tor Browser.



## How to build a dark web site

refer to [tor-onion-service](https://2019.www.torproject.org/docs/tor-onion-service.html.en)

Here is a simple demo.

1. Install Tor in the server
Follow this [docments](https://support.torproject.org/rpm/) since my  OS is CentOS 8.

2. Start a simple HTTP  server using python
```shell
[root@vultrguest ~]# python3 -m http.server
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...
```

3. Configure  Tor
```shell
vim /etc/tor/torrc
# find HiddenServiceDir and HiddenServicePort, uncomment and update it
HiddenServiceDir /var/lib/tor/other_hidden_service/
HiddenServicePort 80 127.0.0.1:8000
```

4. Start Tor and get the hostname
```shell
systemctl start tor
cat /var/lib/tor/other_hidden_service/hostname
```

5. Visit the website through Tor Browser

![img](https://cdn.xuyupeng.net/pic/network/dark-web-handsome.jpeg)



