# Contributing to MedSync AI

Thank you for your interest in contributing to MedSync AI! This document provides guidelines and instructions for developers who want to contribute to the project. We welcome contributions from developers of all skill levels.

---

## Table of Contents

- [Important Announcements](#important-announcements)
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Development Guidelines](#development-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Common Development Tasks](#common-development-tasks)
- [Troubleshooting](#troubleshooting)
- [Questions or Need Help?](#questions-or-need-help)

---

## Important Announcements

**All critical project updates, contribution guidelines, submission rules, timelines, and community announcements are published in the [GitHub Discussions → Announcements](https://github.com/tirth-patel06/MedSync-AI/discussions/categories/announcements) section.**

As a contributor, it is your responsibility to review announcements regularly before and during your contribution. This ensures you are aware of:

- Project roadmap and priority areas
- Contribution deadlines (if applicable)
- Breaking changes or architectural decisions
- Community standards and expectations
- Important dependency updates
- API or protocol changes affecting contributions

**Contributors who miss critical announcements may have PRs rejected or delayed.** We strongly recommend enabling notifications for this category to stay informed.

---

## Code of Conduct

### Our Commitment

We are committed to providing a welcoming and inclusive environment for all contributors. We expect all participants to:

- **Be respectful:** Treat all contributors with courtesy and professionalism
- **Be constructive:** Provide helpful feedback and critique
- **Be inclusive:** Welcome contributions from people of all backgrounds and experience levels
- **Report issues:** If you witness or experience inappropriate behavior, report it to the maintainers

Unacceptable behavior includes harassment, discrimination, or disrespect toward any contributor. The maintainers reserve the right to remove contributions or ban contributors who violate these principles.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16+ LTS recommended) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** access (local or cloud) — We use MongoDB Atlas
- **Git** — [Download](https://git-scm.com/)

### Step 1: Fork the Repository

1. Go to [MedSync-AI on GitHub](https://github.com/tirth-patel06/MedSync-AI)
2. Click the **Fork** button in the top-right corner
3. Clone your forked repository:

```bash
git clone https://github.com/YOUR_USERNAME/MedSync-AI.git
cd MedSync-AI
```

### Step 2: Add Upstream Remote

Link your local repo to the original repository to keep it in sync:

```bash
git remote add upstream https://github.com/tirth-patel06/MedSync-AI.git
```

Verify remotes:
```bash
git remote -v
# origin    -> your fork
# upstream  -> original repo
```

---

## Development Setup

### Frontend (React + Vite + Tailwind)

```bash
cd client
npm install
npm run dev  # Runs at http://localhost:5173
```

**Available scripts:** `dev`, `build`, `preview`, `lint`

### Backend (Express.js + MongoDB)

```bash
cd server
npm install

# Create .env file (see SECURITY.md for all required variables)
# Minimum required: MONGO_URI, JWT_SECRET, and LLM API keys

npm run dev  # Server runs at http://localhost:8080
```

**Note:** Full `.env` setup details are in [SECURITY.md](SECURITY.md).

### Frontend `.env` Setup (Optional)

Create `client/.env` if needed:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_SOCKET_URL=http://localhost:8080
```

---

## Project Structure

Understanding the codebase layout helps you navigate and contribute effectively:

### Frontend (`client/`)

```
client/
├── src/
│   ├── pages/              # Page components (views)
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   ├── addMedication.jsx
│   │   ├── agents.jsx
│   │   ├── Reports.jsx
│   │   ├── ReportChat.jsx
│   │   ├── Analytics.jsx
│   │   └── ...
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── NotificationToast.jsx
│   ├── context/            # React Context for state management
│   │   ├── medicationContext.jsx
│   │   ├── notificationContext.jsx
│   │   ├── socketContext.jsx
│   │   └── calendarSyncContext.jsx
│   ├── services/           # API & external service helpers
│   │   └── socketService.js
│   ├── assets/             # Images, icons, static files
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # React entry point
│   └── global.css          # Global styles (Tailwind)
├── package.json
├── vite.config.js
├── eslint.config.js
└── index.html              # HTML template
```

### Backend (`server/`)

```
server/
├── src/
│   ├── index.js            # Entry point (Express + Socket.IO setup)
│   ├── routes/             # API route definitions
│   │   ├── auth.js         # Authentication routes
│   │   ├── medicineRoutes.js
│   │   ├── notificationRoutes.js
│   │   ├── analyticsRoutes.js
│   │   ├── reportRoutes.js
│   │   ├── agentsRoutes.js
│   │   ├── calendarSyncRoutes.js
│   │   └── oauth.js        # Google OAuth routes
│   ├── api/                # Controllers (business logic)
│   │   ├── addMedicineController.js
│   │   ├── notificationController.js
│   │   ├── reportController.js
│   │   ├── analyticsController.js
│   │   ├── calendarSyncController.js
│   │   └── ...
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── medicineModel.js
│   │   ├── HealthProfile.js
│   │   ├── ReportModel.js
│   │   ├── ConversationModel.js
│   │   └── ...
│   ├── utils/              # Utility functions and AI handlers
│   │   ├── medical_model.js     # Medical Q&A AI agent
│   │   ├── medicine_model.js    # Medication info AI agent
│   │   ├── emergency_model.js   # Emergency triage AI agent
│   │   ├── personal_health_model.js
│   │   ├── reportAnalysis.js    # PDF analysis logic
│   │   └── googleCalendar.js    # Google Calendar integration
│   ├── middlewares/        # Express middleware
│   │   └── authMiddleware.js
│   └── services/           # External service integrations
│       └── sendNotification.js
├── test/                   # Test files
├── package.json
├── .env                    # Environment variables (not in git)
└── .gitignore
```

---

## How to Contribute

### 1. Identify an Issue or Feature

- Check the [GitHub Issues](https://github.com/tirth-patel06/MedSync-AI/issues) for open items
- Look for issues labeled:
  - `good first issue` — Perfect for newcomers
  - `help wanted` — Needs community support
  - `enhancement` — New features
  - `bug` — Bugs to fix
- If you have a new idea, open a **Discussion** first to gather feedback

### 2. Comment to Get Assigned

- Comment on the issue saying you'd like to work on it
- Wait for maintainer feedback (we'll assign you)
- This prevents duplicate work

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

**Branch naming conventions:**
- `feature/add-email-notifications` — New feature
- `fix/incorrect-medication-schedule` — Bug fix
- `docs/improve-setup-guide` — Documentation
- `refactor/simplify-auth-logic` — Code refactoring

### 4. Make Your Changes

- Write clean, readable code
- Follow the style guides (see below)
- Make commits with clear messages:

```bash
git add .
git commit -m "Add email notification feature for medication reminders"
```

### 5. Keep Your Branch Updated

Before submitting, sync with the latest upstream changes:

```bash
git fetch upstream
git rebase upstream/main
# or if rebasing is complex:
git merge upstream/main
```

### 6. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request

1. Go to the [original repository](https://github.com/tirth-patel06/MedSync-AI)
2. Click **New Pull Request**
3. Select your branch from your fork
4. Fill in the PR template with:
   - Clear title: "Add email notifications for medication reminders"
   - Description of changes
   - Related issue(s): "Closes #123"
   - Screenshots (if UI changes)
   - Testing notes

---

## Development Guidelines

### Code Style

**Frontend (React):**
- Functional components with hooks
- camelCase for variables/functions, PascalCase for components
- Descriptive names

**Backend (Node.js):**
- camelCase for variables/functions, PascalCase for models
- SCREAMING_SNAKE_CASE for constants
- JSDoc comments for functions

**Example:**
```javascript
// Good ✓
const MAX_RETRIES = 3;

async function getUserMedications(userId) {
  return await Medicine.find({ userId });
}

// Bad ✗
async function get_meds(user_id) {
  return Medicine.find({ userId: user_id });
}
```

### Commit Messages

Format: `type: subject`

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

```
feat: Add email notifications for reminders

- Implement email service
- Add user preferences
- Update notification controller

Closes #123
```

### Error Handling

**Always handle errors properly:**

```javascript
// Frontend
try {
  const data = await fetchMedications();
} catch (error) {
  toast.error('Failed to load: ' + error.message);
}

// Backend
try {
  const medicine = await Medicine.create(req.body);
  res.json(medicine);
} catch (error) {
  console.error('Error:', error);
  res.status(500).json({ error: 'Operation failed' });
}
```

---

## Testing

### Automated Tests

Currently, no automated tests exist. **Contributors welcome to:**
- Set up Jest + React Testing Library (frontend)
- Add backend API tests
- Write tests for components and utilities

### Manual Testing Checklist

**Frontend:**
- [ ] App loads without errors
- [ ] Login/Signup works
- [ ] Medication CRUD works
- [ ] Real-time notifications work
- [ ] Responsive on mobile

**Backend:**
- [ ] API endpoints return correct codes
- [ ] Auth middleware protects routes
- [ ] Database operations work
- [ ] Socket.IO notifications work

---

## Submitting Changes

### Before submitting your PR:

- [ ] Branch from latest `main`
- [ ] Code follows style guidelines
- [ ] No console errors/warnings
- [ ] Clear commit messages
- [ ] Related issues referenced
- [ ] Screenshots (if UI changes)
- [ ] No secrets in commits

### What to expect:

Maintainers review PRs within 3-7 days. Feedback provided if changes needed.

---

## Common Development Tasks

### Add New API Endpoint

1. **Controller** (`server/src/api/yourController.js`):
```javascript
export const getYourFeature = async (req, res) => {
  const data = await YourModel.find({ userId: req.user.id });
  res.json(data);
};
```

2. **Route** (`server/src/routes/yourRoutes.js`):
```javascript
import { getYourFeature } from '../api/yourController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
router.get('/feature', authMiddleware, getYourFeature);
```

3. **Register** in `server/src/index.js`:
```javascript
import yourRoutes from './routes/yourRoutes.js';
app.use('/api', yourRoutes);
```

### Add New Page

1. Create `client/src/pages/YourPage.jsx`
2. Add route in `client/src/App.jsx`:
```jsx
<Route path="/your-page" element={<ProtectedRoute><YourPage /></ProtectedRoute>} />
```

### Add MongoDB Model

Create `server/src/models/YourModel.js`:
```javascript
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('YourModel', schema);
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port in use | `lsof -i :8080` then `kill -9 <PID>` |
| MongoDB connection failed | Check `MONGO_URI` in `.env`, verify IP whitelist |
| CORS errors | Match `VITE_API_BASE_URL` to backend, check CORS config |
| Missing dependencies | `npm install` in client/server |
| Socket.IO not connecting | Verify `VITE_SOCKET_URL`, ensure backend runs first |

---

## Questions or Need Help?

- **Ask in Discussions:** [GitHub Discussions](https://github.com/tirth-patel06/MedSync-AI/discussions)
- **Report Bugs:** [GitHub Issues](https://github.com/tirth-patel06/MedSync-AI/issues)
- **Email Maintainers:** Contact through GitHub profile

---

## Additional Resources

- [Git & GitHub Basics](https://guides.github.com/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/)
- [LangChain Documentation](https://js.langchain.com/)
- [Socket.IO Docs](https://socket.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Thank you for contributing to MedSync AI! Your efforts help improve medication adherence worldwide. Happy coding! 🚀**
