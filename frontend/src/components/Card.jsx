import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    function handleClick() {
        onCardClick({link: card.link, name: card.name});
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card">
            {isOwn && <button type="button" className="card__delete" onClick={handleDeleteClick}></button>}
            <img
                className="card__pic"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <div className="card__caption">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__likes">
                    <button
                        type="button"
                        className={`card__like ${isLiked ? 'card__like_active' : ''}`}
                        aria-label="Поставить лайк"
                        onClick={handleLikeClick}>
                    </button>
                    <span className="card__count">{card.likes.length}</span>
                </div>
            </div>
        </li>
    );
};

export default Card;
