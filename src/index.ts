import inquirer from 'inquirer'
import { Command } from 'commander'
import { copy } from './copy.js'
import { list } from './list.js'

async function interactive() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'source',
        message: 'source path',
        default: '.',
      },
      {
        type: 'input',
        name: 'output',
        message: 'output path',
      },
      {
        type: 'checkbox',
        name: 'ignores',
        message: 'ignore files',
        choices: [
          {
            name: 'node_modules',
            checked: true,
          },
          {
            name: 'dist',
          },
          {
            name: '.git',
          },
        ],
      },
    ])
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
  .addHelpText('after', `
Examples:
  $ npcopy
  $ npcopy ./source ./output                       - copy the former to the latter without node_modules
  $ npcopy ./source ./output -i node_modules dist  - copy the former to the latter without node_modules and dist
  $ npcopy /opt/source -i node_modules -l          - only list files without node_modules
  `)
  .argument('[source]', 'source path')
  .argument('[output]', 'output path')
  .option('-i, --ignores <ignores...>', 'ignore files')
  .option('-l, --list', 'only list files')
  .option('-a, --interactive', 'interactive mode (default)')
  .action(async (source, output, options) => {
    console.log(source, output, options)
    if (options.interactive || source === undefined) {
      const answers = await interactive()
      copy(answers.source, answers.output, answers.ignores)
    }
    else if (!options.list && output === undefined)
      throw new Error('output path is required')
    else if (options.list)
      list(source, options.ignores ? options.ignores : ['node_modules'])
    else
      copy(source, output, options.ignores ? options.ignores : ['node_modules'])
  },
  )
program.parse()
