const jwt = require("jsonwebtoken");
const JWT_SIGNATURE_KEY = "TES_EDII_2024";
const { User } = require("../models");

exports.authUser = async function (req, res, next) {
  try {
    const token = req.headers["token"];
    const payload = jwt.verify(token, JWT_SIGNATURE_KEY);

    // cek token
    const dataToken = await User.findOne({ where: { id: payload.id } });
    if (!dataToken || dataToken.length < 1) {
      return res.status(401).json({
        metadata: {
          status: 401,
          message: "Token invalid",
        },
        response: {
          name: "UNAUTHORIZED",
        },
      });
    }

    req.user = payload;
    next();
  } catch (err) {
    res.status(401).json({
      metadata: {
        status: 401,
        message: err.message,
      },
      response: {
        name: "UNAUTHORIZED",
      },
    });
  }
};
