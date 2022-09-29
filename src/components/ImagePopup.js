function ImagePopup(props) {
  const isEmpty = Object.keys(props.card).length == 0;
  return (
    !isEmpty && (
      <div
        className="popup popup_type_image popup_opened"
        onClick={props.onClose}
      >
        <div
          className="popup__image-container"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.name}
          />
          <p className="popup__image-description">{props.card.name}</p>
          <button
            className="popup__close-icon"
            type="button"
            onClick={props.onClose}
            aria-label="Закрыть окно просмотра изображения"
          ></button>
        </div>
      </div>
    )
  );
}

export default ImagePopup;
