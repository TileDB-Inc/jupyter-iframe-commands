import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
import { ChangeEvent, useCallback, useState } from 'react';
import keyboardUrl from '../../../icons/keyboard.svg';
import { usePopover } from '../usePopover';

interface IAvailableCommandsProps {
  bridge: () => ICommandBridgeRemote;
}

// type CommandOption = { label: string; command: string };
const commandList = [
  { label: 'Create new notebook...', command: 'notebook:create-new' },
  { label: 'Open terminal...', command: 'terminal:create-new' },
  { label: 'Undo last operation', command: 'notebook:undo-cell-action' },
  { label: 'Redo last operation...', command: 'notebook:redo-cell-action' },
  { label: 'Run selected cell', command: 'notebook:run-cell-and-select-next' },
  { label: 'Run all blocks', command: 'notebook:run-all-cells' },
  { label: 'Restart Kernel', command: 'notebook:restart-kernel' },
  {
    label: 'Restart kernel and clear all outputs',
    command: 'notebook:restart-clear-output'
  },
  { label: 'Add code block below', command: 'notebook:insert-cell-below' },
  { label: 'Add code block above', command: 'notebook:insert-cell-above' }
];

const AvailableCommands = ({ bridge }: IAvailableCommandsProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isOpen, toggle, close, ref } = usePopover();

  // Handle option click
  const handleOptionClick = useCallback((option: string): void => {
    console.log(`${option} option clicked`);
    close();
    setSearchQuery(''); // Reset search query after selection
    bridge().execute(option, {});
  }, []);

  // Update the search query as the user types
  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      setSearchQuery(e.target.value);
    },
    []
  );

  // Filter items based on the search query
  const filteredItems = commandList.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggle}>
        <img src={keyboardUrl} />
      </button>

      {isOpen && (
        <div className="available-commands-popover">
          <div className="filter-pop-overs">
            <div className="popovers-wrapper">
              <div className="input-controls">
                <div className="input-field">
                  {/* Search bar */}
                  <input
                    type="text"
                    placeholder="Type to search available commands"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              {/* Render filtered options */}
              <div className="list-of-options">
                {filteredItems.map(option => (
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

export default AvailableCommands;
