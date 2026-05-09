import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
});

export const generateInterviewReport = async (jobDescription, selfDescription, resumeFile) => {

    const formData = new FormData();     //allows us to send files from fe to be
    formData.append('selfDescription', selfDescription);    //the backend as form data instead of json data like in postman
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resumeFile);


    const response = await api.post('/api/interview', formData, {        //post request to backend to generate report from ai model 
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
}


export const getInterviewReportById = async (id) => {
    const response = await api.get(`/api/interview/${id}`);     //get request to backend to get report by id
    return response.data;
}


export const getAllInterviewReports = async () => {
    const response = await api.get('/api/interview');     //get request to backend to get all reports
    return response.data;
}