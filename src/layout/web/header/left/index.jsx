import React, { useState } from 'react'
import { Icon, Dropdown, Menu, Input, message } from 'antd'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router-dom'
import '@/styles/family.css'

// import config
import { HEADER_BLOG_NAME } from '@/config'
import navList from '../right/navList'

// icon
import SvgIcon from '@/components/SvgIcon'

const HeaderLeft = props => {
  const [keyword, setKeyword] = useState('')
  const history = useHistory()

  function handleChange(e) {
    e.preventDefault()
    setKeyword(e.target.value)
  }

  function onPressEnter(e) {
    e.target.blur()
  }

  function onSubmit() {
    history.push(`/?page=1&keyword=${keyword}`)
    setKeyword('')
  }

  function clickSearch(e) {
    e.stopPropagation()
  }
  const menu = (
    <Menu className='header-nav'>
      {navList.map(nav => (
        <Menu.Item key={nav.link}>
          <Link to={nav.link}>
            {nav.icon && <Icon type={nav.icon} style={{ marginRight: 15 }} />}
            <span className='nav-text'>{nav.title}</span>
          </Link>
        </Menu.Item>
      ))}
      <Menu.Item key={'search'}>
        <Icon type='search' />
        <Input
          className='search-input'
          onClick={clickSearch}
          value={keyword}
          onChange={handleChange}
          onPressEnter={onPressEnter}
          onBlur={onSubmit}
        />
      </Menu.Item>
    </Menu>
  )

  return (
    <div className='header-left'>
      <Link to='/'>
        <img
          src={require('@/assets/images/111.jfif')}
          alt='logo'
          style={{ width: 50, height: 50, transform: 'translateY(-3px)' }}
        />
        <span className='blog-name RampartOne'>{HEADER_BLOG_NAME}</span>
      </Link>
      <Dropdown
        overlayClassName='header-dropdown'
        trigger={['click']}
        overlay={menu}
        getPopupContainer={() => document.querySelector('.app-header .header-left')}>
        <Icon type='menu-o' className='header-dropdown-icon' />
      </Dropdown>
    </div>
  )
}

export default HeaderLeft
