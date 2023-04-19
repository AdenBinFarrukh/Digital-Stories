import { useContext } from "react";
import "./Stories.scss";
import { AuthContext } from "../../context/authContext";
import story1 from "../../assets/story1.jpg";
import story2 from "../../assets/story2.jpg";
import story3 from "../../assets/story3.jpg";
import story4 from "../../assets/story4.jpg";

function Stories() {
    const { currentUser } = useContext(AuthContext);

    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: story1,
        },
        {
            id: 2,
            name: "John Doe",
            img: story2,
        },
        {
            id: 3,
            name: "John Doe",
            img: story3,
        },
        {
            id: 4,
            name: "John Doe",
            img: story4,
        },
    ];

    return (
        <div className="stories">
            <div className="story">
                {currentUser.coverPicture ? (
                    <img
                        src={
                            process.env.REACT_APP_Image_Path +
                            currentUser.coverPicture
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
                <button>+</button>
            </div>
            {stories.map((story) => (
                <div className="story" key={story.id}>
                    <img src={story.img} alt="" />
                    <span>{story.name}</span>
                </div>
            ))}
        </div>
    );
}

export default Stories;
