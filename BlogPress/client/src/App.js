import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'  
import Post from './components/post';
import PostView from './components/PostView';
import {BrowserRouter as  Router,Routes,Route, Outlet} from "react-router-dom"
function App() {
  return (
    <Router>
        <Routes>
          <Route element={<WithNav/>}>
          <Route path="/" element={<Post/>} />
          <Route path="/post/:id" element={<PostView/>} />
          </Route>
        </Routes>
    </Router>
  );
}

function WithNav() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
export default App;
