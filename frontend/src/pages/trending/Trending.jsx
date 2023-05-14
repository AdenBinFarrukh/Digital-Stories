import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import { ChangeContext } from "../../context/changeContext";

import ReactLoading from "react-loading";
import "./Trending.scss";

const Trending = () => {
    const [posts, setPosts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const { postChange } = useContext(ChangeContext);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(
                process.env.REACT_APP_BE_Link + "/api/posts/List/Trending"
            );
            setPosts(res.data);
            setLoading(false);
            setDeleted(false);
        };
        fetchPosts();
    }, [deleted, postChange]);

    return (
        <div className="trending">
            <div className="list">
                {loading ? (
                    <ReactLoading
                        type={"spin"}
                        color={"#000"}
                        height={50}
                        width={50}
                    />
                ) : (
                    posts.map((post) => (
                        <Post
                            post={post}
                            key={post._id}
                            setDeleted={setDeleted}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Trending;
