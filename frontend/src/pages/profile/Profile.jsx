import "./Profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Post from "../../components/post/Post";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/updateProfile/Update";
import { ChangeContext } from "../../context/changeContext";
import ReactLoading from "react-loading";

const Profile = () => {
    const ID = useLocation().pathname.split("/")[2];
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [auther, setAuther] = useState({});
    const [openUpdate, setOpenUpdate] = useState(false);
    const [following, setFollowing] = useState(
        currentUser.followings.includes(ID)
    );

    const [posts, setPosts] = useState([]);
    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const { postChange, grid, sortBy } = useContext(ChangeContext);

    //*Get Profile posts
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get(
                process.env.REACT_APP_BE_Link + "/api/posts/profile/" + ID
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
    }, [ID, deleted, postChange, sortBy]);

    //* Get the auther of the profile
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get(
                process.env.REACT_APP_BE_Link + "/api/users/" + ID
            );
            setAuther(res.data);
        };
        fetchPosts();
    }, [ID]);

    //* Handle following someone
    const handleFollow = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                process.env.REACT_APP_BE_Link + "/api/users/" + ID + "/follow",
                {
                    userId: currentUser._id,
                }
            );
            setFollowing(!following);
            const res = await axios.get(
                process.env.REACT_APP_BE_Link + "/api/users/" + currentUser._id
            );
            setCurrentUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    //* Handle Logout
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                process.env.REACT_APP_BE_Link + "/api/users/" + currentUser._id,
                {
                    userId: currentUser._id,
                    logged_in: false,
                }
            );
            localStorage.removeItem("user");

            navigate("/login");
        } catch (err) {
            console.log(err.response.data);
        }
    };

    return (
        <div className="profile">
            <div className="images">
                {auther.coverPicture ? (
                    <img
                        src={
                            process.env.REACT_APP_Image_Path +
                            auther.coverPicture
                        }
                        alt=""
                        className="cover"
                    />
                ) : (
                    <img
                        src={process.env.REACT_APP_Image_Path + "No_Cover.jpeg"}
                        alt=""
                        className="cover"
                    />
                )}
                {auther.profilePicture ? (
                    <img
                        src={
                            process.env.REACT_APP_Image_Path +
                            auther.profilePicture
                        }
                        alt=""
                        className="profilePic"
                    />
                ) : (
                    <img
                        src={process.env.REACT_APP_Image_Path + "No_Image.jpg"}
                        alt=""
                        className="profilePic"
                    />
                )}
            </div>
            <div className="profileContainer">
                <div className="uInfo">
                    <div className="left">
                        <a href="http://facebook.com">
                            <FacebookTwoToneIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <InstagramIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <TwitterIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <LinkedInIcon fontSize="large" />
                        </a>
                        <a href="http://facebook.com">
                            <PinterestIcon fontSize="large" />
                        </a>
                    </div>
                    <div className="center">
                        <span>{auther.username}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon />
                                {auther.from ? (
                                    <span>{auther.from}</span>
                                ) : (
                                    <span>---</span>
                                )}
                            </div>
                            <div className="item">
                                <LanguageIcon />
                                {auther.email ? (
                                    <span>{auther.email}</span>
                                ) : (
                                    <span>---</span>
                                )}
                            </div>
                        </div>
                        <div className="buttons">
                            {/* Update Button*/}
                            {auther._id === currentUser._id ? (
                                <button
                                    onClick={() => {
                                        setOpenUpdate(true);
                                    }}>
                                    Update
                                </button>
                            ) : (
                                <button onClick={handleFollow}>
                                    {following ? "Following" : "Follow"}
                                </button>
                            )}
                            {/* Output Button*/}
                            {auther._id === currentUser._id && (
                                <button onClick={handleLogout}>Logout</button>
                            )}
                        </div>
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                {/* <Posts userId={ID}/> */}

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
                            <Post
                                post={post}
                                key={post._id}
                                setDeleted={setDeleted}
                            />
                        ))
                    )}
                </div>
            </div>
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} />}
        </div>
    );
};

export default Profile;
