import { prisma } from "@/app/util/db";
import DefinedExperiments from "@/components/DefinedExperiments";
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

  return (
    <div className="p-4">
      <div>
        <h3 className="text-xl mb-2">
          Dashboard <span>{userId ? "✅" : "Finding User"}</span>
        </h3>
        <span>
          Welcome {userName}, let's start testing some LLMs. Below we have a few
          tests.
        </span>
      </div>
      <div>
        <DefinedExperiments />
      </div>
      <div className="p-2 my-4">
        <input
          type="text"
          placeholder="...your query"
          className=" font-black "
        />
      </div>
      <div className="mt-4 bg-slate-600 w-[800px]">
        <textarea name="output" id="output1"></textarea>
      </div>
    </div>
  );
};

export default Dashboard;
