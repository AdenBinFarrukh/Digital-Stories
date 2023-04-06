import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import "./Posts.scss";
import { ChangeContext } from "../../context/changeContext";

import ReactLoading from "react-loading";

function Posts({ userId }) {
    const [posts, setPosts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const { postChange } = useContext(ChangeContext);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:8800/api/posts/timeline/" + userId
            );
            setPosts(res.data);
            setLoading(false);
            setDeleted(false);
        };
        fetchPosts();
    }, [userId, deleted, postChange]);

    return (
        <div className="posts">
            {loading ? (
                <ReactLoading
                    type={"spin"}
                    color={"#000"}
                    height={50}
                    width={50}
                />
            ) : (
                posts.map((post) => (
                    <Post post={post} key={post._id} setDeleted={setDeleted} />
                ))
            )}
        </div>
    );
}

export default Posts;
