const { User } = require("../models");
const sanitize = require("../helpers/sanitize");
const response = require("../helpers/response");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SIGNATURE_KEY = "TES_EDII_2024";
const saltRounds = 5;
const salt = bcrypt.genSaltSync(saltRounds);

const createToken = (payload) => {
  return jwt.sign(payload, JWT_SIGNATURE_KEY, {
    expiresIn: "30d",
  });
};

exports.login = async (req, res) => {
  try {
    const body = {
      username: req.body.username
        ? sanitize.escapeHtmlPlus(req.body.username)
        : "",
      password: req.body.password
        ? sanitize.escapeHtmlPlus(req.body.password)
        : "",
    };

    for (const key in body) {
      if (body[key] == "") {
        return response.jsonBadRequest(`Field ${key} must be filled`, res, "");
      }
    }

    const dataUser = await User.findOne({
      where: { username: body.username },
      attributes: ["id", "username", "password", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonNotFound("Username not found", res);
    }

    if (bcrypt.compareSync(body.password, dataUser.password) == false) {
      return response.jsonBadRequest("Password salah", res, "");
    }

    const token = createToken({
      id: dataUser.id,
      username: dataUser.username,
      role: dataUser.role,
    });

    await User.update(
      {
        token: token,
      },
      { where: { id: dataUser.id } }
    );

    return response.jsonBerhasil(
      { username: body.username, token: token },
      res,
      "Berhasil login"
    );
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      metadata: {
        status: 500,
        message: "FAILED",
      },
      response: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};

exports.register = async (req, res) => {
  try {
    const body = {
      username: req.body.username
        ? sanitize.escapeHtmlPlus(req.body.username)
        : "",
      password: req.body.password
        ? sanitize.escapeHtmlPlus(req.body.password)
        : "",
      re_password: req.body.re_password
        ? sanitize.escapeHtmlPlus(req.body.re_password)
        : "",
    };

    for (const key in body) {
      if (body[key] == "") {
        return response.jsonBadRequest(`Field ${key} must be filled`, res, "");
      }
    }

    if (body.password !== body.re_password) {
      return response.jsonBadRequest(
        "password dan retype password harus sama",
        res,
        ""
      );
    }

    const hashPass = bcrypt.hashSync(body.password, salt);

    const dataUser = await User.create({
      username: body.username,
      password: hashPass,
      role: 2,
    });

    if (!dataUser) {
      return response.jsonBadRequest("Tidak berhasil register", res, "");
    }

    return response.jsonBerhasil(
      dataUser,
      res,
      "Berhasil register, silahkan login"
    );
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      metadata: {
        status: 500,
        message: "FAILED",
      },
      response: {
        name: err.name,
        message: err.message,
        stack: err.stack,
      },
    });
  }
};
