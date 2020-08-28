const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User
  const user = {
    uid: req.body.uid,
    username: req.body.username,
    name: req.body.name,
    password: req.body.password
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};


// Find a single User with an username
exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findByPk(username)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User " + username
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const username = req.params.username;

  User.update(req.body, {
    where: { username: username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with username=${username}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with username=" + username
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const username = req.params.username;

  User.destroy({
    where: { username: username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${username}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + username
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published User
exports.findAllUsers = (req, res) => {
  User.findAll()
    .then(data => {
     res.send(data);
    })
    .catch(err => {
     res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
