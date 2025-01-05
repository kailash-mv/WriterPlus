// import RoomProvider from "@/components/RoomProvider";
// import { auth } from "@clerk/nextjs/server";

// async function DocLayout({
//   children,
//   params,
// }: {
//   children: React.ReactNode;
//   params: { id: string };
// }) {
//   const { userId } = await auth();

//   if (!userId) {
//     return <div className="">You need to log in to gain access</div>;
//   }

//   const { id } = params; // Ensure `params` is awaited before using its properties

//   return <RoomProvider roomId={id}>{children}</RoomProvider>;
// }

// export default DocLayout;

import { auth } from "@clerk/nextjs/server";

async function DocLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    return <div className="">You need to log in to gain access</div>;
  }

  return <div>{children}</div>;
}

export default DocLayout;
