// Copyright (c) TileDB, Inc.
// Distributed under the terms of the Modified BSD License.
import { windowEndpoint, wrap, proxy, ProxyOrClone } from 'comlink';

import { ICommandBridgeRemote } from 'jupyter-iframe-commands';

/**
 * A bridge to expose actions on JupyterLab commands.
 */
export function createBridge({
  iframeId
}: {
  iframeId: string;
}): ICommandBridgeRemote {
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

  const wrappedBridge = wrap<ICommandBridgeRemote>(
    windowEndpoint(iframe.contentWindow)
  );

  // Create a promise that resolves when the iframe signals it's ready
  const readyPromise = new Promise<void>(resolve => {
    const controller = new AbortController();
    const signal = controller.signal;

    const messageHandler = (event: MessageEvent) => {
      if (event.data === '_JUPYTER_IFRAME_COMMANDS_LOADED') {
        controller.abort();
        resolve();
      }
    };

    window.addEventListener('message', messageHandler, { signal });

    wrappedBridge.ready
      .then(() => {
        controller.abort();
        resolve();
      })
      .catch(() => {
        // If ready() fails, we'll still wait for the message
        // No need to do anything, the message listener is still active
      });
  });

  // Create a proxy that intercepts property access
  return new Proxy(wrappedBridge, {
    get(target, prop, receiver) {
      // If the property is 'ready', return the ready promise
      if (prop === 'ready') {
        return readyPromise;
      }
      // Otherwise delegate to the comlink wrapped bridge
      return Reflect.get(target, prop, receiver);
    }
  });
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
