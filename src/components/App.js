import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    api.getCardInfo().then((dataCardInfo) => {
      setCards([...dataCardInfo]);
    });
  }, []);

  useEffect(() => {
    api.getUserInfo().then((dataUser) => {
      setCurrentUser(dataUser);
    });
  }, []);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(
      (userLiked) => userLiked._id === currentUser._id
    );
    api.changeLikeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };
  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
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
    setSelectedCard({});
  };
  const handleUpdateUser = ({ name, about }) => {
    api
      .editProfile(name, about)
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .then(() => closeAllPopups());
  };
  const handleUpdateAvatar = ({ avatar }) => {
    api
      .apdateAvatar(avatar)
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .then(() => closeAllPopups());
  };
  const handleAddPlaceSubmit = ({ name, link }) => {
    api.addNewCard(name, link).then((newCard) => {
      setCards([newCard, ...cards])
    })
    .then(() => closeAllPopups());
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="container">
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
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
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          labelButtonSubmit="Сохранить"
          ariaLabelText="Закрыть окно подтверждения удаления карточки"
        ></PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
