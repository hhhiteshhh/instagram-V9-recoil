import { signOut, useSession } from "next-auth/react";

function MiniProfile() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={session?.user?.image}
        alt=""
        className="w-16 h-16 rounded-full p-[2px] border"
      />
      <div className="flex-1 mx-4">
        <p className="font-bold">{session?.user?.username}</p>
        <h1 className="text-sm text-gray-400">welcome to Instagram</h1>
      </div>
      <button className="text-blue-400 font-semibold text-sm" onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default MiniProfile;
