import { createContext, useState } from "react";

export const ChangeContext = createContext();

export const ChangeContextProvider = ({ children }) => {
    const [commentChange, setCommentChange] = useState(false);
    const [postChange, setPostChange] = useState(false);
    const [sortBy, setSortBy] = useState("createdAt");

    return (
        <ChangeContext.Provider
            value={{
                commentChange,
                setCommentChange,
                postChange,
                setPostChange,
                sortBy,
                setSortBy,
            }}>
            {children}
        </ChangeContext.Provider>
    );
};
