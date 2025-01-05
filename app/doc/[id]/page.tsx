// "use client";

// import { use } from "react";
// import Document from "@/components/Document";

// function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
//   const unwrappedParams = use(params);
//   return (
//     <div className="flex flex-col flex-1 min-h-screen">
//       DocumentPage: {unwrappedParams.id}
//       <Document id={id} />
//     </div>
//   );
// }

// export default DocumentPage;

"use client";

import { use } from "react";
import Document from "@/components/Document";

function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* DocumentPage: {id} */}
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;
