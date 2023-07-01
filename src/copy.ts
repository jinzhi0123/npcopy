import path from 'node:path'
import fs from 'fs-extra'
import { filter } from './filter.js'

export async function copy(source: string, output: string, ignores: string[]) {
  // 从源路径复制到目标路径，忽略指定的目录/文件
  const record: NPRecord = {
    count: 0,
    time: 0,
  }
  console.time('finish in')
  source = path.resolve(source)
  output = path.resolve(output)
  handleCopy(source, output, ignores, record)
  console.timeEnd('finish in')
  console.log(`${record.count} files in total`)
}

function handleCopy(
  sourceDir: string,
  outputDir: string,
  ignores: string[],
  record: NPRecord,

) {
  const files = fs.readdirSync(sourceDir)

  for (const file of files) {
    if (!file)
      continue
    if (!filter(sourceDir, file, ignores))
      continue
    const sourceFile = path.join(sourceDir, file)
    const outputFile = path.join(outputDir, file)
    const stat = fs.statSync(sourceFile)
    if (stat.isDirectory()) {
      if (ignores.includes(file))
        continue

      // 如果是目录，递归复制
      console.log(sourceFile)
      fs.ensureDirSync(outputFile)
      record.count++
      handleCopy(sourceFile, outputFile, ignores, record)
    }
    else {
      console.log(sourceFile)
      fs.copy(sourceFile, outputFile)
      record.count++
      console.log(sourceFile)
    }
  }
}
