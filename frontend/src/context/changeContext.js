import { createContext, useState } from "react";

export const ChangeContext = createContext();

export const ChangeContextProvider = ({ children }) => {
  const [userChange, setUserChange] = useState(false);
  const [postChange, setPostChange] = useState(false);

  return (
    <ChangeContext.Provider
      value={{ userChange, setUserChange, postChange, setPostChange }}>
      {children}
    </ChangeContext.Provider>
  );
};
