// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.
import { Endpoint, Remote, windowEndpoint, wrap } from 'comlink';

/**
 * A bridge to expose actions on JupyterLab commands.
 */
export class CommandBridge {
  constructor(iframeId: string) {
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
    this.commandBridge = wrap(this._endpoint);
  }

  private _iframe: HTMLIFrameElement | null;
  private _childWindow: Window | undefined | null;
  private _endpoint: Endpoint | undefined;
  commandBridge: Remote<unknown> | undefined;
}
