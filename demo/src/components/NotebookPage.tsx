import { ICommandBridgeRemote } from 'jupyter-iframe-commands';
import { useCallback, useRef, useState } from 'react';
import { useParams } from 'react-router';
import DemoTop from './DemoTop';
import ErrorDialog from './Error';
import FileMenuBar from './FileMenuBar/FileMenuBar';
import { useGetJupyterInfo } from './FileMenuBar/useGetJupyterInfo';
import JupyterIframe from './JupyterIframe';

const NotebookPage = () => {
  const params = useParams();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const isBridgeReady = useGetJupyterInfo(state => state.isBridgeReady);

  const getBridge = useCallback((): ICommandBridgeRemote => {
    //@ts-expect-error wip
    return iframeRef.current?.getBridge();
  }, [isBridgeReady]);

  const submitCommand = async (command: string, args: string) => {
    const bridge = getBridge();

    try {
      bridge.execute(command, args ? JSON.parse(args) : {});
    } catch (e: any) {
      setErrorMessage(e instanceof Error ? e.message : String(e));
      dialogRef.current?.showModal();
    }
  };

  return (
    <>
      <DemoTop getBridge={getBridge} submitCommand={submitCommand} />
      <div className="iframe-container">
        <FileMenuBar bridge={getBridge} submitCommand={submitCommand} />
        <JupyterIframe
          ref={iframeRef}
          iframeSrc={`http://localhost:8888/notebooks/${params.notebookId}`}
        />
      </div>
      <ErrorDialog ref={dialogRef} message={errorMessage} />
    </>
  );
};

export default NotebookPage;
