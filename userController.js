const db = require('../config/database');

// Get all users
exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.render('index', { users: results });
    });
};

// Get edit user form
exports.getEditUserForm = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('edit', { user: results[0] });
    });
};

// Update user
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, phoneNumber, email } = req.body;
    db.query('UPDATE users SET username = ?, phoneNumber = ?, email = ? WHERE id = ?', [username, phoneNumber, email, id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};

// Delete user
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
        if (err) throw err;
        res.redirect('/');
    });
};
