// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ReadonlyPartialJSONObject } from '@lumino/coreutils';
import { expose, windowEndpoint } from 'comlink';
import { ICommandBridgeRemote } from './interface';

/**
 * A plugin to expose an API for interacting with JupyterLab from a parent page.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-iframe-commands:plugin',
  autoStart: true,
  description:
    'A plugin to expose an API for interacting with JupyterLab from a parent page.',
  optional: [ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null
  ) => {
    console.log('JupyterLab extension jupyter-iframe-commands is activated!');
    const { commands } = app;

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log(
            'jupyter-iframe-commands settings loaded:',
            settings.composite
          );
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for jupyter-iframe-commands.',
            reason
          );
        });
    }

    const api: ICommandBridgeRemote = {
      async execute(command: string, args: ReadonlyPartialJSONObject) {
        const result = await commands.execute(command, args);
        try {
          // Attempt to clone result to check if it's serializable
          const clone = structuredClone(result);
          return clone;
        } catch (error) {
          // Non-serializable values can't be sent over Comlink
          void error;
        }
      },
      async listCommands() {
        return commands.listCommands();
      },
      get ready() {
        return app.started;
      }
    };

    app.started.then(() => {
      const endpoint = windowEndpoint(self.parent);
      expose(api, endpoint);
      window.parent?.postMessage('_JUPYTER_IFRAME_COMMANDS_LOADED', '*');
    });
  }
};

export default plugin;
export * from './interface';
