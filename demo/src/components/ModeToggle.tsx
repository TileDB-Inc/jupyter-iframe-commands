import { ChangeEvent, useEffect, useState } from 'react';

const ModeToggle = () => {
  const [mode, setMode] = useState('lab');

  useEffect(() => {
    const iframe = document.getElementById('jupyterlab') as HTMLIFrameElement;

    if (!iframe) {
      return;
    }

    // Update iframe source when mode changes
    const isNotebookView = mode === 'notebook';
    let currentUrl: any = new URL(iframe.src);
    const isLite = currentUrl.pathname.includes('lite');

    if (isLite) {
      currentUrl = `./lite/${isNotebookView ? 'notebooks/index.html?path=example.ipynb' : 'index.html'}`;
    } else {
      currentUrl.pathname = isNotebookView
        ? '/notebooks/example.ipynb'
        : '/lab';
      currentUrl.search = '';
    }

    iframe.src = currentUrl.toString();
  }, [mode]);

  const handleModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMode(e.target.value);
  };

  return (
    <div>
      <div className="mode-toggle">
        <label>
          <input
            type="radio"
            name="mode"
            value="lab"
            checked={mode === 'lab'}
            onChange={handleModeChange}
          />
          <span>JupyterLab</span>
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="notebook"
            checked={mode === 'notebook'}
            onChange={handleModeChange}
          />
          <span>Jupyter Notebook</span>
        </label>
      </div>
    </div>
  );
};

export default ModeToggle;
