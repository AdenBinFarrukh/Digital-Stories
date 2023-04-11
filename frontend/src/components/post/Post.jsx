import React, { useContext, useEffect } from "react";
import "./Post.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Comments from "../comments/Comments";

import { Link } from "react-router-dom";
import { useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ChangeContext } from "../../context/changeContext";
import axios from "axios";

function Post({ post, setDeleted }) {
    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [author, setAuthor] = useState({});
    const { currentUser } = useContext(AuthContext);
    const { postChange, setPostChange } = useContext(ChangeContext);

    const [liked, setliked] = useState(post.likes.includes(currentUser._id));

    //* Get the author of post
    useEffect(() => {
        const fetchAuthor = async () => {
            const res = await axios.get(
                "http://localhost:8800/api/users/" + post.userId
            );
            setAuthor(res.data);
        };
        fetchAuthor();
    }, [post.userId]);

    //* Like a post
    const LikePost = async () => {
        await axios.put(
            "http://localhost:8800/api/posts/" + post._id + "/like",
            {
                userId: currentUser._id,
            }
        );

        if (liked) {
            post.likes = post.likes.filter(
                (element) => element !== currentUser._id
            );
        } else {
            post.likes.push(currentUser._id);
        }
        setliked(!liked);
    };

    //* Delete a post
    const handleDelete = async () => {
        await axios.delete(
            "http://localhost:8800/api/posts/" +
                post._id +
                "/" +
                currentUser._id
        );
        setDeleted(true);
    };

    //* Make private or public
    const handlePublic = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/api/posts/${post._id}`, {
                userId: currentUser._id,
                is_public: !post.is_public, // add the is_public field to the request body
            });
            setPostChange(!postChange);
        } catch (err) {
            console.log("🚀 ~ file: Post.jsx:76 ~ handleSubmit ~ err:", err);
        }
    };

    //* Calculate how long ago the post was last Created AT
    const getTimeSincePost = (createdAt) => {
        const postTime = new Date(createdAt);
        const currentTime = new Date();
        const seconds = Math.floor((currentTime - postTime) / 1000);

        if (seconds < 60) {
            return `${seconds} seconds ago`;
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minutes ago`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hours ago`;
        }

        const days = Math.floor(hours / 24);
        return `${days} days ago`;
    };

    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        {author.profilePicture ? (
                            <img
                                src={
                                    process.env.REACT_APP_Image_Path +
                                    author.profilePicture
                                }
                                alt=""
                            />
                        ) : (
                            <img
                                src={
                                    process.env.REACT_APP_Image_Path +
                                    "No_Image.jpg"
                                }
                                alt=""
                            />
                        )}
                        <Link
                            to={`/profile/${author._id}`}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}>
                            <div className="details">
                                <span className="name">{author.username}</span>
                                <span className="date">
                                    {getTimeSincePost(post.createdAt)}
                                </span>
                            </div>
                        </Link>
                    </div>
                    <MoreHorizOutlinedIcon
                        onClick={() => {
                            if (post.userId === currentUser._id) {
                                setMenuOpen(!menuOpen);
                            }
                        }}
                    />
                    {menuOpen && (
                        <div className="menu">
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={handlePublic}>
                                {post.is_public
                                    ? "Make Private"
                                    : "Make Public"}
                            </button>
                        </div>
                    )}
                </div>

                <div className="content">
                    <p>{post.desc}</p>
                    {post.image && (
                        <img
                            src={process.env.REACT_APP_Image_Path + post.image}
                            alt=""
                        />
                    )}
                </div>

                <div className="info">
                    <div className="items">
                        {liked ? (
                            <ThumbUpSharpIcon onClick={LikePost} />
                        ) : (
                            <ThumbUpOutlinedIcon onClick={LikePost} />
                        )}
                        {post.likes.length}
                    </div>

                    <div
                        className="items"
                        onClick={() => setCommentOpen(!commentOpen)}>
                        <CommentOutlinedIcon />
                        {post.comments.length}
                    </div>

                    <div className="items">
                        <ShareOutlinedIcon />
                        share
                    </div>
                </div>

                {commentOpen && (
                    <Comments comments={post.comments} postId={post._id} />
                )}
            </div>
        </div>
    );
}

export default Post;
