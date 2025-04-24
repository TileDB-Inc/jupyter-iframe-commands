// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.
import { windowEndpoint, wrap, proxy, ProxyOrClone } from 'comlink';

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

/**
 * Creates a proxy for the given object.
 *
 * @param args - The object to create a proxy for.
 * @returns A proxy for the given object.
 */
export function createProxy(args: any): ProxyOrClone<any> {
  return proxy(args);
}
