import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import { AuthProviderWrapper } from "./context/auth.context";
import Restricted from "./components/restricted";
import NotRestricted from "./components/notRestricted";
import Profile from "./components/Profile";
import Projects from "./components/Projects";
import ProjectView from "./components/ProjectView";
import Invitations from "./components/Invitations";
import TaskView from "./components/TaskView";
import AddProject from "./components/AddProject";
import AddTask from "./components/AddTask";
function App() {
  return (
    <AuthProviderWrapper>
      <Router>
        <Routes>
          <Route element={<WithoutNav />}>
            <Route
              path="/auth/register"
              element={
                <NotRestricted>
                  <Register />
                </NotRestricted>
              }
            />
            <Route
              path="/auth/login"
              element={
                <NotRestricted>
                  <Login />
                </NotRestricted>
              }
            />
          </Route>
          <Route element={<WithNav />}>
            <Route
              path="/"
              element={
                <Restricted>
                  <Projects />
                </Restricted>
              }
            />
            <Route
              path="/profile"
              element={
                <Restricted>
                  <Profile />
                </Restricted>
              }
            />
            <Route
              path="/user/invites"
              element={
                <Restricted>
                  <Invitations />
                </Restricted>
              }
            />
            <Route
              path="/project/add"
              element={
                <Restricted>
                  <AddProject />
                </Restricted>
              }
            />
            <Route
              path="project/:id/task/:taskId"
              element={
                <Restricted>
                  <TaskView />
                </Restricted>
              }
            />
            <Route
              path="/project/:id"
              element={
                <Restricted>
                  <ProjectView />
                </Restricted>
              }
            />
            <Route
              path="/project/:id/add/task"
              element={
                <Restricted>
                  <AddTask />
                </Restricted>
              }
            />
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
  return <Outlet />;
}
export default App;
