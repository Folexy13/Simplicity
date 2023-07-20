import React, { createContext, useState } from "react";

interface AppContextProps {
  selectedFile: File | any;
  setSelectedFile: React.Dispatch<React.SetStateAction<File>> | any;
  fileContent: File | any;
  setFileContent: React.Dispatch<React.SetStateAction<File>> | any;
  categoryCount: number;
  setCategoriesCount: React.Dispatch<React.SetStateAction<File>> | any;
  token: string | null;
  setToken: (token: string | null) => void;
}

const AppContext = createContext<AppContextProps>({
  selectedFile: null,
  setSelectedFile: () => {},
  fileContent: null,
  setFileContent: () => {},
  categoryCount: 0,
  setCategoriesCount: () => {},
  token: null,
  setToken: () => {},
});

export const AppContextProvider: React.FC<any> = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState(null);
  const [categoryCount, setCategoriesCount] = useState(0);
  const [token, setToken] = useState<string | null>(null);
  return (
    <AppContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        fileContent,
        setFileContent,
        categoryCount,
        setCategoriesCount,
        token,
        setToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContext;
