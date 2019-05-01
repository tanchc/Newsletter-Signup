//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/1573f9374b",
    method: "POST",
    headers: {
      "Authorization": "klem1 42e84af2a9f6ba18e9ef7142465b26ad-us20"
    },
    body: jsonData
  }

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  })
});

app.get("/failure", function(req,res) {
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(req, res) {
  console.log("Server running on port 3000");
});

// 42e84af2a9f6ba18e9ef7142465b26ad-us20
// Audience
// 1573f9374b
