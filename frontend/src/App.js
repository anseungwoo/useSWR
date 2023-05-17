import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import DetailPage from './components/DetailPage';
import EditPage from './components/EditPage';
import MyComponent from './components/MyComponent';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/MyComponent" element={<MyComponent />} />
          <Route path="/detailPage/:id" element={<DetailPage />} />
          <Route path="/editPage/:id" element={<EditPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
