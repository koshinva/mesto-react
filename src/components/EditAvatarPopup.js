import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar.current.value,
    });
    avatar.current.value = '';
  };
  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      labelButtonSubmit="Да"
      ariaLabelText="Закрыть окно изменения аватара профиля"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_value_link-avatar"
        id="input-avatar"
        type="url"
        name="avatar"
        autoComplete="off"
        required
        ref={avatar}
      />
      <span className="popup__input-error input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
