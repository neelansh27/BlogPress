import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'  
import Post from './components/post';
import PostView from './components/PostView';
import {BrowserRouter as  Router,Routes,Route} from "react-router-dom"
function App() {
  return (
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Post/>} />
          <Route path="/post/:id" element={<PostView/>} />
        </Routes>
    </Router>
  );
}

export default App;
