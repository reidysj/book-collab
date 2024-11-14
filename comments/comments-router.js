const router = require("express").Router();
const Comments = require("./comments-model.js");

router.post("/:chapter_id", (req, res, _next) => {
  const comment = req.body;
  comment.chapter_id = req.params.chapter_id;
  Comments.add(comment)
    .then((comment) => res.status(200).json(comment))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.get("/:chapter_id", (req, res, _next) => {
  const chapter_id = req.params.chapter_id;
  Comments.getBy({ chapter_id })
    .then((comments) => res.status(200).json(comments))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.delete("/:comment_id", (req, res, _next) => {
  const comment_id = req.params.comment_id;
  Comments.deleteBy(comment_id)
    .then((_number) =>
      res.status(200).json({
        message: `the comment with the id of ${comment_id} has been deleted`,
      })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
});
