import Login from './pages/auth/login';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <Router>

    <Routes>
      {/* Error Display */}
      <Route path="*" element={<h1>Error 404</h1>} />
      <Route path="/" element={<HomePage />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path='/login' element={<Login/>}/>

    </Routes>

  </Router>
  )
}

export default App;
