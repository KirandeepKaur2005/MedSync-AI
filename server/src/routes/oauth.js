import express from "express";
import { getAuthUrl, getTokens, oauth2Client } from "../api/googleAuth.js";
import { google } from "googleapis";
import User from "../models/User.js"; // assuming you have a user model

const router = express.Router();

// Step 1: Send the user to Google OAuth login
router.get("/login", (req, res) => {
  const userId = req.query.userId;
  const url = getAuthUrl(userId);
  res.redirect(url); // user goes to Google consent screen
});

// Step 2: Google redirects back with a code
router.post("/callback", async (req, res) => {
    const { code, userId } = req.body;

    console.log("Backend - code:", code);
    console.log("Backend - userId:", userId);

  
    if (!code || !userId) return res.status(400).json({ error: "Missing code or userId" });
  
    try {
        console.log("Exchanging code:", code);
        console.log("Redirect URI used:", oauth2Client.redirectUri);

      const tokens = await getTokens(code);
  
      await User.findByIdAndUpdate(userId, {
        googleTokens: tokens,
      });
  
      res.json({ success: true, tokens });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  });

  router.get("/calendar/status/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user || !user.googleTokens)
        return res.status(400).json({ linked: false, message: "No tokens found" });
  
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "http://localhost:5173/oauth/callback"
      );
      oauth2Client.setCredentials(user.googleTokens);
  
      const calendar = google.calendar({ version: "v3", auth: oauth2Client });
      const calendars = await calendar.calendarList.list();
  
      res.json({
        linked: true,
        account: calendars.data.items?.[0]?.summary || "Calendar linked",
      });
    } catch (err) {
      console.error("Calendar check error:", err);
      res.status(500).json({ linked: false, message: "Error verifying calendar" });
    }
  });

export default router;