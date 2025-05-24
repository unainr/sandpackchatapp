

import mongoose from 'mongoose'

export const connectToDatabase = async () =>{

 try {

   
    await mongoose.connect(process.env.MONGODB_URI!)
    
    console.log(`successfully connected to mongoDb `)

 }catch(error:any){

    console.error(`Error:${error.message}`)
    process.exit(1)
 }

}

 

// import mongoose,{Mongoose} from "mongoose";

// interface MongooseConnection {
//     conn: Mongoose | null;
//     promise: Promise<Mongoose> | null;
// }
// const MONGODB_URI = process.env.MONGODB_URI;
// let cached: MongooseConnection = (global as any).mongoose;
// if (!cached) {
//     cached = (global as any).mongoose = {
//         conn: null,
//         promise: null,
//     };
// }

// export const connectToDatabase = async () => { 
//     try {
//         if (cached.conn) return cached.conn;
//         if (!MONGODB_URI) throw new Error("missing url ");
//         cached.promise = cached.promise ||mongoose.connect(MONGODB_URI,{
//             bufferCommands: false,
//         })
//         cached.conn = await cached.promise;
//         return cached.conn;
//     } catch (error:any) {
//         console.error(`Error:${error.message}`)
//         process.exit(1)
        
//     }
//  }

