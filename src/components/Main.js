function Main() {
  function handleEditAvatarClick() {
    document.querySelector('.popup_type_change-avatar').classList.add('popup_opened');
  }
  function handleEditProfileClick() {
    document.querySelector('.popup_type_profile').classList.add('popup_opened');
  }
  function handleAddPlaceClick() {
    document.querySelector('.popup_type_place').classList.add('popup_opened');
  }
  return (
    <main className="main">
      <section className="profile">
        <button
          className="profile__button-change-avatar"
          type="button"
          onClick={handleEditAvatarClick}
          aria-label="Открыть окно изменения аватара профиля"
        >
          <img className="profile__avatar" src="#" alt="аватар профиля" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name"></h1>
          <button
            className="profile__button-edit"
            type="button"
            onClick={handleEditProfileClick}
            aria-label="Открыть окно редактирования профиля"
          ></button>
          <p className="profile__profession"></p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          onClick={handleAddPlaceClick}
          aria-label="Открыть окно добавления карточки"
        ></button>
      </section>
      <section className="place"></section>
    </main>
  );
}

export default Main;
