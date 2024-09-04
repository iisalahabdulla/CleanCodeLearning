import React, { useState, useEffect, useRef } from 'react';

const TypeWriter = ({ text, speed = 50, onTypingComplete, onLineTyped }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const preRef = useRef(null);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
                if (text[currentIndex] === '\n' && onLineTyped) {
                    onLineTyped();
                }
            }, speed);
            return () => clearTimeout(timer);
        } else if (onTypingComplete) {
            onTypingComplete();
        }
    }, [text, currentIndex, speed, onTypingComplete, onLineTyped]);

    useEffect(() => {
        if (preRef.current) {
            preRef.current.style.height = `${preRef.current.scrollHeight}px`;
        }
    }, [displayedText]);

    return (
        <pre 
            ref={preRef}
            className="p-4 font-mono text-sm bg-[#282a36] rounded-md text-white overflow-hidden transition-[height] duration-300 ease-in-out" 
            style={{ lineHeight: '1.5', minHeight: '3rem' }}
        >
            {displayedText}
            {currentIndex < text.length && <span className="text-orange-500">▋</span>}
        </pre>
    );
};

export default TypeWriter;