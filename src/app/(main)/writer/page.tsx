import { Editor } from '@/components/editor/editor';
import TitleInput from '@/components/editor/title-input';
import { Toolbar } from '@/components/editor/toolbar';
import React from 'react';

const WriterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <TitleInput />
      <Editor />
    </div>
  );
};

export default WriterPage;
