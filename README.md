# jupyter-iframe-commands

[![Github Actions Status](https://github.com/TileDB-Inc/jupyter-iframe-commands/workflows/Build/badge.svg)](https://github.com/TileDB-Inc/jupyter-iframe-commands/actions/workflows/build.yml)

A JupyterLab extension to facilitate integration with a host page via an IFrame

> [!WARNING]
> This project is still in an early development stage.

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension

- Clone the repo to your local environment
- Change directory to the `jupyter-iframe-commands` directory
- execute: `pip install .`

## Usage

Try out a preview [here](https://tiledb-inc.github.io/jupyter-iframe-commands/)

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

- Follow the [development install instructions](#development-install)
- `cd demo`
- Run: `jlpm start:lab`
- In another terminal
- Run: `jlpm start:local`

Open http://localhost:8080 in your browser.

### Lite Demo

To run the demo on a Jupyter Lite instance:

- Follow the [development install instructions](#development-install)
- Run: `jlpm build:lite`
- `cd demo`
- Run: `jlpm start:lite`

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
