import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
   .connect(process.env.MONGO_URI)
   .then(() => console.log('database connected'))
   .catch(err => console.error(err));
  
 export default mongoose.connection  