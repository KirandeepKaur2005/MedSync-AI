import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const userId = searchParams.get("state"); // userId passed via state

    console.log("Frontend - code:", code);
    console.log("Frontend - userId:", userId);

    if (!code || !userId) {
      alert("Missing code or userId in OAuth callback.");
      return;
    }

    // Send code and userId to backend
    fetch(`http://localhost:8080/api/oauth/callback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, userId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("OAuth success:", data);
          navigate("/dashboard"); // redirect after successful auth
        } else {
          console.error("OAuth error:", data.error);
          alert("OAuth failed: " + data.error);
        }
      })
      .catch((err) => {
        console.error(err);
        alert("OAuth failed");
      });
  }, [searchParams, navigate]);

  return <div>Connecting your Google Calendar...</div>;
};

export default OAuthCallback;