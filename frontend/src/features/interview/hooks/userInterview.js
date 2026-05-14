import { generateInterviewReport, getAllInterviewReports, getInterviewReportById } from "../services/interview.api";
import { useContext } from "react";
import { InterviewContext } from "../state/interview.context";

export const useInterview = () => {
    const context = useContext(InterviewContext);

    if (!context) { throw new Error("useInterview must be used within a InterviewProvider");  }
    
    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const handleGenerateReport = async (jobDescription, selfDescription, resumeFile) => {
        try {
            setLoading(true);
            const response = await generateInterviewReport(jobDescription, selfDescription, resumeFile);
            setReport(response.data); // The backend returns { success: true, data: finalReport }
            setLoading(false);
            return response.data;
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const handleGetReportById = async (id) => {
        try {
            setLoading(true);
            const response = await getInterviewReportById(id);
            setReport(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    const handleGetAllReports = async () => {
        try {
            setLoading(true);
            const response = await getAllInterviewReports();
            setReports(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            throw error;
        }
    };

    return { loading, report, reports, handleGenerateReport, handleGetReportById, handleGetAllReports };
};

