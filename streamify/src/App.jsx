import Login from './pages/auth/login';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserPage from './pages/UserPage';
import UploadVideo from './pages/UploadVideo';

function App() {

  return (
    <Router>

    <Routes>
      {/* Error Display */}
      <Route path="*" element={<h1>Error 404</h1>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/UserPage' element={<UserPage/>}/>
      <Route path='/UploadVideo' element={<UploadVideo/>}/>

    </Routes>

  </Router>
  )
}

export default App;
