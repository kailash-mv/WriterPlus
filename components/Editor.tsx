// import { useEffect, useState } from "react";
// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { Button } from "./ui/button";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { BlockNoteView } from "@blocknote/shadcn";
// import { BlockNoteEditor } from "@blocknote/core";
// import { useCreateBlockNote } from "@blocknote/react";
// import "@blocknote/core/fonts/inter.css";
// import "@blocknote/shadcn/style.css";

// function BlockNote({ doc, darkMode }: { doc: Y.Doc; darkMode: boolean }) {
//   const editor: BlockNoteEditor = useCreateBlockNote({
//     collaboration: {
//       fragment: doc.getXmlFragment("document-store"),
//       user: {
//         name: "",
//         color: "",
//       },
//       provider: undefined,
//     },
//   });

//   return (
//     <div className="relative max-w-6xl mx-auto">
//       <BlockNoteView
//         className="min-h-screen"
//         editor={editor}
//         theme={darkMode ? "dark" : "light"}
//       />
//     </div>
//   );
// }

// function Editor() {
//   const [doc, setDoc] = useState<Y.Doc>();
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const provider = new WebsocketProvider(
//       "ws://localhost:1234",
//       "document-id",
//       yDoc
//     );
//     setDoc(yDoc);

//     return () => {
//       provider?.destroy();
//       yDoc?.destroy();
//     };
//   }, []);

//   if (!doc) {
//     return null;
//   }

//   const style = `hover:text-white ${
//     darkMode
//       ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
//       : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
//   }`;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex items-center gap-2 justify-end mb-10">
//         <Button className={style} onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <SunIcon /> : <MoonIcon />}
//         </Button>
//       </div>

//       {/* BlockNote */}

//       <BlockNote doc={doc} darkMode={darkMode} />
//     </div>
//   );
// }
// export default Editor;

// import { useEffect, useState } from "react";
// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import { Button } from "./ui/button";
// import { MoonIcon, SunIcon } from "lucide-react";
// import { BlockNoteView } from "@blocknote/shadcn";
// import { BlockNoteEditor } from "@blocknote/core";
// import { useCreateBlockNote } from "@blocknote/react";
// import "@blocknote/core/fonts/inter.css";
// import "@blocknote/shadcn/style.css";

// function BlockNote({
//   doc,
//   provider,
//   darkMode,
// }: {
//   doc: Y.Doc;
//   provider: WebsocketProvider;
//   darkMode: boolean;
// }) {
//   const editor: BlockNoteEditor = useCreateBlockNote({
//     collaboration: {
//       fragment: doc.getXmlFragment("document-store"),
//       user: {
//         name: "User", // Customize user details
//         color: "#A0B89C",
//       },
//       provider, // ✅ Added provider for WebSocket syncing
//     },
//   });

//   return (
//     <div className="relative max-w-6xl mx-auto">
//       <BlockNoteView
//         className="min-h-screen"
//         editor={editor}
//         theme={darkMode ? "dark" : "light"}
//       />
//     </div>
//   );
// }

// function Editor() {
//   const [doc, setDoc] = useState<Y.Doc | null>(null);
//   const [provider, setProvider] = useState<WebsocketProvider | null>(null);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const wsProvider = new WebsocketProvider(
//       "ws://localhost:1234", // ✅ Ensure your Y.js WebSocket server is running here
//       "persistent-document", // ✅ Unique document ID for persistence
//       yDoc
//     );

//     setDoc(yDoc);
//     setProvider(wsProvider);

//     return () => {
//       wsProvider.destroy();
//       yDoc.destroy();
//     };
//   }, []);

//   if (!doc || !provider) return null;

//   return (
//     <div className="max-w-6xl mx-auto">
//       <div className="flex items-center gap-2 justify-end mb-10">
//         <Button onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <SunIcon /> : <MoonIcon />}
//         </Button>
//       </div>

//       {/* Pass provider to BlockNote for real-time updates */}
//       <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
//     </div>
//   );
// }

// export default Editor;

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Use `useParams` in App Router
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";

function BlockNote({
  doc,
  provider,
  darkMode,
}: {
  doc: Y.Doc;
  provider: WebsocketProvider;
  darkMode: boolean;
}) {
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: "User",
        color: "#A0B89C",
      },
      provider,
    },
  });

  return (
    <div className="relative max-w-6xl mx-auto">
      <BlockNoteView
        className="min-h-screen"
        editor={editor}
        theme={darkMode ? "dark" : "light"}
      />
    </div>
  );
}

function Editor() {
  const [doc, setDoc] = useState<Y.Doc | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const params = useParams();

  useEffect(() => {
    if (!params.id) return;

    const documentId = (params.id as string) || "default-document";
    const yDoc = new Y.Doc();
    const wsProvider = new WebsocketProvider(
      "ws://localhost:1234",
      documentId,
      yDoc
    );

    setDoc(yDoc);
    setProvider(wsProvider);

    return () => {
      wsProvider.destroy();
      yDoc.destroy();
    };
  }, [params.id]);

  if (!doc || !provider) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-2 justify-end mb-10">
        <Button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>

      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
}

export default Editor;
