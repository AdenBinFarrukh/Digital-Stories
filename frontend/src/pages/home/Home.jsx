import Posts from "../../components/posts/Posts";
// import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
import { AuthContext } from "../../context/authContext";
import "./Home.scss";
import { useContext } from "react";

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="home">
            {/* <Stories/> */}
            <Share />
            <Posts userId={currentUser._id} />
        </div>
    );
};

export default Home;
