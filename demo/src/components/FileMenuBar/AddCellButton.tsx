import { useCallback } from 'react';
import codeUrl from '../../../icons/code.svg';
import markdownUrl from '../../../icons/markdown.svg';
import plusUrl from '../../../icons/plus.svg';
import { usePopover } from '../usePopover';
import PopoverListItem from '../PopoverListItem';

interface IAddCellButtonProps {
  submitCommand: (command: string, args: string) => void;
}

const AddCellButton = ({ submitCommand }: IAddCellButtonProps) => {
  const { isOpen, toggle, close, ref } = usePopover();

  const handleOptionClick = useCallback((option: string) => {
    console.log(`${option} option clicked`);
    close();

    submitCommand('notebook:insert-cell-below', '');
    submitCommand(`notebook:change-cell-to-${option}`, '');
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggle}>
        <img src={plusUrl} />
      </button>

      {isOpen && (
        <div className="file-menu-popover-container">
          <div className="file-menu-popover-wrapper">
            <PopoverListItem
              label="Code"
              content="Insert an executable code cell"
              iconUrl={codeUrl}
              handleOptionClick={handleOptionClick}
            />
            <PopoverListItem
              label="Markdown"
              content="Insert a markdown cell"
              iconUrl={markdownUrl}
              handleOptionClick={handleOptionClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCellButton;
