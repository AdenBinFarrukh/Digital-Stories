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
    const { sortBy, grid } = useContext(ChangeContext);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:8800/api/posts/timeline/" + userId
            );

            let temp = res.data;

            if (sortBy === "Likes") {
                // sort by likes in descending order
                temp.sort((a, b) => b.likes.length - a.likes.length);
            } else if (sortBy === "Comments") {
                // sort by number of comments in descending order
                temp.sort((a, b) => b.comments.length - a.comments.length);
            } else {
                // sort by creation time in descending order
                temp.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            }
            setPosts(temp);
            setLoading(false);
            setDeleted(false);
        };
        fetchPosts();
    }, [userId, deleted, postChange, sortBy]);

    return (
        <div className={grid ? "posts_grid" : "posts"}>
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
