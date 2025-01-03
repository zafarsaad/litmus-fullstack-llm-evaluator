// import { queryGroq } from "@/app/util/ai";
import { prisma } from "@/app/util/db";
import DefinedExperiments from "@/components/DefinedExperiments";
import PromptOutput from "@/components/PromptOutput";
import UserExperiment from "@/components/UserExperiment";
import { QueryProvider } from "@/context/QContext";
import { auth, currentUser } from "@clerk/nextjs/server";

const Dashboard = async () => {
  const { userId } = await auth();

  if (userId) {
    console.log(`user found: ${userId}`);
  }

  const user = await currentUser();
  const userName = user?.firstName ?? "No name found";
  const userEmail = user?.emailAddresses[0]?.emailAddress ?? undefined;

  const match = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!match) {
    if (user?.emailAddresses[0]?.emailAddress) {
      await prisma.user.create({
        data: {
          name: userName,
          email: user?.emailAddresses[0]?.emailAddress ?? undefined,
        },
      });
    } else {
      console.log(
        `User: ${userName} had no email address (from array emailAddresses Clerk returned).`
      );
    }
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("API key not found in environment variables.");
    // Handle the case where the API key is missing (e.g., display an error message)
    return <div>Missing API Key</div>;
  }

  return (
    <div className="p-4">
      <div>
        <h3 className="text-xl mb-2">
          Dashboard <span>{userId ? "✅" : "Finding User"}</span>
        </h3>
        <span>
          Welcome {userName}, let&apos;s start testing some LLMs. Below we have
          a few tests.
        </span>
        <button>Query Groq</button>
      </div>
      <div>
        <QueryProvider>
          <DefinedExperiments />
          <UserExperiment />
          <PromptOutput />
        </QueryProvider>
      </div>
    </div>
  );
};

export default Dashboard;
