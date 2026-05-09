const mongoose= require('mongoose');


const technicalQuestionsSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,"Question is required"]
    },
    intention:{
        type: String,
        required: [true,"Intention is required"]
    },
    answer: {
        type: String,
        required: [true,"Answer is required"],
    },
},{_id: false})
const behavioralQuestionsSchema = new mongoose.Schema({
    question:{
        type: String,
        required: [true,"Question is required"]
    },
    intention:{
        type: String,
        required: [true,"Intention is required"]
    },
    answer: {
        type: String,
        required: [true,"Answer is required"],
    },
},{_id: false})
const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true,"Skill is required"],
    },
    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true,"Severity is required"]
    },
},{_id: false})
const preparationPlanSchema = new mongoose.Schema({
    day:{
        type: Number,
        required: [true,"Day is required"]
    },
    focus: {
        type: String,
        required: [true,"Focus is required"]
    },
    tasks:[{
        type: String,
        required: [true,"Task is required"]
    }],
},{_id: false})



const interviewReportSchema = new mongoose.Schema({
   
    jobDescription: {
        type: String,
        required: [true,"Job description is required"],
    },
    resume:{
        type: String
    }
    ,
    selfDescription: {
        type: String
      },

    matchScore: {
        type: Number,
       max: 100,
       min: 0   
    } ,
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tilte:{
        type: String,
        required: [true,"Title is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }

})

const InterviewReportModel= mongoose.model('InterviewReport',interviewReportSchema);

module.exports= InterviewReportModel; 

     


    