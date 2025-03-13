import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
import { useEffect, useState } from 'react';
import { usePopover } from '../usePopover';

interface IAvailableCommandsProps {
  bridge: () => ICommandBridgeRemote;
}

const TerminalMenu = ({ bridge }: IAvailableCommandsProps) => {
  const { isOpen, toggle, close, ref } = usePopover();

  const [activeTerminal, setActiveTerminal] = useState(1);
  const [runningTerminals, setRunningTerminals] = useState<string[]>([]);

  useEffect(() => {
    console.log('activeTerminal', activeTerminal);
    console.log('runningTerminals.length', runningTerminals.length);
  }, [activeTerminal, runningTerminals]);

  const iframe = document.getElementById('jupyterlab') as HTMLIFrameElement;
  if (!iframe) {
    return;
  }

  const setIframeSrc = (terminal: number) => {
    setActiveTerminal(terminal);
    iframe.src = `http://localhost:8888/terminals/${terminal}`;
  };

  // Handle option click
  const handleOptionClick = (terminal: string): void => {
    setIframeSrc(+terminal);
    close();
  };

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
  };

  const handlePrev = () => {
    setIframeSrc(activeTerminal - 1);
  };
  const handleNext = () => {
    setIframeSrc(activeTerminal + 1);
  };

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <div>Using Terminal-0{activeTerminal}</div>
      <button onClick={handleOpen}>terminals</button>
      <button onClick={handleShutdown}>shutdown terms</button>
      <button disabled={activeTerminal - 1 < 1} onClick={handlePrev}>
        handlePrev
      </button>
      <button
        disabled={activeTerminal + 1 > runningTerminals.length}
        onClick={handleNext}
      >
        handleNext
      </button>
      <button
        onClick={() => {
          bridge().execute('terminal:set-theme', { theme: 'inherit' });
        }}
      >
        set theme
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
