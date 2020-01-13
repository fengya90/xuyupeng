import React from 'react';
export const Nav00DataSource = {
  wrapper: { className: 'header0 home-page-wrapper' },
  page: { className: 'home-page' },
  logo: {
    className: 'header0-logo',  
    children: './static/logobar.png',
  },
  Menu: {
    className: 'header0-menu',
    children: [
      {
        name: 'item1',
        className: 'header0-item',
        children: {
          href: 'https://xuyupeng.net',
          children: [{ children: '首页', name: 'text' }],
        },
      },
      {
        name: 'item2',
        className: 'header0-item',
        children: {
          href: 'https://xuyupeng.net/book/ntce/#/',
          children: [{ children: '阅读', name: 'text' }],
        },
      },           
    ],
  },
  mobileMenu: { className: 'header0-mobile-menu' },
};

export const Banner00DataSource = {
  wrapper: { className: 'banner0' },
  textWrapper: { className: 'banner0-text-wrapper' },
  title: {
    className: 'banner0-title',
    children: '我是Xu Yupeng',
  },
  content: {
    className: 'banner0-content',
    children: '一点文档，尚未完善',
  },
  button: { className: 'banner0-button', children: '更多' , href:'https://xuyupeng.net/book/ntce/#/'},
};

export const Content10DataSource = {
  wrapper: { className: 'home-page-wrapper content1-wrapper' },
  OverPack: { className: 'home-page content1', playScale: 0.3 },
  imgWrapper: { className: 'content1-img', md: 10, xs: 24 },
  img: {
    children: './static/wx.jpg',
  },
  textWrapper: { className: 'content1-text', md: 14, xs: 24 },
  title: { className: 'content1-title', children: '个人微信号' },
  content: {
    className: 'content1-content',
    children:
      '欢迎交流，虽然回复可能并不及时',
  },
};

 
export const Footer00DataSource = {
  wrapper: { className: 'home-page-wrapper footer0-wrapper' },
  OverPack: { className: 'home-page footer0', playScale: 0.05 },
  copyright: {
    className: 'copyright',
    children: (
      <>
        <span>
        ©{new Date().getFullYear()} <a href="https://xuyupeng.net">Xu Yupeng</a> All Rights          
          Reserved
        </span>
      </>
    ),
  },
};
