import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import TypeWriter from './TypeWriter';

const PrincipleItem = ({ principle }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showAfter, setShowAfter] = useState(false);
    const [key, setKey] = useState(0);

    const toggleAfterCode = () => {
        setShowAfter(!showAfter);
        setKey(prevKey => prevKey + 1);
    };

    return (
        <li className="bg-white rounded-lg shadow-lg">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex justify-between items-center p-6 w-full text-left"
            >
                <h3 className="text-2xl font-semibold text-blue-700">{principle.title}</h3>
                {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isExpanded && (
                <div className="p-6 bg-gray-50">
                    <p className="mb-6 text-gray-700">{principle.content}</p>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-blue-600">Before:</h4>
                        <TypeWriter key={`before-${principle.id}-${key}`} text={principle.before} speed={10} />
                        <button
                            onClick={toggleAfterCode}
                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                        >
                            {showAfter ? 'Hide' : 'Show'} Improved Code
                        </button>
                        {showAfter && (
                            <div>
                                <h4 className="font-semibold text-blue-600">After:</h4>
                                <TypeWriter key={`after-${principle.id}-${key}`} text={principle.after} speed={10} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </li>
    );
};

export default PrincipleItem;