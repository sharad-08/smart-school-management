// import jwt from "jsonwebtoken";

// // admin authentication middleware
// const adminMiddleware = async (req, res, next) => {
//     try {

//         const { atoken } = req.headers;
//         if (!atoken) {
//             return res.json({ success: false, message: "Not Authorized Login Again" });
//         }
//         const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

//         if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//             return res.json({ success: false, message: "Not Authorized Login Again" });
//         }

//         next();

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }

// export default adminMiddleware


import jwt from "jsonwebtoken";

const adminMiddleware = async (req, res, next) => {
  try {

    const atoken = req.headers.atoken;

    if (!atoken) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);

    if (decoded !== "admin@gmail.comadmin@123") {
      return res.json({ success: false, message: "Not Authorized" });
    }

    next();

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export default adminMiddleware;