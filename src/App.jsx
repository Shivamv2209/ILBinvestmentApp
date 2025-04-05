import React, { useState } from 'react';
import { ApiProvider } from './contexts/ApiContext';
import Navbar from './components/Navbar';
import MainChart from './components/MainChart';
import MarketIndices from './components/MarketIndices';
import ActionButtons from './components/ActionButtons';
import TopStocks from './components/TopStocks';
import PortfolioDashboard from './components/PortfolioDashboard';
import Modal from './components/Modal';
import LoginForm from './components/LoginForm';
import TradeForm from './components/TradeForm';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeAction, setTradeAction] = useState(null); // 'BUY' or 'SELL'

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
      <div className="min-h-screen bg-black text-white">
        <Navbar onLoginClick={handleLoginClick} />
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left and Center Section (2/3 width on large screens) */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-lg p-4 mb-6">
                <MarketIndices />
                <MainChart />
                <ActionButtons 
                  onBuyClick={handleBuyClick}
                  onSellClick={handleSellClick}
                />
              </div>
              <TopStocks />
            </div>
            
            {/* Right Section (1/3 width on large screens) */}
            <div className="lg:col-span-1">
              <PortfolioDashboard />
            </div>
          </div>
        </div>

        {/* Login Modal */}
        <Modal 
          isOpen={showLoginModal} 
          onClose={() => setShowLoginModal(false)}
        >
          <LoginForm onClose={() => setShowLoginModal(false)} />
        </Modal>

        {/* Trade Modal */}
        <Modal 
          isOpen={showTradeModal} 
          onClose={() => setShowTradeModal(false)}
        >
          <TradeForm 
            action={tradeAction} 
            onClose={() => setShowTradeModal(false)} 
          />
        </Modal>
      </div>
    </ApiProvider>
  );
}

export default App;