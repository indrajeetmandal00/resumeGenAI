import React, { useState, useEffect } from 'react';
import './Interview.css';
import { useParams } from 'react-router';
import { useInterview } from '../hooks/userInterview';

const menuItems = ['Technical questions', 'Behavioral questions', 'Road Map'];

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M10.5 4.5a6 6 0 1 0 3.79 10.65l3.78 3.78 1.42-1.41-3.79-3.79A6 6 0 0 0 10.5 4.5Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
            fill="currentColor"
        />
    </svg>
);

const Interview = () => {
    const { id } = useParams();
    // Assuming your useInterview hook exposes a function to fetch by ID (e.g., fetchReport)
    const { report, fetchReport, loading } = useInterview();
    const [activeTab, setActiveTab] = useState(menuItems[0]);

    useEffect(() => {
        // Fetch the report on mount/refresh if it's missing and we have a valid ID
        if (id && id !== 'preview' && !report && fetchReport) {
            fetchReport(id);
        }
    }, [id, report, fetchReport]);

    // Safely extract report data whether it's nested in `.data` or at the root
    const reportData = report?.data || report || null;

    // Dynamic fallback for skill gaps
    const skillGaps = reportData?.skillGaps || reportData?.skill_gaps || ['redis', 'Message queue', 'Event loop'];

    const renderContent = () => {
        if (loading) {
            return <p style={{ color: '#03a9f4' }}>Fetching report data...</p>;
        }

        if (!reportData) {
            return <p>No report data found. Generating or fetching...</p>;
        }

        // Try to match the active tab to standard object keys
        let content;
        if (activeTab === 'Technical questions') {
            content = reportData.technicalQuestions || reportData.technical_questions;
        } else if (activeTab === 'Behavioral questions') {
            content = reportData.behavioralQuestions || reportData.behavioral_questions;
        } else if (activeTab === 'Road Map') {
            content = reportData.roadMap || reportData.road_map || reportData.roadmap;
        }

        if (!content) return <p>No data available for {activeTab}.</p>;

        // Dynamically render Arrays, Objects, or flat Strings
        if (Array.isArray(content)) {
            return (
                <ul style={{ paddingLeft: '20px', lineHeight: '1.6', color: '#c7c7c7' }}>
                    {content.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: '10px' }}>
                            {typeof item === 'object' ? JSON.stringify(item) : item}
                        </li>
                    ))}
                </ul>
            );
        }

        if (typeof content === 'object') {
            return <pre style={{ whiteSpace: 'pre-wrap', color: '#c7c7c7' }}>{JSON.stringify(content, null, 2)}</pre>;
        }

        return <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', color: '#c7c7c7' }}>{content}</p>;
    };

    return (
        <main className="neumorphic-shell">
            <aside className="neumorphic-panel panel-left">
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
                </nav>
            </aside>

            <section className="neumorphic-panel panel-center">
                <div className="neumorphic-inset-card">
                    <h2 className="skill-gaps-title">Interview Report {id && `#${id}`}</h2>
                    <div style={{ flexGrow: 1, overflowY: 'auto' }}>
                        {renderContent()}
                    </div>
                </div>
            </section>

            <aside className="neumorphic-panel panel-right">
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
