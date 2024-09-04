import React, { useState, useEffect } from 'react';

const TypeWriter = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timer);
        }
    }, [text, currentIndex, speed]);

    return (
        <pre className="overflow-x-auto p-4 font-mono text-sm bg-[#282a36] rounded-md text-white" style={{ lineHeight: '1.5' }}>
            {displayedText}
            {currentIndex < text.length && <span className="text-orange-500">▋</span>}
        </pre>
    );
};

export default TypeWriter;