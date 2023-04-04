import "./Navbar.scss";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

function Navbar() {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

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
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Search" />
        </div>
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
                  process.env.REACT_APP_Image_Path + currentUser.profilePicture
                }
                alt=""
              />
            ) : (
              <img
                src={process.env.REACT_APP_Image_Path + "No_Image.jpg"}
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
