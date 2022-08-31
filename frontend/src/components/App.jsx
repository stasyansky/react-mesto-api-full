import React, { useState, useEffect } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth"
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import '../index.css';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = useState(false);
    const [isConfirm, setIsConfirm] = React.useState(false);
    const [email, setEmail] = React.useState("test@mail.com");
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loggedIn &&
        api.getInitialCards()
            .then((cards) => {
                setCards(cards);
            })
            .catch(err => console.error(err));
    }, [loggedIn]);

    useEffect(() => {
        loggedIn &&
        api.getUserInfo()
            .then((userData) => {
                setCurrentUser(userData);
            })
            .catch(err => console.error(err));
    }, [loggedIn]);

    useEffect(() => {
        const token = localStorage.getItem('jwt')
        auth.checkToken(token)
            .then((res) => {
                setLoggedIn(true);
                setEmail(res.data.email);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.error("400 — Токен не передан или передан не в том формате");
                } else if (err.status === 401) {
                    console.error("401 — Переданный токен некорректен");
                }
            })
    }, [navigate]);

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.toggleLike({cardId: card._id, isLikedByMe: isLiked})
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.error(err));
    }

    function handleCardDelete(card) {
        api.cardDelete(card._id)
            .then(() => setCards((state) => state.filter(c => c._id !== card._id)))
            .catch(err => console.error(err));
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard({link: card.link, name: card.name});
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoToolTipPopupOpen(false);
        setSelectedCard({});
    }
    
    function handleUpdateUser({ name, about }) {
        api.editUserInfo({ name, about })
            .then((userInfo) => {
                setCurrentUser(userInfo);
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    }

    function handleUpdateAvatar({ avatar }) {
        api.avatarUpdate(avatar)
            .then(() => {
                setCurrentUser({ ...currentUser, avatar });
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.postNewCard({ name, link })
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => console.error(err));
    }

    function handleSignOut() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
    }

    function handleSignIn({email, password}) {
        auth
        .onLogin({email, password})
            .then(() => {
                setLoggedIn(true);
                setEmail(email);
                navigate('/', { replace: true });
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.error("400 - не передано одно из полей");
                } else if (err.status === 401) {
                    console.error("401 - пользователь с email не найден");
                }
            });
    }

    function handleSignUp({email, password}) {
        auth
            .onRegister({email, password})
            .then(() => {
                setIsInfoToolTipPopupOpen(true);
                setIsConfirm(true);
                navigate('/sign-in', { replace: true });
            })
            .catch((err) => {
                if (err.status === 400) {
                    console.error("400 - некорректно заполнено одно из полей");
                }
                setIsInfoToolTipPopupOpen(true);
                setIsConfirm(false);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header email={email} handleSignOut={handleSignOut} />
                <Routes>
                    <Route path='/signin' element={<Login handleSignIn={handleSignIn} />} />
                    <Route path='/signup' element={<Register handleSignUp={handleSignUp} />} />
                    <Route element={<ProtectedRoute isLogin={loggedIn} />}>
                        <Route path='/' element={
                            <Main
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                            />
                        } />
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
                {loggedIn && <Footer />}

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithForm
                    name='delete'
                    title='Вы уверены?'
                    buttonText='Да'
                    onClose={closeAllPopups}
                >
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={isInfoToolTipPopupOpen}
                    onClose={closeAllPopups}
                    isConfirm={isConfirm}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
