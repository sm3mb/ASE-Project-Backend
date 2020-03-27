const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userid: {
    type: String,
    trim: true,
    lowercase: true
  },
  technologies: {
    type: Array,
    required: true,
    trim: true,
    lowercase: true
  }
});

const Technologies = mongoose.model("resume-technologies", ResumeSchema);
module.exports = Technologies;