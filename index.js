const {query} = require("express");
const express = require("express");
const app = express();

const mysql = require('mysql');
const connect = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",  
    database : "API_DWWM_GARAGE",
    port : 8889
});

app.use(express.static("public"));

app.set('view engine',"ejs");
app.set('views',"./views");


app.listen(8080, () => {
    console.log(" le server port est 8080");
});

app.use(express.json());

// connexion
connect.connect((err)=> {
    if (err) throw err;
    console.log("Yess cela fonctionne");
    connect.query("SELECT * from voiture;", function(err, result){
        if (err) throw err;
        console.log(result);
    })

});

app.get("/voiture", function (request, response) {
    connect.query("SELECT * FROM voiture;", function (err, result) {
        if (err) throw err;
        console.log(result);
        response.status(200).json(result)
        // 200 = OK
    });
})

// insert
app.post("/voiture",(request, response)=> {
    const querys = "INSERT INTO voiture (marques, kilometres, model, prix) VALUES ('"+request.body.marques+"','"+request.body.kilometres+"','"+request.body.model+"','"+request.body.prix+"')"
    console.log(querys);
    connect.query(querys, (err,result) => {
        if(err) throw err;
        console.log(result);
        response.status(200).json(result);
    })

})

//recherche

app.get("/voiture/:id", (request, response) => {
    connect.query("SELECT * FROM voiture WHERE id = " + request.params.id, (err, result) => {
        if (err) throw err;
        console.log(result);
        response.status(200).json(result);
    });
});

/// Update

app.patch("/voiture/:id", (request, response) => {
    const querys = "UPDATE voiture SET marques = '" + request.body.marques + "', kilometres = '" + request.body.kilometres + "', model = '" + request.body.model + "', prix = '" + request.body.prix + "' WHERE id = " + request.params.id;
    console.log(querys);
    connect.query(querys, (err, result) => {
        if (err) throw err;
        console.log(result);
        response.status(200).json(result);
    })
});



app.get("/", function(request, response){
    response.render("accueil")
})