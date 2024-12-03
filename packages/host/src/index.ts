// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.
import { Endpoint, Remote, windowEndpoint, wrap } from 'comlink';
import { CommandRegistry } from '@lumino/commands';
import { ReadonlyPartialJSONObject } from '@lumino/coreutils';

// For demo/dev purposes
declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    commandBridge: Remote<unknown>;
  }
}

/**
 * A bridge to expose actions on JupyterLab commands.
 */
export class CommandBridge {
  constructor(iframeId: string) {
    this._iframe = document.getElementById(iframeId) as HTMLIFrameElement;

    // this._commands = options.commands;

    if (!this._iframe) {
      console.error('iframe not found');
      return;
    }

    this._childWindow = this._iframe.contentWindow;

    if (!this._childWindow) {
      console.error('child window not found');
      return;
    }

    this._endpoint = windowEndpoint(this._childWindow);
    this._commandBridge = wrap(this._endpoint);

    // For demo purposes for now, and to make it easier to test the commands
    // via the dev tools
    // window.commandBridge = this._commandBridge;
  }

  getBridge() {
    return this._commandBridge;
  }

  // async execute(command: string, args?: ReadonlyPartialJSONObject) {
  //   return this._commands.execute(command, args);
  // }

  // async listCommands(): Promise<string[]> {
  //   return this._commands.listCommands();
  // }

  // private _commands: CommandRegistry;
  private _iframe: HTMLIFrameElement | null;
  private _childWindow: Window | undefined | null;
  private _endpoint: Endpoint | undefined;
  private _commandBridge: Remote<unknown> | undefined;
}

export namespace CommandBridge {
  export interface IOptions {
    commands: CommandRegistry;
  }
}
