<h2 align="center">
 <p>npcopy</p>
</h2><br>

<p>
  Copy files and directories without node_modules and other specified files. Copy your project to another directory at high speed！
</p>

<p align="center">
<img src="https://index.qingwu.top/d/assets/20230701223651.png" width="600" />
</p>

# installation
Simply use the following command:
```
$ npx npcopy
```
Or if for some reason you want to install it:
```
$ npm i -g npcopy
```
# usage

By default, npcopy will enter the interactive mode, where you can input the source and destination paths and select the ignore files you want to ignore.



Or you can use the command line mode, where you can specify the source and destination paths and ignore files.

## arguments

| arguments | description |
| --------- | ----------- |
| `source`  | source path |
| `output`  | dest path   |

## options

| options                      | description                     |
| ---------------------------- | ------------------------------- |
| `-V, --version`              | output the version number       |
| `-i, --ignores <ignores...>` | ignore files you want           |
| `-l, --list`                 | only output file list           |
| `-a, --interactive`          | interactive mode (default) path |
| `-h, --help`                 | display help for command        |

## examples

```
$ npcopy                                         - interactive mode
$ npcopy ./source ./output                       - copy the former to the latter without node_modules
$ npcopy ./source ./output -i node_modules dist  - copy the former to the latter without node_modules and dist
$ npcopy /opt/source -i node_modules -l          - only list files without node_modules
```


