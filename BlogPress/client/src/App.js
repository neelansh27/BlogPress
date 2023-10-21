import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar'  
import Post from './components/post';
import PostView from './components/PostView';
import {BrowserRouter as  Router,Routes,Route, Outlet} from "react-router-dom"
import Register from './components/register';
import Login from './components/login';
import {AuthProviderWrapper} from "./context/auth.context"
function App() {
  return (
    <AuthProviderWrapper>
    <Router>
        <Routes>
            <Route element={<WithoutNav/>}>
            <Route path="/auth/register" element={<Register/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            </Route>
          <Route element={<WithNav/>}>
          <Route path="/" element={<Post/>} />
          <Route path="/post/:id" element={<PostView/>} />
          </Route>
        </Routes>
    </Router>
    </AuthProviderWrapper>
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
function WithoutNav() {
  return <Outlet/>
}
export default App;
