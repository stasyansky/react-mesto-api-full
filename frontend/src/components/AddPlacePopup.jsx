import React, { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlace, onClose }) {

    useEffect(() => {
        inputTitlePicRef.current.value = '';
        inputLinkPicRef.current.value = '';
    }, [isOpen]);

    const inputTitlePicRef = useRef('');
    const inputLinkPicRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: inputTitlePicRef.current.value,
            link: inputLinkPicRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name='add'
            title='Новое место'
            buttonText='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="text"
                id="title"
                name="popupTitle"
                minLength="2"
                maxLength="30"
                className="popup__input popup__input_type_title"
                ref={inputTitlePicRef}
                defaultValue=""
                placeholder="Название"
                required
            />
            <span className="popup__text-error" id="title-error"></span>
            <input
                type="url"
                id="url"
                name="popupUrl"
                className="popup__input popup__input_type_url"
                ref={inputLinkPicRef}
                defaultValue=""
                placeholder="Ссылка на картинку"
                required
            />
            <span className="popup__text-error" id="url-error"></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
