import { useContext } from "react";
import "./Stories.scss"
import { AuthContext } from "../../context/authContext"

function Stories() {
    const {currentUser} = useContext(AuthContext)

    const stories = [
        {
            id: 1,
            name: "John Doe",
            img: "https://cdn.pixabay.com/photo/2023/02/01/10/37/sunset-7760143_960_720.jpg",
        },
        {
            id: 2,
            name: "John Doe",
            img: "https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_960_720.jpg",
        },
        {
            id: 3,
            name: "John Doe",
            img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg",
        },
        {
            id: 4,
            name: "John Doe",
            img: "https://cdn.pixabay.com/photo/2013/11/28/10/36/road-220058_960_720.jpg",
        },
    ];
  
    return (
    <div className='stories'>
        <div className="story">
            { currentUser.coverPicture ? <img src={process.env.REACT_APP_Image_Path + currentUser.coverPicture} alt="" /> : <img src={process.env.REACT_APP_Image_Path + "No_Image.jpg"} alt="" /> }
            <span>{currentUser.username}</span>
            <button>+</button>
        </div>
        {stories.map(story =>(
            <div className="story" key={story.id} >
                <img src={story.img} alt="" />
                <span>{story.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories