import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
import clipboardUrl from '../../../icons/clipboard.svg';
import fullscreenUrl from '../../../icons/fullscreen.svg';
import redoUrl from '../../../icons/redo.svg';
import saveUrl from '../../../icons/save.svg';
import undoUrl from '../../../icons/undo.svg';
import AddCellButton from './AddCellButton';
import AvailableCommands from './AvailableCommands';
import BulletsButton from './BulletsButton';
import KernelInfo from './KernelInfo';
import RunButton from './RunButton';
import './fileMenuBar.css';
import { useWindowSize } from './useWindowSize';
interface IFileMenuBarProps {
  bridge: () => ICommandBridgeRemote;
  submitCommand: (command: string, args: string) => void;
}

const FileMenuBar = ({ bridge, submitCommand }: IFileMenuBarProps) => {
  const { width } = useWindowSize();

  const handleSave = () => {
    submitCommand('docmanager:save', '');
  };

  const handleUndo = () => {
    // ? cell action or no cell action?
    submitCommand('notebook:undo-cell-action', '');
  };

  const handleRedo = () => {
    // ? cell action or no cell action?
    submitCommand('notebook:redo-cell-action', '');
  };

  const handlePaste = () => {
    submitCommand('notebook:paste-cell-below', '');
  };

  return (
    <div className="file-menu-bar-container">
      <div className="file-menu-bar-wrapper">
        <div className="file-menu-bar-commands">
          <AddCellButton submitCommand={submitCommand} />
          <button onClick={handleSave}>
            <div className="button-name">
              <img src={saveUrl} />
            </div>
          </button>
          {width > 550 ? (
            <>
              <button onClick={handleUndo}>
                <div className="button-name">
                  <img src={undoUrl} />
                </div>
              </button>
              <button onClick={handleRedo}>
                <div className="button-name">
                  <img src={redoUrl} />
                </div>
              </button>
              <button onClick={handlePaste}>
                <div className="button-name">
                  <img src={clipboardUrl} />
                </div>
              </button>
              <AvailableCommands bridge={bridge} />
            </>
          ) : (
            <BulletsButton bridge={bridge} />
          )}
        </div>

        <div className="file-menu-bar-buttons">
          <RunButton submitCommand={submitCommand} bridge={bridge} />
          {width > 550 ? (
            <>
              <KernelInfo bridge={bridge} />
              <div className="separator"></div>
              <button style={{ order: 3 }}>
                <div className="button-name">
                  <img src={fullscreenUrl} />
                </div>
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default FileMenuBar;
