// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.

import { CommandRegistry } from '@lumino/commands';

import { ReadonlyPartialJSONObject } from '@lumino/coreutils';

/**
 * A bridge to expose actions on JupyterLab commands.
 */
export class CommandBridge {
  constructor(options: CommandBridge.IOptions) {
    this._commands = options.commands;
  }

  async execute(command: string, args?: ReadonlyPartialJSONObject) {
    return this._commands.execute(command, args);
  }

  async listCommands(): Promise<string[]> {
    return this._commands.listCommands();
  }

  private _commands: CommandRegistry;
}

export namespace CommandBridge {
  export interface IOptions {
    commands: CommandRegistry;
  }
}
