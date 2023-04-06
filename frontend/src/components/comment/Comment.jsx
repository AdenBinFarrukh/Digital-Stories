import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import "./Comment.scss";

function Comment({ comment }) {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    //* Get User Info
    useEffect(() => {
        const getUser = async () => {
            const res = await axios.get(
                "http://localhost:8800/api/users/" + comment.author
            );
            setUser(res.data);
            setIsLoading(false);
        };
        getUser();
    }, [comment.author]);

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
                    <span className="date"></span>
                </>
            )}
        </div>
    );
}

export default Comment;
