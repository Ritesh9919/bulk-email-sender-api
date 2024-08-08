import dotenv from 'dotenv';
dotenv.config();
import {app} from './app.js';
import connectDB from './db/index.js';
const PORT = 8000;

connectDB()
.then(()=> {
    app.listen(PORT, ()=> {
        console.log(`Server is running on port:${PORT}`);
    })
})
.catch((err)=> {
    console.error("error", err);
})