import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/Dashboard");
  }, [navigate]);

  return (
    <div>
      {/* Dashboard content goes here */}
    </div>
  );
};

export default Dashboard;

