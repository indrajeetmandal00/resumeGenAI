
//----this is where we make the API calls from be to fe----- {API} =>STATE=>HOOKS=>COMPONENT/UI

import axios from 'axios';
/*
const api=axios.create(BASE_URL: 'http://localhost:3000/api/auth', 
            { withCredentials: true });
        const reponse = await api.get('/profile',{email, password});         
*/

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/login',
            { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/register',
            { username, email, password },
            { withCredentials: true });    //allows access to cookies thru axios
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/auth/logout',
            { withCredentials: true });    //this also deals with cookies
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const profile = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/auth/profile',
            { withCredentials: true });    //this also deals with cookies
        return response.data;
    } catch (error) {
        throw error;
    }
};