import React, { useState } from 'react';
import { Label } from './label';
import { Input } from './input';
import Logo from '../shared/logo';
import { Button } from './button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "sonner";

function Login() {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const SubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8000/api/v1/user/login", input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={SubmitHandler} className="bg-white w-96 p-8 rounded-xl shadow-xl">
                <div className="w-full flex justify-center mb-7">
                    <Logo />
                </div>
                <div className="mb-4">
                    <Label className="block mb-2 font-medium">Email</Label>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                </div>
                <div className="mb-4">
                    <Label className="block mb-2 font-medium">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeHandler}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
                </div>
                <Button className="w-full my-2 bg-blue-900 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-800 transition">
                    Login
                </Button>
                <p className='text-sm text-center'>
                    Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;
