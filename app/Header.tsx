import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { unstable_getServerSession } from 'next-auth/next'

const Header = async () => {

  const session = await unstable_getServerSession();

  if (session)
    return (
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white p-10 shadow-sm">
        
        <div className="flex space-x-2">
          <Image
            className="mx-2 rounded-full object-contain"
            height={10}
            width={50}
            src={session.user?.image!}
            alt="Profile Picture"
          />
          <div>
            <p className="text-blue-400">Logged In as:</p>
            <p className="font-bold text-lg">{session.user?.name}</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center bg-white p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex items-center space-x-2">
          <Image
            src="https://links.papareact.com/jne"
            alt="logo"
            height={10}
            width={50}
          />
          <p className="text-blue-400">Welcome to Meta Messenger</p>
        </div>
        <Link
          href="/auth/signin"
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
};

export default Header;
