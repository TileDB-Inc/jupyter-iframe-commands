import { jupyterInfo } from 'jupyter-iframe-commands-host';
import { useRef } from 'react';

const sampleNotebooks = ['example.ipynb', 'soma.ipynb'];

const NoteBookBrowser = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenDialog = async () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleClick = (filename: string) => {
    const iframe = document.getElementById('jupyterlab') as HTMLIFrameElement;
    jupyterInfo.setState({ isBridgeReady: false });

    iframe.src = `http://localhost:8888/notebooks/${filename}`;
    dialogRef.current?.close();
  };

  return (
    <div>
      <button
        id="list-commands"
        className="demo-button"
        aria-label="Show available commands"
        onClick={handleOpenDialog}
      >
        Notebooks
      </button>

      <dialog ref={dialogRef}>
        <h2 style={{ marginTop: 0 }}>Available Commands</h2>
        <div id="notebook-list">
          {sampleNotebooks.map(nb => {
            return (
              <button
                key={nb}
                onClick={() => {
                  handleClick(nb);
                }}
              >
                {nb}
              </button>
            );
          })}
        </div>
        <div className="dialog-buttons">
          <button
            className="demo-button"
            value="close"
            onClick={handleCloseDialog}
          >
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default NoteBookBrowser;
