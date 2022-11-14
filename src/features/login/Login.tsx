import React, { useEffect, useState } from "react";
import { Login } from "./login.interface";
import './Login.css';
import { useAppDispatch } from "../../app/hooks";
import { clearState, loginUser, selectUser } from "./loginSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function LoginPage() {
    const dispatch = useAppDispatch();
    const { isFetching, isSuccess, isError } = useSelector(selectUser);
    const [loginForm, setLoginForm] = useState<Login>({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let name = event.target.name;
        let value = event.target.value;
        setLoginForm((values) => ({
            ...values, [name]: value
        }));
    }

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setLoading(true);
        dispatch(loginUser({ username: loginForm.email, password: loginForm.password }));
    }

    // useEffect(() => {
    //     return () => {
    //       dispatch(clearState());
    //     };
    //   }, []);
    
      useEffect(() => {
        if (isError) {
          dispatch(clearState());
        }
    
        if (isSuccess) {
        //   dispatch(clearState());
          navigate('/home');
        }
      }, [isError, isSuccess]);

    return (
        <>
            <div className="App">
                <div className="container shadow-2xl w-3/12 h-auto rounded-md lg-auto">
                    <h1 className="text-2xl font-bold pt-2">Sign in here</h1>
                    <form>
                        <div className="flex flex-col gap-4 items-start p-6">
                            <div className="w-full">
                                <span className="block text-md font-medium text-slate-700 text-start">Email</span>
                                <input type="email" placeholder="Enter email/username" name="email"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    value={loginForm.email} onChange={handleInputChange} />
                            </div>
                            <div className="w-full">
                                <span className="block text-md font-medium text-slate-700 text-start">Password</span>
                                <input type="password" name="password" placeholder="Enter password"
                                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                                    value={loginForm.password} onChange={handleInputChange} />
                            </div>
                            <div className="w-full">
                                <button className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(loginForm.email.length === 0 || loginForm.password.length === 0) ? 'opacity-75 pointer-events-none' : ''}`}
                                    onClick={handleSubmit}>
                                    {isFetching ? (
                                        <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white flex justify-center items-center"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                        </svg>
                                    ) : null}
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}