import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => (
    <div className="flex flex-col min-h-screen" >
        <Header className="fixed top-0 right-0 left-0 z-10" />
        <main className="container flex-grow px-4 mx-auto">
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;