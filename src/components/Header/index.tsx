import { useState } from "react";
import portfolioData from "../../data/mockData";
import ThemeToggle from "../ThemeToggle";
import { ButterflyIcon, XIcon, ListIcon } from "@phosphor-icons/react";
import "./styles.css";

const Header: React.FC<{ theme: string; toggleTheme: () => void }> = ({ theme, toggleTheme }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navLinks = [
      { href: "#summary", label: "Summary" },
      { href: "#skills", label: "Skills" },
      { href: "#education", label: "Education" },
      { href: "#experience", label: "Experience" },
      { href: "#achievements", label: "Achievements" },
      { href: "#hobbies", label: "Hobbies" },
    ];
  
    return (
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
          <ButterflyIcon size={40} className="text-pink-500"/>
          <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">{portfolioData.name}</a>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                {link.label}
              </a>
            ))}
          </nav>
  
          <div className="flex items-center gap-2 pushable">
            <a href={portfolioData.resumeUrl} target="_blank" download="Buyandelger_Tsendsuren_Resume.pdf" className="bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors front">
              Resume
            </a>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-gray-600 dark:text-gray-300" aria-label="Toggle menu">
                {isMobileMenuOpen ? <XIcon size={24} /> : <ListIcon size={24} />}
            </button>
          </div>
        </div>
  
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm py-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-4">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
    );
  };

  export default Header;