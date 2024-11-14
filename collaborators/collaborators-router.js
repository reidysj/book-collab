const router = require("express").Router();
const Books = require("../books/books-model.js");
const Collaborators = require("./collaborators-model.js");
const Users = require("../users/users-model.js");

router.post(
  "/",
  verifyBookId,
  verifyUserId,
  checkDuplicate,
  (req, res, _next) => {
    const collaborator = req.body;
    Collaborators.add(collaborator)
      .then((book) => {
        res.status(201).json(book);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
);

router.get("/", verifyBookId, (req, res, _next) => {
  const book_id = req.body.book_id;
  Collaborators.getBy({ book_id })
    .then((collaborators) => {
      return res.status(200).json(collaborators);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:collaborator_id", async (req, res, _next) => {
  const collaborator_id = req.params.collaborator_id;
  Collaborators.deleteBy(collaborator_id)
    .then((_number) =>
      res.status(200).json({
        message: `the collaboration record with id ${collaborator_id} has been deleted`,
      })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});

function verifyBookId(req, res, next) {
  const book_id = req.body.book_id;
  //TODO: verify it's a valid uuid
  Books.getBy({ book_id }).then((book) => {
    book
      ? next()
      : res.status(401).json({
          message: `there is no record of a user with the id of ${book_id}`,
        });
  });
}

function checkDuplicate(req, res, next) {
  Collaborators.findOne({
    user_id: req.body.user_id,
    book_id: req.body.book_id,
  }).then((record) =>
    record ? res.status(400).json({ error: "Duplicate Record" }) : next()
  );
}

function verifyUserId(req, res, next) {
  //TODO: Verify ID is a UUID
  const user_id = req.body.user_id;
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
