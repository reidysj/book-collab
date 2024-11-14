const router = require("express").Router();
const Chapters = require("./chapters-model.js");
const Books = require("../books/books-model.js");

router.post("/", verifyBook, (req, res, _next) => {
  Chapters.add(req.body)
    .then((chapter) => {
      res.status(201).json(chapter);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/:chapter_id", (req, res, _next) => {
  const chapter_id = req.params.chapter_id;
  Chapters.getBy({ chapter_id })
    .then((chapter) => res.status(200).json(chapter[0]))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.put("/:chapter_id", (req, res, _next) => {
  const chapter_id = req.params.chapter_id;
  const changes = req.body;
  changes.updated_at = new Date(Date.now()).toISOString();
  Chapters.edit(chapter_id, changes)
    .then((_number) => {
      Chapters.getBy({ chapter_id })
        .then((updatedChapter) => res.status(200).json(updatedChapter))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/:chapter_id", (req, res, _next) => {
  const chapter_id = req.params.chapter_id;
  Chapters.deleteBy(chapter_id)
    .then((_number) => {
      res.status(200).json({
        message: `the chapter with the id of ${chapter_id} has been deleted`,
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/", verifyBook, (req, res, _next) => {
  const book_id = req.body.book_id;
  Chapters.getBy({ book_id })
    .then((chapters) => {
      res.status(200).json(chapters);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

function verifyBook(req, res, next) {
  const book_id = req.body.book_id;
  Books.getBy({ book_id }).then((book) =>
    book
      ? next()
      : res.status(400).json({ error: "No book exists with id: " + book_id })
  );
}

module.exports = router;
