import { auth } from "@clerk/nextjs/server";
import { ReactNode } from "react";

interface DocLayoutProps {
  children: ReactNode;
}

async function DocLayout({ children }: DocLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    return <div>You need to log in to gain access</div>;
  }

  return <div>{children}</div>;
}

export default DocLayout;
