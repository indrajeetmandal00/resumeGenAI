import React from 'react';
import './Interview.css';

const menuItems = ['Technical questions', 'Behavioral questions', 'Road Map'];
const skillGaps = ['redis', 'Message queue', 'Event loop'];

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M10.5 4.5a6 6 0 1 0 3.79 10.65l3.78 3.78 1.42-1.41-3.79-3.79A6 6 0 0 0 10.5 4.5Zm0 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
            fill="currentColor"
        />
    </svg>
);

const Interview = () => {
    return (
        <main className="interview-shell">
            <section className="interview-template">
                <aside className="interview-panel interview-panel-left">
                    <nav className="interview-nav" aria-label="Interview sections">
                        {menuItems.map((item) => (
                            <button key={item} type="button" className="interview-nav-item">
                                {item}
                            </button>
                        ))}
                    </nav>
                </aside>

                <section className="interview-panel interview-panel-center">
                    <button type="button" className="interview-search" aria-label="Search content">
                        <SearchIcon />
                    </button>

                    <div className="interview-content-card">
                        <p>here will be the main content</p>
                    </div>
                </section>

                <aside className="interview-panel interview-panel-right">
                    <div className="skill-gaps-card">
                        <h2>Skill Gaps</h2>
                        <div className="skill-gaps-list">
                            {skillGaps.map((skill) => (
                                <span key={skill} className="skill-gap-pill">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </section>
        </main>
    );
};

export default Interview;
