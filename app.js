const express = require('express');
const stripe = require('stripe')('sk_test_51IpBaaSFpFUn1Yzl5poITHuMNZUJ19iVisT9U9WkgDhj80AEcDEeCm0DlBL3Njal1mUl8Jt51qdalfVxDHqnp66A00tbLDQAPd');// add secret key
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');



const app = express();

// EJS middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//set static folder
app.use(express.static(`${__dirname}/public`));// setting public folder as static folder


// index route
app.get('/',(req,res)=>{
    res.render('index');
});


//Charge route 
app.post('/charge',(req,res)=>{
  const amount = 29900; 
  
  stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
   amount : amount,
   description : 'Georgian way of life',
   currency : 'inr',
   customer: customer.id
  }))
  .then(charge => res.render('success'));
    
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`server started on port: ${port}`);
});



/* 
 {
  stripeToken: 'tok_1IpXItSFpFUn1YzlqLdaprUy',
  stripeTokenType: 'card',
  stripeEmail: 'raghubhaiya@gmail.com'
}
 this is what was retutned to us by that form of stripe and we just saw this by doing req.body
*/
