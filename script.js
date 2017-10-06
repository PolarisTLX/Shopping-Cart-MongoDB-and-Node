/*
Node.js must alrady be installed

begin by installing express generator in Command Prompt (CP)
with this line (after changing to the project directory): npm install express-generator -g

then typing:  express shopping-cart --hbs
//shopping cart is the name
//--hbs          is to add "handlebars" engine support

then type:  cd shopping0-cart
then install all teh dependencies with: npm install
then: npm start

this runs the server.  can verify by typing into browser: http://localhost:3000/


bootstrap was included for styling by getting the CDN for the stylesheet into the HTML <head>:
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

and the bootstrap javascript portion in the HTML <body>:
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

also included jQuery into the HTML <body>:
<script  src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous">
</script>

also included font-awesome in HTML <head>:
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">


TO GET MongoDB UP AND RUNNING:
-Need to open two instances of Command Prompt. Might need to run them as administrator by right click on them when opening
-Change directory to be: C:\Program Files\MongoDB 2.6 Standard Legacy\bin
-Make sure that there is a folder directory on your PC that is C:\data\db.
-In one of the command windows, type:  mongod

(NOT THIS TIME??? )-in the second window type:  mongo

then install mongoose with  npm install --save mongoose

//the port required for mongoose connect (which you add in "app.js":   mongoose.connect('localhost:27017/shopping');)
//is found near the top of the text which comes after typing "mongod" in that CP windows
//in this case it was   " port=27017 "
