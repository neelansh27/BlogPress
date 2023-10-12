require('dotenv').config()
const express=require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use('/',require(path.join(__dirname,'routes/routes.js')))

app.listen(port,()=>{
    console.log(`App listening on http://localhost:${port}`)
})
