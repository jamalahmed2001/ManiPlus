import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/api/root";
import { createInnerTRPCContext } from "@/server/api/trpc";
import { auth } from "@/server/auth";

const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: async () => {
      // Derive session using NextAuth with App Router Request.
      const session = await auth();
      return createInnerTRPCContext({ session });
    },
  });
};

export { handler as GET, handler as POST };


