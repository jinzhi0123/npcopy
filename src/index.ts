import inquirer from 'inquirer'
import { Command } from 'commander'
import { handler } from './handler.js'

console.log("111")
async function interactive() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'source',
        message: '源路径',
        default: '.',
      },
      {
        type: 'input',
        name: 'output',
        message: '目标路径',
      },
      {
        type: 'checkbox',
        name: 'ignores',
        message: '忽略目录/文件',
        choices: [
          {
            name: 'node_modules',
            checked: true,
          },
          {
            name: '.git',
          },
        ],
      },
    ])
    console.log(answers)
    return {
      source: answers.source,
      output: answers.output,
      ignores: answers.ignores,
    }
  }
  catch (error) {
    console.log(`错误: ${error}`)
  }
}

const program = new Command()

program
  .name('npcopy')
  .description('Copy files and directories without node_modules and other specified files')
  .version('1.0.0')
  .action(async () => {
    const options = await interactive()
    handler(options.source, options.output, options.ignores)
  })

program.command('copy')
  .description('Copy files and directories without node_modules')
  .alias('c')
  .helpOption('-h, --help', '查看帮助')
  .addHelpText('after', `
Examples:
  $ npcopy copy ./ ../output
  $ npcopy copy ./ ./output -i node_modules
  $ npcopy copy ./ ./output -i node_modules .log
  `)
  .argument('<source>', '源路径')
  .argument('<output>', '目标路径')
  .option('-i, --ignores <ignores...>', '忽略的目录/文件')
  .action((source, output, options) => {
    console.log(source, output, options)
    handler(source, output, options.ignores)
  })

program.parse()
