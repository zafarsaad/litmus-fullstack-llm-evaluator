import { auth } from "@clerk/nextjs/server";
import { SignIn } from "@clerk/nextjs";

const SignInPage = async () => {
  const userId = await auth();

  if (userId) {
    console.log(userId);
  }

  return (
    <div className="flex justify-center">
      <SignIn forceRedirectUrl="/dashboard" />
    </div>
  );
};

export default SignInPage;
