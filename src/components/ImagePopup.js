function ImagePopup(props) {
  const { link: linkImage = '', name: nameImage = '' } = props.card;
    return (
    <div className={`popup popup_type_image ${Object.keys(props.card).length > 0 && 'popup_opened'}`}>
      <div className="popup__image-container">
        <img className="popup__image" src={linkImage} alt={nameImage} />
        <p className="popup__image-description">{nameImage}</p>
        <button
          className="popup__close-icon"
          type="button"
          onClick={props.onClose}
          aria-label="Закрыть окно просмотра изображения"
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
