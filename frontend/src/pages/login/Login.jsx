import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Login.scss";
import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const [err, setErr] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    //Handle Login
    const { login, currentUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(inputs);

            await axios.put("/api/users/" + currentUser._id, {
                userId: currentUser._id,
                logged_in: true,
            });

            navigate("/");
        } catch (err) {
            if (err.response) {
                setErr(err.response.data);
            } else {
                setErr(err.message);
            }
        }
    };

    return (
        <div className="login">
            <div className="card">
                <div
                    className="left"
                    style={{
                        background: `linear-gradient(rgba(39, 11, 96, 0.5),rgba(39, 11, 96, 0.5)), url('${
                            process.env.REACT_APP_Image_Path + "Login.jpg"
                        }') center`,
                    }}>
                    <h1>Digital Stories</h1>
                    <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
                    </p>
                    <span>Don't have an account</span>
                    <Link to="/register">
                        <button>register</button>
                    </Link>
                </div>

                <div className="right">
                    <h1>Login</h1>
                    <form>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        {err && err}
                        <button onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
