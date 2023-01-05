import { CliCommondInterface } from '../cli-command/cli-command.interface.js';
import { PREFIX } from '../const.js';

type ParseCommand = {
  [key: string]: string[];
}

export default class CLIApplication {
  private commands: {[propertyName: string]: CliCommondInterface} = {};
  private defaultGommand = '--help';

  public registerCommands(commandList: CliCommondInterface[]): void {
    commandList.reduce((acc, command) => {
      const cliCommand = command;
      acc[cliCommand.name] = cliCommand;
      return acc;
    }, this.commands);
  }

  private parseCommand(cliArguments: string[]): ParseCommand {
    const parseCommand: ParseCommand = {};
    let command = '';

    return cliArguments.reduce((acc, item) => {
      if(item.startsWith(PREFIX)) {
        acc[item] = [];
        command = item;
      } else if (command && item) {
        acc[command].push(item);
      }
      return acc;
    },parseCommand);
  }

  public getCommand(commandName: string) {
    return this.commands[commandName] ?? this.commands[this.defaultGommand];
  }

  public processCommand(argv: string[]): void {
    const parsedCommand = this.parseCommand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

}
