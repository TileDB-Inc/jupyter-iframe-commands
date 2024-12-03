// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.
import { windowEndpoint, wrap } from 'comlink';
/**
 * A bridge to expose actions on JupyterLab commands.
 */
export class CommandBridge {
    constructor(iframeId, options) {
        this._iframe = document.getElementById(iframeId);
        this._commands = options.commands;
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
        window.commandBridge = this._commandBridge;
    }
    async execute(command, args) {
        return this._commands.execute(command, args);
    }
    async listCommands() {
        return this._commands.listCommands();
    }
}
