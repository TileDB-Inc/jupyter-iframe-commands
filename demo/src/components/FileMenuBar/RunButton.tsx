import { useCallback } from 'react';
import arrowDownUrl from '../../../icons/arrowDown.svg';
import playUrl from '../../../icons/play.svg';
import { usePopover } from '../usePopover';

interface IRunButtonProps {
  submitCommand: (command: string, args: string) => void;
}

const popoverOptions = [
  { label: 'Run all', command: 'notebook:run-all-cells' },
  { label: 'Run selected cell', command: 'notebook:run-cell-and-select-next' },
  {
    label: 'Run from selected cell and above',
    command: 'notebook:run-all-above'
  },
  {
    label: 'Run from selected cell and below',
    command: 'notebook:run-all-below'
  }
];
const RunButton = ({ submitCommand }: IRunButtonProps) => {
  const { isOpen, toggle, close, ref } = usePopover();

  const handleOptionClick = useCallback((option: string): void => {
    console.log(`${option} option clicked`);
    close();
    submitCommand(option, '');
  }, []);

  return (
    <div ref={ref} style={{ display: 'inline-flex', position: 'relative' }}>
      <div className="buttons-grouped">
        {/* Run Button */}
        <button
          onClick={() => handleOptionClick('notebook:run-all-cells')}
          className="left-half"
        >
          <div className="button-name">
            <img src={playUrl} />
          </div>
          <span>Run</span>
        </button>

        {/* Options Button */}
        <button onClick={toggle} className="right-half">
          <div className="button-name">
            <img src={arrowDownUrl} />
          </div>
        </button>
      </div>

      {/* Popover Menu */}
      {isOpen && (
        <div
          className="available-commands-popover"
          style={{ left: 'unset', right: '0', alignItems: 'flex-end' }}
        >
          <div className="filter-pop-overs">
            {popoverOptions.map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  handleOptionClick(option.command);
                }}
                className="popover-list-item"
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RunButton;
