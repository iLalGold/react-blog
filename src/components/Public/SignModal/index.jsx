import React, { useState, useEffect } from 'react'
import { Form, Icon, Input, Button, Modal } from 'antd'
import { useLocation } from 'react-router-dom'

import { GITHUB } from '@/config'
import { save } from '@/utils/storage'

// redux
import { login, register } from '@/redux/user/actions'
import { useDispatch } from 'react-redux'

// hooks
import { useListener } from '@/hooks/useBus'

const FormItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }
  }
}

function FormItem(props) {
  const { children, ...rest } = props
  return <Form.Item {...FormItemLayout} {...rest}>{children}</Form.Item>
}

function SignModal(props) {
  const dispatch = useDispatch() // dispatch hooks
  const location = useLocation() // location
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState('login')
  const { getFieldDecorator } = props.form

  useListener('openSignModal', type => {
    props.form.resetFields()
    setType(type)
    setVisible(true)
  })

  function handleSubmit(e) {
    e.preventDefault()
    props.form.validateFieldsAndScroll((errors, values) => {
      if (errors) return
      const action = type === 'login' ? login : register
      dispatch(action(values)).then(() => {
        setVisible(false) // type =  login | register
      })
    })
  }

  function githubLogin() {
    const { pathname, search } = location
    save('prevRouter', `${pathname}${search}`)
    window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}`
  }

  // 确认密码
  function compareToFirstPassword(rule, value, callback) {
    const form = props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  return (
    <Modal
      width={600}
      title={type}
      visible={visible}
      onCancel={e => setVisible(false)}
      footer={null}>
      <Form layout='horizontal'>
        {type === 'login' ? (
          <>
            <FormItem label='UserName'>
              {getFieldDecorator('account', {
                rules: [{ required: true, message: 'Username is required' }]
              })(<Input placeholder='Please enter user name' />)}
            </FormItem>
            <FormItem label='PassWord'>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Password is required' }]
              })(<Input placeholder='Please enter user PassWord' type='password' />)}
            </FormItem>
          </>
        )
          : (
            <>
              <FormItem label='UserName'>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: 'Username is required' }]
                })(<Input placeholder='Please enter user name' />)}
              </FormItem>
              <FormItem label='PassWord'>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Password is required' }]
                })(<Input placeholder='Please enter user PassWord' type='password' />)}
              </FormItem>
              <FormItem label='ConfirmPassword'>
                {getFieldDecorator('confirm', {
                  rules: [
                    { required: true, message: 'Password is required' },
                    { validator: compareToFirstPassword }
                  ]
                })(<Input placeholder='Confirm Password' type='password' />)}
              </FormItem>
              <FormItem label='E-mail'>
                {getFieldDecorator('email', {
                  rules: [
                    { type: 'email', message: 'The input is not valid E-mail!' },
                    { required: true, message: 'Please input your E-mail!' }
                  ]
                })(<Input placeholder='Please enter user E-mail' />)}
              </FormItem>
            </>
          )}
      </Form>
      <Button type='primary' block onClick={handleSubmit}>
        {type}
      </Button>
      {GITHUB.enable && (
        <Button block icon='github' onClick={githubLogin} style={{ marginTop: 10 }}>
          github login
        </Button>
      )}
    </Modal>
  )
}

export default Form.create()(SignModal)
