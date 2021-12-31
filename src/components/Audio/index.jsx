import React from 'react'
import ReactAplayer from 'react-aplayer'
// import md5 from 'md5'
// import { songList, songURL, login } from '@/api/music'
import appData from './data'

export default class App extends React.Component {
  // example of access aplayer instance
  onInit = async ap => {
    this.ap = ap
    // const musicList = await new Promise((resolve, reject) => {
    //   login({
    //     email: '13666235158@163.com',
    //     md5_password: md5('wym950611'),
    //   }).then(res => {
    //     songList({ id: 6984839626 }).then(res => {
    //       const songList = res.playlist.tracks
    //       const ids = songList.map(item => item.id)
    //       songURL({ id: ids.join(',') }).then(res => {
    //         const mst = res.data.map(item => {
    //           const mdata = {}
    //           const fs = songList.filter(d => d.id === item.id)[0]
    //           mdata.name = fs.name
    //           mdata.artist = fs.ar[0].name
    //           mdata.url = item.url
    //           mdata.cover = fs.al.picUrl
    //           mdata.theme = MathColor16()
    //           return mdata
    //         })
    //         if (mst.length > 0) {
    //           resolve(mst)
    //         }
    //       })
    //     })
    //   })
    // })
    // ap.list.add(musicList)
  }

  render() {
    return (
      <div>
        <ReactAplayer {...appData} onInit={this.onInit} />
      </div>
    )
  }
}
