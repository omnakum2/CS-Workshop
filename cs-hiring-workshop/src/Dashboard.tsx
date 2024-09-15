import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("auth");
  const [name,setName] = useState("");
  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${URL}dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          setName(data?.user?.name);
          // console.log(name);
        }
      } catch (error) {}
    };
    getData();
  });

  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {`${greeting}! ${name ? name : "a"}`}
        </div>
        <div className="text-xl text-gray-600 dark:text-gray-300">
          Welcome to Dashboard
        </div>
        <div className="mt-3 text-lg text-gray-600 dark:text-gray-100">
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
