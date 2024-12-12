# jupyter-iframe-commands

[![Github Actions Status](https://github.com/TileDB-Inc/jupyter-iframe-commands/workflows/Build/badge.svg)](https://github.com/TileDB-Inc/jupyter-iframe-commands/actions/workflows/build.yml)
[![lite-badge](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://tiledb-inc.github.io/jupyter-iframe-commands/)

A JupyterLab extension to facilitate integration with a host page via an IFrame

> [!WARNING]
> This project is still in an early development stage.

## Requirements

- JupyterLab >= 4.0.0 or Jupyter Notebook >= 7.0.0

### Try it in your browser

Try out the extension in your browser:

[![lite-badge](https://jupyterlite.rtfd.io/en/latest/_static/badge.svg)](https://tiledb-inc.github.io/jupyter-iframe-commands/)

## Usage

This repository provides two packages:

- The extension package: `jupyter-iframe-commands`. This is the JupyterLab extension that provides the API to execute JupyterLab commands from a host page.
- The host package: `jupyter-iframe-commands-host`. This is a package that provides a bridge to communicate with JupyterLab running in an iframe.

### Host Package

The host package provides a bridge to communicate with JupyterLab running in an iframe. To use it in your application:

1. Install the package:

```bash
npm install jupyter-iframe-commands-host
```

2. Import and use the `CommandBridge`:

```typescript
import { CommandBridge } from 'jupyter-iframe-commands-host';

// Initialize the bridge with your iframe ID
const bridge = new CommandBridge({
  iframeId: 'your-jupyter-iframe-id'
});

// Execute JupyterLab commands
// Example: Toggle the left sidebar
await bridge.commandBridge.execute('application:toggle-left-area');

// Example: Change the theme
await bridge.commandBridge.execute('apputils:change-theme', {
  theme: 'JupyterLab Dark'
});

// List available JupyterLab commands
const commands = await bridge.commandBridge.listCommands();
console.log(commands);
```

### Extension Package

The JupyterLab extension should be installed in the JupyterLab environment running in the IFrame.

To install the extension:

```bash
pip install jupyter-iframe-commands
```

### Customizing the user interface

The Jupyter UI can be customized in different ways.

#### Example

On the following screenshot:

- `@jupyterlab/mainmenu-extension` is disabled to remove the menu entries
- `@jupyter-notebook/lab-extension` is disabled to remove the interface switcher from the notebook toolbar
- The `visible` property of the `@jupyter-notebook/application-extension:top` plugin is set to `no`, to hide the top bar

![a screenshot showing Jupyter Notebook running in an iframe](https://github.com/user-attachments/assets/cf4a64c0-9a2c-4614-93da-e1a2467711d9)

For the demo in this repo, this configuration is provided via two files:

- `overrides.json`: This file is used to override the default settings of the JupyterLab and Jupyter Notebook applications
- `jupyter-lite.json`: This file is used to set a list of `disabledExtensions`, which can be used to disabled invidual plugins

#### Configuring JupyterLab

JupyterLab can be configured in a smilar way, using well-known files at specific locations:

- `page_config.json`: https://jupyterlab.readthedocs.io/en/latest/user/directories.html#labconfig-directories
- `overrides.json`: https://jupyterlab.readthedocs.io/en/latest/user/directories.html#overridesjson

### Available Commands

> [!NOTE]
> The list of available commands may depend on:
>
> - The JupyterLab version
> - Whether your JupyterLab configuration disables some core plugins or extensions
> - Third-party extensions available in the JupyterLab environment

Some examples of available commands:

- `application:toggle-left-area`
- `apputils:activate-command-palette`
- `apputils:display-shortcuts`
- `extensionmanager:show-panel`
- `notebook:create-new`
- `notebook:insert-cell-below`

Examples of commands with arguments:

- `apputils:change-theme` `{ 'theme': 'JupyterLab Dark' }`
- `settingeditor:open` `{ 'settingEditorType': 'json' }`

> [!TIP]
> For reference JupyterLab defines a list of default commands here: https://jupyterlab.readthedocs.io/en/latest/user/commands.html#commands-list

## Demos

### Local Demo

To run the demo on a local Jupyter Lab instance:

1. Follow the [development install instructions](#development-install)
2. `cd demo`
3. Start JupyterLab:

```bash
jlpm start:lab
```

4. In another terminal, start the demo app:

```bash
jlpm start:local
```

Open http://localhost:8080 in your browser.

### Lite Demo

To run the demo on a Jupyter Lite instance:

1. Follow the [development install instructions](#development-install)
2. `cd demo`
3. Build and start the demo app:

```bash
# Build the demo
jlpm build:ghpages

# Start the development server
jlpm start:lite
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyter-iframe-commands
```

## Contributing

### Development install

> [!NOTE]
> You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyter-iframe-commands directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyter-iframe-commands
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyter-iframe-commands` within that folder.

### Testing the extension

#### Integration tests

This extension uses [Playwright](https://playwright.dev/docs/intro) for the integration tests (aka user level tests).
More precisely, the JupyterLab helper [Galata](https://github.com/jupyterlab/jupyterlab/tree/master/galata) is used to handle testing the extension in JupyterLab.

More information are provided within the [ui-tests](./ui-tests/README.md) README.

### Packaging the extension

See [RELEASE](RELEASE.md)
