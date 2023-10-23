import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loading, setloading] = useState(true);
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

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if (!token || tokenExpired()) {
      setisLoggedIn(false);
      setloading(false);
      setuser(null);
    } else {
      fetch("https://blogpress-u5fv.onrender.com/verify",{
        headers: {token}
      })
        .then((res) => res.json())
        .then((res) => {
            setloading(false);
            setuser(res);
            setisLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          setisLoggedIn(false);
          setloading(false);
          setuser(null);
        });
    }
  },[])
  if (!loading){
    return (
      <AuthContext.Provider value={{ storeItems, isLoggedIn, loading, user,logout}}>
        {props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext, AuthProviderWrapper };
