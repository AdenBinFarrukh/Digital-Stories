import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./update.scss";

function Update({ setOpenUpdate }) {
    const [profile, setProfile] = useState(null);
    const [cover, setCover] = useState(null);
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [data, setData] = useState({
        userId: currentUser._id,
        username: currentUser.username,
        from: currentUser.from,
        email: currentUser.email,
    });

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            if (cover) {
                console.log(cover);
                const formData = new FormData();
                formData.append("file", cover);
                const res = await axios.post(
                    "http://localhost:8800/api/upload",
                    formData
                );
                data.coverPicture = res.data.filename;
            }
            if (profile) {
                console.log(profile);
                const formData = new FormData();
                formData.append("file", profile);
                const res = await axios.post(
                    "http://localhost:8800/api/upload",
                    formData
                );
                data.profilePicture = res.data.filename;
            }
            console.log(data);
            const res = await axios.put(
                "http://localhost:8800/api/users/" + currentUser._id,
                data
            );
            console.log(res.data);
            setProfile(null);
            setCover(null);

            const newData = await axios.get(
                "http://localhost:8800/api/users/" + currentUser._id
            );
            setCurrentUser(newData.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="update">
            <div className="wrapper">
                <h1>Update Your Profile</h1>
                <form>
                    <div className="files">
                        <label htmlFor="cover">
                            <span>Cover Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={cover && URL.createObjectURL(cover)}
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="cover"
                            style={{ display: "none" }}
                            onChange={(e) => setCover(e.target.files[0])}
                        />
                        <label htmlFor="profile">
                            <span>Profile Picture</span>
                            <div className="imgContainer">
                                <img
                                    src={
                                        profile && URL.createObjectURL(profile)
                                    }
                                    alt=""
                                />
                                <CloudUploadIcon className="icon" />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profile"
                            style={{ display: "none" }}
                            onChange={(e) => setProfile(e.target.files[0])}
                        />
                    </div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={data.username}
                        name="name"
                        onChange={handleChange}
                    />
                    <label>Country / City</label>
                    <input
                        type="text"
                        name="city"
                        value={data.from}
                        onChange={handleChange}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                    />
                    <button onClick={handleClick}>Update</button>
                </form>
                <button className="close" onClick={() => setOpenUpdate(false)}>
                    close
                </button>
            </div>
        </div>
    );
}

export default Update;
