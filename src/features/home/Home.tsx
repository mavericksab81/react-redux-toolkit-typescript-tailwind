import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks"
import { selectUser, clearState } from "../login/loginSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

export function HomePage() {
    const { isSuccess, isError, email } = useAppSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError || !isSuccess) {
          dispatch(clearState());
          navigate('/login');
        }
    }, [isError, isSuccess, navigate, dispatch]);

    const handleLogout = () => {
        // reset state to default
        localStorage.removeItem('token');
        localStorage.removeItem('persist:root');
        dispatch(clearState());
        navigate('/login');
    }
    return (
        <>
            <div className="flex justify-end gap-x-4 items-center pl-4 pr-4 pt-4">
            <div>Welcome, <strong>{email}</strong></div>
            <button className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleLogout}>Logout</button>
            </div>
            
        </>
    )
}