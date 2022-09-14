const devMode = process.env.NODE_ENV === 'development'

const config = {
  PORT: 6060, // 启动端口
  ADMIN_GITHUB_LOGIN_NAME: 'HallGold', // 博主的 github 登录的账户名 user
  GITHUB: {
    client_id: '4bd8e3804af6ed3e490d',
    client_secret: '491ec9ba1e557df46fad4f1b215a3cee6a43684b',
    access_token_url: 'https://github.com/login/oauth/access_token',
    fetch_user_url: 'https://api.github.com/user', // 用于 oauth2
    fetch_user: 'https://api.github.com/users/' // fetch user url https://api.github.com/users/gershonv
  },
  EMAIL_NOTICE: {
    // 邮件通知服务
    // detail: https://nodemailer.com/
    enable: true, // 开关
    transporterConfig: {
      host: 'wangyimiao666@gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'wangyimiao666@gmail.com', // generated ethereal user
        pass: '123456' // generated ethereal password 授权码 而非 密码
      }
    },
    subject: 'gold的博客 - 您的评论获得新的回复！', // 主题
    text: '您的评论获得新的回复！',
    WEB_HOST: 'http://127.0.0.1:3000' // email callback url
  },
  TOKEN: {
    secret: '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', // secret is very important!
    expiresIn: '720h' // token 有效期
  },
  DATABASE: {
    database: 'react_blog',
    user: 'root',
    password: 'wym950611.',
    options: {
      host: '43.134.194.226', // 连接的 host 地址
      dialect: 'mysql', // 连接到 mysql
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      define: {
        timestamps: false, // 默认不加时间戳
        freezeTableName: true // 表名默认不加 s
      },
      timezone: '+08:00'
    }
  }
}


// 部署的环境变量设置
if (!devMode) {
  console.log('env production....')

  // ==== 配置数据库
  config.DATABASE = {
    ...config.DATABASE,
    database: 'react_blog', // 数据库名
    user: 'root', // 账号
    password: 'wym950611.' // 密码
  }

  // 配置 github 授权
  config.GITHUB.client_id = '4bd8e3804af6ed3e490d'
  config.GITHUB.client_secret = '491ec9ba1e557df46fad4f1b215a3cee6a43684b'

  // ==== 配置 token 密钥
  config.TOKEN.secret = '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'

  // ==== 配置邮箱

  // config.EMAIL_NOTICE.enable = true
  config.EMAIL_NOTICE.transporterConfig.auth = {
    user: 'wangyimiao666@gmail.com', // generated ethereal user
    pass: '123456' // generated ethereal password 授权码 而非 密码
  }
  config.EMAIL_NOTICE.WEB_HOST = 'https://www.goldglitter.top'
}


module.exports = config
