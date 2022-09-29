import React, { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
        name,
        about: description,
    });
  };
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      labelButtonSubmit="Сохранить"
      ariaLabelText="Закрыть окно редактирования профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_value_name"
        id="input-name"
        type="text"
        name="name"
        autoComplete="off"
        placeholder="Имя пользователя"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleChangeName}
      />
      <span className="popup__input-error input-name-error"></span>
      <input
        className="popup__input popup__input_value_profession"
        id="input-profession"
        type="text"
        name="profession"
        autoComplete="off"
        placeholder="Информация о пользователе"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleChangeDescription}
      />
      <span className="popup__input-error input-profession-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
