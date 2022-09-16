function Card(props) {
  return (
    <div className="place__element">
      <img
        className="place__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={() => props.onCardClick(props.card)}
      />
      <div className="place__description">
        <h2 className="place__name-city">{props.card.name}</h2>
        <div className="place__score">
          <button
            className="place__like"
            type="button"
            aria-label="Поставить или убрать лайк"
          ></button>
          <span className="place__count-like">{props.card.likes.length}</span>
        </div>
      </div>
      <button
        className="place__button-remove"
        type="button"
        aria-label="Удалить карточку"
      ></button>
    </div>
  );
}
export default Card;
