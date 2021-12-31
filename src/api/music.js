import service from '@/utils/axios'

/* 获取网易云歌单 */
export function songList(id) {
  return service({
    url: '/playlist/detail',
    method: 'get',
    params: id,
    baseURL: process.env.REACT_APP_MUSIC_API,
    withCredentials: true,
  })
}

/* 获取歌曲URL */
export function songURL(ids) {
  return service({
    url: '/song/url',
    method: 'get',
    params: ids,
    baseURL: process.env.REACT_APP_MUSIC_API,
    withCredentials: true,
  })
}

/* 邮箱登录 */
export function login(params) {
  return service({
    url: '/login',
    methost: 'get',
    params,
    baseURL: process.env.REACT_APP_MUSIC_API,
    withCredentials: true,
  })
}

/* 每日推荐 */
export function getNew(params) {
  return service({
    url: '/recommend/resource',
    method: 'get',
    params: params,
    baseURL: process.env.REACT_APP_MUSIC_API,
    withCredentials: true,
  })
}
