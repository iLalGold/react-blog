import React from 'react'
import { Icon } from 'antd'
import SvgIcon from '@/components/SvgIcon'

import Href from '@/components/Href'
import MyInfo from '@/views/web/about/MyInfo'
import Iconfont from '@/components/Iconfont'

// API_BASE_URL
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

// project config
export const HEADER_BLOG_NAME = 'gold的博客' // header title 显示的名字

// === sidebar
export const SIDEBAR = {
  avatar: require('@/assets/images/111.jfif'), // 侧边栏头像
  title: 'gold', // 标题
  subTitle: `学无止境`, // 子标题
  // 个人主页
  homepages: {
    github: {
      link: 'https://github.com/HallGold',
      icon: <Icon type='github' className='homepage-icon' />,
    },
    Telegram: {
      link: 'https://t.me/MikeyHall',
      icon: <Iconfont type='icon-telegram3' className='homepage-icon'></Iconfont>,
    },
    instagram: {
      link: 'https://www.instagram.com/wangyimiao0611',
      icon: <Iconfont type='icon-instagram1' className='homepage-icon'></Iconfont>,
    },
    YouTube: {
      link: 'https://www.youtube.com/channel/UCqLQ5gLwNkziGehiNidUQDw',
      icon: <Iconfont type='icon-youtube' className='homepage-icon'></Iconfont>,
    },
  },
}

// === discuss avatar
export const DISCUSS_AVATAR = SIDEBAR.avatar // 评论框博主头像

/**
 * github config
 */
export const GITHUB = {
  enable: true, // github 第三方授权开关
  client_id: '4bd8e3804af6ed3e490d', // Setting > Developer setting > OAuth applications => client_id
  url: 'https://github.com/login/oauth/authorize', // 跳转的登录的地址
}

export const ABOUT = {
  avatar: SIDEBAR.avatar,
  describe: SIDEBAR.subTitle,
  discuss: true, // 关于页面是否开启讨论
  renderMyInfo: <MyInfo />, // 我的介绍 自定义组件 => src/views/web/about/MyInfo.jsx
}

// 公告 announcement
export const ANNOUNCEMENT = {
  enable: false, // 是否开启
  content: (
    <>
      个人Web网站，请访问
      <Href href='http://www.goldglitter.top/web'> alvin's note</Href>
    </>
  ),
}
