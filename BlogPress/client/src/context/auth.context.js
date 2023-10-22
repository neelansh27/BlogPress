import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState(null);

  const storeItems = (token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("timestamp", Date.now());
  };

  const tokenExpired = () => {
    const token = localStorage.getItem("token");
    const timestamp = localStorage.getItem("timestamp");

    if (!token || !timestamp) {
      return false;
    }

    const timePassed = Date.now() - Number(timestamp);

    return timePassed > 3600000;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("timestamp");
    window.location.reload()
  };

  const authenticateUser = () => {
    const token = localStorage.getItem("token");
    if (!token || tokenExpired()) {
      setisLoggedIn(false);
      setloading(false);
      setuser(null);
    } else {
      fetch("http://localhost:3000/verify",{
        headers: {token}
      })
        .then((res) => res.json())
        .then((res) => {
            setloading(false);
            setuser(res.user);
            setisLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setisLoggedIn(false);
          setloading(false);
          setuser(null);
        });
    }
  };
  useEffect(()=>{
    authenticateUser();
  },[])
  return (
    <AuthContext.Provider value={{ storeItems, isLoggedIn, loading, user,logout}}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
