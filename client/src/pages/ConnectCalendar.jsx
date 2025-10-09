import React from "react";

const ConnectCalendar = () => {
  const handleConnect = () => {
    // Redirect to backend OAuth login route
    console.log("userId: ",userId);
    window.location.href = "http://localhost:8080/api/oauth/login?userId=" + localStorage.getItem("userId");
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Connect Google Calendar
    </button>
  );
};

export default ConnectCalendar;