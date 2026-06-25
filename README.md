# 📚 ZenBook

> **An intelligent, visually stunning book recommendation engine.**

ZenBook is a modern, portfolio-ready web application that helps users discover their next great read. Built with a premium, minimalist aesthetic inspired by editorial design (Collective OS), the app provides item-based collaborative filtering recommendations with a lightning-fast React frontend.

## ✨ Features

- **Intelligent Recommendations**: Item-based collaborative filtering algorithm provides accurate book suggestions based on user data.
- **Premium Design System**: A bespoke "Warm Sand" aesthetic featuring custom CSS tokens, smooth micro-animations, glass-free minimalism, and responsive grid layouts.
- **Smart Search & Sort**: Client-side filtering allows users to instantly search by title/author and sort alphabetically via a custom-built dropdown component.
- **Favorites Management**: Save books to a personal library with persistent local storage, accompanied by smooth toast notifications.
- **Enhanced UX**: Includes skeleton loading states for perceived performance, similarity score badges, scroll-to-top functionality, and animated route transitions.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router DOM, Context API
- **Styling**: Vanilla CSS (Zero external UI libraries), Custom Design System, CSS Variables, Keyframe Animations
- **Backend**: Node.js REST API (served on port 5000)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Start the Backend API
Navigate to the backend directory and start the server:
```bash
cd backend
npm install
npm run dev # or node server.js
```
*The backend API will run on `http://localhost:5000`*

### 2. Start the Frontend Application
In a new terminal window, navigate to the frontend directory:
```bash
cd frontend
npm install
npm run dev
```
*The frontend application will run on `http://localhost:5173`*

## 🎨 Design Philosophy

ZenBook was engineered with a strict adherence to visual excellence:
- **No External UI Frameworks**: Every component (from the dropdowns to the skeleton loaders) is built from scratch using pure CSS for maximum control and zero bloat.
- **Whitespace & Typography**: Prioritizes content hierarchy and readability over decorative effects, utilizing *Plus Jakarta Sans* and generous padding.
- **Performance**: Animations are restricted to high-performance properties (`transform`, `opacity`) ensuring buttery smooth 60fps interactions on all devices.

---
*Developed as a showcase of full-stack engineering and modern web design.*
