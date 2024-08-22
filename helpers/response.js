"use strict";

exports.jsonBerhasil = function (value, res, message = "OK!") {
  var data = {
    response: value,
    metadata: {
      status: 200,
      message: message,
    },
  };

  if (res.headersSent == false) {
    res.removeHeader("X-Powered-By");
    res.status(200).json(data);
    res.end();
  } else {
    return;
  }
};

exports.jsonBerhasilDataTable = function (
  recordsTotal,
  value,
  res,
  message = "OK!"
) {
  var data = {
    recordsFiltered: recordsTotal || 0,
    response: value,
    metadata: {
      status: 200,
      message: message,
    },
  };

  if (res.headersSent == false) {
    res.removeHeader("X-Powered-By");
    res.status(200).json(data);
    res.end();
  } else {
    return;
  }
};

exports.jsonError = function (value, res) {
  var data = {
    response: [],
    metadata: {
      status: 200,
      message: value,
    },
  };

  if (res.headersSent == false) {
    res.removeHeader("X-Powered-By");
    res.status(200).json(data);
    res.end();
  } else {
    return;
  }
};

exports.jsonBadRequest = function (value, res, raw = "") {
  var data = {
    response: [],
    metadata: {
      status: 400,
      message: value,
    },
  };

  if (raw != "") {
    data["raw_api_error"] = raw;
  }

  if (res.headersSent == false) {
    res.removeHeader("X-Powered-By");
    res.status(200).json(data);
    res.end();
  } else {
    return;
  }
};

exports.jsonUnauthorized = function (value, res) {
  var data = {
    response: [],
    metadata: {
      status: 401,
      message: value,
    },
  };

  res.removeHeader("X-Powered-By");
  res.status(200).json(data);
  res.end();
};

exports.jsonForbidden = function (value, res) {
  var data = {
    response: [],
    metadata: {
      status: 403,
      message: value,
    },
  };

  res.removeHeader("X-Powered-By");
  res.status(200).json(data);
  res.end();
};

exports.jsonNotFound = function (value, res) {
  var data = {
    response: [],
    metadata: {
      status: 404,
      message: value,
    },
  };

  res.removeHeader("X-Powered-By");
  res.status(200).json(data);
  res.end();
};

exports.jsonExpired = function (value, res) {
  var data = {
    response: [],
    metadata: {
      status: 410,
      message: value,
    },
  };

  if (res.headersSent == false) {
    res.removeHeader("X-Powered-By");
    res.status(200).json(data);
    res.end();
  } else {
    return;
  }
  // logger.log(api, data, id_controller, idcust, req)
  // res.removeHeader("X-Powered-By");
  // res.status(200).json(data);
  // res.end();
};

exports.jsonTooManyRequest = function (value, res) {
  var data = {
    response: [],
    metadata: {
      status: 429,
      message: value,
    },
  };

  res.removeHeader("X-Powered-By");
  res.status(200).json(data);
  res.end();
};

exports.jsonInternalServerError = function (value, res) {
  var data = {
    response: [],
    metadata: {
      status: 500,
      message: value,
    },
  };

  res.removeHeader("X-Powered-By");
  res.status(200).json(data);
  res.end();
};
