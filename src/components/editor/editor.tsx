'use client';

import React, { useRef, useState } from 'react';

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  // 버튼 상태 관리
  const [activeStyles, setActiveStyles] = useState<{
    bold: boolean;
    italic: boolean;
    underline: boolean;
  }>({
    bold: false,
    italic: false,
    underline: false,
  });

  // 선택된 텍스트에 스타일을 적용하는 함수
  const applyStyle = (style: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);

      // 스타일 태그 생성
      const styledElement = document.createElement('span');
      if (style === 'bold') styledElement.style.fontWeight = 'bold';
      if (style === 'italic') styledElement.style.fontStyle = 'italic';
      if (style === 'underline')
        styledElement.style.textDecoration = 'underline';

      // 선택된 텍스트를 감싸기
      styledElement.appendChild(range.extractContents());
      range.insertNode(styledElement);

      // 선택 영역 초기화
      selection.removeAllRanges();
    }

    // 버튼 상태 업데이트
    updateActiveStyles();
  };

  // 현재 선택된 텍스트의 스타일 상태 확인
  const updateActiveStyles = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const parentElement = range.commonAncestorContainer.parentElement;

      if (parentElement) {
        setActiveStyles({
          bold:
            parentElement.style.fontWeight === 'bold' ||
            window.getComputedStyle(parentElement).fontWeight === '700',
          italic:
            parentElement.style.fontStyle === 'italic' ||
            window.getComputedStyle(parentElement).fontStyle === 'italic',
          underline:
            parentElement.style.textDecoration === 'underline' ||
            window.getComputedStyle(parentElement).textDecoration ===
              'underline',
        });
      }
    }
  };

  return (
    <div>
      {/* 툴바 */}
      <div style={{ marginBottom: '10px' }}>
        <button
          onClick={() => applyStyle('bold')}
          style={{
            fontWeight: activeStyles.bold ? 'bold' : 'normal',
            backgroundColor: activeStyles.bold ? '#e0e0e0' : 'transparent',
          }}
        >
          Bold
        </button>
        <button
          onClick={() => applyStyle('italic')}
          style={{
            fontStyle: activeStyles.italic ? 'italic' : 'normal',
            backgroundColor: activeStyles.italic ? '#e0e0e0' : 'transparent',
          }}
        >
          Italic
        </button>
        <button
          onClick={() => applyStyle('underline')}
          style={{
            textDecoration: activeStyles.underline ? 'underline' : 'none',
            backgroundColor: activeStyles.underline ? '#e0e0e0' : 'transparent',
          }}
        >
          Underline
        </button>
      </div>

      {/* 에디터 영역 */}
      <div
        ref={editorRef}
        contentEditable
        onMouseUp={updateActiveStyles} // 텍스트 선택 시 활성화 상태 업데이트
        onKeyUp={updateActiveStyles} // 키보드 조작 시 활성화 상태 업데이트
        style={{
          border: '1px solid #ccc',
          minHeight: '200px',
          padding: '10px',
          borderRadius: '4px',
          outline: 'none',
        }}
      ></div>
    </div>
  );
};

export default Editor;
