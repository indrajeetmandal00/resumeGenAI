const { GoogleGenAI } = require("@google/genai");
const { z } = require('zod')
const { zodToJsonSchema } = require("zod-to-json-schema");

// Use apiKey instead of key
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

//this schema is for AI
const interviewReportSchema = z.object({
    matchScore: z.number().describe('The match score ranges from 1 to 100 for the match in resume and job description'),
    technicalQuestions: z.array(z.object({
        question: z.string().describe('Technical question can be asked in an interview'),
        intention: z.string().describe('Intention of the interviewer asking the question'),
        answer: z.string().describe('How to answer the question,what points to cover,what approch.etc')
    })).describe('The technical questions that can be asked in an interview along with intentions and answers'),

    behavioralQuestions: z.array(z.object({
        question: z.string().describe('Behavioral question can be asked in an interview'),
        intention: z.string().describe('Intention of the interviewer asking the question'),
        answer: z.string().describe('How to answer the question,what points to cover,what approch.etc')
    })).describe('The technical questions that can be asked in an interview along with intentions and answers'),

    skillGaps: z.array(z.object({
        skill: z.string().describe('Skill gap can be asked in an interview'),
        severity: z.enum(['low', 'medium', 'high']).describe('Severity of the skill gap'),
    })).describe('The skill gaps that can be asked in an interview along with severity'),

    preparationPlan: z.array(z.object({
        day: z.number().describe('Days in number in preparation plan, starting with 1'),
        focus: z.string().describe('Focus of the day in preparation plan'),
        tasks: z.array(z.string()).describe('Tasks of the day in preparation plan')
    })).describe('The preparation plan that can be asked in an interview along with focus and tasks')

})


async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate an interview report for the following details:
                    resume: ${resume}
                    self description: ${selfDescription} 
                    job description: ${jobDescription}`

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
            responseMimeType: "application/json",        // Set the response MIME type to JSON
            responseSchema: zodToJsonSchema(interviewReportSchema, { target: "openApi3" }) // Convert the Zod schema to OpenAPI 3 JSON Schema
        }
    })

    const parsedReport = JSON.parse(response.text); 
    console.log(parsedReport); 

}

module.exports = { generateInterviewReport }