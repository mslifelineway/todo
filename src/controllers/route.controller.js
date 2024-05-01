const TaskModel = require("../entities/task.entity");

exports.createTask = async (req, res) => {
  const payload = req.body;
  //   const payload = {
  //     title: "test",
  //     description: "desc",
  //     dueDate: new Date(),
  //     status: "pending",
  //   };
  try {
    const data = new TaskModel(payload);
    const doc = await data.save();
    res.status(201).json({
      message: "Task created successfully",
      data: doc,
    });
  } catch (error) {
    console.log("error while creating task", error.message);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const doc = await TaskModel.find({});
    res.status(200).json({
      message: "Task fetched successfully",
      data: doc,
    });
  } catch (error) {
    console.log("error while creating task", error.message);
  }
};
exports.getTask = async (req, res) => {
  const { id } = req.params;

  try {
    const doc = await TaskModel.findById(id);
    res.status(200).json({
      message: "Task fetched successfully",
      data: doc,
    });
  } catch (error) {
    console.log("error while creating task", error.message);
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;

  try {
    const doc = await TaskModel.findById(id);
    if (!doc) {
      res.status(200).json({
        message: "Task couldn't be found.",
        data: doc,
      });
    }
    if (payload.title) doc.title = payload.title;
    if (payload.description) doc.description = payload.description;
    if (payload.dueDate) doc.dueDate = payload.dueDate;
    if (payload.status) doc.status = payload.status;

    const newDoc = await doc.save();
    res.status(200).json({
      message: "Task updated successfully",
      data: newDoc,
    });
  } catch (error) {
    console.log("error while creating task", error.message);
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await TaskModel.deleteOne({_id:id});
    res.status(204).json({});
  } catch (error) {
    console.log("error while deleting task", error.message);
  }
};
