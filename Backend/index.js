import dotenv from "dotenv"
import connectDB from "./src/db/index.js";
import app from "./src/app.js"
dotenv.config({
    path: './.env'
})

try{

    app.on("error", (err) => {
        (console.log(Error), err);
        throw err;
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is Running at ${process.env.PORT}`);
    })
    
} catch {

    
 console.log("MONGODB connection failed !!!", err);

    
}
    
    


app.get('/', (req,res) => {
    res.send("working...")
})