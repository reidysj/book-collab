require("dotenv").config();
const bcrypt = require("bcryptjs");
const router = require("express").Router();
const Users = require("./users-model.js");

router.get("/", (_req, res, _next) => {
  Users.getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", verifyId, (req, res, _next) => {
  const user_id = req.params.id;
  Users.getBy({ user_id })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", verifyId, (req, res, _next) => {
  const changes = req.body;
  if (changes.password) {
    const hash = bcrypt.hashSync(changes.password, Number(process.env.SALT));
    delete changes.password;
    changes.password_hash = hash;
  }
  changes.updated_at = new Date(Date.now()).toISOString();
  Users.edit(req.params.id, changes)
    .then((_number) => {
      Users.getBy({ user_id: req.params.id })
        .then((updatedUser) => {
          res.status(200).json(updatedUser);
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/:id", verifyId, (req, res, _next) => {
  const user_id = req.params.id;
  Users.deleteBy(user_id)
    .then((_number) =>
      res.status(200).json({
        message: `the user with the id of ${user_id} has been deleted`,
      })
    )
    .catch((err) => {
      res.status(500).json(err);
    });
});

function verifyId(req, res, next) {
  //TODO: Verify ID is a UUID
  const user_id = req.params.id;
  Users.getBy({ user_id })
    .then((user) => {
      user
        ? next()
        : res.status(401).json({
            message: `there is no record of a user with the id of ${user_id}`,
          });
    })
    .catch((err) => res.status(500).json(err));
}

module.exports = router;
