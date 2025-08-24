import mongoose from "mongoose"

const ConnectDB = async()=>{
  try{
    const res = await mongoose.connect(process.env.MONGOOSE_URL);
    if(res){
      console.log("Connected DB");
    }
    
  }
  catch(error){
    console.log("DB ERROR")
  }
}

export default ConnectDB