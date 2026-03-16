```

| Package | Purpose |
|---|---|
| `axios` | HTTP requests |
| `react-router-dom` | Client-side routing |
| `react-hook-form` | Form state management |
| `@hookform/resolvers` + `yup` | Form validation |
| `jwt-decode` | Decode JWT tokens client-side |

---

### STEP 2 — Project Structure

Here is the full scalable structure:
```
src/
├── api/
│   └── axiosInstance.js        # Centralized Axios setup + interceptors
│
├── components/
│   ├── common/
│   │   ├── Button.jsx
│   │   ├── InputField.jsx
│   │   ├── Loader.jsx
│   │   └── ErrorMessage.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── PageWrapper.jsx
│   └── user/
│       └── UserCard.jsx
│
├── context/
│   └── AuthContext.jsx         # Global auth state (user, tokens, login/logout)
│
├── hooks/
│   ├── useAuth.js              # Shortcut hook to consume AuthContext
│   └── useUsers.js             # Hook for user-related API calls
│
├── pages/
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── DashboardPage.jsx
│   ├── ProfilePage.jsx
│   ├── EditProfilePage.jsx
│   └── UsersListPage.jsx
│
├── routes/
│   ├── AppRouter.jsx           # All route definitions
│   └── ProtectedRoute.jsx      # Auth guard HOC
│
├── services/
│   ├── authService.js          # login(), register(), refresh()
│   └── userService.js          # getUser(), updateUser(), deleteUser()
│
├── utils/
│   ├── tokenUtils.js           # save/get/clear tokens from localStorage
│   └── constants.js            # API base URL, route names
│
├── App.jsx
└── main.jsx