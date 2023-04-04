import { useContext, useState } from "react";
import "./Comments.scss";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

function Comments({ comment, postId }) {
    const { currentUser } = useContext(AuthContext);
    const [addcomment, setAddcomment] = useState({
        text: "",
        author: currentUser._id,
    });

    const handleCommentChange = (e) => {
        setAddcomment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCommentSubmit = async (e) => {
        //send it to a server
        e.preventDefault();

        try {
            await axios.put(
                "http://localhost:8800/api/posts/" + postId + "/comment",
                addcomment
            );
            comment.push(addcomment);
        } catch (err) {
            console.log(err.response.data.message);
        }

        // clear the input field
        setAddcomment((prev) => ({ ...prev, text: "" }));
        console.log(comment);
    };

    return (
        <div className="comments">
            <div className="write">
                {currentUser.profilePicture ? (
                    <img
                        src={
                            process.env.REACT_APP_Image_Path +
                            currentUser.profilePicture
                        }
                        alt=""
                    />
                ) : (
                    <img
                        src={process.env.REACT_APP_Image_Path + "No_Image.jpg"}
                        alt=""
                    />
                )}
                <input
                    type="text"
                    placeholder="write a comment"
                    value={addcomment.text}
                    name={"text"}
                    onChange={handleCommentChange}
                />
                <button onClick={handleCommentSubmit}>Send</button>
            </div>
            {comment.map((comment) => (
                <div className="comment" key={comment._id}>
                    {comment.profilePicture ? (
                        <img
                            src={
                                process.env.REACT_APP_Image_Path +
                                comment.profilePicture
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
                        <span>{comment.username}</span>
                        <p>{comment.text}</p>
                    </div>
                    <span className="date"></span>
                </div>
            ))}
        </div>
    );
}

export default Comments;
