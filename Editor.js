import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import socket from '../socket';

const SAVE_INTERVAL_MS = 2000;

function Editor() {
  const wrapperRef = useRef();
  const [quill, setQuill] = useState();

  useEffect(() => {
    if (!quill) return;

    const handler = delta => {
      quill.updateContents(delta);
    };
    socket.on('receive-changes', handler);

    return () => {
      socket.off('receive-changes', handler);
    };
  }, [quill]);

  useEffect(() => {
    if (!quill) return;

    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta);
    };

    quill.on('text-change', handler);

    return () => {
      quill.off('text-change', handler);
    };
  }, [quill]);

  useEffect(() => {
    const editor = document.createElement('div');
    wrapperRef.current.append(editor);
    const q = new Quill(editor, { theme: 'snow' });
    setQuill(q);

    return () => {
      wrapperRef.current.innerHTML = '';
    };
  }, []);

  return <div className="container" ref={wrapperRef}></div>;
}

export default Editor;