import {exec} from "child_process"

export const recommend = (req,res)=>{
    const userId = req.params.userId;

    exec(`python3 python-ai/stock_advisor.py ${userId}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return res.status(500).json({ error: "Python script failed to execute." });
      }
  
      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        res.status(500).json({ error: "Invalid response from Python script." });
      }
    });
}   