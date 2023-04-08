import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import RightBar from "./components/rightbar/RightBar";
import LeftBar from "./components/leftbar/LeftBar";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Leaderboard from "./pages/leaderboard/Leaderboard";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
    BrowserRouter,
    Navigate,
    Outlet,
    Routes,
    Route,
} from "react-router-dom";
import Trending from "./pages/trending/Trending";

function App() {
    const { currentUser } = useContext(AuthContext);
    const { darkMode } = useContext(DarkModeContext);

    const queryClient = new QueryClient();

    const Layout = () => {
        return (
            <QueryClientProvider client={queryClient}>
                <div className={`theme-${darkMode ? "dark" : "light"}`}>
                    <Navbar />
                    <div style={{ display: "flex" }}>
                        <LeftBar />
                        <Outlet />
                        <RightBar />
                    </div>
                </div>
            </QueryClientProvider>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }
        return children;
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Layout />
                            </ProtectedRoute>
                        }>
                        <Route path="/" element={<Home />} />
                        <Route path="/trending" element={<Trending />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
