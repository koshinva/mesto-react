import React, { useEffect, useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import { CurrentUserContext } from '../context/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api.getUserInfo().then((dataUser) => {
      setCurrentUser(dataUser);
    });
  }, []);

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
          />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithForm
          name="place"
          title="Новое место"
          labelButtonSubmit="Создать"
          ariaLabelText="Закрыть окно добавления нового места"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_value_title"
            id="input-title"
            type="text"
            name="title"
            autoComplete="off"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="popup__input-error input-title-error"></span>
          <input
            className="popup__input popup__input_value_link"
            id="input-link"
            type="url"
            name="link"
            autoComplete="off"
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__input-error input-link-error"></span>
        </PopupWithForm>
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          labelButtonSubmit="Сохранить"
          ariaLabelText="Закрыть окно подтверждения удаления карточки"
        ></PopupWithForm>
        <PopupWithForm
          name="change-avatar"
          title="Обновить аватар"
          labelButtonSubmit="Да"
          ariaLabelText="Закрыть окно изменения аватара профиля"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            className="popup__input popup__input_value_link-avatar"
            id="input-avatar"
            type="url"
            name="avatar"
            autoComplete="off"
            required
          />
          <span className="popup__input-error input-avatar-error"></span>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
