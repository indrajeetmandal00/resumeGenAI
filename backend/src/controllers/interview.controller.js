const pdfparse = require('pdf-parse');
const { generateInterviewReport: generateReportFromAI } = require('../services/ai.service');
const InterviewReportModel = require('../models/interviewReport.model');

async function generateInterviewReport(req, res) {
    try {
        // 1. Ensure file exists
        if (!req.file) {
            return res.status(400).json({ message: "Resume PDF file is required" });
        }

        const resumeFile = req.file;
        const resumeContent = await pdfparse(resumeFile.buffer);
        const { selfDescription, jobDescription } = req.body;

        // Ensure the body fields were provided
        if (!selfDescription || !jobDescription) {
            return res.status(400).json({ message: "selfDescription and jobDescription are required fields" });
        }

        // 2. Generate report using the aliased function name
        const interviewReportByAI = await generateReportFromAI({ resume: resumeContent.text, selfDescription, jobDescription });

        // 3. Save to database using the correct Model reference
        const finalReport = await InterviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interviewReportByAI
        });

        // 4. Send a single response back to the client
        res.status(201).json({ success: true, data: finalReport });
    } catch (error) {
        console.error('Error generating interview report:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getInterviewReportById(req, res) {
    const { id } = req.params;
    try {
        const report = await InterviewReportModel.findById(id);
        if (!report) {
            return res.status(404).json({ message: 'Interview report not found' });
        }
        res.status(200).json({ success: true, data: report });
    }
    catch (error) {
        console.error('Error getting interview report:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function getAllInterviewReports(req, res) {
    try {
        // Exclude heavy fields so we only return metadata (like _id, createdAt, etc.) for the list cards
        const reports = await InterviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -roadMap -score');
        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        console.error('Error getting all interview reports:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

module.exports = { generateInterviewReport, getInterviewReportById, getAllInterviewReports }; 