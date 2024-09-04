import React from 'react';

const Footer = () => (
  <footer className="p-6 mt-12 text-white bg-gray-800">
    <div className="container mx-auto">
      <p className="text-center">&copy; {new Date().getFullYear()} Clean Code Learning. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;