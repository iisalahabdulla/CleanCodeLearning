import React from 'react';
import { highlightCode } from '../utils/highlightCode';

const CodeBlock = ({ code }) => (
  <pre className="overflow-x-auto p-4 font-mono text-sm bg-[#282a36] rounded-md" style={{lineHeight: '1.5'}}>
    <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
  </pre>
);

export default CodeBlock;