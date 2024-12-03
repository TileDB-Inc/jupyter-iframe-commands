/* eslint-disable no-undef */
import { CommandBridge } from 'jupyter-iframe-commands-host';

const commandBridge = new CommandBridge('jupyterlab').commandBridge;

document.getElementById('list-commands').addEventListener('click', () => {
  commandBridge.listCommands();
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
