// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.

import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { expose, windowEndpoint } from 'comlink';

import { CommandBridge } from './api';

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

    const { commands } = app;
    const api = new CommandBridge({ commands });
    const endpoint = windowEndpoint(self.parent);
    expose(api, endpoint);
  }
};

export default plugin;
