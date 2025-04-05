import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MainChart = () => {
  const chartRef = useRef(null);
  
  useEffect(() => {
    // Fetch historical data from Angel One Smart API
    const fetchChartData = async () => {
      try {
        // This would be your actual API call
        // const response = await angelOneApi.getHistoricalData('NIFTY', '1D');
        // const data = response.data;
        
        // For demonstration, using mock data similar to the chart in the image
        const mockData = generateMockData();
        renderChart(mockData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    
    fetchChartData();
  }, []);
  
  const generateMockData = () => {
    // Generate sample data from 1991 to 2024 similar to the chart in the image
    const data = [];
    let value = 1000;
    
    for (let year = 1991; year <= 2024; year++) {
      // Create exponential growth with some fluctuation
      if (year > 2000) value *= 1.12 * (0.95 + Math.random() * 0.1);
      else value *= 1.05 * (0.95 + Math.random() * 0.1);
      
      // Add more data points per year for a smoother curve
      for (let month = 0; month < 12; month += 3) {
        const monthValue = value * (0.98 + Math.random() * 0.04);
        data.push({
          date: new Date(year, month, 1),
          value: monthValue
        });
      }
    }
    
    return data;
  };
  
  const renderChart = (data) => {
    if (!chartRef.current) return;
    
    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();
    
    const margin = { top: 20, right: 30, bottom: 30, left: 60 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
    
    const svg = d3.select(chartRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    
    // X scale
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);
    
    // Y scale
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) * 1.1])
      .range([height, 0]);
    
    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x)
        .tickFormat(d3.timeFormat("%Y"))
        .ticks(d3.timeYear.every(3)))
      .style("color", "#4B5563");
    
    // Add Y axis
    svg.append("g")
      .call(d3.axisLeft(y)
        .tickFormat(d => {
          if (d >= 1000) return `${d/1000}k`;
          return d;
        }))
      .style("color", "#4B5563");
    
    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#10B981")
      .attr("stroke-width", 2)
      .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value))
        .curve(d3.curveMonotoneX)
      );
    
    // Add a subtle area below the line
    svg.append("path")
      .datum(data)
      .attr("fill", "url(#gradient)")
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x(d => x(d.date))
        .y0(height)
        .y1(d => y(d.value))
        .curve(d3.curveMonotoneX)
      );
    
    // Add gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#10B981")
      .attr("stop-opacity", 0.3);
    
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#10B981")
      .attr("stop-opacity", 0);
  };
  
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      // Re-render chart with new dimensions
      const fetchChartData = async () => {
        try {
          const mockData = generateMockData();
          renderChart(mockData);
        } catch (error) {
          console.error('Error fetching chart data:', error);
        }
      };
      
      fetchChartData();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="mt-4 mb-6 h-80">
      <div className="w-full h-full" ref={chartRef}></div>
    </div>
  );
};

export default MainChart;