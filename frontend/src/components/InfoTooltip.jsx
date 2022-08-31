import React from 'react';
import comfirmTruePath from '../images/tooltiptrue.svg';
import confirmFalsePath from '../images/tooltipfalse.svg';

function InfoTooltip({ isOpen, onClose, isConfirm }) {

    return (
        <div
            tabIndex="-1"
            className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ''}`}
            onClick={onClose}
        >
            <div className="popup__tooltip" onClick={event => event.stopPropagation()}>
                <button
                    type="button"
                    className="popup__close-btn"
                    aria-label="Закрыть попап"
                    onClick={onClose}
                >
                </button>
                {isConfirm ? (
                    <>
                        <img
                            src={comfirmTruePath}
                            alt="Регистрация выполнена"
                            className="popup__tooltip_image"
                        />
                        <p className="popup__tooltip_text">
                            Вы успешно зарегистрировались!
                        </p>
                    </>
                ) : (
                    <>
                        <img
                            src={confirmFalsePath}
                            alt="Регистрация не выполнена"
                            className="popup__tooltip_image"
                        />
                        <p className="popup__tooltip_text">
                            Что-то пошло не так. Попробуйте ещё раз!
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoTooltip;
