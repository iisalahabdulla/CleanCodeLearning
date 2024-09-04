import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="container flex-grow px-4 py-8 mx-auto">
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;