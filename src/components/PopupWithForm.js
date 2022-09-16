function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name}`}>
      <div className={`popup__body popup__body_location_${props.name}`}>
        <h2 className={`popup__title popup__title_location_${props.name}`}>
          {props.title}
        </h2>
        <form
          className={`popup__form popup__form_location_${props.name}`}
          name={`popup__form_location_${props.name}`}
          noValidate
        >
          {props.children}
          <button className="popup__button" type="submit">
            {props.labelButtonSubmit}
          </button>
        </form>
        <button
          className="popup__close-icon"
          type="button"
          aria-label={props.ariaLabelText}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;