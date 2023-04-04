import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./Posts.scss";
import { ChangeContext } from "../../context/changeContext";

function Posts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const { postChange } = useContext(ChangeContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/posts/timeline/" + userId
      );
      setPosts(res.data);
      setDeleted(false);
    };
    fetchPosts();
  }, [userId, deleted, postChange]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} key={post._id} setDeleted={setDeleted} />
      ))}
    </div>
  );
}

export default Posts;
