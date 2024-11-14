const router = require("express").Router();
const Versions = require("./versions-model.js");

router.post("/", (req, res, _next) => {
  Versions.add(version)
    .then((version) => res.status(201).json(version))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:chapter_id/:version_id", (req, res, _next) => {
  const version_id = req.params.version_id;
  Versions.getBy({ version_id })
    .then((version) => res.status(200).json(version))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:chapter_id", (req, res, _next) => {
  const chapter_id = req.params.chapter_id;
  Versions.getBy({ chapter_id })
    .then((versions) => res.status(200).json(versions))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
