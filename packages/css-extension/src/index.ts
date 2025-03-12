import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { TerminalAPI } from '@jupyterlab/services';

/**
 * Initialization data for the jupyter-css-loader extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyter-css-loader:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupyter-css-loader is activated!');
    const { commands } = app;

    commands.addCommand('jupyter-import-css', {
      execute: args => {
        const styleTag = document.createElement('style');

        styleTag.id = 'searchText';
        styleTag.innerText = args['parsedCSS'] as string;

        document.head.appendChild(styleTag);
      }
    });

    commands.addCommand('shutdown-all-terminals', {
      execute: args => {
        console.log('args', args);
        console.log('args', args['name'] as string);
        TerminalAPI.shutdownTerminal(args['name'] as string);
      }
    });
  }
};

export default plugin;
