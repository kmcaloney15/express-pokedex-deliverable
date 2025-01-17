/////////////////////////////////////////////
// Dependencies
/////////////////////////////////////////////

const express = require("express");
const app = require("liquid-express-views")(express());
const Pokemon = require("./pokedex/pokemon.js");


//include the method-override package
const methodOverride = require("method-override");

//MIDDLEWARE

//how we are connecting our css page
app.use(express.static('public')); //tells express to try to match requests with files in the directory called 'public'
app.use(methodOverride("_method"))


//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));




////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// INDEX ROUTE
app.get("/pokemon", (req, res) => {
  //   res.send("testing")
  res.render("index", //index.Liquid
  {
    data: Pokemon, // data is liquid variable
  });
});

// NEW - GET
app.get("/pokemon/new", (req, res) => {
  res.render('new')
})

//DELETE
app.delete("/pokemon/:id", (req, res) => {
  Pokemon.splice(req.params.id, 1), //removes 1 item from the array
  console.log('delete is running'),
  res.redirect("/pokemon"); //redirects back to the index page
})

//UPDATE - PUT
app.put("/pokemon/:index", (req, res) => {
  
  Pokemon[req.params.index] = req.body; //in our fruits array, find the index that is specified in the url (:indexOfFruitsArray).  Set that element to the value of req.body (the input data)
  res.redirect("/pokemon"); //redirect to the index page
});


// CREATE - POST
//  create array, append each then push all / create three sections on form / could set it up where coma seperated then pops them into an array 
app.post("/pokemon", (req, res) => {

  //create new pokemon
  Pokemon.unshift(req.body) //unshift posts all new to the very beginning
  console.log('post is working')
  res.redirect('/pokemon')
})




//EDIT - GET
app.get("/pokemon/:index/edit", (req, res) => {
  res.render("edit", 
  {
    data: Pokemon[req.params.index], //the pokemon object
    index: req.params.index, //index of the array
  })
  console.log('edit route is working')
})



// SHOW
app.get("/pokemon/:index", (req, res) => {
    res.render("show", {
        data: Pokemon[req.params.index],
        index: req.params.index
    })
})


// PORT
app.listen(3002, () => {
  console.log("port 3002 is active");
});
