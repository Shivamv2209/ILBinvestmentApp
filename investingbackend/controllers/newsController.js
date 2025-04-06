import axios from "axios"
import dotenv from 'dotenv';

dotenv.config();

export const getStockNews = async (req,res)=>{
    try {
      const today = new Date().toISOString().split('T')[0];
      const apiKey = process.env.NEWSAPI;
      const url = `https://newsapi.org/v2/everything?q=indian%20stocks&from=${today}&to=${today}&sortBy=popularity&apiKey=${apiKey}`;
  
      const response = await axios.get(url);
    
        res.json(response.data.articles.slice(0, 10));
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch Indian stock news' });
      }
};