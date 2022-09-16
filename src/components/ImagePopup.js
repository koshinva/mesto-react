function ImagePopup() {
  return (
    <div className="popup popup_type_image">
      <div className="popup__image-container">
        <img className="popup__image" src="#" alt="" />
        <p className="popup__image-description"></p>
        <button
          className="popup__close-icon"
          type="button"
          aria-label="Закрыть окно просмотра изображения"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;