import { useContext, useEffect, useState } from "react";
import "./Comments.scss";
import { AuthContext } from "../../context/authContext";
import { ChangeContext } from "../../context/changeContext";
import axios from "axios";
import Comment from "../comment/Comment";
import ReactLoading from "react-loading";

function Comments({ postId }) {
    const { commentChange, setCommentChange } = useContext(ChangeContext);
    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    //* Adding Comments
    const [addcomment, setAddcomment] = useState({
        text: "",
        author: currentUser._id,
    });

    const handleCommentChange = (e) => {
        setAddcomment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    //* Add comment to the List
    const handleCommentSubmit = async (e) => {
        //* send it to a server
        e.preventDefault();

        try {
            await axios.put(
                "http://localhost:8800/api/posts/" + postId + "/comment",
                addcomment
            );
            setCommentChange(!commentChange);
        } catch (err) {
            console.log(err.response.data.message);
        }

        //* clear the input field
        setAddcomment((prev) => ({ ...prev, text: "" }));
        console.log(comments);
    };

    //* Get comments when needed
    useEffect(() => {
        const fetchComments = async () => {
            const res = await axios.get(
                "/api/posts/" + postId + "/getcomments"
            );
            setIsLoading(false);
            setComments(res.data.comments);
        };
        fetchComments();
    }, [commentChange, postId]);

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
            {isLoading ? (
                <ReactLoading
                    type={"balls"}
                    color={"#7d7d7d"}
                    height={40}
                    width={40}
                />
            ) : (
                comments.map((comment) => (
                    <Comment
                        key={comment._id}
                        postId={postId}
                        comment={comment}
                    />
                ))
            )}
        </div>
    );
}

export default Comments;
