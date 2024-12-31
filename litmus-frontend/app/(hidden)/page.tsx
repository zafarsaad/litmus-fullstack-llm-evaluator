import Link from "next/link";

const HiddenPage = () => {
  return (
    <div>
      This should be hidden! <Link href={"/home"}>Home</Link>{" "}
    </div>
  );
};

export default HiddenPage;
