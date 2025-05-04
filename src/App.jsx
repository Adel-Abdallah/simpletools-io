import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import InitializationModal from './components/InitializationModal.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        <InitializationModal />
        <main className="flex-1 container mx-auto px-4">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 