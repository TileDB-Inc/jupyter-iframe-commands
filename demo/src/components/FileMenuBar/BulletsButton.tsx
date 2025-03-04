import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
import { useCallback } from 'react';
import bulletsUrl from '../../../icons/bullets.svg';
import { usePopover } from './usePopover';

interface IAvailableCommandsProps {
  bridge: () => ICommandBridgeRemote;
}

const commandList = [
  { label: 'Undo', command: 'notebook:undo-cell-action' },
  { label: 'Redo', command: 'notebook:redo-cell-action' },
  { label: 'Paste cell', command: 'notebook:paste-cell-below' },
  { label: 'Configure kernel', command: 'notebook:change-kernel' }
];

const BulletsButton = ({ bridge }: IAvailableCommandsProps) => {
  const { isOpen, toggle, close, ref } = usePopover();

  const handleOptionClick = useCallback((option: string): void => {
    console.log(`${option} option clicked`);
    close();
    bridge().execute(option, {});
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggle}>
        <img src={bulletsUrl} />
      </button>

      {isOpen && (
        <div className="available-commands-popover">
          <div className="filter-pop-overs">
            <div className="popovers-wrapper">
              {/* Render filtered options */}
              <div className="list-of-options">
                {commandList.map(option => (
                  <div
                    className="popover-list-item"
                    key={option.command}
                    onClick={() => handleOptionClick(option.command)}
                  >
                    {option.label}
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

export default BulletsButton;
