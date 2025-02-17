import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
        name: "Active User",
        color: "",
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
