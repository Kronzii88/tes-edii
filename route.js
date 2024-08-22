const express = require("express");
const authController = require("./controllers/authController");
const bioController = require("./controllers/bioController");
const authorize = require("./middlewares/authorize");
const router = express.Router();

/** Auth */
router.post("/register", authController.register);
router.post("/login", authController.login);

/** Biodata */
router.post("/biodata", authorize.authUser, bioController.addBio);
router.get("/biodata", authorize.authUser, bioController.getBio);
router.put("/biodata/:id", authorize.authUser, bioController.editBio);
router.get("/biodata/:id", authorize.authUser, bioController.getDetailBio);

/** Pekerjaan */
router.post("/job", authorize.authUser, bioController.addJob);
router.get("/job", authorize.authUser, bioController.getJob);
router.put("/job/:id", authorize.authUser, bioController.editJob);

/** Pelatihan */
router.post("/course", authorize.authUser, bioController.addCourse);
router.get("/course", authorize.authUser, bioController.getCourse);
router.put("/course/:id", authorize.authUser, bioController.editCourse);

/** Pendidikan */
router.post("/school", authorize.authUser, bioController.addSchool);
router.get("/school", authorize.authUser, bioController.getSchool);
router.put("/school/:id", authorize.authUser, bioController.editSchool);

/** main */
router.get("/", (req, res) => {
  res.status(200).json({
    metadata: {
      status: 200,
      message: "Api ready to use!",
    },
    response: {
      data: {
        name: "Backend Tes PT EDII ",
      },
    },
  });
});
router.use((req, res) => {
  res.status(404).json({
    metadata: {
      status: 404,
      message: "FAIL",
    },
    response: {
      data: {
        name: "NotFoundError",
        message: "Are you lost?",
      },
    },
  });
});
router.use((err, req, res, next) => {
  res.status(500).json({
    metadata: {
      status: 500,
      message: "ERROR",
    },
    response: {
      data: {
        name: "InternalServerError",
        message: err.message,
        stack: err.stack,
      },
    },
  });
});

module.exports = router;
