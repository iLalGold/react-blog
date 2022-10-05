/** @format */

import React, { useEffect, useState } from 'react'
import { SIDEBAR } from '@/config'
import axios from '@/utils/axios'
import { useSelector } from 'react-redux'
import '@/styles/family.css'

// components
import { Link } from 'react-router-dom'
import Href from '@/components/Href'
import { Icon, Divider, Tag } from 'antd'

import { Alert } from 'antd'
import { ANNOUNCEMENT } from '@/config'

import useFetchList from '@/hooks/useFetchList'

function SideBar(props) {
  const tagList = useSelector(state => state.article.tagList || [])

  const { dataList: articleList } = useFetchList({
    withLoading: false,
    requestUrl: '/article/list',
    queryParams: {
      order: 'viewCount DESC',
      page: 1,
      pageSize: 6,
    },
  })

  return (
    <aside className='app-sidebar'>
      <img src={SIDEBAR.avatar} className='sider-avatar' alt='' />
      {/* <h2 className='title RampartOne'>{SIDEBAR.title}</h2> */}
      <svg width='100%' height='100'>
        <text text-anchor='middle' x='45%' y='70%' className='title RampartOne'>
          {SIDEBAR.title2}
        </text>
        <text text-anchor='middle' x='45%' y='70%' className='title title-1'>
          {SIDEBAR.title2}
        </text>
        <text text-anchor='middle' x='45%' y='70%' className='title title-2'>
          {SIDEBAR.title2}
        </text>
        <text text-anchor='middle' x='45%' y='70%' className='title title-3'>
          {SIDEBAR.title2}
        </text>
        <text text-anchor='middle' x='45%' y='70%' className='title title-4'>
          {SIDEBAR.title2}
        </text>
      </svg>
      <svg width='100%' height='80'>
        <text text-anchor='middle' x='55%' y='50%' className='title RampartOne'>
          {SIDEBAR.title}
        </text>
        <text text-anchor='middle' x='55%' y='50%' className='title title-1'>
          {SIDEBAR.title}
        </text>
        <text text-anchor='middle' x='55%' y='50%' className='title title-2'>
          {SIDEBAR.title}
        </text>
        <text text-anchor='middle' x='55%' y='50%' className='title title-3'>
          {SIDEBAR.title}
        </text>
        <text text-anchor='middle' x='55%' y='50%' className='title title-4'>
          {SIDEBAR.title}
        </text>
      </svg>
      {/* <h5 className='sub-title RampartOne'>{SIDEBAR.subTitle}</h5> */}
      <ul className='home-pages'>
        {Object.entries(SIDEBAR.homepages).map(([linkName, item]) => (
          <li key={linkName}>
            <Href href={item.link}> {item.icon}</Href>
            <Href href={item.link}>{linkName}</Href>
          </li>
        ))}
      </ul>

      {ANNOUNCEMENT.enable && <Alert message={ANNOUNCEMENT.content} type='info' />}

      <Divider orientation='left'>Popular</Divider>
      <ul className='article-list'>
        {articleList.map(d => (
          <li key={d.id}>
            <Link to={`/article/${d.id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>

      <Divider orientation='left'>Tag</Divider>
      <div className='tag-list'>
        {tagList.map((tag, i) => (
          <Tag key={i} color={tag.color}>
            <Link to={`/tags/${tag.name}`}>{tag.name}</Link>
          </Tag>
        ))}
      </div>
    </aside>
  )
}

export default SideBar
