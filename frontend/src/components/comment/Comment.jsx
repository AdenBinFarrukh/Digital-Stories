import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { ChangeContext } from "../../context/changeContext";
import { AuthContext } from "../../context/authContext";
import "./Comment.scss";

function Comment({ comment, postId }) {
    const [user, setUser] = useState({});
    const { commentChange, setCommentChange } = useContext(ChangeContext);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);

    //* Get User Info
    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(
                process.env.REACT_APP_BE_Link + "/api/users/" + comment.author
            );
            setUser(res.data);
            setIsLoading(false);
        };
        getUser();
    }, [comment.author]);

    //! delete comment
    const deleteComment = async () => {
        await axios.delete(
            process.env.REACT_APP_BE_Link +
                "/api/posts/" +
                postId +
                "/comments/" +
                comment._id
        );
        setCommentChange(!commentChange);
    };

    return (
        <div className="comment">
            {isLoading ? (
                <ReactLoading
                    type={"balls"}
                    color={"#7d7d7d"}
                    height={40}
                    width={40}
                />
            ) : (
                <>
                    {user.profilePicture ? (
                        <img
                            src={
                                process.env.REACT_APP_Image_Path +
                                user.profilePicture
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
                    <div className="info">
                        <div className="data">
                            <span>{user.username}</span>
                            <p>{comment.text}</p>
                        </div>
                    </div>
                    {user._id === currentUser._id && (
                        <span className="delete" onClick={deleteComment}>
                            Delete
                        </span>
                    )}
                </>
            )}
        </div>
    );
}

export default Comment;
