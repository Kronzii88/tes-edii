const {
  User,
  Biodata,
  Pendidikan,
  Pelatihan,
  Pekerjaan,
} = require("../models");
const sanitize = require("../helpers/sanitize");
const response = require("../helpers/response");

const moment = require("moment");
const pelatihan = require("../models/pelatihan");

exports.addBio = async (req, res) => {
  try {
    const body = {
      posisi: req.body.posisi ? sanitize.escapeHtmlPlus(req.body.posisi) : "",
      nama: req.body.nama ? sanitize.escapeHtmlPlus(req.body.nama) : "",
      ktp: req.body.ktp ? sanitize.escapeHtmlPlus(req.body.ktp) : "",
      alamat: req.body.alamat ? sanitize.escapeHtmlPlus(req.body.alamat) : "",
    };

    for (const key in body) {
      if (body[key] == "") {
        return response.jsonBadRequest(`Field ${key} must be filled`, res, "");
      }
    }

    const idUser = req.user.id;

    const dataUser = await User.findOne({
      where: { id: idUser },
      include: [
        { model: Biodata, attributes: ["id", "posisi", "nama", "ktp"] },
      ],
      attributes: ["id", "username", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonBadRequest("User Not Found", res, "");
    }

    if (dataUser?.Biodatum?.id) {
      return response.jsonForbidden("Biodata user has been created", res);
    }
    const dataBio = await Biodata.create({
      user_id: idUser,
      posisi: body.posisi,
      nama: body.nama,
      alamat: body.alamat,
      ktp: body.ktp,
    });

    return response.jsonBerhasil(dataBio, res, "Success create Biodata");
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

exports.getBio = async (req, res) => {
  try {
    role = req.user.role;
    idUser = req.user.id;

    let dataBio;
    if (role == 1) {
      dataBio = await Biodata.findAll({
        attributes: ["id", "user_id", "posisi", "nama", "alamat", "ktp"],
      });
    } else {
      dataBio = await Biodata.findOne({
        where: { user_id: idUser },
        attributes: ["id", "user_id", "posisi", "nama", "alamat", "ktp"],
      });
    }

    if (!dataBio || dataBio.length < 1) {
      return response.jsonNotFound("Biodata Not found", res);
    }

    return response.jsonBerhasil(dataBio, res, "Success get data bio");
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

exports.editBio = async (req, res) => {
  try {
    const idBio = req.params.id ? sanitize.escapeHtmlPlus(req.params.id) : "";

    const body = {
      posisi: req.body.posisi ? sanitize.escapeHtmlPlus(req.body.posisi) : "",
      nama: req.body.nama ? sanitize.escapeHtmlPlus(req.body.nama) : "",
      ktp: req.body.ktp ? sanitize.escapeHtmlPlus(req.body.ktp) : "",
      alamat: req.body.alamat ? sanitize.escapeHtmlPlus(req.body.alamat) : "",
    };

    if (!idBio) {
      return response.jsonBadRequest("ID must be filled", res, "");
    }

    const dataBio = await Biodata.findOne({
      where: { id: idBio },
      attributes: ["id", "posisi", "nama", "ktp", "alamat"],
    });

    if (!dataBio || dataBio.length < 1) {
      return response.jsonNotFound("Biodata not found", res);
    }

    const updateBio = await Biodata.update(
      {
        posisi: body.posisi || dataBio.posisi,
        nama: body.nama || dataBio.nama,
        ktp: body.ktp || dataBio.ktp,
        alamat: body.alamat || dataBio.alamat,
      },
      { where: { id: idBio } }
    );

    if (!updateBio) {
      return response.jsonError("Update Failed", res);
    }

    return response.jsonBerhasil(updateBio, res, "Success Update");
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

exports.addJob = async (req, res) => {
  try {
    const body = {
      nama: req.body.nama ? sanitize.escapeHtmlPlus(req.body.nama) : "",
      posisi: req.body.posisi ? sanitize.escapeHtmlPlus(req.body.posisi) : "",
      pendapatan: req.body.pendapatan
        ? sanitize.escapeHtmlPlus(req.body.pendapatan)
        : 0,
      tahun: req.body.tahun ? sanitize.escapeHtmlPlus(req.body.tahun) : 0,
    };

    for (const key in body) {
      if (body[key] == "") {
        return response.jsonBadRequest(`Field ${key} must be filled`, res, "");
      }
    }

    const idUser = req.user.id;

    const dataUser = await User.findOne({
      where: { id: idUser },
      include: [
        { model: Biodata, attributes: ["id", "posisi", "nama", "ktp"] },
      ],
      attributes: ["id", "username", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonBadRequest("User Not Found", res, "");
    }
    const biodataId = dataUser?.Biodatum?.id;

    if (!biodataId) {
      return response.jsonForbidden("Create Biodata first !", res);
    }

    const dataJob = await Pekerjaan.create({
      biodata_id: biodataId,
      nama: body.nama,
      posisi: body.posisi,
      pendapatan: body.pendapatan,
      tahun: body.tahun,
    });

    return response.jsonBerhasil(dataJob, res, "Success create Biodata");
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

exports.getJob = async (req, res) => {
  try {
    idUser = req.user.id;
    const dataUser = await User.findOne({
      where: { id: idUser },
      include: [
        { model: Biodata, attributes: ["id", "posisi", "nama", "ktp"] },
      ],
      attributes: ["id", "username", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonBadRequest("User Not Found", res, "");
    }
    const biodataId = dataUser?.Biodatum?.id;

    if (!biodataId) {
      return response.jsonForbidden("Create Biodata first !", res);
    }

    const dataJob = await Pekerjaan.findAll({
      where: { biodata_id: biodataId },
      attributes: ["id", "biodata_id", "nama", "posisi", "pendapatan", "tahun"],
    });

    if (!dataJob || dataJob.length < 1) {
      return response.jsonNotFound("Pekerjaan Not found", res);
    }

    return response.jsonBerhasil(dataJob, res, "Success get data bio");
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

exports.editJob = async (req, res) => {
  try {
    const idJob = req.params.id ? sanitize.escapeHtmlPlus(req.params.id) : "";

    const body = {
      nama: req.body.nama ? sanitize.escapeHtmlPlus(req.body.nama) : "",
      posisi: req.body.posisi ? sanitize.escapeHtmlPlus(req.body.posisi) : "",
      pendapatan: req.body.pendapatan
        ? sanitize.escapeHtmlPlus(req.body.pendapatan)
        : "",
      tahun: req.body.tahun ? sanitize.escapeHtmlPlus(req.body.tahun) : "",
    };

    if (!idJob) {
      return response.jsonBadRequest("ID must be filled", res, "");
    }

    const dataJob = await Pekerjaan.findOne({
      where: { id: idJob },
      attributes: ["id", "nama", "posisi", "pendapatan", "tahun"],
    });

    if (!dataJob || dataJob.length < 1) {
      return response.jsonNotFound("Pekerjaan not found", res);
    }

    const updateJob = await Pekerjaan.update(
      {
        posisi: body.posisi || dataJob.posisi,
        nama: body.nama || dataJob.nama,
        pendapatan: body.pendapatan || dataJob.pendapatan,
        tahun: body.tahun || dataJob.tahun,
      },
      { where: { id: idJob } }
    );

    if (!updateJob) {
      return response.jsonError("Update Failed", res);
    }

    return response.jsonBerhasil(updateJob, res, "Success Update");
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

exports.addCourse = async (req, res) => {
  try {
    const body = {
      nama: req.body.nama ? sanitize.escapeHtmlPlus(req.body.nama) : "",
      sertifikat: req.body.sertifikat
        ? sanitize.escapeHtmlPlus(req.body.sertifikat)
        : false,
      tahun: req.body.tahun ? sanitize.escapeHtmlPlus(req.body.tahun) : 0,
    };

    const idUser = req.user.id;

    const dataUser = await User.findOne({
      where: { id: idUser },
      include: [
        { model: Biodata, attributes: ["id", "posisi", "nama", "ktp"] },
      ],
      attributes: ["id", "username", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonBadRequest("User Not Found", res, "");
    }
    const biodataId = dataUser?.Biodatum?.id;

    if (!biodataId) {
      return response.jsonForbidden("Create Biodata first !", res);
    }

    const dataCourse = await Pelatihan.create({
      biodata_id: biodataId,
      nama: body.nama,
      sertifikat: body.sertifikat,
      tahun: body.tahun,
    });

    return response.jsonBerhasil(dataCourse, res, "Success create Course");
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

exports.getCourse = async (req, res) => {
  try {
    idUser = req.user.id;
    const dataUser = await User.findOne({
      where: { id: idUser },
      include: [
        { model: Biodata, attributes: ["id", "posisi", "nama", "ktp"] },
      ],
      attributes: ["id", "username", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonBadRequest("User Not Found", res, "");
    }
    const biodataId = dataUser?.Biodatum?.id;

    if (!biodataId) {
      return response.jsonForbidden("Create Biodata first !", res);
    }

    const dataCourse = await Pelatihan.findAll({
      where: { biodata_id: biodataId },
      attributes: ["id", "biodata_id", "nama", "sertifikat", "tahun"],
    });

    if (!dataCourse || dataCourse.length < 1) {
      return response.jsonNotFound("Biodata Not found", res);
    }

    return response.jsonBerhasil(dataCourse, res, "Success get data course");
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

exports.editCourse = async (req, res) => {
  try {
    const idCourse = req.params.id
      ? sanitize.escapeHtmlPlus(req.params.id)
      : "";

    const body = {
      nama: req.body.nama ? sanitize.escapeHtmlPlus(req.body.nama) : "",
      sertifikat: req.body.sertifikat
        ? sanitize.escapeHtmlPlus(req.body.sertifikat)
        : false,
      tahun: req.body.tahun ? sanitize.escapeHtmlPlus(req.body.tahun) : 0,
    };

    if (!idCourse) {
      return response.jsonBadRequest("ID must be filled", res, "");
    }

    const dataCourse = await Pelatihan.findOne({
      where: { id: idCourse },
      attributes: ["id", "nama", "sertifikat", "tahun"],
    });

    if (!dataCourse || dataCourse.length < 1) {
      return response.jsonNotFound("Course not found", res);
    }

    const updateCourse = await Pelatihan.update(
      {
        nama: body.nama || dataCourse.nama,
        sertifikat: body.sertifikat || dataCourse.sertifikat,
        tahun: body.tahun || dataCourse.tahun,
      },
      { where: { id: idCourse } }
    );

    if (!updateCourse) {
      return response.jsonError("Update Failed", res);
    }

    return response.jsonBerhasil(updateCourse, res, "Success Update");
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

exports.addSchool = async (req, res) => {
  try {
    const body = {
      jenjang: req.body.jenjang
        ? sanitize.escapeHtmlPlus(req.body.jenjang)
        : "",
      institusi: req.body.institusi
        ? sanitize.escapeHtmlPlus(req.body.institusi)
        : "",
      jurusan: req.body.jurusan
        ? sanitize.escapeHtmlPlus(req.body.jurusan)
        : "",
      tahun_lulus: req.body.tahun_lulus
        ? sanitize.escapeHtmlPlus(req.body.tahun_lulus)
        : 0,
      ipk: req.body.ipk ? sanitize.escapeHtmlPlus(req.body.ipk) : 0,
    };

    for (const key in body) {
      if (body[key] == "") {
        return response.jsonBadRequest(`Field ${key} must be filled`, res, "");
      }
    }

    const idUser = req.user.id;

    const dataUser = await User.findOne({
      where: { id: idUser },
      include: [
        { model: Biodata, attributes: ["id", "posisi", "nama", "ktp"] },
      ],
      attributes: ["id", "username", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonBadRequest("User Not Found", res, "");
    }
    const biodataId = dataUser?.Biodatum?.id;

    if (!biodataId) {
      return response.jsonForbidden("Create Biodata first !", res);
    }

    const dataSchool = await Pendidikan.create({
      biodata_id: biodataId,
      jenjang: body.jenjang,
      institusi: body.institusi,
      jurusan: body.jurusan,
      tahun_lulus: body.tahun_lulus,
      ipk: body.ipk,
    });

    return response.jsonBerhasil(dataSchool, res, "Success create Biodata");
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

exports.getSchool = async (req, res) => {
  try {
    idUser = req.user.id;
    console.log(idUser);
    const dataUser = await User.findOne({
      where: { id: idUser },
      include: [
        { model: Biodata, attributes: ["id", "posisi", "nama", "ktp"] },
      ],
      attributes: ["id", "username", "role"],
    });

    if (!dataUser || dataUser.length < 1) {
      return response.jsonBadRequest("User Not Found", res, "");
    }

    const biodataId = dataUser?.Biodatum?.id;

    if (!biodataId) {
      return response.jsonForbidden("Create Biodata first !", res);
    }

    const dataSchool = await Pendidikan.findAll({
      where: { biodata_id: biodataId },
      attributes: [
        "id",
        "biodata_id",
        "jenjang",
        "institusi",
        "jurusan",
        "tahun_lulus",
        "ipk",
      ],
    });

    if (!dataSchool || dataSchool.length < 1) {
      return response.jsonNotFound("School Not found", res);
    }

    return response.jsonBerhasil(dataSchool, res, "Success get data school");
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

exports.editSchool = async (req, res) => {
  try {
    const idSchool = req.params.id
      ? sanitize.escapeHtmlPlus(req.params.id)
      : "";

    const body = {
      jenjang: req.body.jenjang
        ? sanitize.escapeHtmlPlus(req.body.jenjang)
        : "",
      institusi: req.body.institusi
        ? sanitize.escapeHtmlPlus(req.body.institusi)
        : "",
      jurusan: req.body.jurusan
        ? sanitize.escapeHtmlPlus(req.body.jurusan)
        : "",
      tahun_lulus: req.body.tahun_lulus
        ? sanitize.escapeHtmlPlus(req.body.tahun_lulus)
        : 0,
      ipk: req.body.ipk ? sanitize.escapeHtmlPlus(req.body.ipk) : 0,
    };

    if (!idSchool) {
      return response.jsonBadRequest("ID must be filled", res, "");
    }

    const dataSchool = await Pendidikan.findOne({
      where: { id: idSchool },
      attributes: [
        "id",
        "jenjang",
        "institusi",
        "jurusan",
        "tahun_lulus",
        "ipk",
      ],
    });

    if (!dataSchool || dataSchool.length < 1) {
      return response.jsonNotFound("School not found", res);
    }

    const updateSchool = await Pendidikan.update(
      {
        jenjang: body.jenjang || dataSchool.jenjang,
        institusi: body.institusi || dataSchool.institusi,
        jurusan: body.jurusan || dataSchool.jurusan,
        tahun_lulus: body.tahun_lulus || dataSchool.tahun_lulus,
        ipk: body.ipk || dataSchool.ipk,
      },
      { where: { id: idSchool } }
    );

    if (!updateSchool) {
      return response.jsonError("Update Failed", res);
    }

    return response.jsonBerhasil(updateSchool, res, "Success Update");
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

exports.getDetailBio = async (req, res) => {
  const idBio = req.params.id ? sanitize.escapeHtmlPlus(req.params.id) : "";

  const dataBio = await Biodata.findOne({
    where: { id: idBio },
    include: [
      {
        model: Pekerjaan,
        attributes: ["id", "nama", "posisi", "pendapatan", "tahun"],
      },
      {
        model: Pelatihan,
        attributes: ["id", "nama", "sertifikat", "tahun"],
      },
      {
        model: Pendidikan,
        attributes: [
          "id",
          "jenjang",
          "institusi",
          "jurusan",
          "tahun_lulus",
          "ipk",
        ],
      },
    ],
    attributes: ["id", "posisi", "nama", "ktp", "alamat"],
  });
  if (!dataBio || dataBio.length < 1) {
    return response.jsonNotFound("Biodata not found", res);
  }
  return response.jsonBerhasil(dataBio, res, "Success get biodata");
};
