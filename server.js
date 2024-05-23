require ('dotenv').config()
const {PORT = 8000, DATABASE_URL} = process.env

const express = require ("express")
const app = express();
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require ("mongoose")


const peopleSchema = new mongoose.Schema({
    name:String,
    title : String
})

const People = mongoose.model("People", peopleSchema)

mongoose.connect(DATABASE_URL)

mongoose.connection
.on("open",()=> console.log("you are connected"))
.on ("close",()=> console.log("you are sidconnected"))
.on ("error", (error)=> console.log(error))



app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

app.get ("/" , (req,res)=>{
    res.json({hello : "world"})
})

app.get ("/people", async(req,res)=>{
    try{
        const people = await People.find({})
        res.json(people)

    }catch(error){
        res.status(400).json({error})

   }
})

app.post ("/people" , async(req,res)=>{
    try{
        const person = await People.create(req.body)
        res.json(person)
    }catch(error){
        res.status(400).json({error})
    }
})

app.get("/people/:id", async(req,res)=>{
    try{
        const person = await People.findById(req.params.id)
        res.json(person)
    }
    catch(error){
        res.status(400).json({error})
    }
})
app.put("/people/:id", async(req,res)=>{
    try{
        const person = await People.findByIdAndUpdate(req.params.id, req.body, {
            new : true
        })
        res.json(person)

    } catch(error){
        res.status(400).json({error})
    }
})

app.delete("/people/:id", async(req,res)=>{
    try{
        const person = await People.findByIdAndDelete(req.params.id)

    } catch(error){
        res.status(400).json({error})
    }
})

app.listen(PORT, () => console.log`listening on port ${PORT}`);
