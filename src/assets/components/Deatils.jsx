import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../../slice/userSlice';

function Deatils({ onEnter }) { 
  const [username, setUsername] = useState("");
  const usersList = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      name: username,
      totalTime: ""
    };
    dispatch(addUsers(userDetails));
    setUsername("")
    onEnter()
  };

  return (
    <>
      <div className="flex justify-center items-center font-playfair min-h-screen">
        <form onSubmit={handleSubmit} className="bg-black flex flex-col items-center px-96 py-48 rounded-xl shadow-lg text-white p-6">
          <div className="text-center font-bold text-[24px] mb-4">Enter Your Name</div>
          <input 
            onChange={(e) => setUsername(e.target.value)} 
            className="text-[20px] font-bold font-serif border-2 w-96 text-black border-black p-2 rounded-xl" 
            type="text" 
            value={username}  // Add value to make it a controlled component
          />
          <button type="submit" className="mt-8 font-bold font-playfair text-[24px] rounded-xl w-48 py-4 bg-gray-800">Start The Game</button>
        </form>
      </div>
    </>
  );
}

export default Deatils;
