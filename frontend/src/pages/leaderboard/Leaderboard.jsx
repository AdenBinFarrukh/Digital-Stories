import React, { useEffect, useState } from "react";
import "./Leaderboard.scss";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import axios from "axios";

const Leaderboard = () => {
    const [loading, setLoading] = useState(false);
    const [Leaders, setLeaders] = useState([]);

    useEffect(() => {
        const getLeaders = async () => {
            setLoading(true);
            const res = await axios.get(
                "http://localhost:8800/api/users/List/leaders"
            );

            setLoading(false);
            setLeaders(res.data);
        };
        getLeaders();
    }, []);

    return (
        <div className="leaders">
            {loading ? (
                <ReactLoading
                    type={"spin"}
                    color={"#000"}
                    height={50}
                    width={50}
                />
            ) : (
                Leaders.map((leader) => (
                    <div className="leader" key={leader.username}>
                        <Link
                            to={`/profile/641d79420b351951ccf0e2eb`}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                            }}>
                            <div className="info">
                                {leader.profilePicture ? (
                                    <img
                                        src={
                                            process.env.REACT_APP_Image_Path +
                                            leader.profilePicture
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
                                <span>{leader.username}</span>
                            </div>
                        </Link>

                        <span className="points">
                            Points : {leader.totalPoints}
                        </span>
                    </div>
                ))
            )}
            {/* {(<img
                    src={
                        process.env.REACT_APP_Image_Path + leader.profilePicture
                    }
                    alt=""
                />
                <span>{leader.username}</span>)} */}
        </div>
    );
};

export default Leaderboard;
