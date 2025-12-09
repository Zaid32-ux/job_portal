import React, { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";

function App() {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]); 

  return (
    <>
    <h1 className='bg-amber-50 text-4xl' >Job_portal</h1>
    </>
  )
}

export default App
