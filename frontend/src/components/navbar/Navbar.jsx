import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { ChangeContext } from "../../context/changeContext";
import axios from "axios";

function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [errTerm, setErrTerm] = useState("");
    const { toggle, darkMode } = useContext(DarkModeContext);
    const { grid, setGrid } = useContext(ChangeContext);
    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            setErrTerm("");
            const res = await axios.get(
                process.env.REACT_APP_BE_Link +
                    "/api/users/getbyname/" +
                    searchTerm
            );
            const userId = res.data._id;

            setSearchTerm("");

            navigate("/profile/" + userId);
        } catch (err) {
            setErrTerm("No Such User");
        }
    };

    return (
        <div className="navbar">
            <div className="left">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span>Digital Stories</span>
                </Link>
                <HomeOutlinedIcon />
                {darkMode ? (
                    <WbSunnyOutlinedIcon onClick={toggle} />
                ) : (
                    <DarkModeOutlinedIcon onClick={toggle} />
                )}
                {grid ? (
                    <MenuIcon onClick={() => setGrid(!grid)} />
                ) : (
                    <GridViewOutlinedIcon onClick={() => setGrid(!grid)} />
                )}
                <div className="search">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <SearchOutlinedIcon onClick={handleSearch} />
                </div>
                {errTerm && <span className="error">{errTerm}</span>}
            </div>

            <div className="right">
                <AccountCircleOutlinedIcon />
                <EmailOutlinedIcon />
                <NotificationsOutlinedIcon />

                <Link
                    to={`/profile/${currentUser._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="user">
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
                        <span>{currentUser.username}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
