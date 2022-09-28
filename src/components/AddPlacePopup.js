import React, { useRef, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: title,
      link,
    });
    setTitle('');
    setLink('');
  };
  return (
    <PopupWithForm
      name="place"
      title="Новое место"
      labelButtonSubmit="Создать"
      ariaLabelText="Закрыть окно добавления нового места"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
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
        value={title}
        onChange={handleChangeTitle}
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
        value={link}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error input-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
