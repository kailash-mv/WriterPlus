// import { adminDb } from "@/firebase-admin";
// import liveblocks from "@/lib/liveblocks";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//   const { userId, sessionClaims } = await auth();
//   const { room } = await req.json();

//   if (!userId) {
//     return;
//   }

//   const session = liveblocks.prepareSession(sessionClaims?.email!, {
//     userInfo: {
//       name: sessionClaims?.fullName!,
//       email: sessionClaims?.email!,
//       avatar: sessionClaims?.image!,
//     },
//   });

//   const usersInRoom = await adminDb
//     .collectionGroup("rooms")
//     .where("userId", "==", sessionClaims?.email)
//     .get();

//   const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

//   if (userInRoom?.exists) {
//     session.allow(room, session.FULL_ACCESS);
//     const { body, status } = await session.authorize();
//     console.log("you are authorized!");
//     return new Response(body, { status });
//   } else {
//     return NextResponse.json(
//       { message: "You are not in this room" },
//       { status: 403 }
//     );
//   }
// }

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, sessionClaims } = await auth();
  const { room } = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized: User not logged in." },
      { status: 401 }
    );
  }
  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", sessionClaims?.email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    console.log("User is authorized!");
    return NextResponse.json(
      { message: "Access granted to the room." },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "You are not authorized to access this room." },
      { status: 403 }
    );
  }
}
