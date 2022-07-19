import './App.css';
import PostPage from './PostPage';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<PostPage />} />
      </Routes>
    </div>
  );
}

export default App;
