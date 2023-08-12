import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
  login as userLogin,
  register,
  editProfile,
  fetchUserFriends,
} from '../api';
import jwt from 'jwt-decode';
import {
  setItemInLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  getItemFromLocalStorage,
} from '../utils';
import { toast } from 'react-toastify';

// Custom Hook : to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Custom Hook : to set the state of the AuthContext
// All the functionalitites of authentication are present in this
export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      // If token already present in local storage means he is logged in ...
      if (userToken) {
        // Decoding the user from the token
        const user = jwt(userToken);

        const response = await fetchUserFriends();

        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        }

        // Setting the user in local to put it into the global state (Authcontext state)
        setUser({
          ...user,
          friends,
        });
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    console.log('response', response);
    if (response.success) {
      setUser(response.data.user);
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      // setting the user in local state
      setUser(response.data.user);
      // retrieving the JWT token into the local storage
      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await register(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  // Desetting the user in local state & removing the token in local storage on logout
  const logout = () => {
    toast.success('Logged out successfully!');
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friends: [...user.friends, friend],
      });
      return;
    }
    const newFriends = user.friends.filter(
      (f) => f.to_user._id !== friend.to_user._id
    );
    setUser({
      ...user,
      friends: newFriends
    })
  };

  // returning the local states to set into global state (AuthContext state)
  return {
    user,
    loading,
    login,
    logout,
    signup,
    updateUser,
    updateUserFriends,
  };
};
