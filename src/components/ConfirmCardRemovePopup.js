import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmCardRemovePopup({ isOpen, onClose, onDelete }) {
  const handleDeleteCard = (e) => {
    e.preventDefault();
    onDelete();
  }
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      labelButtonSubmit="Да"
      ariaLabelText="Закрыть окно подтверждения удаления карточки"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteCard}
    ></PopupWithForm>
  );
}

export default ConfirmCardRemovePopup;
