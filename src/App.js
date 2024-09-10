import MainContextProvider from "./context/mainContext";
import { useEffect, useContext, useState } from "react";
import { MainContext } from "./context/mainContext";

import "./styles.css";

const Header = () => {
  return <h1>PetGallery</h1>;
};

const PetCard = ({ petObject }) => {
  const { addFavoritePet } = useContext(MainContext);

  return (
    <section className="container-galley">
      <div>
        <img src={petObject} alt="" width="200px" />
      </div>
      <div>
        <button onClick={() => addFavoritePet(petObject)}>
          Add to favorites
        </button>
      </div>
    </section>
  );
};

const FavoritePetCard = ({ petObject }) => {
  const { deleteFavoritePet } = useContext(MainContext);

  return (
    <section className="container-galley">
      <div>
        <img src={petObject} alt="" width="200px" />
      </div>
      <div>
        <button onClick={() => deleteFavoritePet(petObject)}>
          Delete from favorites
        </button>
      </div>
    </section>
  );
};

const PetGallery = () => {
  const petNumer = 5;
  const petUrl = `https://dog.ceo/api/breeds/image/random/${petNumer}`;
  const { initializePetList, petList } = useContext(MainContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        const petData = await fetch(petUrl);
        const parsedPetData = await petData.json();
        initializePetList(parsedPetData.message);
        console.log(parsedPetData.message);
      } catch (error) {
        console.error("Error in data fetching", error);
      } finally {
        setIsLoading(!isLoading);
      }
    };
    fetchPetData();
  }, []);

  if (isLoading) {
    return <h1>The Pet Gallery is loading...</h1>;
  }

  return (
    <div>
      <div>
        {petList.map((petElement) => {
          return <PetCard key={petElement} petObject={petElement} />;
        })}
      </div>
    </div>
  );
};

const FavoriteGallery = () => {
  const [hasFavoritePets, setHasFavoritePets] = useState(false);
  const { favoritePetList } = useContext(MainContext);

  if (favoritePetList.length === 0) {
    return <h1>There are no favorite pets yet</h1>;
  }

  return (
    <div>
      <h1>Favorite Gallery</h1>
      {favoritePetList.map((petItem) => {
        return <FavoritePetCard key={petItem} petObject={petItem} />;
      })}
    </div>
  );
};

export default function App() {
  return (
    <div className="App">
      <Header />
      <MainContextProvider>
        <PetGallery />
        <FavoriteGallery />
      </MainContextProvider>
    </div>
  );
}
