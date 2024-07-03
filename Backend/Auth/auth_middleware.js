const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
module.exports = async (req, res, next) => {
  try {
    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhcnZhbiBLdW1hciBTaW5naCIsImt0aklEIjoiMjRLVEpTQVI1ODgzMjciLCJpYXQiOjE3MDQ5MDM5OTksImV4cCI6MTcxMDA4Nzk5OX0.Ncq56OCljhxW0WjE7jAafDcLjloIRMLgpaKyDHoRChg';//sarvan
    // const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdyZWVzaHJhaiBQYXRhaXJpeWEiLCJrdGpJRCI6IjI0S1RKR1JFNDI5NzI5IiwiaWF0IjoxNzA0NjI0NzA0LCJleHAiOjE3MDk4MDg3MDR9.M6gCzKmezn5L0U0q6ouxfVORfuyPeeCjS66PFnAEPLo'
    //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdyZWVzaHJhaiBQYXRhaXJpeWEiLCJrdGpJRCI6IjI0S1RKR1JFNDI5NzI5IiwiaWF0IjoxNzA0NjI0NTM5LCJleHAiOjE3MDk4MDg1Mzl9.v-VSNs_U-Ys1MlcEn7gy45NrnhtU-dAvjmXLD9yfd2g';
    const token = req.cookies.token;
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYWl0YW55YSBzcmluaXZhcyIsImt0aklEIjoiMjRLVEpDSEExOTE2ODUiLCJpYXQiOjE3MDQwOTc2MDgsImV4cCI6MTcwOTI4MTYwOH0.l9d-t3tk1qNCVWDQCizbpBK942nvk1n-PMjy5mfT5iA'  // chai
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      req.user = await User.findOne({ ktjID: decoded.ktjID });
      // console.log("auth completed");
      next();
    } else {
      return res.status(407).json({
        message: "Unauthorised",
      });
    }

    
  } catch (error) {

    if (!error.statusCode) {
      error.statusCode = 412;
    }
    next(error);
  }
};
