const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;



  const data = {
       email_address: email,
       status: "subscribed",
       merge_fields: {
        	FNAME: firstName,
	        LNAME: lastName
    }
   }

  const jsonData = JSON.stringify(data);
  const url = "https://us1.api.mailchimp.com/3.0/lists/caa768c096/members"
  const options = {
    method : "POST",
    auth: "Kaif1:a62d628813e282d16b79c114250be51a-us1"
  }

   const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
          res.sendFile(__dirname+"/sucess.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }


     response.on("data",function(data){
       console.log(JSON.parse(data))
     });
   });
  request.write(jsonData);
  request.end();


 });



app.post("/failure",function(req,res){
  res.redirect("/")
})







app.listen(process.env.PORT || 3000, function(){
  console.log("your server is running at port 3000");
})


//7fbeaa7fc64d8c806fa129656ea238d3-us1
//d12b4f1e06
