const db = require("../model/helper");

async function eventMustExist(req, res, next) {
  try {
    const { id } = req.params;

    const exists = await db(`SELECT * FROM events WHERE id = ${id}`);

    if (exists.data.length) {
      next();
    } else {
      res.status(404).send({ message: "Event not found." });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = eventMustExist;