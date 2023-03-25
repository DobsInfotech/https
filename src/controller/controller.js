var Todo = require("../model/schema");
const HTTP = require("../../constant/response.constant");

class class1 {
  static a = async (req, res) => {
    try {
      var OriginalData = await Todo.find({});
      res.render("First", { OriginalData });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static b = async (req, res) => {
    try {
      var OriginalData = await Todo.find({});
      res.render("show", { OriginalData });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static c = async (req, res) => {
    try {
      var OriginalData = await Todo.find({ App: req.params.id });
      if (OriginalData != 0) {
        var OriginalData = OriginalData[0];
      } else {
        var OriginalData = {
          App: `${req.params.id}`,
          Upi: "",
        };
      }
      res.render("index", { OriginalData });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static d = async (req, res) => {
    try {
      if (req.body.App == req.params.id) {
        var OriginalData = await Todo.find({ App: req.body.App });
        if (OriginalData.length == 0) {
          let data = new Todo({
            App: req.body.App,
            Upi: req.body.Upi,
          });
          await data.save();
        } else {
          OriginalData[0].App = req.body.App;
          OriginalData[0].Upi = req.body.Upi;
          OriginalData[0].save();
        }
        res.send("data uploaded");
      } else {
        res.send("You cannot change Appname");
      }
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static e = async (req, res) => {
    try {
      var OriginalData = await Todo.find({ App: req.params.id });
      if (OriginalData.length == 0) {
        var OriginalData = {
          _id: "",
          App: "",
          Upi: "",
        };
      } else {
        var OriginalData = await OriginalData[0];
      }
      res.send(OriginalData);
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
}

module.exports = { class1 };
