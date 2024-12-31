import { auth, currentUser } from "@clerk/nextjs/server";

const Dashboard = async () => {
  const { userId } = await auth();

  if (userId) {
    console.log(`user found: ${userId}`);
  }

  const user = await currentUser();
  const userName = user?.firstName;

  return (
    <div className="p-4">
      <div>
        <h3 className="text-xl mb-2">Dashboard</h3>
        <span>
          Welcome {userName}, let's start testing some LLMs. Below we have a few
          tests.
        </span>
      </div>
    </div>
  );
};

export default Dashboard;
