import Editor from '@/components/editor/editor';
import React from 'react';

const WriterPage: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Next.js WYSIWYG Editor</h1>
      <Editor />
    </div>
  );
};

export default WriterPage;
