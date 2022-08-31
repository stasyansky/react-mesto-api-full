import React, { useContext } from 'react';
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <img
                    className="profile__avatar"
                    src={currentUser.avatar}
                    alt="Фотография аватара"
                    onClick={onEditAvatar}
                />
                <div className="profile__container">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        onClick={onEditProfile}
                        className="profile__edit-btn"
                        aria-label="Редактировать профиль">
                    </button>
                    <p className="profile__prof">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    onClick={onAddPlace}
                    className="profile__add-btn"
                    aria-label="Добавить фото">
                </button>
            </section>
            <section className="places">
                <ul className="places__cards">
                    {cards.map(card => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Main;
