import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import FashionAPI from "./api/FashionAPI";
import MobileAPI from "./api/MobileAPI";
import UserAPI from "./api/UserAPI";
import axios from "axios";
const server=process.env.REACT_APP_SERVER;

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState(false)

    const refreshToken = async () => {
        const res = await axios.get(`${server}/user/refresh_token`,{ withCredentials: true })

        const accessToken = res.data.accesstoken;
        setToken(accessToken);
    }

    useEffect(() => {
        const loginFirst = localStorage.getItem('First Login');
        // const registerFirst=localStorage.getItem('First Register')
        if (loginFirst) refreshToken();

    }, [])

    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UserAPI(token),
        fashionAPI: FashionAPI(),
        mobileAPI: MobileAPI(),
    }
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}