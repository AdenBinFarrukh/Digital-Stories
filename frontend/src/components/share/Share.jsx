import "./share.scss";
import Image from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ChangeContext } from "../../context/changeContext";
import axios from "axios";

const Share = () => {
    const [desc, setDesc] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [file, setFile] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { postChange, setPostChange } = useContext(ChangeContext);

    function handleCheckboxChange() {
        setIsChecked(!isChecked);
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const postData = {
                desc: desc,
                userId: currentUser._id,
                is_public: isChecked,
            };
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const res = await axios.post(
                    process.env.REACT_APP_BE_Link + "/api/upload",
                    formData
                );
                postData.image = res.data.filename;
            }
            const res = await axios.post(
                process.env.REACT_APP_BE_Link + "/api/posts/",
                postData
            );
            setDesc("");
            setFile(null);
            setPostChange(!postChange);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
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
                                src={
                                    process.env.REACT_APP_Image_Path +
                                    "No_Image.jpg"
                                }
                                alt=""
                            />
                        )}
                        <input
                            type="text"
                            placeholder={`What's on your mind ${currentUser.username}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img
                                className="file"
                                alt=""
                                src={URL.createObjectURL(file)}
                            />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Add Image</span>
                            </div>
                        </label>
                        <label>
                            <div className="item">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={handleCheckboxChange}
                                />
                                <span>Make Public</span>
                            </div>
                        </label>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Share</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;
