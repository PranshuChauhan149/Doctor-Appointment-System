import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import ConnectDB from './config/mongoDb.js';
import connectCloudinary from './config/cloudniary.js';
import adminRouter from './routes/adminRoute.js';
import DoctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json())
app.use(cors())
connectCloudinary();


app.use('/api/admin',adminRouter);
app.use('/api/doctor',DoctorRouter);
app.use('/api/user',userRouter);

app.get("/",(req,res)=>{
  res.send("API Working")
})



app.listen(PORT,()=>{
  ConnectDB();
  console.log(`server Started on PORT  ${PORT}`)
})