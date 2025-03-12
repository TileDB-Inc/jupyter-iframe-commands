import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './components/Home';
import NotebookPage from './components/NotebookPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":type/:notebookId" element={<NotebookPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
