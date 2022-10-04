import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import { CurrentIsLoading } from '../context/CurrentIsLoading.js';
import ConfirmCardRemovePopup from './ConfirmCardRemovePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmCardRemovePopupOpen, setIsConfirmCardRemovePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardOnDelete, setCardOnDelete] = useState({});

  useEffect(() => {
    api
      .getCardInfo()
      .then((dataCardInfo) => {
        setCards([...dataCardInfo]);
      })
      .catch((err) => console.log(err));
    api
      .getUserInfo()
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(
      (userLiked) => userLiked._id === currentUser._id
    );
    api
      .changeLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };
  const handleConfirmDeleteClick = (card) => {
    setIsConfirmCardRemovePopupOpen(true);
    setCardOnDelete(card);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmCardRemovePopupOpen(false);
    setSelectedCard({});
    setCardOnDelete({});
  };
  const useFetching = (callback) => {
    return (...args) => {
      setIsLoading(true);
      callback(...args)
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          closeAllPopups();
          setIsLoading(false);
        });
    };
  };
  const handleUpdateUser = useFetching(({ name, about }) => {
    return api.editProfile(name, about).then((dataUser) => {
      setCurrentUser(dataUser);
    });
  });
  const handleUpdateAvatar = useFetching(({ avatar }) => {
    return api.apdateAvatar(avatar).then((dataUser) => {
      setCurrentUser(dataUser);
    });
  });
  const handleAddPlaceSubmit = useFetching(({ name, link }) => {
    return api.addNewCard(name, link).then((newCard) => {
      setCards([newCard, ...cards]);
    });
  });
  const handleCardDelete = useFetching(() => {
    return api.deleteCard(cardOnDelete._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== cardOnDelete._id));
    });
  });
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentIsLoading.Provider value={isLoading}>
        <div className="page">
          <div className="container">
            <Header />
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeleteClick}
              cards={cards}
            />
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ConfirmCardRemovePopup
            isOpen={isConfirmCardRemovePopupOpen}
            onClose={closeAllPopups}
            onDelete={handleCardDelete}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </CurrentIsLoading.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
