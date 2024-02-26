var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send({ title: 'Express' });
// });

// GET Event List
router.get("/events", function(req, res, next) {
  db("SELECT * FROM events;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET Votes List
router.get("/votes", async (req, res) => {
  db("SELECT * FROM votes;")
  .then((results) => {
    res.send(results.data);
  }) 
   .catch ((err) => res.status(500).send("Error votes could not be retrieved"));
});

// POST new event
router.post("/events", async function(req, res, next) {
  try {
    const { event_title, event_date, event_time, created_by } = req.body;
    await db(
      `INSERT INTO events (event_title, event_date, event_time, created_by) VALUES 
      ("${event_title}", "${event_date}", "${event_time}", "${created_by}");`
    );

    res.status(201).send({ message: "Event was created" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST new vote
router.post("/votes", async (req, res) => {
  try {
    const { event_id, chosen_by, activity_type, notes } = req.body;
    await db (
      `INSERT INTO votes (event_id, chosen_by, activity_type, notes) VALUES ("${event_id}", "${chosen_by}", "${activity_type}", "${notes}");`
    );
    res.status(201).send("Vote was created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error vote was not created");
  }
});

// CHAT GPT Steps:
// Function to add a new vote to the database
// async function addNewVote(event_id, chosen_by, activity_type, notes) {
// Implement the logic to insert a new vote into your database
// Use your database module to execute the INSERT query
// For example: const result = await db.query("INSERT INTO votes (event_id, chosen_by, activity_type, notes) VALUES (?, ?, ?, ?)", [event_id, chosen_by, activity_type, notes]);
// Return the new vote or its ID


module.exports = router;
