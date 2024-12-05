/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-undef */
import { CommandBridge } from 'jupyter-iframe-commands-host';
import Swal from 'sweetalert2';

const commandBridge = new CommandBridge({ iframeId: 'jupyterlab' })
  .commandBridge;

document.getElementById('instructions').addEventListener('click', async () => {
  let { value: command } = await Swal.fire({
    html: `
    <p>To use this demo simply enter a command in the command input and any arguments for that command in the args input.</p>
    <div style="display: flex; gap: 0.4rem; flex-direction: column; text-align: left; font-size: 0.9rem;">
    <p style="font-weight: bold; padding: 0;">Some commands are listed here for convenience:</p>
    <ul style="list-style-type: none; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; margin: 0;">
    <li>application:toggle-left-area</li>
    <li>apputils:activate-command-palette</li>
    <li>apputils:display-shortcuts</li>
    <li>notebook:create-new</li>
    </ul>
    <p style="font-weight: bold; padding: 0;">And some with arguments:</p>
    <ul style="list-style-type: none; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; margin: 0;">
    <li><span style="font-weight: bold;">Command:</span> apputils:change-theme</li>
    <li><span style="font-weight: bold;">Args:</span> { 'theme': 'JupyterLab Light' }</li>
    <br/>
    <li><span style="font-weight: bold;">Command:</span> apputils:change-theme</li>
    <li><span style="font-weight: bold;">Args:</span> { 'theme': 'JupyterLab Dark' }</li>
    </ul>
    </div>
    <p>For even more convenience you can also select a command from the dropdown</p>`,
    footer:
      'Check the <a href="https://github.com/TileDB-Inc/jupyter-iframe-commands?tab=readme-ov-file#usage" target="_blank">README</a> for more detailed instructions.',
    input: 'select',
    inputOptions: {
      Commands: {
        'application:toggle-left-area': 'Toggle Left Area',
        'apputils:display-shortcuts': 'Display Shortcuts',
        'notebook:create-new': 'Create New Notebook'
      },
      'Commands with Arguments': {
        'JupyterLab Light': 'Switch to Light Theme',
        'JupyterLab Dark': 'Switch to Dark Theme'
      }
    },
    inputPlaceholder: 'Select a command',
    showCancelButton: true
  });
  if (command) {
    let args;
    if (command.includes('Light') || command.includes('Dark')) {
      args = `{"theme": "${command}"}`;
      command = 'apputils:change-theme';
      console.log('command', command);
      console.log('args', args);
    }

    commandBridge.execute(command, args ? JSON.parse(args) : {});
  }
});

document.getElementById('list-commands').addEventListener('click', async () => {
  console.log('Commands: ', await commandBridge.listCommands());
});

document.getElementById('commands').addEventListener('submit', e => {
  e.preventDefault();
  const command = document.querySelector('input[name="command"]').value;

  // Single quotes cause an error
  const args = document
    .querySelector('input[name="args"]')
    .value.replace(/'/g, '"');
  commandBridge.execute(command, args ? JSON.parse(args) : {});
});
