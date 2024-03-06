var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const eventMustExist = require("../guards/eventMustExist");
var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

// GET Event List
router.get("/events", userShouldBeLoggedIn, async function (req, res, next) {
  db("SELECT * FROM events;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

//GET all users
router.get("/users/username", async function (req, res, next) {
  db("SELECT username FROM users;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

// GET one event by ID
router.get("/events/:id", userShouldBeLoggedIn, async (req, res) => {
  const { id } = req.params;
  db(`SELECT * FROM events WHERE id = ${id};`)
    .then((results) => {
      res.send(results.data[0]);
    })
    .catch((err) => res.status(500).send("Error votes could not be retrieved"));
});


// //GET eventss
// router.get("/votes/:id", userShouldBeLoggedIn, async (req, res) => {
//   const { id } = req.params;
//   db(`SELECT * FROM votes WHERE id = ${id};`)
//     .then((results) => {
//       res.send(results.data[0]);
//     })
//     .catch((err) => res.status(500).send("Error votes could not be retrieved"));
// });

// POST new event
router.post("/events", userShouldBeLoggedIn, async function (req, res, next) {
  try {
    const { event_title, event_date, event_time, created_by } = req.body;
    const {user_id} = req;
    await db(
      `INSERT INTO events (event_title, event_date, event_time, created_by, user_id) VALUES 
      ("${event_title}", "${event_date}", "${event_time}", "${created_by}", "${user_id}");`
    );

    res.status(201).send({ message: "Event was created" });
  } catch (err) {
    res.status(500).send(err);
  }
});

//POST into votes
router.post("/votes", async function (req, res, next) {
  try {
    const { organised_by, activity_type, username, notes } = req.body;
    const id = await db("SELECT id FROM events ORDER BY id DESC LIMIT 1;")
    console.log(id.data[0].id);
    console.log(id.data)
    await db(
      `INSERT INTO votes ( event_id, organised_by, activity_type, username, notes ) VALUES 
      ("${id.data[0].id}", "${organised_by}", "${activity_type}", "${username}", "${notes}");`
    );

    res.status(201).send({ message: "Event was created" });
  } catch (err) {
    res.status(500).send(err);
  }
});


// POST new vote for an event by ID
// router.post("/votes/:id", userShouldBeLoggedIn, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { organised_by, chosen_by, activity_type, notes } = req.body;

//     await db(
//       `INSERT INTO votes (organised_by, chosen_by, activity_type, notes) VALUES (${chosen_by}, ${activity_type}, ${notes});`,
      
//     );
//     await db(
//       `UPDATE events SET vote_count = vote_count + 1 WHERE id = ${id};`,
      
//     );

//     res.status(201).send("Vote was created");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error vote was not created");
//   }
// });


// CHAT GPT Steps:
// Function to add a new vote to the database
// async function addNewVote(event_id, chosen_by, activity_type, notes) {
// Implement the logic to insert a new vote into your database
// Use your database module to execute the INSERT query
// For example: const result = await db.query("INSERT INTO votes (event_id, chosen_by, activity_type, notes) VALUES (?, ?, ?, ?)", [event_id, chosen_by, activity_type, notes]);
// Return the new vote or its ID

module.exports = router;
