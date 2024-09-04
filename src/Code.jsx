import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { principles } from './data/principles';
import Typewriter from './components/TypeWriter';

const CleanCodeLearning = () => {
  const [expandedPrinciple, setExpandedPrinciple] = useState(null);
  const [showAfter, setShowAfter] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [userScrolled, setUserScrolled] = useState(false);
  const principleRefs = useRef({});
  const containerRef = useRef(null);
  const activeTypewriterRef = useRef(null);

  const togglePrinciple = (id) => {
    setExpandedPrinciple(expandedPrinciple === id ? null : id);
    setShowAfter({});
    setUserScrolled(false);

    if (expandedPrinciple !== id) {
      setTimeout(() => {
        const element = principleRefs.current[id];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  const toggleAfterCode = (id) => {
    setShowAfter((prev) => ({ ...prev, [id]: !prev[id] }));
    setUserScrolled(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isTyping) {
        setUserScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isTyping]);

  const handleTypingStart = () => {
    setIsTyping(true);
    setUserScrolled(false);
  };

  const handleTypingComplete = () => setIsTyping(false);

  const handleLineTyped = () => {
    if (activeTypewriterRef.current && !userScrolled) {
      const rect = activeTypewriterRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (!isVisible) {
        activeTypewriterRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col pt-24 min-h-full">
      <section className="p-6 mb-12 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-3xl font-bold text-blue-800">Welcome to Clean Code Learning</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          Explore these essential clean code principles to improve your code quality, readability, and maintainability. Each principle includes examples to illustrate good and bad practices.
        </p>
      </section>
      <section className="flex-grow">
        <h2 className="mb-6 text-3xl font-bold text-blue-800">Clean Code Principles and Examples</h2>
        <ul className="space-y-6">
          {principles.map((principle) => (
            <li
              key={principle.id}
              className="overflow-hidden bg-white rounded-lg shadow-lg"
              ref={el => principleRefs.current[principle.id] = el}
            >
              <button
                onClick={() => togglePrinciple(principle.id)}
                className="flex justify-between items-center p-6 w-full text-left"
              >
                <h3 className="text-2xl font-semibold text-blue-700">{principle.title}</h3>
                {expandedPrinciple === principle.id ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedPrinciple === principle.id && (
                <div className="p-6 bg-gray-50">
                  <p className="mb-6 text-gray-700">{principle.content}</p>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-600">Before:</h4>
                    <div ref={activeTypewriterRef}>
                      <Typewriter
                        text={principle.before}
                        speed={15}
                        onTypingComplete={handleTypingComplete}
                        onLineTyped={handleLineTyped}
                      />
                    </div>
                    <button
                      onClick={() => {
                        toggleAfterCode(principle.id);
                        handleTypingStart();
                      }}
                      className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      {showAfter[principle.id] ? 'Hide' : 'Show'} Improved Code
                    </button>
                    {showAfter[principle.id] && (
                      <div>
                        <h4 className="font-semibold text-blue-600">After:</h4>
                        <div ref={activeTypewriterRef}>
                          <Typewriter
                            text={principle.after}
                            speed={15}
                            onTypingComplete={handleTypingComplete}
                            onLineTyped={handleLineTyped}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CleanCodeLearning;