import { createContext, useEffect, useState } from "react";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  const [petList, setPetList] = useState([]);
  const [favoritePetList, setFavoritePetList] = useState([]);

  const initializePetList = (petData) => {
    setPetList(petData);
  };

  const addFavoritePet = (petData) => {
    setFavoritePetList([...favoritePetList, petData]);
  };

  const deleteFavoritePet = (petData) => {
    const filteredList = favoritePetList.filter(
      (petItem) => petItem !== petData
    );
    setFavoritePetList(filteredList);
  };

  const values = {
    petList,
    favoritePetList,
    initializePetList,
    addFavoritePet,
    deleteFavoritePet,
  };

  return <MainContext.Provider value={values}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
