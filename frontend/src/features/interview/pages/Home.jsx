import React, { useState, useEffect } from 'react';
import './Home.css';
import { useInterview } from '../hooks/userInterview';
import { useNavigate, Link } from 'react-router';

const Home = () => {
    const { loading, handleGenerateReport, reports, handleGetAllReports } = useInterview();
    const navigate = useNavigate();
    const [selfDescription, setSelfDescription] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        handleGetAllReports().catch(console.error);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Safely extract the array of reports depending on backend response shape
    const reportsList = Array.isArray(reports) ? reports : (reports?.data || []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setResumeFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!selfDescription || !jobDescription || !resumeFile) {
            setError('Please fill out all fields and upload a resume.');
            return;
        }

        try {
            const result = await handleGenerateReport(jobDescription, selfDescription, resumeFile);

            console.log('Report generated successfully:', result);

            // Redirect using the generated report's ID
            const reportId = result?.data?._id || result?._id || result?.id || result?.data?.id;
            if (reportId) {
                navigate(`/interview/${reportId}`);
            } else if (result) {
                // Fallback redirect if generation succeeded but no ID was found
                navigate('/interview');
            }

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || 'Failed to generate report');
        }
    };

    return (
        <div className="home-container">
            {loading && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(19, 20, 25, 0.8)', zIndex: 1000,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                    <h2 style={{ color: '#03a9f4', textTransform: 'uppercase', letterSpacing: '2px' }}>Generating Report... Please wait.</h2>
                </div>
            )}
            <form className="home-form" onSubmit={handleSubmit}>
                <h2>Generate Report</h2>

                <div className="form-columns">
                    <div className="form-column">
                        <div className="inputBox">
                            <label htmlFor="selfDescription">Self Description</label>
                            <textarea id="selfDescription" value={selfDescription} onChange={(e) => setSelfDescription(e.target.value)} placeholder="Describe your professional background, skills, and experience..." required />
                        </div>

                        <div className="inputBox">
                            <label htmlFor="jobDescription">Job Description</label>
                            <textarea id="jobDescription" value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the target job description here..." required />
                        </div>
                    </div>

                    <div className="form-column">
                        <div className="inputBox">
                            <label htmlFor="resume">Upload Resume (PDF)</label>
                            <div className="file-upload-box">
                                <input type="file" id="resume" accept="application/pdf" onChange={handleFileChange} required style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }} />

                                <div style={{ pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '10px', color: '#03a9f4' }}>
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                    <p style={{ margin: 0, fontWeight: '500', fontSize: '15px', color: resumeFile ? '#03a9f4' : '#555', textAlign: 'center' }}>
                                        {resumeFile ? resumeFile.name : 'Drag & drop or click to browse'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? 'Generating Report... Wait' : '✨ Generate'}
                        </button>
                    </div>
                </div>
            </form>

            {reportsList.length > 0 && (
                <div className="reports-section">
                    <h2 className="reports-title">Generated Reports</h2>
                    <div className="reports-grid">
                        {reportsList.map((rep) => {
                            const id = rep._id || rep.id;
                            if (!id) return null;

                            return (
                                <Link key={id} to={`/interview/${id}`} className="report-card">
                                    <h3>Report #{id.substring(0, 6)}</h3>
                                    <p>Status: Completed</p>
                                    <p>Click to view detailed report...</p>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home
