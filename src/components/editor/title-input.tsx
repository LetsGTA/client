'use client';

import { JSX, useState, type ChangeEvent } from 'react';

const TitleInput = (): JSX.Element => {
  const [title, setTitle] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-6">
      <div className="space-y-2">
        <input
          id="blog-title"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="제목을 입력해주세요"
          className="w-full bg-transparent text-3xl font-bold outline-none border-0 border-b border-border focus:border-primary focus:ring-0 px-0 py-2 placeholder:text-muted-foreground/50"
        />
      </div>
    </div>
  );
};

export default TitleInput;
