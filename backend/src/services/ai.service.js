const { GoogleGenAI, Type } = require("@google/genai");
const { z } = require('zod')


// Use apiKey instead of key
const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

//geminiSchema tells the AI how to build it, and your Zod schema double-checks that it's perfect.  
    //this schema is for AI
    const interviewReportSchema = z.object({
        matchScore: z.number().min(1).max(100).describe('The match score ranges from 1 to 100 for the match in resume and job description'),

        technicalQuestions: z.array(z.object({
            question: z.string().describe('Technical question can be asked in an interview'),
            intention: z.string().describe('Intention of the interviewer asking the question'),
            answer: z.string().describe('How to answer the question, what points to cover, what approach, etc.')
        })).describe('The technical questions that can be asked in an interview along with intentions and answers'),

        behavioralQuestions: z.array(z.object({
            question: z.string().describe('Behavioral question can be asked in an interview'),
            intention: z.string().describe('Intention of the interviewer asking the question'),
            answer: z.string().describe('How to answer the question, what points to cover, what approach, etc.')
        })).describe('The behavioral questions that can be asked in an interview along with intentions and answers'),

        skillGaps: z.array(z.object({
            skill: z.string().describe('Skill gap can be asked in an interview'),
            severity: z.enum(['low', 'medium', 'high']).describe('Severity of the skill gap'),
        })).describe('The skill gaps that can be asked in an interview along with severity'),

        preparationPlan: z.array(z.object({
            day: z.number().describe('Days in number in preparation plan, starting with 1'),
            focus: z.string().describe('Focus of the day in preparation plan'),
            tasks: z.array(z.string()).describe('Tasks of the day in preparation plan')
        })).describe('The preparation plan that can be asked in an interview along with focus and tasks'),

        title: z.string().describe('The title of the interview report')


    })

    // We manually build the exact schema Gemini's API expects using `Type`
    const geminiSchema = {
        type: Type.OBJECT,
        properties: {
            matchScore: { type: Type.NUMBER, description: 'The match score ranges from 1 to 100 for the match in resume and job description' },
            technicalQuestions: {
                type: Type.ARRAY,
                description: 'The technical questions that can be asked in an interview along with intentions and answers',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING, description: 'Technical question can be asked in an interview' },
                        intention: { type: Type.STRING, description: 'Intention of the interviewer asking the question' },
                        answer: { type: Type.STRING, description: 'How to answer the question, what points to cover, what approach, etc.' }
                    }
                }
            },
            behavioralQuestions: {
                type: Type.ARRAY,
                description: 'The behavioral questions that can be asked in an interview along with intentions and answers',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING, description: 'Behavioral question can be asked in an interview' },
                        intention: { type: Type.STRING, description: 'Intention of the interviewer asking the question' },
                        answer: { type: Type.STRING, description: 'How to answer the question, what points to cover, what approach, etc.' }
                    }
                }
            },
            skillGaps: {
                type: Type.ARRAY,
                description: 'The skill gaps that can be asked in an interview along with severity',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        skill: { type: Type.STRING, description: 'Skill gap can be asked in an interview' },
                        severity: { type: Type.STRING, enum: ['low', 'medium', 'high'], description: 'Severity of the skill gap' }
                    }
                }
            },
            preparationPlan: {
                type: Type.ARRAY,
                description: 'The preparation plan that can be asked in an interview along with focus and tasks',
                items: {
                    type: Type.OBJECT,
                    properties: {
                        day: { type: Type.NUMBER, description: 'Days in number in preparation plan, starting with 1' },
                        focus: { type: Type.STRING, description: 'Focus of the day in preparation plan' },
                        tasks: {
                            type: Type.ARRAY,
                            description: 'Tasks of the day in preparation plan',
                            items: { type: Type.STRING }
                        }

                    }
                }
            },
            title: { type: Type.STRING, description: 'The title of the interview report' }
        }
    };

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    // Adding a strict instruction prevents the model from generating conversational text outside the JSON
    const prompt = `Generate an interview report for the following details resume: ${resume}, selfDescription: ${selfDescription}, jobDescription: ${jobDescription}\n\nIMPORTANT: You must return ONLY a valid JSON object that strictly adheres to the requested schema. Do not wrap the JSON in markdown blocks.`
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // Use a valid model that supports structured outputs
        contents: prompt,
        config: {
            responseMimeType: "application/json",        // Set the response MIME type to JSON
            responseSchema: geminiSchema
        }
    })

    // Parse the generated string back through Zod to guarantee strict validity
    const report = interviewReportSchema.parse(JSON.parse(response.text));
    return report;
}


module.exports = { generateInterviewReport }