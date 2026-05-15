import React, { useState, useEffect } from 'react';
import './Interview.css';
import { useParams, Link } from 'react-router';
import { useInterview } from '../hooks/userInterview';

const menuItems = ['Technical questions', 'Behavioral questions', 'Road Map'];

const ScoreGauge = ({ score = 0 }) => {
    const scoreValue = Math.max(0, Math.min(100, score));
    const needleRotation = (scoreValue / 100) * 180 - 90;
    const radius = 80;
    const dashArray = Math.PI * radius;
    const dashOffset = dashArray * (1 - scoreValue / 100);

    return (
        <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
            <svg width="200" height="110" viewBox="0 0 200 110">
                <path
                    d={`M 20 100 A ${radius} ${radius} 0 0 1 180 100`}
                    fill="none"
                    stroke="#222"
                    strokeWidth="15"
                    strokeLinecap="round"
                    className="gauge-bg-ring"
                />
                <path
                    d={`M 20 100 A ${radius} ${radius} 0 0 1 180 100`}
                    fill="none"
                    stroke="#03a9f4"
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    style={{ transition: 'stroke-dashoffset 1.2s ease-in-out' }}
                />
                <g transform={`rotate(${needleRotation} 100 100)`}>
                    <path className="gauge-needle-path" d="M 100 100 L 100 30" stroke="#c7c7c7" strokeWidth="3" strokeLinecap="round" />
                    <circle className="gauge-needle-base" cx="100" cy="100" r="6" fill="#131419" stroke="#c7c7c7" strokeWidth="2" />
                </g>
                <text x="100" y="85" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#03a9f4">
                    {Math.round(scoreValue)}%
                </text>
            </svg>
        </div>
    );
};

const Interview = () => {
    const { id } = useParams();

    const { report, handleGetReportById, loading } = useInterview();
    const [activeTab, setActiveTab] = useState(menuItems[0]);

    // Safely extract report data whether it's nested in `.data` or at the root
    const reportData = report?.data || report || null;

    useEffect(() => {
        // Fetch the report if it's missing OR if the loaded report doesn't match the URL ID
        const currentReportId = reportData?._id || reportData?.id;
        if (id && currentReportId !== id && handleGetReportById) {
            handleGetReportById(id);
        }
    }, [id, reportData, handleGetReportById]);


    // Dynamic fallback for skill gaps
    const skillGaps = reportData?.skillGaps || reportData?.skill_gaps || [];
    const matchScore = reportData?.matchScore || reportData?.score || 0;

    const renderContent = (tabName) => {
        if (loading) {
            return <p style={{ color: '#03a9f4' }}>Fetching report data...</p>;
        }

        if (!reportData) {
            return <p>No report data found. Generating or fetching...</p>;
        }

        // Try to match the active tab to standard object keys
        let content;
        if (tabName === 'Technical questions') {
            content = reportData.technicalQuestions || reportData.technical_questions;
        } else if (tabName === 'Behavioral questions') {
            content = reportData.behavioralQuestions || reportData.behavioral_questions;
        } else if (tabName === 'Road Map') {
            content = reportData.roadMap || reportData.road_map || reportData.roadmap;
        }

        if (!content) return <p>No data available for {tabName}.</p>;

        // Dynamically render Arrays, Objects, or flat Strings
        if (Array.isArray(content)) {
            return (
                <ul className="report-text" style={{ paddingLeft: '20px', lineHeight: '1.6', color: '#c7c7c7' }}>
                    {content.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '10px' }}>
                            {typeof item === 'object' ? JSON.stringify(item) : item}
                        </li>
                    ))}
                </ul>
            );
        }

        if (typeof content === 'object') {
            return <pre className="report-text" style={{ whiteSpace: 'pre-wrap', color: '#c7c7c7' }}>{JSON.stringify(content, null, 2)}</pre>;
        }

        return <p className="report-text" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#c7c7c7' }}>{content}</p>;
    };

    return (
        <main className="neumorphic-shell">
            {/* "no-print" hides this entire sidebar when downloading the PDF */}
            <aside className="neumorphic-panel panel-left no-print">
                <nav className="neumorphic-nav" aria-label="Interview sections">
                    {menuItems.map((item) => (
                        <button
                            key={item}
                            type="button"
                            className="neumorphic-btn"
                            onClick={() => setActiveTab(item)}
                            style={{
                                boxShadow: activeTab === item ? 'inset -2px -2px 6px rgba(255, 255, 255, 0.1), inset 2px 2px 6px rgba(0, 0, 0, 0.8)' : '',
                                color: activeTab === item ? '#03a9f4' : '#868686'
                            }}
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        type="button"
                        className="neumorphic-btn"
                        /* Triggers the browser's native print/Save-as-PDF dialog */
                        onClick={() => window.print()}
                        style={{ marginTop: '2rem', color: '#03a9f4', textAlign: 'center' }}
                    >
                        📄 Download PDF
                    </button>
                    <Link
                        to="/"
                        className="neumorphic-btn no-print"
                        style={{ marginTop: '1rem', color: '#868686', textAlign: 'center', display: 'block', textDecoration: 'none' }}
                    >
                        ⬅ Back to Home
                    </Link>
                </nav>
            </aside>

            <section className="neumorphic-panel panel-center">
                <div className="neumorphic-inset-card">
                    <h2 className="skill-gaps-title">Interview Report {id && `#${id}`}</h2>

                    {/* Interactive Screen View: Hidden during PDF generation */}
                    <div className="no-print" style={{ flexGrow: 1, overflowY: 'auto' }}>
                        {renderContent(activeTab)}
                    </div>

                    {/* PDF View: Hidden on screen, visible only on print. Renders all tabs sequentially so the full report is downloaded at once */}
                    <div className="print-only">
                        {menuItems.map((item) => (
                            <div key={`print-${item}`} style={{ marginBottom: '2rem' }}>
                                <h3 style={{ color: '#03a9f4', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>{item}</h3>
                                {renderContent(item)}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* "no-print" hides the right sidebar (score and pills) during PDF generation */}
            <aside className="neumorphic-panel panel-right no-print">
                <h2 className="skill-gaps-title">Match Score</h2>
                <ScoreGauge score={matchScore} />
                <h2 className="skill-gaps-title">Skill Gaps</h2>
                <div className="skill-gaps-list">
                    {skillGaps.length > 0 ? (
                        skillGaps.map((skill, idx) => (
                            <span key={idx} className="neumorphic-pill">
                                {typeof skill === 'object' ? skill.name || JSON.stringify(skill) : skill}
                            </span>
                        ))
                    ) : (
                        <p style={{ color: '#868686' }}>No skill gaps identified.</p>
                    )}
                </div>
            </aside>
        </main>
    );
};

export default Interview;
