import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './contexts/ApiContext';
import { UserProvider } from './contexts/UserContext';

import TradeForm from './components/TradeForm';
import Navbar from './components/Navbar';
import MainChart from './components/MainChart';
import MarketIndices from './components/MarketIndices';
import ActionButtons from './components/ActionButtons';
import TopStocks from './components/TopStocks';
import PortfolioDashboard from './components/PortfolioDashboard';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import StockComparison from './components/StockComparison';
import MyProfile from './components/MyProfile';
import MyInvestments from './components/MyInvestments';
import ExploreStocks from './components/ExploreStocks';
import TermsAndConditions from './components/TermsAndConditions';


function Home({ onBuyClick, onSellClick }) {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <MarketIndices />
            <MainChart />
            <ActionButtons onBuyClick={onBuyClick} onSellClick={onSellClick} />
          </div>
          <TopStocks />
        </div>
        <div className="lg:col-span-1">
          <PortfolioDashboard />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeAction, setTradeAction] = useState(null);

  const handleBuyClick = () => {
    setTradeAction('BUY');
    setShowTradeModal(true);
  };

  const handleSellClick = () => {
    setTradeAction('SELL');
    setShowTradeModal(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  return (
    <ApiProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-black text-white">
            {/* Navbar now includes the sidebar navigation */}
            <Navbar onLoginClick={handleLoginClick} />

            <Routes>
              <Route path="/" element={<Home onBuyClick={handleBuyClick} onSellClick={handleSellClick} />} />
              <Route path="/portfolio" element={<PortfolioDashboard />} />
              <Route path="/investments" element={<MyInvestments />} />
              <Route path="/explore" element={<ExploreStocks />} />
              <Route path="/compare" element={<StockComparison />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/profile" element={<MyProfile />} />
            </Routes>

            {/* Login Modal */}
            <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
              <LoginForm onClose={() => setShowLoginModal(false)} />
            </Modal>

            {/* Trade Modal */}
            <Modal isOpen={showTradeModal} onClose={() => setShowTradeModal(false)}>
              <TradeForm action={tradeAction} onClose={() => setShowTradeModal(false)} />
            </Modal>
          </div>
        </Router>
      </UserProvider>
    </ApiProvider>
  );
}

export default App;