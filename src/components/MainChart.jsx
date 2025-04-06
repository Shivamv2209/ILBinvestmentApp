import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const socket = io("http://localhost:3000");

const LiveChart = () => {
  const [fundsList, setFundsList] = useState([]);
  const [stocksList, setStocksList] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [isFund, setIsFund] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const [fundsRes, stocksRes] = await Promise.all([
        axios.get("http://localhost:3000/api/master/funds"),
        axios.get("http://localhost:3000/api/master/stocks"),
      ]);
      setFundsList(fundsRes.data);
      setStocksList(stocksRes.data);
      if (fundsRes.data.length > 0) setSelectedSymbol(fundsRes.data[0].symbol);
    };
    fetchLists();
  }, []);

  useEffect(() => {
    socket.on("liveMutualFunds", (data) => {
      if (isFund) {
        const selected = data.find((f) => f.symbol === selectedSymbol);
        if (selected)
          setChartData((prev) => [...prev.slice(-19), { date: selected.date, value: selected.nav }]);
      }
    });

    socket.on("liveStocks", (data) => {
      if (!isFund) {
        const selected = data.find((s) => s.symbol === selectedSymbol);
        if (selected)
          setChartData((prev) => [...prev.slice(-19), { date: selected.date, value: selected.currentPrice }]);
      }
    });

    return () => {
      socket.off("liveMutualFunds");
      socket.off("liveStocks");
    };
  }, [selectedSymbol, isFund]);

  const handleSwitch = (type) => {
    setIsFund(type === "fund");
    const list = type === "fund" ? fundsList : stocksList;
    setSelectedSymbol(list[0]?.symbol);
    setChartData([]);
  };

  const handleSelect = (e) => {
    setSelectedSymbol(e.target.value);
    setChartData([]);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="mb-4 flex gap-4">
        <button onClick={() => handleSwitch("fund")} className={`px-4 py-2 rounded ${isFund ? "bg-blue-500 text-white" : "bg-blue-200 text-black"}`}>Mutual Funds</button>
        <button onClick={() => handleSwitch("stock")} className={`px-4 py-2 rounded ${!isFund ? "bg-green-500 text-white" : "bg-green-500 text-black"}`}>Stocks</button>
        <select onChange={handleSelect} value={selectedSymbol} className="ml-auto px-3 py-2 border rounded bg-blue-500">
          {(isFund ? fundsList : stocksList).map((item) => (
            <option key={item.symbol} value={item.symbol}>{item.name}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LiveChart;
