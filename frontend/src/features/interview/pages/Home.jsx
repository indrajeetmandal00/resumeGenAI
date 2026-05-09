import React, { useState } from 'react';
import './Home.css';

const Home = () => {
    const [selfDescription, setSelfDescription] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [resumeFile, setResumeFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('selfDescription', selfDescription);
            formData.append('jobDescription', jobDescription);
            formData.append('resume', resumeFile);

            // Note: Make sure to pass your JWT token if the route is protected
            const token = localStorage.getItem('token');

            const response = await fetch('/api/interview', {
                method: 'POST',
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: formData
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate report');
            }

            console.log('Report generated successfully:', data);
            alert('Interview report generated successfully! Check console for details.');

            // TODO: Redirect to a results page or display the report data on the screen

        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="home-container">
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

                        <button type="submit" disabled={isLoading} className="submit-btn">
                            {isLoading ? 'Generating Report... Wait' : 'Submit Details'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Home
