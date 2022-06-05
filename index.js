const express =  require("express")
require("dotenv").config()
const connectDB = require("./db")

const app = express();
const PORT =  process.env.PORT || 27107


app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.all("*",(req, res)=>{
    res.status(404).json({
        message:"Page Not Found"
    })
});

const connect = async ()=>{
    try{

        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, (req, res)=>{
            console.log(`listening to port ${PORT}`)
        })

    }catch(err){
        console.log(err)
    }

}

connect()

