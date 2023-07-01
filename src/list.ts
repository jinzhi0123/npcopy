import path from "node:path"
import fs from 'fs-extra'
import { filter } from "./filter.js"

export async function list(source: string, ignores: string[]) {
  // 列出源路径下的所有文件，忽略指定的目录/文件
  const record: NPRecord = {
    count: 0,
    time: 0,
  }
  console.time('finish in')
  source = path.resolve(source)
  await handleList(source, ignores, record)
  console.timeEnd('finish in')
  console.log(`${record.count} files in total`)
}

async function handleList(
  sourceDir: string,
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
    const stat = await fs.stat(sourceFile)
    if (stat.isDirectory()) {
      if (ignores.includes(file))
        continue

      // 如果是目录，递归
      console.log(sourceFile)
      record.count++
      await handleList(sourceFile, ignores, record)
    }
    else {
      console.log(sourceFile)
      record.count++
    }
  }
}
