const db = require("../models");
const Post = db.users;
const Op = db.Sequelize.Op;

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Konten tidak boleh kosong!"
    });
    return;
  }

  // Create a Post
  const post = {
    pid: makeid(10),
    title: req.body.title,
    location: req.body.location,
    status: req.body.status,
  };

  // Save Post in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Terdapat beberapa error ketika sedang menyimpan ke database."
      });
    });
};


// Find a single Post with an pid (Post ID)
exports.findOne = (req, res) => {
  const pid = req.params.pid;

  Post.findByPk(pid)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Post with id " + pid
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const pid = req.params.pid;

  Post.update(req.body, {
    where: { pid: pid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Post with username=${username}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with username=" + username
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const pid = req.params.pid;

  Post.destroy({
    where: { pid: pid }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id=${username}. Maybe Post was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Post with id=" + username
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Post filter by author
exports.findAllPosts = (req, res) => {
  const author = req.params.author;
  
  Post.findAll({ where: { author: author}})
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