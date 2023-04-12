import "./RightBar.scss";
import { AuthContext } from "../../context/authContext";
import { ChangeContext } from "../../context/changeContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function RightBar() {
    const [connList, setConnList] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { sortBy, setSortBy } = useContext(ChangeContext);

    const [selectedValue, setSelectedValue] = useState(sortBy);

    //* Get list of connections
    useEffect(() => {
        const connections = async () => {
            const res = await axios.get(
                "http://localhost:8800/api/users/" +
                    currentUser._id +
                    "/friends"
            );
            setConnList(res.data);
        };
        connections();
    }, [currentUser]);

    const handleOptionChange = (event) => {
        setSelectedValue(event.target.value);
        setSortBy(event.target.value);
    };

    return (
        <div className="rightbar">
            <div className="container">
                <div className="item">
                    <span>Sort Posts By</span>

                    <div className="options">
                        <label>
                            <input
                                type="radio"
                                name="group"
                                value="Likes"
                                checked={selectedValue === "Likes"}
                                onChange={handleOptionChange}
                            />
                            <span>Likes</span>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="group"
                                value="Comments"
                                checked={selectedValue === "Comments"}
                                onChange={handleOptionChange}
                            />
                            <span>Comments</span>
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="group"
                                value="createdAt"
                                checked={selectedValue === "createdAt"}
                                onChange={handleOptionChange}
                            />
                            <span>Posted On</span>
                        </label>
                    </div>
                </div>

                <div className="item">
                    <span>Connections</span>
                    {connList.map((conn) => (
                        <div className="user" key={conn.username}>
                            <Link
                                to={`/profile/${conn._id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}>
                                <div className="userInfo">
                                    {conn.profilePicture ? (
                                        <img
                                            src={
                                                process.env
                                                    .REACT_APP_Image_Path +
                                                conn.profilePicture
                                            }
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            src={
                                                process.env
                                                    .REACT_APP_Image_Path +
                                                "No_Image.jpg"
                                            }
                                            alt=""
                                        />
                                    )}
                                    {conn.logged_in ? (
                                        <div className="online"></div>
                                    ) : (
                                        <div className="offline"></div>
                                    )}
                                    <span>{conn.username}</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RightBar;
