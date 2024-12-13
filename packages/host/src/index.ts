// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.
import { windowEndpoint, wrap } from 'comlink';
import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
/**
 * A bridge to expose actions on JupyterLab commands.
 */
export function createBridge({ iframeId }: { iframeId: string }) {
  const iframe = document.getElementById(iframeId) as HTMLIFrameElement;

  if (!iframe) {
    throw new Error(
      `Cannot create bridge: iframe with id "${iframeId}" not found`
    );
  }

  if (!iframe.contentWindow) {
    throw new Error(
      `Cannot create bridge: iframe with id "${iframeId}" has no content window`
    );
  }

  return wrap<ICommandBridgeRemote>(windowEndpoint(iframe.contentWindow));
}
