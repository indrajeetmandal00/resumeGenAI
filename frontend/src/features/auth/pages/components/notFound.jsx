import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router'

const NotFound = () => {
    const overlayRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (overlayRef.current) {
                const x = e.clientX;
                const y = e.clientY;
                const pos = `${x}px ${y}px`;
                const gradient = `radial-gradient(circle 120px at ${pos}, transparent 0%, black 150px)`;
                overlayRef.current.style.maskImage = gradient;
                overlayRef.current.style.webkitMaskImage = gradient;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative w-screen h-screen bg-gray-900 text-white overflow-hidden">
            {/* Main content hidden by default, revealed by spotlight */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <h1 className="text-6xl font-bold mb-4">Page Not Found</h1>
                <p className="text-xl">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <Link to="/login" className="m-10 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold shadow-lg">
                    Go Back
                </Link>
            </div>

            {/* Dark overlay with spotlight mask */}
            <div
                id="overlay"
                ref={overlayRef}
                className="absolute inset-0 bg-black z-20 pointer-events-none"
                style={{
                    maskImage: `radial-gradient(circle 120px at 50% 50%, transparent 0%, black 150px)`,
                    WebkitMaskImage: `radial-gradient(circle 120px at 50% 50%, transparent 0%, black 150px)`
                }}
            ></div>
        </div>
    )
}

export default NotFound
