import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import "../css/profile.css"
const Profile = () => {
  const [userPosts, setUserPosts] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:3000/post/user/" + user.id)
      .then((res) => res.json())
      .then((res) => {
          setUserPosts(res);
      })
      .catch((err) => console.log(err));
  }, [user.id]);
  return (
    <main>
    <div className="user-details">
      <div className="profile">
        <div className="label row-1" >Name</div>
        <div className="row-1">{user.name}</div>
        <div className="label">Email</div>
        <div>{user.email}</div>
      </div>
    <h1>Your Posts</h1>
    <div className="post-container">
    { Boolean(userPosts) || <div><strong>You haven't Posted Yet</strong></div> }
      {Boolean(userPosts) &&
        userPosts.map((item) => {
          return <div key={item._id} className="post">
            <div className="post-title">{item.title}</div>
            <div className="post-author">{item.author}</div>
            <small className="post-creation">
              Posted on {(new Date(item.createdAt)).toLocaleDateString()}
            </small>
            <div>
              <Link className="post-view" to={`/post/${item._id}`}>View post</Link>
            </div>
          </div>
        })}
    </div>
  </div>
</main>
  );
};

export default Profile;
