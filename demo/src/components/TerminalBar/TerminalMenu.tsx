import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
import { useCallback, useState } from 'react';
import keyboardUrl from '../../../icons/keyboard.svg';
import { usePopover } from '../usePopover';

interface IAvailableCommandsProps {
  bridge: () => ICommandBridgeRemote;
}

const TerminalMenu = ({ bridge }: IAvailableCommandsProps) => {
  const iframe = document.getElementById('jupyterlab') as HTMLIFrameElement;

  if (!iframe) {
    return;
  }

  const { isOpen, toggle, close, ref } = usePopover();

  const [runningTerminals, setRunningTerminals] = useState<string[]>([]);

  // Handle option click
  const handleOptionClick = useCallback((terminal: string): void => {
    iframe.src = `http://localhost:8888/terminals/${terminal}`;
    close();
  }, []);

  const handleOpen = async () => {
    const running = await bridge().listRunning();
    const termName = Object.values(running.terminals)
      .map(term => term.name)
      .sort();
    setRunningTerminals(
      termName.length > 0 ? termName : ['No terminals running']
    );

    toggle();
  };

  const handleShutdown = () => {
    runningTerminals.forEach(term => {
      bridge().execute('shutdown-all-terminals', { name: term });
    });
    // submitCommand('shutdown-all-terminals', '{teees: "test"}');
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={handleOpen}>
        <img src={keyboardUrl} />
      </button>
      <button onClick={handleShutdown}>
        <img src={keyboardUrl} />
      </button>

      {isOpen && (
        <div className="available-commands-popover">
          <div className="filter-pop-overs">
            <div className="popovers-wrapper">
              {/* Render filtered options */}
              <div className="list-of-options">
                {runningTerminals.map(term => (
                  <div
                    className="popover-list-item"
                    key={term}
                    onClick={() => handleOptionClick(term)}
                  >
                    Terminal-{term}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TerminalMenu;
