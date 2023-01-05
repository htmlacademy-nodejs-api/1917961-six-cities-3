import chalk from 'chalk';
import { CliCommondInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommondInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
    Программа для подготовки данных для REST API сервера.

    Пример: cli.js ${chalk.blue('--command')} [${chalk.green('<arguments>')}]

    Команды:

     ${chalk.blue('--version')}:                   ${chalk.red('# выводит номер версии')}
     ${chalk.blue('--help')}:                      ${chalk.red('# печатает этот текст')}
     ${chalk.blue('--import')} ${chalk.green('<path>')}:             ${chalk.red('# импортирует данные из TSV')}
     ${chalk.blue('--generate')} ${chalk.green('<n> <path> <url>')}:  ${chalk.red('# генерирует произвольное количество тестовых данных')}
    `);
  }

}
