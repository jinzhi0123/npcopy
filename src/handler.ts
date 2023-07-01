import fs from 'fs-extra'

export function handler(source: string, output: string, ignores: string[]) {
  // 从源路径复制到目标路径，忽略指定的目录/文件
  let count = 0
  console.time('复制耗时')
  fs.copy(source, output, {
    filter: (src, dest) => {
      console.log(src)
      if (!ignores.includes('node_modules') && src.includes('node_modules')) {
        count++
        return true
      }
      for (const ignore of ignores) {
        if (src.includes(ignore))
          return false
      }
      count++
      return true
    },
  }).then(() => {
    console.timeEnd('复制耗时')
    console.log(`共复制 ${count} 个文件`)
  })
}
