const express = require('express');
const interviewRouter = express.Router();
const interviewController = require('../controllers/interview.controller');
const authMiddleware = require('../middleware/auth.middleware');
const upload = require('../middleware/file.middleware');


/**
 * @route POST /api/interview
 * @description Create a new interview report on the basis of user self description,resume pdf and job description
 * @access Private
 */
interviewRouter.post('/', authMiddleware.protect, upload.single('resume'), interviewController.generateInterviewReport);

/**
 * @route GET /api/interview/:id
 * @description Get an interview report by ID
 * @access Private
 */
interviewRouter.get('/:id', authMiddleware.protect, interviewController.getInterviewReportById);
//id of the interview report not user id

/**
 * @route GET /api/interview
 * @description Get all interview reports for the current user
 * @access Private
 */
interviewRouter.get('/', authMiddleware.protect, interviewController.getAllInterviewReports);

module.exports = interviewRouter;