require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
app.use(express.json());
const movieModel = require("./Model/movie");

mongoose.connect(process.env.MONGOURL).then(() => console.log("MONGOBD connect"));

app.get("/",(req,res)=>{
    console.log("Simple Crud Opreation");
});

app.get("/movieDetails", async (req,res)=>{
    const details = await movieModel.find();

    if(details === 0){
        return res.json({data:"No Data Found"});
    }

    return res.json({data:details});
});

app.get("/movieDetails/:id", async (req,res)=>{
    const mId = req.params.id;
    const details = await movieModel.findOne(
        {movie_id : mId}
    ); 

    if(details === 0){
        return res.json({data:"No Data Found"});
    }
    return res.json({data:details});
});

app.post("/addMovie", (req,res)=>{
    const {addMovie} = req.body;
    const addData = movieModel.create(addMovie);
    if(addData){
        return res.json({data:"Add Movie Details Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.put("/updateMovieName", async (req,res)=>{
    const mid = req.body.movie_id;
    const name = req.body.name;

    const updateData = await movieModel.findOneAndUpdate(
        {movie_id: mid},
        {name : name},
        {new:true}
    ); 

    if(!updateData){
    return res.json({data:"Somthing Went To Wrong"});

    }
    return res.json({data:"ice Update Successfully"});
});

app.put("/updatePrice", async (req,res)=>{
    const id = req.body.movie_id;
    const price = req.body.price;

    const updateData = await movieModel.findOneAndUpdate(
        {movie_id: id},
        {price : price},
        {new:true}
    ); 

    if(updateData){
        return res.json({data:"Price Update Successfully"});
    }
    return res.json({data:"Somthing Went To Wrong"});
});

app.delete("/deleteWithId/:id", async (req,res)=>{
    const mId = req.params.id;
    const deleteData = await movieModel.findOneAndDelete(
        {movie_id : mId}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.delete("/deleteWithName/:name", async (req,res)=>{
    const mName = req.params.name;
    const deleteData = await movieModel.findOneAndDelete(
        {name : mName}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully"});
    }
    return res.json({data:"Somthing Want To Wrong"});
});

app.listen(port , () => {console.log(`App Run On ${port}`);});