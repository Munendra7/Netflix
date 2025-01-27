import axios from 'axios';
import Cookie from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from "../features/userSlice";

const cookie = new Cookie();

const useAuth = () => {

    const dispatch = useDispatch();

    const login = async ({email, password} : {email:string, password:string})=>
    {
        try {
            const response = await axios.post("http://localhost:8080/auth/login", 
            { email, password });
            const {user, token} = response.data;
            cookie.set("session_token", token);
            dispatch(setUser({value:{
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email
                }, isloading:false} 
            }));
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const signup = async ({email, password, username} : {email:string, password:string, username:string})=>
    {
        try {
            const response = await axios.post("http://localhost:8080/auth/signup", 
            { email, password, username });
            const {user, token} = response.data;
            cookie.set("session_token", token);
            dispatch(setUser({value:{
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email
                }, isloading:false} 
            }));
            return response.data;
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const fetchUser = async () => {
        try {
            const response = await axios.get("http://localhost:8080/auth/me", 
            { headers: { Authorization: `Bearer ${cookie.get("session_token")}` } });
            const {user} = response.data;

            if(!user)
            {
                dispatch(clearUser());
            }

            dispatch(setUser({value:{
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email
                }, isloading:false} 
            }));

            return response.data;
        } catch (err) {
            console.error(err);
            dispatch(clearUser());
            return null;
        }
    }

    return { login, signup, fetchUser };
};

export default useAuth;