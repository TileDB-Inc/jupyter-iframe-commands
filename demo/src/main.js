/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-undef */
import { createBridge } from 'jupyter-iframe-commands-host';

const commandBridge = createBridge({ iframeId: 'jupyterlab' });

const submitCommand = async (command, args) => {
  try {
    await commandBridge.execute(command, args ? JSON.parse(args) : {});
  } catch (e) {
    document.getElementById('error-dialog').innerHTML = `<code>${e}</code>`;
    errorDialog.showModal();
  }
};

// Create and append dialogs to the document
const instructionsDialog = document.createElement('dialog');
instructionsDialog.innerHTML = `
  <form method="dialog">
    <div>
      <h2 style="margin-top: 0;">Instructions</h2>
      <p>To use this demo simply enter a command in the command input and any arguments for that command in the args input.</p>
      <p>Click the <code style="background-color: lightsteelblue;">List Available Commands</code> button to see a list of available commands.</p>
      <div style="display: flex; gap: 0.4rem; flex-direction: column; text-align: left; font-size: 0.9rem;">
        <p style="font-weight: bold; padding: 0;">Some commands are listed here for convenience:</p>
        <div class="command-example">
          <ul style="list-style-type: none; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; margin: 0; padding: 0;">
            <li>application:toggle-left-area</li>
            <li>apputils:activate-command-palette</li>
            <li>apputils:display-shortcuts</li>
            <li>notebook:create-new</li>
          </ul>
        </div>
        <p style="font-weight: bold; padding: 0;">And some with arguments:</p>
        <div class="command-example">
          <ul style="list-style-type: none; display: flex; flex-direction: column; align-items: flex-start; gap: 0.25rem; margin: 0; padding: 0;">
            <li><span style="font-weight: bold;">Command:</span> apputils:change-theme</li>
            <li><span style="font-weight: bold;">Args:</span> { 'theme': 'JupyterLab Light' }</li>
            <br/>
            <li><span style="font-weight: bold;">Command:</span> apputils:change-theme</li>
            <li><span style="font-weight: bold;">Args:</span> { 'theme': 'JupyterLab Dark' }</li>
          </ul>
        </div>
      </div>
      <p>For even more convenience you can also select a command from the dropdown:</p>
      <select id="command-select">
        <option value="">Select a command</option>
        <optgroup label="Commands">
          <option value="application:toggle-left-area">Toggle Left Area</option>
          <option value="apputils:display-shortcuts">Display Shortcuts</option>
          <option value="notebook:create-new">Create New Notebook</option>
        </optgroup>
        <optgroup label="Commands with Arguments">
          <option value="JupyterLab Light">Switch to Light Theme</option>
          <option value="JupyterLab Dark">Switch to Dark Theme</option>
        </optgroup>
      </select>
    </div>
    <div class="dialog-buttons">
      <button value="cancel">Cancel</button>
      <button value="default" id="command-select-submit">OK</button>
    </div>
  </form>
  <div style="margin-top: 1rem; font-size: 0.8rem; text-align: center;">
    Check the <a href="https://github.com/TileDB-Inc/jupyter-iframe-commands?tab=readme-ov-file#usage" target="_blank">README</a> for more detailed instructions.
  </div>
`;

const listCommandsDialog = document.createElement('dialog');
listCommandsDialog.innerHTML = `
  <form method="dialog">
    <h2 style="margin-top: 0;">Available Commands</h2>
    <div id="commands-list"></div>
    <div class="dialog-buttons">
      <button value="close">Close</button>
    </div>
  </form>
`;

const errorDialog = document.createElement('dialog');
errorDialog.innerHTML = `
  <form method="dialog">
    <h2 style="margin: 0; color: #ED4337;">⚠ Error</h2>
    <div id="error-dialog"></div>
    <div class="dialog-buttons">
      <button value="close">Close</button>
    </div>
  </form>
`;

document.body.appendChild(instructionsDialog);
document.body.appendChild(listCommandsDialog);
document.body.appendChild(errorDialog);

document.getElementById('instructions').addEventListener('click', () => {
  instructionsDialog.showModal();
});

document
  .getElementById('command-select-submit')
  .addEventListener('click', async e => {
    e.preventDefault();
    const select = document.getElementById('command-select');
    let command = select.value;

    if (command) {
      let args;
      if (command.includes('Light') || command.includes('Dark')) {
        args = `{"theme": "${command}"}`;
        command = 'apputils:change-theme';
      }
      await submitCommand(command, args);
    }
    instructionsDialog.close();
  });

document.getElementById('list-commands').addEventListener('click', async () => {
  const commands = await commandBridge.listCommands();
  commands.sort();
  document.getElementById('commands-list').innerHTML = commands
    .map(item => `<div>${item}</div>`)
    .join('');
  listCommandsDialog.showModal();
});

document.getElementById('commands').addEventListener('submit', async e => {
  e.preventDefault();
  const command = document.querySelector('input[name="command"]').value;

  // Single quotes cause an error
  const args = document
    .querySelector('input[name="args"]')
    .value.replace(/'/g, '"');

  await submitCommand(command, args);
});

// Handle mode toggle
const iframe = document.getElementById('jupyterlab');
const modeRadios = document.querySelectorAll('input[name="mode"]');

modeRadios.forEach(radio => {
  radio.addEventListener('change', e => {
    const isNotebookView = e.target.value === 'notebook';
    let currentUrl = new URL(iframe.src);
    const isLite = currentUrl.pathname.includes('lite');

    if (isLite) {
      currentUrl = `./lite/${isNotebookView ? 'notebooks/index.html?path=example.ipynb' : 'lab'}`;
    } else {
      currentUrl.pathname = isNotebookView
        ? '/notebooks/example.ipynb'
        : '/lab';
      currentUrl.search = '';
    }

    iframe.src = currentUrl.toString();
  });
});
