import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
        <div 
            ref={preRef}
            className="overflow-hidden transition-[height] duration-300 ease-in-out" 
            style={{ minHeight: '3rem' }}
        >
            <SyntaxHighlighter
                language="java"
                style={nightOwl}
                customStyle={{
                    // background: '#FFF',
                    padding: '1rem',
                    margin: 0,
                    lineHeight: '1.5',
                }}
            >
                {displayedText}
            </SyntaxHighlighter>
        </div>
    );
};

export default TypeWriter;