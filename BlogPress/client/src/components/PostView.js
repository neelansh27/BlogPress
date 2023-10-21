import React,{useEffect,useState} from "react"
import { useParams } from "react-router-dom";
export default function PostView() {
  const params = useParams()
 const [post,setPost] = useState(null)
 useEffect(() => {
    fetch("http://localhost:3000/post/get/"+params.id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPost(data);
      });
  }, []);
  return (
    <main>
      { !post || JSON.stringify(post)}
    </main>
  )
}
