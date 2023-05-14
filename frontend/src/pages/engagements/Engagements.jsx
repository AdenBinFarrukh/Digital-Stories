import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Post from "../../components/post/Post";
import "./Engagements.scss";
import { ChangeContext } from "../../context/changeContext";
import { AuthContext } from "../../context/authContext";

import ReactLoading from "react-loading";

function Engagements() {
    const [posts, setPosts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const { postChange } = useContext(ChangeContext);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(
                process.env.REACT_APP_BE_Link +
                    "/api/posts/engagements/" +
                    currentUser._id
            );
            setPosts(res.data);
            setLoading(false);
            setDeleted(false);
        };
        fetchPosts();
    }, [currentUser._id, deleted, postChange]);

    return (
        <div className="engagements">
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
}

export default Engagements;
