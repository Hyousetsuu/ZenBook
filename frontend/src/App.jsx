import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar glass-effect">
          <div className="navbar-brand">
            <span className="brand-icon">📚</span>
            ZenBook
          </div>
        </nav>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:isbn" element={<BookDetailPage />} />
          </Routes>
        </main>

        <footer className="footer glass-effect">
          <p>&copy; {new Date().getFullYear()} ZenBook Recommendations</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
