import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState();
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState();
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState();
  const [selectedCard, setSelectedCard] = React.useState({});


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
  }
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  return (
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
      <PopupWithForm  
        name="profile"
        title="Редактировать профиль"
        labelButtonSubmit="Сохранить"
        ariaLabelText="Закрыть окно редактирования профиля"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_value_name"
          id="input-name"
          type="text"
          name="name"
          autoComplete="off"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__input-error input-name-error"></span>
        <input
          className="popup__input popup__input_value_profession"
          id="input-profession"
          type="text"
          name="profession"
          autoComplete="off"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error input-profession-error"></span>
      </PopupWithForm>
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
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      {/* <template id="place-template">
        <div className="place__element">
          <img className="place__image" src="#" alt="" />
          <div className="place__description">
            <h2 className="place__name-city"></h2>
            <div className="place__score">
              <button
                className="place__like"
                type="button"
                aria-label="Поставить или убрать лайк"
              ></button>
              <span className="place__count-like"></span>
            </div>
          </div>
          <button
            className="place__button-remove"
            type="button"
            aria-label="Удалить карточку"
          ></button>
        </div>
      </template> */}
    </div>
  );
}

export default App;
