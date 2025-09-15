import React from 'react';
import Logo from './shared/logo';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover.jsx';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar.jsx";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button.jsx';
import axios from 'axios';
import { toast } from 'sonner';

const Navbar = () => {
  const user = true;
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/v1/user/logout");
        if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);
        }
      // network call for logout
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="border-b border-gray-200 bg-white shadow">
      <div className="flex items-center justify-between max-w-6xl mx-auto h-16 px-4">
        <Logo />
        {user ? (
          <Popover>
            <PopoverTrigger>
              <Avatar className="w-12 h-12">
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>User</AvatarFallback>
</Avatar>

            </PopoverTrigger>
            <PopoverContent align="end" className="w-32 p-0.5">
              <Button
                className="bg-gray-900 hover:bg-gray-800 text-white w-full text-sm font-medium"
                onClick={logoutHandler}
                >
                Logout
                </Button>

            </PopoverContent>
          </Popover>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded font-medium border border-gray-300">
                Signup
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
