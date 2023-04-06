import React from "react";
import "./LeftBar.scss";
import podium from "../../assets/LeftbarIcons/podium.png";
import galleryIcon from "../../assets/LeftbarIcons/gallery.png";
import groupsIcon from "../../assets/LeftbarIcons/groups.png";
import memoriesIcon from "../../assets/LeftbarIcons/memories1.png";
import videoIcon from "../../assets/LeftbarIcons/video2.png";

function LeftBar() {
    // https://icons8.com
    return (
        <div className="leftbar">
            <div className="container">
                <div className="menu">
                    {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                    <img src={podium} alt="" />
                    <span>Leaderboard</span>
                </div>

                <div className="menu">
                    {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                    <img src={galleryIcon} alt="" />
                    <span>Gallery</span>
                </div>

                <div className="menu">
                    {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                    <img src={groupsIcon} alt="" />
                    <span>Groups</span>
                </div>

                <div className="menu">
                    {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                    <img src={memoriesIcon} alt="" />
                    <span>Memories</span>
                </div>

                <div className="menu">
                    {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                    <img src={videoIcon} alt="" />
                    <span>Video</span>
                </div>
            </div>
        </div>
    );
}

export default LeftBar;
