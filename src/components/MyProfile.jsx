import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import userImage from "../assets/user.png"


const MyProfile = () => {
  // Initial data
  const [platformData, setPlatformData] = useState([
    { name: 'Angle one', value: 25, color: '#3b82f6' },
    { name: 'Groww', value: 25, color: '#2563eb' },
    { name: 'Zerodha', value: 50, color: '#60a5fa' }
  ]);
  
  const [assetData, setAssetData] = useState([
    { name: 'Stocks', value: 75, color: '#3b82f6' },
    { name: 'Mutual Funds', value: 25, color: '#60a5fa' }
  ]);
  
  const [stockData, setStockData] = useState([
    { name: 'Stock 1', value: 35, color: '#3b82f6' },
    { name: 'Stock 2', value: 16, color: '#60a5fa' },
    { name: 'Stock 3', value: 20, color: '#2563eb' },
    { name: 'Stock 4', value: 15, color: '#1d4ed8' },
    { name: 'Stock 5', value: 14, color: '#1e40af' }
  ]);

  // Function to simulate real-time data updates
  useEffect(() => {
    const updateInterval = setInterval(() => {
      // Randomly update platform data
      setPlatformData(prevData => {
        return prevData.map(item => ({
          ...item,
          value: Math.max(10, Math.min(70, item.value + (Math.random() - 0.5) * 5))
        }));
      });
      
      // Randomly update asset data
      setAssetData(prevData => {
        return prevData.map(item => ({
          ...item,
          value: Math.max(10, Math.min(90, item.value + (Math.random() - 0.5) * 5))
        }));
      });
      
      // Randomly update stock data
      setStockData(prevData => {
        return prevData.map(item => ({
          ...item,
          value: Math.max(5, Math.min(50, item.value + (Math.random() - 0.5) * 3))
        }));
      });
    }, 3000); // Update every 3 seconds
    
    return () => clearInterval(updateInterval);
  }, []);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 p-2 rounded border border-gray-700 shadow-lg">
          <p className="text-white font-medium">{`${payload[0].name}: ${payload[0].value.toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Format data for pie chart (ensure values sum to 100%)
  const normalizeData = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({
      ...item,
      value: (item.value / total) * 100
    }));
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-400 mb-2 overflow-hidden">
          <img
            src={userImage}
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-white text-xl font-medium">Aditya Daksh</h2>
      </div>
      
      {/* Investment Dashboard */}
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg p-6">
        <h3 className="text-white text-center text-lg mb-8">My Investments</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Platform Distribution */}
          <div className="flex flex-col items-center">
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={normalizeData(platformData)}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4 w-full">
              {platformData.map((platform, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: platform.color }}></div>
                  <span className="text-white text-sm">{platform.name} ({platform.value.toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Asset Distribution */}
          <div className="flex flex-col items-center">
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={normalizeData(assetData)}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4 w-full">
              {assetData.map((asset, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: asset.color }}></div>
                  <span className="text-white text-sm">{asset.name} ({asset.value.toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stock Distribution */}
          <div className="flex flex-col items-center">
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={normalizeData(stockData)}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                  >
                    {stockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 w-full">
              {stockData.map((stock, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-4 h-4 rounded mr-2" style={{ backgroundColor: stock.color }}></div>
                  <span className="text-white text-sm">{stock.name} ({stock.value.toFixed(1)}%)</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;