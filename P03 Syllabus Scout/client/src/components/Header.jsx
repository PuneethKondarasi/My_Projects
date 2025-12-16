import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Menu } from '@headlessui/react';
import { UserCircle, Menu as MenuIcon, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { auth, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 glass dark:glass-dark' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 flex items-center justify-center bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300">
              <img
                src="icon.svg"
                alt="Syllabus Scout Logo"
                className="w-6 h-6 invert brightness-0"
              />
            </div>
            <h1 className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-600 dark:from-primary-400 dark:to-accent-400">
              Syllabus Scout
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-foreground/80 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Home
            </Link>
            
            {!auth ? (
              <>
                <Link to="/login" className="text-sm font-medium text-foreground/80 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-accent-600 rounded-full shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <UserMenu logout={logout} />
            )}
            
            <div className="pl-4 border-l border-border">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-foreground/80 hover:bg-secondary-100 dark:hover:bg-secondary-800 rounded-lg transition-colors" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 p-4 mt-2 mx-4 rounded-2xl glass dark:glass-dark border border-white/20 shadow-2xl animate-fade-in-up">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="px-4 py-3 text-foreground/80 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {!auth ? (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-3 text-foreground/80 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-3 text-center text-white bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl shadow-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/profile" 
                    className="px-4 py-3 text-foreground/80 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-xl transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    className="w-full text-left px-4 py-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
              
              <div className="px-4 py-2 flex justify-between items-center border-t border-border pt-4">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

// Extracted UserMenu component for better organization
function UserMenu({ logout }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex items-center space-x-2 p-1 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-colors">
        <UserCircle className="w-8 h-8 text-primary-600 dark:text-primary-400" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in-up">
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={`${
                  active ? 'bg-primary-500 text-white' : 'text-gray-900 dark:text-gray-100'
                } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
              >
                Profile
              </Link>
            )}
          </Menu.Item>
        </div>
        <div className="px-1 py-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={logout}
                className={`${
                  active ? 'bg-red-500 text-white' : 'text-gray-900 dark:text-gray-100'
                } group flex w-full items-center rounded-lg px-2 py-2 text-sm transition-colors`}
              >
                Logout
              </button>
            )}
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default Header;
