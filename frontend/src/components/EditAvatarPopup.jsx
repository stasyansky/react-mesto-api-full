import React, { useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    useEffect(() => {
        inputAvatarRef.current.value = '';
    }, [isOpen]);

    const inputAvatarRef = useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputAvatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            buttonText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                type="url"
                id="avatar"
                name="popupAvatar"
                className="popup__input popup__input_type_avatar"
                ref={inputAvatarRef}
                defaultValue=""
                placeholder="Введите url картинки"
                required
            />
            <span className="popup__text-error" id="avatar-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;
