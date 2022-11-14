import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

const SignInPage = async () => {
  const providers = await getProviders();

  return (
    <div>
      <div className="grid justify-center">
        <Image
          src="https://links.papareact.com/161"
          className="mx-2 rounded-full object-cover"
          width={700}
          height={700}
          alt="logout"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
};

export default SignInPage;
