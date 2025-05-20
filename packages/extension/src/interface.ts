import { ReadonlyPartialJSONObject } from '@lumino/coreutils';

/**
 * Represents a remote command bridge interface.
 *
 * This interface provides a standardized way to interact with a Jupyter environment contained in an iframe.
 */
export interface ICommandBridgeRemote {
  /**
   * Executes a command with the given arguments.
   *
   * @param command - The name of the command to execute.
   * @param args - An object containing arguments for the command.
   */
  execute(command: string, args: ReadonlyPartialJSONObject): Promise<unknown>;

  /**
   * Lists all available commands.
   *
   * @returns An array of strings representing the names of all available commands.
   */
  listCommands(): Promise<string[]>;

  /**
   * Waits for the JupyterLab environment to be ready.
   */
  ready: Promise<void>;
}
