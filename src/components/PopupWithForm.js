import { useContext } from 'react';
import { CurrentIsLoading } from '../context/CurrentIsLoading';

function PopupWithForm(props) {
  const isLoading = useContext(CurrentIsLoading);
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && 'popup_opened'
      }`}
      onClick={props.onClose}
    >
      <div
        className={`popup__body popup__body_location_${props.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={`popup__title popup__title_location_${props.name}`}>
          {props.title}
        </h2>
        <form
          className={`popup__form popup__form_location_${props.name}`}
          name={`popup__form_location_${props.name}`}
          noValidate
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__button" type="submit">
            {isLoading ? 'Сохранение...' : `${props.labelButtonSubmit}`}
          </button>
        </form>
        <button
          className="popup__close-icon"
          type="button"
          aria-label={props.ariaLabelText}
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
