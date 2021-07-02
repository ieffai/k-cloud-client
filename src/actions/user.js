import axios from 'axios';
import { setUser, doExit } from '../reducers/userReducer';
import { API_URL } from '../config';

export const registration = async(email, password) => {
    try {
       await axios.post(`${API_URL}api/auth/registration`, {
        email,
        password
        })
        alert('You have been registered, please sign in')
    } catch (e) {
        console.log(e)
    }
}
export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            alert(e.response.data.message);
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/auth`, 
                { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );
            dispatch(setUser(response.data.user));
            localStorage.setItem('token', response.data.token);
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
export const getUser = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/auth/me`, 
                { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );
            dispatch(setUser(response.data.user));
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}


export const uploadAvatar = (file) => {
    return async dispatch => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await axios.post(`${API_URL}api/files/avatar`, formData,
                { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );
            dispatch(setUser(response.data));
        } catch (error) {
            console.log(error)
        }
    }
}
export const deleteAvatar = () => {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files/avatar`,
                { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
            );
            dispatch(setUser(response.data));
        } catch (error) {
            console.log(error)
        }
    }
}

export const logout = () => {
    return async dispatch => {
        try {
            dispatch(doExit());
            localStorage.removeItem('token');
            document.location.href = '/';
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}
