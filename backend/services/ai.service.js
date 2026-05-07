const {GoogleGenAI} = require('@google/genai');
const ai=new GoogleGenAI({
    key:process.env.GOOGLE_API_KEY
})