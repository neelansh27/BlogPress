import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
const Profile = () => {
  const [userPosts, setUserPosts] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    fetch("http://localhost:3000/post/user/" + user.id)
      .then((res) => res.json())
      .then((res) => {
          setUserPosts(res);
        console.log(userPosts);
      })
      .catch((err) => console.log(err));
  }, [user.id]);
  return (
    <div>
      <div className="profile">
        <div>Name</div>
        <div>{user.name}</div>
        <div>Email</div>
        <div>{user.email}</div>
      </div>
    <h1>Your Posts</h1>
      {userPosts &&
        userPosts.map((item) => {
          return <div key={item._id}>
            <div>{item.title}</div>
            <div>{item.author}</div>
            <small>
              Posted on {(new Date(item.createdAt)).toLocaleDateString()}
            </small>
            <div>
              <Link to={`/post/${item._id}`}>View post</Link>
            </div>
            <hr />
          </div>
        })}
  </div>
  );
};

export default Profile;
