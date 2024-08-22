const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Fetch all users and render them in the view
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM User';
  db.query(sql, (err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.render('index', { users });
  });
});

// Handle form submission and insert into database
router.post('/addUser', (req, res) => {
  const { username, phone_number, email } = req.body;

  const sql = 'INSERT INTO User (username, phone_number, email) VALUES (?, ?, ?)';
  db.query(sql, [username, phone_number, email], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
});

module.exports = router;
