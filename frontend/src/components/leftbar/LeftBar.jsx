import React from "react";
import "./LeftBar.scss";
import { Link } from "react-router-dom";

import podium from "../../assets/LeftbarIcons/podium.png";
import groupsIcon from "../../assets/LeftbarIcons/groups.png";
import memoriesIcon from "../../assets/LeftbarIcons/memories1.png";
import videoIcon from "../../assets/LeftbarIcons/video2.png";
import trending from "../../assets/LeftbarIcons/trending.png";

function LeftBar() {
    // https://icons8.com
    return (
        <div className="leftbar">
            <div className="container">
                <Link
                    to={`/leaderboard`}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="menu">
                        {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                        <img src={podium} alt="" />
                        <span>Leaderboard</span>
                    </div>
                </Link>

                <Link
                    to={`/trending`}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="menu">
                        {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                        <img src={trending} alt="" />
                        <span>Trending</span>
                    </div>
                </Link>

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
