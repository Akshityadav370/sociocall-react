import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { login as userLogin } from '../api';
import jwt from 'jwt-decode';
import {
    setItemInLocalStorage,
    LOCALSTORAGE_TOKEN_KEY,
    removeItemFromLocalStorage,
    getItemFromLocalStorage,
  } from '../utils';

// Custom Hook : to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}

// Custom Hook : to set the state of the AuthContext
export const useProvideAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {

        const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

        // If token already present in local storage means he is logged in ...
        if (userToken) {
            // Decoding the user from the token
            const user = jwt(userToken);
            // Setting the user in local to put it into the global state (Authcontext state)
            setUser(user);
        }

        setLoading(false);

    }, []);

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
    
    // Desetting the user in local state & removing the token in local storage on logout
    const logout = () => {
        setUser(null);
        removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    }

    // returning the local states to set into global state (AuthContext state)
    return {
        user,
        loading, 
        login,
        logout
    }
}