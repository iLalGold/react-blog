/* 随机生成RGBA颜色 */
export const MathRGBA = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const rgba = `rgb(${r},${g},${b},0.5)`
  return rgba
}
/* 随机生成16进制颜色 */
export const MathColor16 = () => {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  // var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
  const color = '#' + (Array(6).join(0) + (r.toString(16) + g.toString(16) + b.toString(16))).slice(-6)
  return color
}
