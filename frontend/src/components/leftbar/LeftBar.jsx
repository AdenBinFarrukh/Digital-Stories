import React from "react";
import "./LeftBar.scss";
import { Link } from "react-router-dom";

import podium from "../../assets/LeftbarIcons/podium.png";
import engagement from "../../assets/LeftbarIcons/engagement.png";
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

                <Link
                    to={`/engagements`}
                    style={{ textDecoration: "none", color: "inherit" }}>
                    <div className="menu">
                        {/* https://icons8.com/icon/IDcKFlDBwbdx/friends */}
                        <img src={engagement} alt="" />
                        <span>Engagements</span>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default LeftBar;
