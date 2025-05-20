import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";

const TOOLBAR_OPTIONS = [
  ["bold", "italic", "underline", "strike"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ direction: "rtl" }],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

function App() {
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    const editor = document.createElement("div");
    editorRef.current.innerHTML = ""; // Clear any previous content
    editorRef.current.append(editor);

    const quill = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    quill.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user") return;
      socketRef.current.emit("send-changes", delta);
    });

    socketRef.current.on("receive-changes", (delta) => {
      quill.updateContents(delta);
    });

    quillRef.current = quill;

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <div ref={editorRef} style={{ height: "100vh", padding: "2rem" }} />
  );
}

export default App;
