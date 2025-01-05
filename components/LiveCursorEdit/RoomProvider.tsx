// "use client";

// import {
//   ClientSideSuspense,
//   RoomProvider as RoomProviderWrapper,
// } from "@liveblocks/react/suspense";
// import LoadingSpinner from "./LoadingSpinner";
// import LiveCursorProvider from "./LiveCursorProvider";

// function RoomProvider({
//   roomId,
//   children,
// }: {
//   roomId: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <RoomProviderWrapper
//       id={roomId}
//       initialPresence={{
//         cursor: null,
//       }}
//     >
//       <ClientSideSuspense fallback={<LoadingSpinner />}>
//         <LiveCursorProvider>{children}</LiveCursorProvider>
//       </ClientSideSuspense>
//     </RoomProviderWrapper>
//   );
// }
// export default RoomProvider;

"use client";

function RoomProvider({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export default RoomProvider;
