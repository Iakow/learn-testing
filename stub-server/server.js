const jsonServer = require("json-server");
var cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const bodyParser = require("body-parser");
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());

server.use((req, res, next) => {
  if (req.method === "DELETE" && req.query["_cleanup"]) {
    const db = router.db;
    db.set("books", []).write();
    res.sendStatus(204);
  } else {
    next();
  }
});

server.put("/books/:id/reviews/:reviewId", (req, res) => {
  const { id, reviewId } = req.params;
  const { content } = req.body;

  const book = router.db
    .get("books")
    .find({ id: parseInt(id) })
    .value();

  if (book) {
    const reviewIndex = book.reviews.findIndex(
      (item) => item.id === parseInt(reviewId)
    );
    book.reviews[reviewIndex].content = content;
    router.db.write();
    res.status(201).json(book.reviews[reviewIndex]);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

server.post("/books/:id/reviews", (req, res) => {
  const { id } = req.params;
  const { name, content } = req.body;
  const book = router.db
    .get("books")
    .find({ id: parseInt(id) })
    .value();
  if (book) {
    if (!book.reviews) {
      book.reviews = [];
    }
    const review = {
      id: book.reviews.length + 1,
      bookId: parseInt(id),
      name,
      content,
    };
    book.reviews.push(review);
    router.db.write();
    res.status(201).json(review);
  } else {
    res.status(404).json({ error: "Book not found" });
  }
});

server.delete("/books/:id/reviews", (req, res) => {
  const { id } = req.params;
  const book = router.db
    .get("books")
    .find({ id: parseInt(id) })
    .value();
  book.reviews = [];
  router.db.write();
  res.sendStatus(204);
});

server.use(middlewares);
server.use(router);

server.listen(8080, () => {
  console.log("JSON Server is running");
});
