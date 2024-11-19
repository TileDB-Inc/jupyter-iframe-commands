# jupyter-iframe-commands

[![Github Actions Status](https://github.com/TileDB-Inc/jupyter-iframe-commands/workflows/Build/badge.svg)](https://github.com/TileDB-Inc/jupyter-iframe-commands/actions/workflows/build.yml)

A JupyterLab extension to facilitate integration with a host page via an IFrame

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install jupyter-iframe-commands
```

## Usage

TODO

### List of available commands

The list of available commands may depend on:

- the JupyterLab version
- whether your JupyterLab configuration disables some core plugins or extensions
- third-party extensions available in the JupyterLab environment

For reference JupyterLab defines a list of default commands here: https://jupyterlab.readthedocs.io/en/latest/user/commands.html#commands-list

## Demo

To run the demo:

- follow the development install instructions below
- `cd demo`
- `npx http-server`
- in another terminal, run: `jupyter lab --config ./jupyter_server_config.py`

Open http://localhost:8080 in your browser.

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyter-iframe-commands
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

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
