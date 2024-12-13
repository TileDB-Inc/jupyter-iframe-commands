// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.
import { Endpoint, Remote, windowEndpoint, wrap } from 'comlink';
import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
/**
 * A bridge to expose actions on JupyterLab commands.
 */
class CommandBridge {
  constructor({ iframeId }: CommandBridge.IOptions) {
    this._iframe = document.getElementById(iframeId) as HTMLIFrameElement;

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
  }

  get commandBridge() {
    return this._commandBridge;
  }

  private _iframe: HTMLIFrameElement | null;
  private _childWindow: Window | undefined | null;
  private _endpoint: Endpoint | undefined;
  private _commandBridge: Remote<ICommandBridgeRemote> | undefined;
}

export function createBridge({ iframeId }: CommandBridge.IOptions) {
  return new CommandBridge({ iframeId }).commandBridge;
}

export namespace CommandBridge {
  export interface IOptions {
    iframeId: string;
  }
}
