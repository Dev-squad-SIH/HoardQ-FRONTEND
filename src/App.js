import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home'
import Auth from './pages/auth'
import Expert from './pages/expert'
import { SubjectProvider } from './subjectContext';
function App() {
  return (
    <SubjectProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/auth" element={<Auth/>}></Route>
          <Route path="/expert" element={<Expert/>}></Route>
        </Routes>
      </BrowserRouter>
    </SubjectProvider>
      
  );
}

export default App;
