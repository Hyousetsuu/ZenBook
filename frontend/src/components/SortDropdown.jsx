import React, { useState, useRef, useEffect } from 'react';
import './SortDropdown.css';

const SORT_OPTIONS = [
  { value: 'default', label: 'Sort by: Default' },
  { value: 'title-asc', label: 'Title: A-Z' },
  { value: 'title-desc', label: 'Title: Z-A' },
  { value: 'author-asc', label: 'Author: A-Z' },
  { value: 'author-desc', label: 'Author: Z-A' }
];

function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = SORT_OPTIONS.find(opt => opt.value === value) || SORT_OPTIONS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newValue) => {
    onChange(newValue);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <button 
        className="custom-dropdown-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="dropdown-label">{selectedOption.label}</span>
        <svg 
          className={`dropdown-icon ${isOpen ? 'open' : ''}`} 
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <ul className="custom-dropdown-menu" role="listbox">
          {SORT_OPTIONS.map((option) => (
            <li 
              key={option.value}
              className={`custom-dropdown-item ${value === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
              {value === option.value && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
