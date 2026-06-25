import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import ScrollToTopButton from './components/ScrollToTopButton';
import Toast from './components/Toast';
import { AppProvider } from './context/AppContext';
import './App.css';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLibraryClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    }
    // Scroll to the book grid after a brief delay to allow navigation
    setTimeout(() => {
      const grid = document.querySelector('.books-grid');
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    const footer = document.querySelector('.footer');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
      <div className="app-container">
        <header className="header-wrapper">
          <nav className="floating-navbar">
            <Link to="/" className="navbar-brand">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              ZenBook
            </Link>
            <div className="navbar-links">
              <a href="#library" className="nav-link" onClick={handleLibraryClick}>Library</a>
              <a href="#about" className="nav-link hidden-mobile" onClick={handleAboutClick}>About</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-icon" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            </div>
          </nav>
        </header>
        
        <main className="main-content fade-in-up">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:isbn" element={<BookDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} ZenBook</p>
        </footer>

        <ScrollToTopButton />
        <Toast />
      </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
