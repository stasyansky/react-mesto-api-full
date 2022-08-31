import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div
            tabIndex="-1"
            className={`popup popup-preview ${card.link ? 'popup_opened' : ''}`}
            onClick={onClose}
        >
            <div className="popup-preview__container" onClick={event => event.stopPropagation()}>
                <button
                    type="button"
                    className="popup__close-btn popup-preview__close-btn"
                    aria-label="Закрыть окно"
                    onClick={onClose}
                >
                </button>
                <img
                    className="popup-preview__img"
                    src={card.link}
                    alt={card.name}
                />
                <p className="popup-preview__text">{card.name}</p>
            </div>
        </div>
    );
};

export default ImagePopup;
