import React from 'react';
import api from '../utils/Api';
import Card from './Card.js';

function Main(props) {
  const [userName, setUserName] = React.useState('');
  const [userDescription, setUserDescription] = React.useState('');
  const [userAvatar, setUserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo().then((dataUser) => {
      setUserName(dataUser.name);
      setUserDescription(dataUser.about);
      setUserAvatar(dataUser.avatar);
    });
    api.getCardInfo().then((dataCardInfo) => {
      setCards([...dataCardInfo]);
    });
  }, []);

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
            src={userAvatar}
            alt="аватар профиля"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__button-edit"
            type="button"
            onClick={props.onEditProfile}
            aria-label="Открыть окно редактирования профиля"
          ></button>
          <p className="profile__profession">{userDescription}</p>
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
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
