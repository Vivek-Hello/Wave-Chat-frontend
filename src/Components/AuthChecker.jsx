import { useEffect } from "react";
import { CheckAuth } from "../Store/authStore.js";
import { useDispatch, useSelector } from "react-redux";

const AuthChecker = () => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuth) {  
            dispatch(CheckAuth());
        }
    }, [dispatch, isAuth]);

    return null; // No UI needed
};

export default AuthChecker;
