require("dotenv").config();
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, Invite, Project, Task } = require("../schema/models");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/jwt.middleware");

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

router.get("/", (req, res) => {
  res.json({ status: "working" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((entry) => {
    if (entry) {
      res.status(400).json({ message: "user already exists" });
      return;
    }
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    newUser
      .save()
      .then(() => {
        console.log("Added " + newUser._id);
        return res.json({ message: `Added new user ${newUser.username}` });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ message: err });
      });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ $and: [{ email: email }, { password: password }] }).then(
    (entry) => {
      if (!entry) {
        return res.status(400).json({ message: "Please Check Credentials" });
      }
      const payload = {
        name: entry.username,
        email: entry.email,
        id: entry._id,
      };
      const token = jwt.sign(payload, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      return res.json({ token: token });
    }
  );
});

// PROJECT ROUTES
// Using user Id to add posts
router.post("/project/add", (req, res) => {
  User.findById(req.body.uid)
    .then((entry) => {
      const newProject = new Project({
        ownerId: entry._id,
        ownerName: entry.username,
        name: req.body.name,
        description: req.body.description,
      });
      entry.projects.push(newProject._id);
      entry.save()
      newProject
        .save()
        .then(() => {
          res.json({
            projectId: newProject._id,
            Status: "Added Successfully",
          });
        })
        .catch((err) => {
          res.json(err);
        });
    })
    .catch((err) => res.json(err));
});

router.get("/project/user/:id", (req, res) => {
  User.findById(req.params.id).then((user)=>{
    Project.find({ _id: {$in: user.projects}}, "-ownerId -__v")
      .sort({ createdAt: -1 })
      .then((project) => {
        res.json(project);
      })
      .catch((err) => {
        res.json(err);
      });
  })
});

router.get("/project/:pid", (req, res) => {
  Project.findById(req.params.pid)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/project/status/change", (req, res) => {
  Project.findById(req.body.pid)
    .then((project) => {
      project.status = req.body.newStatus;
      project.save().then((newProject) => {
        res.json(newProject);
      });
    })
    .catch((err) => res.json(err));
});
// TASK MANAGEMENT ROUTES
// Using project Id to add task
router.post("/project/add/task", (req, res) => {
  Project.findById(req.body.pid)
    .then((entry) => {
      const newTask = new Task({
        projectId: entry._id,
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
      });
      newTask.save().then((task) => {
        res.json(task);
      });
    })
    .catch((err) => res.json(err));
});

router.get("/project/get/task", (req, res) => {
  Task.find({ projectId: req.body.pid })
    .then((documents) => {
      res.json(documents);
    })
    .catch((err) => res.json(err));
});

// Using task Id to add comments
router.post("/task/add/comment", (req, res) => {
  Task.findById(req.body.tid)
    .then((entry) => {
      const comment = {
        user: req.body.user,
        content: req.body.content,
      };
      entry.comments.push(comment);
      entry.save().then((task) => {
        res.json(task);
      });
    })
    .catch((err) => res.json(err));
});

router.post("/task/add/assignee", (req, res) => {
  Task.findById(req.body.tid)
    .then((entry) => {
      const assignee = {
        id: req.body.id,
        name: req.body.name,
      };
      entry.assignees.push(assignee);
      entry.save().then((task) => {
        res.json(task);
      });
    })
    .catch((err) => res.json(err));
});

router.post("/task/unassign", (req, res) => {
  Task.findById(req.body.tid)
    .then((entry) => {
      for (let i in entry.assignees) {
        if (entry.assignees[i].id == req.body.uid) {
          entry.assignees.splice(i, 1);
          break;
        }
      }
      entry.save().then((task) => {
        res.json(task);
      });
    })
    .catch((err) => res.json(err));
});

router.post("/task/status/change", (req, res) => {
  Task.findById(req.body.tid)
    .then((task) => {
      task.status = req.body.newStatus;
      task.save().then((newTask) => {
        res.json(newTask);
      });
    })
    .catch((err) => res.json(err));
});

// Invite handling routes
router.post("/project/invite", (req, res) => {
  User.findById(req.body.reciever).then((rec) => {
    const newInvite = new Invite({
      sender: req.body.sender,
      reciever: rec._id,
      projectId: req.body.pid,
      projectName: req.body.pname,
    });
    newInvite
      .save()
      .then((invite) => {
        res.json(invite);
      })
      .catch((err) => {
        res.json(err);
      });
  });
});

router.get("/:id/invite", (req, res) => {
  User.findById(req.params.id)
    .then(() => {
      Invite.find({ reciever: req.params.id }).then((invites) =>
        res.json(invites)
      );
    })
    .catch((err) => res.json(err));
});

router.post("/project/invite/accept", (req, res) => {
  Invite.findOneAndDelete(req.body.inviteId)
    .then((invite) => {
      if (!invite) {
        return res.status(400).json({ message: "Error: Invite not found." });
      }
      Project.findById(invite.projectId).then((project) => {
        User.findById(invite.reciever).then((entry) => {
          const newMember = {
            id: entry._id,
            name: entry.username,
          };
          project.members.push(newMember);
          entry.projects.push(invite.projectId)
          entry.save()
          project.save().then((entry) => {
            res.json(entry);
          });
        });
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/project/invite/decline", (req, res) => {
  Invite.findOneAndDelete(req.body.inviteId)
    .then((entry) => res.json(entry))
    .catch((err) => res.json(err));
});
router.get("/verify", isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
