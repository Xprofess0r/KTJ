const jwt = require("jsonwebtoken");
let User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    //  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhcnZhbiBLdW1hciBTaW5naCIsImt0aklEIjoiMjRLVEpTQVI1ODgzMjciLCJpYXQiOjE3MDQ0OTA1MzMsImV4cCI6MTcwOTY3NDUzM30.teQcjJlv1K3UK00BKcL-ktzg44ib4ByTR-0UO5c7Fuk';

    // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhcnZhbiBLdW1hciBTaW5naCIsImt0aklEIjoiMjRLVEpTQVI1ODgzMjciLCJpYXQiOjE3MDQ5MDM5OTksImV4cCI6MTcxMDA4Nzk5OX0.Ncq56OCljhxW0WjE7jAafDcLjloIRMLgpaKyDHoRChg';//sarvan
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYWl0YW55YSBzcmluaXZhcyIsImt0aklEIjoiMjRLVEpDSEExOTE2ODUiLCJpYXQiOjE3MDQwOTc2MDgsImV4cCI6MTcwOTI4MTYwOH0.l9d-t3tk1qNCVWDQCizbpBK942nvk1n-PMjy5mfT5iA'
    const token = req.cookies.token;
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNoYWl0YW55YSBzcmluaXZhcyIsImt0aklEIjoiMjRLVEpDSEExOTE2ODUiLCJpYXQiOjE3MDQwOTc2MDgsImV4cCI6MTcwOTI4MTYwOH0.l9d-t3tk1qNCVWDQCizbpBK942nvk1n-PMjy5mfT5iA' // chai
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded) {
      await User.findOne({ ktjID: decoded.ktjID }, (err, data) => {
        if (data.userType === "admin" || data.userType === "superAdmin") next();
        else {
          return res.status(407).json({
            message: "You don't have access",
          });
        }
      });
    } else {
      return res.status(407).json({
        message: "Unauthorised",
      });
    }
  } catch (error) {
    return res.status(412).json(error);
  }
};
