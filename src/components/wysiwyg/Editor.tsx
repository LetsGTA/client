'use client';

import { FC, useEffect, useRef } from 'react';

import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import { Card, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const dbName = 'ImageEditorDB';
const storeName = 'images';

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveImageToIndexedDB(file) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      const blobData = { blob: reader.result };
      const request = store.add(blobData);

      request.onsuccess = () =>
        resolve(URL.createObjectURL(new Blob([reader.result])));
      request.onerror = () => reject(request.error);
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file); // 파일 읽기 시작
  });
}

async function getImagesFromIndexedDB() {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);

    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deleteImageFromIndexedDB(id) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

function displayImage(url) {
  const imgElement = document.createElement('img');
  imgElement.src = url;
  document.getElementById('image-preview').appendChild(imgElement);
}

const Editor: FC = () => {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    // Editor.js 초기화
    const editor = new EditorJS({
      holder: 'editorjs', // 에디터가 렌더링될 div의 ID
      tools: {
        header: Header,
        list: List,
        image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (file) => {
                // 파일을 IndexedDB에 저장하고 URL 반환
                const url = await saveImageToIndexedDB(file);
                return {
                  success: 1,
                  file: { url },
                };
              },
            },
          },
        },
      },
      placeholder: '여기에 내용을 입력하세요...',
      onReady: () => {
        console.log('Editor.js가 준비되었습니다!');
      },
      onChange: async () => {
        const content = await editor.saver.save();
        console.log('현재 내용:', content);
      },
    });

    editorRef.current = editor;

    // 컴포넌트 언마운트 시 에디터 정리
    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Card>
        <CardTitle>
          <Input type="text" placeholder="게시글의 제목을 입력해주세요." />
        </CardTitle>
        <div id="editorjs"></div>
      </Card>
    </>
  );
};

export default Editor;
