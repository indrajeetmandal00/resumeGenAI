import axios from '../../api/axios';

export async function register({username,email,password}) {

    try{
        const response= await axios.post("/register", {username,email,password})
        return response.data
    }
    catch(err){

        throw err;

    }

 

export async function login({email,password}) {

    try{
        const response= await axios.post("/login", {email,password})
        return response.data
    }
    catch(err){

        throw err;

    }

}
