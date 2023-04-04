import "./RightBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function RightBar() {
  const [connList, setConnList] = useState([]);

  const { currentUser } = useContext(AuthContext);

  //* Get list of connections
  useEffect(() => {
    const connections = async () => {
      const res = await axios.get(
        "http://localhost:8800/api/users/" + currentUser._id + "/friends"
      );
      setConnList(res.data);
    };
    connections();
  }, [currentUser]);

  console.log(connList);

  return (
    <div className="rightbar">
      <div className="container">
        <div className="item">
          <span>Updates</span>

          <div className="user">
            <div className="userInfo">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/29/05/55/adult-1867665_960_720.jpg"
                alt=""
              />

              <p>
                <span>Aden</span> update
              </p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>

        <div className="item">
          <span>Connections</span>
          {connList.map((conn) => (
            <div className="user" key={conn.username}>
              <div className="userInfo">
                {conn.profilePicture ? (
                  <img
                    src={process.env.REACT_APP_Image_Path + conn.profilePicture}
                    alt=""
                  />
                ) : (
                  <img
                    src={process.env.REACT_APP_Image_Path + "No_Image.jpg"}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RightBar;
