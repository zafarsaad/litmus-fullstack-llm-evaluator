import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center">
      <SignUp forceRedirectUrl="/about" />
    </div>
  );
}

// import { SignUp } from "@clerk/nextjs";

// const SignUpPage = () => {
//   return (
//     <div className="bg-black">
//       <h3>Sign Up</h3>
//       <SignUp forceRedirectUrl="/dashboard" fallbackRedirectUrl="dashboard" />
//     </div>
//   );
// };

// export default SignUp;
