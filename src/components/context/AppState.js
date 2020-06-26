import React, { useReducer, useEffect } from "react";
import AppContext from "./appContext";
import AppReducer from "./AppReducer";
import { SEARCH_USERS } from "../types";

const AppState = (props) => {
  const [state, dispatch] = useReducer(AppReducer, {
    users: [],
    favoriteUsers: [],
    isLoading: false,
    genderMale: true,
    isChecked: true,
    isUserExists: false,
    modal: false,
    isHeight: false,
    index: 0,
    rating: 0,
    numberFetchedUsers: 10,
  });

  useEffect(() => {
    // check if any data is in local storage
    let dataInLocalStorage = JSON.parse(localStorage.getItem("users"));

    // if it not return undefined
    if (dataInLocalStorage === null) return undefined;
    else if (
      state.favoriteUsers.length === 0 &&
      dataInLocalStorage.length !== 0
    )
      dispatch({
        type: PUT_FAVORITE,
        user: dataInLocalStorage,
      });
  });

  // it change and increase index of users array
  const handleChangeIndexNext = () => {
    dispatch({ type: SET_INCREMENT, by: 1 });
  };

  // it change and decreases index of users array
  const handleChangeIndexPrevius = () => {
    dispatch({ type: SET_DECREMENT, by: 1 });
    dispatch({ type: SET_RATE, rate: state.rating });
  };

  // function check is person already has been added fovorite bookmark
  const handleIsUserExists = () => {
    dispatch({ type: IS_USER_EXISTS, set: false });
  };

  // changing values to search only male persons
  const handleChangeGenderMale = () => {
    dispatch({ type: SET_GENDER, to: true });
    dispatch({ type: SET_CHECKED, to: true });
  };

  // changing values to search only famale persons
  const handleChangeGenderFemale = () => {
    dispatch({ type: SET_GENDER, to: false });
    dispatch({ type: SET_CHECKED, to: false });
  };

  // set value to state.rating how many star were pressed
  const handleSetRate = (value) => {
    dispatch({ type: SET_RATE, payload: value });
  };

  // update the state.rating provided from the favorite array how many stars the user has
  const handleSetRateFromModal = (value) => {
    dispatch({ type: SET_RATE, payload: value });
  };

  // saving data in the localStorage and favorite array
  const handlePutToFavorite = (user) => {
    // check person is already exists in favorite array
    if (!state.favoriteUsers.includes(user)) {
      // save to favorite person to state
      dispatch({ type: PUT_FAVORITE, user: [...state.favoriteUsers, user] });

      // also save person in local storage
      let dataFromLS = JSON.parse(localStorage.getItem("users"));

      // if data in local storage is empty assign empty array
      if (dataFromLS === null) dataFromLS = [];

      // push new object to array
      const data = [...dataFromLS, user];

      // set the local storage
      localStorage.setItem("users", JSON.stringify(data));
    } else dispatch({ type: IS_USER_EXISTS, set: true });
  };

  // delete favorite person from modal and local storage
  const handleDeleteUser = (userIndex) => {
    // delete person from DOM
    dispatch({ type: DELETE_USER, by: userIndex });

    // delete person from localStorage
    let dataFromLS = JSON.parse(localStorage.getItem("users"));

    const data = [...dataFromLS];

    data.splice(userIndex, 1);

    localStorage.setItem("users", JSON.stringify(data));

    // if favoriteUsers is empty set state.modal for false because when we add a person again to favoriteUsers modal will open automatically. Modal is set to check is any favoriteUsers array have any item
    state.favoriteUsers.length === 1 && dispatch({ type: CLOSE_MODAL });
  };

  // show modal
  const handleShowModal = () => {
    dispatch({ type: SHOW_MODAL });
  };

  //close modal
  const handleCloseModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  // Search users
  const handleGetUsers = () => {
    // clear array users data when searching diffrent the gender and set isLoading for ture
    dispatch({ type: SET_USERS });

    // set loading state from reducer
    setTimeout(() => {
      dispatch({ type: SET_LOADING });
    }, 1000);

    // set height state from reducer to active animation
    dispatch({ type: SET_HEIGHT, to: true });

    // set height state to false to disactive animation
    setTimeout(() => {
      dispatch({ type: SET_HEIGHT, to: false });
    }, 1000);

    // objects that hold messages that will be add to fetched data
    const randomText = [
      { text: "and I would love to meet you" },
      { text: "you want to date a coffee with me" },
      { text: "maybe we will go to the cinema together ?" },
      { text: "I am looking for a person to meet together" },
      { text: "I am looking for adventure" },
      { text: "I'm looking for someone at lonely nights" },
      { text: "email me if you are lonely" },
      { text: "don't be so shy, just send me an email" },
    ];

    // feching users data from http api
    setTimeout(() => {
      try {
        fetch(
          `https://randomuser.me/api/?results=${
            state.numberFetchedUsers
          }&gender=${state.genderMale ? "male" : "female"}`
        )
          .then((respond) => respond.json())
          .then((data) => {
            const users = data.results;

            //on fetched data put one message to each single user
            users.forEach((user) => {
              for (let i = 0; i < state.numberFetchedUsers; i++) {
                const msgIndex = Math.floor(Math.random() * randomText.length);
                user.msg = randomText[msgIndex];
                user.rating = 0;
              }
            });

            // put all fetched data to state
            dispatch({
              type: SEARCH_USERS,
              payload: [...users],
            });
          });
      } catch (error) {
        throw error(error);
      }
    }, 3000);
  };

  return (
    <AppContext.Provider
      value={{
        users: state.users,
        favoriteUsers: state.favoriteUsers,
        isLoading: state.isLoading,
        genderMale: state.genderMale,
        isChecked: state.isChecked,
        isUserExists: state.isUserExists,
        modal: state.modal,
        isHeight: state.isHeight,
        index: state.index,
        rating: state.rating,
        numberFetchedUsers: state.numberFetchedUsers,
        handleSetRate,
        handleSetRateFromModal,
        handleGetUsers,
        handleChangeGenderMale,
        handleChangeGenderFemale,
        handleChangeIndexNext,
        handleChangeIndexPrevius,
        handleIsUserExists,
        handlePutToFavorite,
        handleDeleteUser,
        handleShowModal,
        handleCloseModal,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
