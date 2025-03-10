import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
import InputArea from './InputArea';
import Instructions from './Instructions';
import ListCommands from './ListCommands';

interface IDemoTopProps {
  getBridge: () => ICommandBridgeRemote;
  submitCommand: (command: string, args: string) => void;
}

const DemoTop = ({ getBridge, submitCommand }: IDemoTopProps) => {
  return (
    <>
      <div className="demo-top">
        <h1>{import.meta.env.VITE_TITLE} Demo</h1>
        <div className="button-row">
          <Instructions submitCommand={submitCommand} />
          <ListCommands
            bridge={getBridge} //can pass bridge itself
            apiFunction={getBridge()?.listCommands} // can pass function from bridge
          />
          {/* <NoteBookBrowser /> */}
          {/* <ModeToggle /> */}
        </div>
        <InputArea submitCommand={submitCommand} />
      </div>
    </>
  );
};

export default DemoTop;
