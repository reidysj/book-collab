const router = require("express").Router();
const Books = require("./books-model.js");
const Users = require("../users/users-model.js");

router.get("/", (_req, res, _next) => {
  Books.getAll()
    .then((books) => {
      res.status(200).json(books);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:id", verifyId, (req, res, _next) => {
  const book_id = req.params.id;
  Books.getBy({ book_id })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", verifyBody, (req, res, _next) => {
  const book = req.body;
  Books.add(book)
    .then((book) => {
      res.status(201).json(book);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.put("/:id", verifyId, (req, res, _next) => {
  const changes = req.body;
  changes.updated_at = new Date(Date.now()).toISOString();
  Books.edit(req.params.id, changes)
    .then((_number) => {
      Books.getBy({ book_id: req.params.id }).then((updatedBook) => {
        res.status(200).json(updatedBook);
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/:id", verifyId, (req, res, _next) => {
  const book_id = req.params.id;
  Books.deleteBy(book_id)
    .then((_number) => {
      res.status(200).json({
        message: `the book with the id of ${book_id} has been deleted`,
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

function verifyBody(req, res, next) {
  const user_id = req.body.created_by;
  const title = req.body.title;
  if (title.length < 1) {
    res.status(400).json({ errorMessage: "Must include a title" });
  }
  Users.getBy({ user_id }).then((user) => {
    user
      ? next()
      : res.status(401).json({
          message: `there is no record of a user with the id of ${user_id}`,
        });
  });
  //TODO: Verify the author doesn't already have a book by that title
  //TODO: Possibly move all verify utils into utils folder
}

function verifyId(req, res, next) {
  const book_id = req.params.id;
  //TODO: verify it's a valid uuid
  Books.getBy({ book_id }).then((book) => {
    book
      ? next()
      : res.status(401).json({
          message: `there is no record of a user with the id of ${book_id}`,
        });
  });
}
module.exports = router;
