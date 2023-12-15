import { defineConfig } from 'vitepress'

export default defineConfig({
  // 标题（浏览器后缀）
  title: "Samuel",
  // 描述
  description: "Samuel'Blog",
  // 语言
  lang: 'zh-CN',
  // 根目录，如果需要部署成htpps://github.com/blog/的形式，则设置/blog/
  base: '/',
  // 文档最后更新时间展示
  lastUpdated: true,
  // 去除浏览器链接中的.html后缀
  cleanUrls: true,
  // markdown显示行数
  markdown: {
    lineNumbers: true,
    math: true,
  },
  // head设置
  head: [
    // 浏览器中图标
    ["link", { rel: "icon", href: "/logo.ico" }],
  ],
  // 主题设置
  themeConfig: {

    // 左上角logo
    logo: '/logo.png',
    // 首页右上角导航栏
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Posts', link: '/about' },
      { text: 'Links', link: '/links' }
    ],
    // 文章左侧导航栏
    sidebar: [
      {
        text: 'C/C++',
        collapsed: true,
        items: [
          { text: 'C/C++中的void*', link: '/posts/cc/void' },
        ],
      },
      {
        // text: 'others',
        // collapsed: true,
        items: [
          // { text: '', link: '' },
          { text: 'Docker部署OpenWrt做旁路由', link: '/posts/docker-openwrt' },
          { text: 'WSL下RoboCup3D环境搭建', link: '/posts/robocup3d-wsl' },
          { text: 'Git基础', link: '/posts/git' },

        ]
      },
    ],
    // 文章底部导航栏的自定义配置，默认是英语
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    // 文章右侧目录展示级别和标题
    outline: {
      level: [2, 6],
      label: '文章目录'
    },
    // 文章更新时间的前缀文本
    // lastUpdatedText: 'Last updated',
    // 开启本地搜索（左上角）
    search: {
      provider: 'local',
    },
    // 右上角Github链接
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/yunjn' }
    // ],
    // 页脚
    footer: {
      copyright: 'Copyright © 2020-present <a href="https://github.com/yunjn">Samuel</a>'
    }
  }
})