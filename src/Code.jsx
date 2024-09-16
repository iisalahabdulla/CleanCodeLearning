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

  useEffect(() => {
    // Add a CSS custom property for scroll margin
    document.documentElement.style.setProperty('--scroll-margin-top', '50px');
  }, []);

  const togglePrinciple = (id) => {
    setExpandedPrinciple(expandedPrinciple === id ? null : id);
    setShowAfter({});
    setUserScrolled(false);

    if (expandedPrinciple !== id) {
      setTimeout(() => {
        const element = principleRefs.current[id];
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'end' });
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
      const viewportHeight = window.innerHeight;
      const bottomOffset = 100; // Adjust this value as needed

      // Only scroll if the bottom of the content is below the viewport
      if (rect.bottom > viewportHeight) {
        const scrollAmount = rect.bottom - viewportHeight + bottomOffset;
        window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col pt-24 min-h-full">
      <section className="p-4 mb-8 bg-white rounded-lg shadow-md md:p-6 md:mb-12">
        <h2 className="mb-4 text-2xl font-bold text-blue-800 md:text-3xl">Welcome to Clean Code Learning</h2>
        <p className="text-base leading-relaxed text-gray-700 md:text-lg">
          Explore these essential clean code principles to improve your code quality, readability, and maintainability. Each principle includes examples to illustrate good and bad practices.
        </p>
      </section>
      <section className="flex-grow">
        <h2 className="mb-6 text-2xl font-bold text-blue-800 md:text-3xl">Clean Code Principles and Examples</h2>
        <ul className="space-y-6">
          {principles.map((principle) => (
            <li
              key={principle.id}
              className="overflow-hidden bg-white rounded-lg shadow-lg scrollmt-[var(--scroll-margin-top)]"
              ref={el => principleRefs.current[principle.id] = el}
            >
              <button
                onClick={() => togglePrinciple(principle.id)}
                className="flex justify-between items-center p-4 w-full text-left md:p-6"
              >
                <h3 className="text-xl font-semibold text-blue-700 md:text-2xl">{principle.title}</h3>
                {expandedPrinciple === principle.id ? <ChevronUp /> : <ChevronDown />}
              </button>
              {expandedPrinciple === principle.id && (
                <div className="p-4 bg-gray-50 md:p-6">
                  <p className="mb-4 text-sm text-gray-700 md:mb-6 md:text-base">{principle.content}</p>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-blue-600">Before:</h4>
                    <div ref={activeTypewriterRef} className="text-sm md:text-base">
                      <Typewriter
                        text={principle.before}
                        speed={5}
                        onTypingComplete={handleTypingComplete}
                        onLineTyped={handleLineTyped}
                      />
                    </div>
                    <button
                      onClick={() => {
                        toggleAfterCode(principle.id);
                        handleTypingStart();
                      }}
                      className="px-4 py-2 text-sm text-white bg-green-500 rounded md:text-base hover:bg-green-600"
                    >
                      {showAfter[principle.id] ? 'Hide' : 'Show'} Improved Code
                    </button>
                    {showAfter[principle.id] && (
                      <div>
                        <h4 className="font-semibold text-blue-600">After:</h4>
                        <div ref={activeTypewriterRef} className="text-sm md:text-base">
                          <Typewriter
                            text={principle.after}
                            speed={5}
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