import React from 'react';

function PopupWithForm({ name, title, buttonText, children, isOpen, onClose, onSubmit }) {
    return (
        <div
            tabIndex="-1"
            className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ''}`}
            onClick={onClose}
        >
            <div className="popup__container" onClick={event => event.stopPropagation()}>
                <button
                    type="button"
                    className="popup__close-btn"
                    aria-label="Закрыть попап"
                    onClick={onClose}
                >
                </button>
                <form
                    name={name}
                    className={`popup__form popup__form_${name}`}
                    onSubmit={onSubmit}
                    noValidate
                >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button
                        type="submit"
                        className="popup__btn"
                        aria-label="Кнопка сохранить"
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
