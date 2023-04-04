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
import Posts from "../../components/posts/Posts"
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/updateProfile/Update";

const Profile = () => {

  const ID = useLocation().pathname.split("/")[2];
  const {currentUser, setCurrentUser} = useContext(AuthContext)
  const [auther, setAuther] = useState({})
  const [openUpdate, setOpenUpdate] = useState(false)
  const [following, setFollowing] = useState(currentUser.followings.includes(ID))
  
  // Get the auther of the profile
  useEffect(()=>{
    const fetchPosts = async () =>{
      const res = await axios.get("http://localhost:8800/api/users/" + ID)
      setAuther(res.data)
    }
    fetchPosts()
    
  }, [ID])

  //Handle following someone
  const handleFollow = async(e) => {
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/api/users/" + ID + "/follow", {userId : currentUser._id})
      setFollowing(!following);
      const res = await axios.get("http://localhost:8800/api/users/" + currentUser._id)
      setCurrentUser(res.data)
    }
    catch (err){
      console.log(err)
    }
  }
  

  return (
    <div className="profile">
      <div className="images">
        {
          auther.coverPicture ?
          <img
            src={process.env.REACT_APP_Image_Path + auther.coverPicture}
            alt=""
            className="cover"
          /> :
          <img
            src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
            className="cover"
          />
        }
        {
          auther.profilePicture ? 
          <img
            src= {process.env.REACT_APP_Image_Path + auther.profilePicture}
            alt=""
            className="profilePic"
          /> :
          <img
            src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
            className="profilePic"
          />
        }
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
                {auther.from ? <span>{auther.from}</span> : <span>---</span>}
              </div>
              <div className="item">
                <LanguageIcon />
                {auther.email ? <span>{auther.email}</span> : <span>---</span>}
              </div>
            </div>
            {auther._id === currentUser._id ? <button onClick={()=>{setOpenUpdate(true)}}>Update</button> : <button onClick={handleFollow}>{following ? "Following" : "Follow"}</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userId={ID}/>
      </div>
      {openUpdate && <Update setOpenUpdate = {setOpenUpdate}/>}
    </div>
  );
};

export default Profile;