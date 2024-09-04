import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import PrincipleItem from '../components/PrincipleItem';
import SearchBar from '../components/SearchBar';
import { principles } from '../data/principles';

const CleanCodeLearning = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPrinciples = useMemo(() => {
        return principles.filter(principle =>
            principle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            principle.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    return (
        <Layout>
            <section className="p-6 mb-12 bg-white rounded-lg shadow-md">
                <h2 className="mb-4 text-3xl font-bold text-blue-800">Welcome to Clean Code Learning</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                    Explore these essential clean code principles to improve your code quality, readability, and maintainability. Each principle includes examples to illustrate good and bad practices.
                </p>
            </section>
            <section>
                <h2 className="mb-6 text-3xl font-bold text-blue-800">Clean Code Principles and Examples</h2>
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                {filteredPrinciples.length === 0 ? (
                    <p className="text-gray-700">No principles found matching your search.</p>
                ) : (
                    <ul className="space-y-6">
                        {filteredPrinciples.map((principle) => (
                            <PrincipleItem key={principle.id} principle={principle} />
                        ))}
                    </ul>
                )}
            </section>
        </Layout>
    );
};

export default CleanCodeLearning;