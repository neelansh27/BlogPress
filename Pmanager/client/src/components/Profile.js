import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../css/profile.css"
const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <main>
    <div className="user-details">
      <div className="profile">
        <div className="label row-1" >User Id</div>
        <div className="row-1">{user.id}</div>
        <div className="label row-1" >Name</div>
        <div className="row-1">{user.name}</div>
        <div className="label">Email</div>
        <div>{user.email}</div>
      </div>
  </div>
</main>
  );
};

export default Profile;
