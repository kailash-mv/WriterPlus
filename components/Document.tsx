// "use client";

// import { FormEvent, useEffect, useState, useTransition } from "react";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { doc, updateDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { useDocumentData } from "react-firebase-hooks/firestore";
// import Editor from "./Editor";
// import useOwner from "@/lib/useOwner";
// import DeleteDocument from "./DeleteDocument";
// import ManageUsers from "./ManageUsers";

// function Document({ id }: { id: string }) {
//   const [data] = useDocumentData(doc(db, "documents", id));

//   const [input, setInput] = useState("");
//   const [isUpdating, startTransition] = useTransition();
//   const isOwner = useOwner();

//   useEffect(() => {
//     if (data) {
//       setInput(data.title);
//     }
//   }, [data]);

//   const updateTitle = (e: FormEvent) => {
//     e.preventDefault();
//     if (input.trim()) {
//       startTransition(async () => {
//         await updateDoc(doc(db, "documents", id), {
//           title: input,
//         });
//       });
//     }
//   };

//   return (
//     <div className="">
//       <div className="max-w-6xl flex mx-auto justify-between pb-5">
//         <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
//           <Input value={input} onChange={(e) => setInput(e.target.value)} />
//           <Button disabled={isUpdating} type="submit">
//             {isUpdating ? "Updating..." : "Update"}
//           </Button>
//           {isOwner && (
//             <>
//               {/* <InviteUser /> */}
//               <DeleteDocument />
//             </>
//           )}
//         </form>
//       </div>

//       <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
//         {/* <ManageUsers /> */}
//       </div>

//       <hr className="pb-10" />
//       <Editor />
//     </div>
//   );
// }

// export default Document;

"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import DeleteDocument from "./DeleteDocument";
import ManageUsers from "./ManageUsers";

function Document({ id }: { id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));

  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="">
      <div className="max-w-6xl flex mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>
          {/* If isOwner was used, remove or keep based on your new logic */}
          <DeleteDocument />
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        {/* ManageUsers if needed */}
      </div>

      <hr className="pb-10" />
      <Editor />
    </div>
  );
}

export default Document;
