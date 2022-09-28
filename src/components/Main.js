import React, { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import api from '../utils/Api';
import Card from './Card.js';

function Main(props) {
  const [cards, setCards] = React.useState([]);
  const currentUser = useContext(CurrentUserContext);

  React.useEffect(() => {
    api.getCardInfo().then((dataCardInfo) => {
      setCards([...dataCardInfo]);
    });
  }, []);

  const handleCardClick = (card) => {
    const isLiked = card.likes.some(
      (userLiked) => userLiked._id === currentUser._id
    );
    api.likeCard(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  };
  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
  };
  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__button-change-avatar"
          type="button"
          onClick={props.onEditAvatar}
          aria-label="Открыть окно изменения аватара профиля"
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватар профиля"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__button-edit"
            type="button"
            onClick={props.onEditProfile}
            aria-label="Открыть окно редактирования профиля"
          ></button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={props.onAddPlace}
          aria-label="Открыть окно добавления карточки"
        ></button>
      </section>
      <section className="place">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={handleCardClick}
            onCardDelete={handleCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
