import React from "react";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const {backendUrl,token,setToken} = useContext(AppContext)
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
const navigate = useNavigate();
    const onSubmitHandler = async (event)=>{
      event.preventDefault();
      try {
        if(state === "Sign Up"){
            const {data} = await axios.post(backendUrl  + '/api/user/register',{name,password,email})
            if(data.success){
                localStorage.setItem('token',data.token)
                setToken(data.token)
            }else{
                toast.error(data.message)
            }
        }
        else{
             const {data} = await axios.post(backendUrl  + '/api/user/login',{password,email})
            if(data.success){
                localStorage.setItem('token',data.token)
                setToken(data.token)
            }else{
                toast.error(data.message)
            }
        }
      } catch (error) {
        toast.error(error.message)
      }
    }

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token])

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border mt-16 mb-16 border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>
            {state === "Sign Up" && (
                <div className="w-full">
                    <p>Name</p>
                    <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
                </div>
            )}
            <div className="w-full ">
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
            </div>
            <div className="w-full ">
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
            </div>
            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("Sign Up")} className="text-indigo-500 cursor-pointer">click here</span>
                </p>
            )}
            <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    );
};

export default Login