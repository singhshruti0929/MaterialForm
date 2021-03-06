const teacher = require("../model/teacher");
const { validateTeacher } = require("../helper/JoiValidate");
exports.addTeacher = async (req, res, next) => {
  try {
    const teacherData = req.body.data;
    validateTeacher(teacherData);
    const Teacher = await teacher.create(teacherData);
    res.json({ Teacher, status: true });
  } catch (err) {
    res.json({ error, status: false });
  }
};

exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await teacher.find({ isActive: true });
    res.json({ teachers, status: true });
  } catch {
    res.json({ teachers: null, status: false });
  }
};

exports.editTeacher = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const User = await teacher.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    res.json({ User, status: true });
  } catch (err) {
    res.json({ err, status: false });
  }
};

exports.getTeacher = async (req, res, next) => {
  try {
    const id = req.params.id;
    const singleTeacher = await teacher.findById(id);
    res.json({ singleTeacher, status: true });
  } catch {
    res.json({ singleTeacher: null, status: false });
  }
};

exports.softDeleteTeacher = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findTeacher = await teacher.findOne({ _id: id });
    if (findTeacher) {
      findTeacher.isActive = false;
      await findTeacher.save();
    }
    res.json({ findTeacher, status: true });
  } catch (err) {
    res.json({ err, status: false });
  }
};
