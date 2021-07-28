//jhint everision:6
const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));
app.post("/",function(req,res){
const fname = req.body.firstname;
const sname = req.body.secondname;
const mail = req.body.email;
const data = {
  members: [
    {
      email_address:mail,
      status:"subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME:sname
      }
    }
  ]
};
var jsondata = JSON.stringify(data);
const url = "https://us6.api.mailchimp.com/3.0/lists/569542c093";
const options ={

  method:"POST",
  auth:"moamen:f7a18daa702fe947fb2be30fa72bc549-us6"
}
const  request = https.request(url, options,function(response){
  if(response.statusCode===200){
    res.sendFile(__dirname + "/sucess.html");
  }else {
    res.sendFile(__dirname + "/failure.html");

  }
  response.on("data", function(data){
console.log(JSON.parse(data));
  });
});
request.write(jsondata);
request.end();
});
app.get( "/", function(req,res){

    res.sendFile(__dirname + "/signup.html");
});
app.listen(process.env.PORT || 3000,function(){
console.log("the server is running at port 3000");


});
//apikey
// f7a18daa702fe947fb2be30fa72bc549-us6
//list id
//
