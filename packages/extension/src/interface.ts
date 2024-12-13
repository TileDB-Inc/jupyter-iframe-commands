import { ReadonlyPartialJSONObject } from '@lumino/coreutils';

export interface ICommandBridgeRemote {
  execute(command: string, args: ReadonlyPartialJSONObject): void;
  listCommands(): string[];
}
