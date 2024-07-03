const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser');
// package to parse files
const Multer = require('./utils/multer')
const csrfProtection = csrf({
  cookie: true,
})

require('dotenv').config()
require('custom-env').env()

const users = require('./routes/users')
const event = require('./routes/events')
const workshop = require('./routes/workshop')
const team = require('./routes/team')
const gameteam = require('./routes/gameteam')
const regForLetter = require('./routes/regForLetter')
const competitionRouter = require('./routes/competitions')
const gameRouter = require('./routes/game')
const guestLectureRouter = require('./routes/guestLecture')
const sponsorRouter = require('./routes/sponsor')
const activityRouter = require('./routes/activity')
const notificationRouter = require('./routes/Notification')
const issueRouter = require('./routes/issue')
const navbarRouter = require('./routes/navbar')
const commonRouter = require('./routes/common')
const emailRouter = require('./routes/email')
const customUrlRouter = require('./routes/customUrl')
const scheduleRouter = require('./routes/schedule')
const interactiveRouter = require("./routes/interactive");
const Razorpay = require('razorpay');
const app = express()
const port = process.env.PORT || 5000
let User = require("./models/user.model");

//  Passport Middleware
// app.use(passport.initialize());
console.log(process.env.APP_NAME)

//  Passport Configuration
// require("./Auth/passport")(passport);
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )

  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept,Authorization'
  )
  next()
})

const corsOptions = {
  credentials: true,
  ///..other options
};

app.use(cors(corsOptions));
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(express.text())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(csrfProtection)

const uri = process.env.ATLAS_URI

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
}


mongoose
  .connect(uri, options)
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch((err) => console.log(err))

app.use('/api/', users)
app.use('/api/events', event)
app.use('/api/notification', notificationRouter)


app.use("/api/workshops", workshop);
app.use("/api/team", team);
app.use("/api/gameteam", gameteam);
app.use("/api/regForLetter", regForLetter);
app.use("/api/competitions", competitionRouter);
app.use("/api/games", gameRouter);
app.use("/api/guestLectures", guestLectureRouter);
app.use("/api/sponsors", sponsorRouter);
app.use("/api/activities", activityRouter);
app.use("/api/issue", issueRouter);
app.use("/api/navbar", navbarRouter);
app.use("/api/common", commonRouter);
app.use("/api/email", emailRouter);
app.use("/api/customUrl", customUrlRouter);
app.use("/api/schedule", scheduleRouter);
app.use("/api/interactive", interactiveRouter);

// ==================================
// Handling payments 
// creating instance 
var instance = new Razorpay({
  key_id: 'YOUR_KEY_ID',
  key_secret: 'YOUR_KEY_SECRET',
});

app.post("/api/pay/orderId", async (req, res) => {

  // demo 
  // res.json({ orderId: "fdfsfds" });

  // check if paid 
  const { userList } = req.body;
  if (userList.length)
    return res.status(204).json(
      {
        "message": "Empty form"
      }
    )

  for (let index = 0; index < userList.length; index++) {
    const element = userList[index];
    let userdata = await User.findOne({ ktjID: element });
    if (userdata.paid == "yes")
      return res.status(400).json(
        {
          "message": "Any one of your KTJ Id has already booked room"
        }
      )
  }

  // const amt = 7000*(userList.length);
  let amt = 3000;

  let payoptions = {
    amount: amt,  // amount in the smallest currency unit
    currency: "INR",
    // No receipt id
    // receipt: "order_rcptid_11"
  };
  instance.orders.create(options, function (err, order) {
    console.log("order created = ", order);
    res.json({ orderId: order.id });
  });
})

app.post("/api/payment/verify", (req, res) => {

  let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
  const { userList } = req.body;

  var crypto = require("crypto");
  var expectedSignature = crypto.createHmac('sha256', '<YOUR_API_SECRET>')
    .update(body.toString())
    .digest('hex');
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { "signatureIsValid": "false" }

  if (expectedSignature === req.body.response.razorpay_signature)
  {
    response = { "signatureIsValid": "true" }
  }
  res.send(response);
});
// ==================================

// Supplying anti-CSRF token
// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken() });
// });
app.use((error, req, res, next) => {
  console.log('Error', error)
  return res.status(error.statusCode).json({ message: error.message })
})
app.listen(port, (err) => {
  console.log(`Server is running on port: ${port}`);
  if (err) console.log(err)
})
