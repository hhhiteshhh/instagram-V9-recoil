import faker from "faker";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Story from "./Story";
function Stories() {
  const [storiesData, setStoriesData] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setStoriesData(suggestions);
  }, []);
  const {data:session} = useSession()
  return (
    <div className="flex space-x-6 bg-white p-6 mt-8 border-gray-200 border rounded-sm overflow-scroll scrollbar-hide">
      {session && (
        <Story img={session?.user?.image} username={session?.user?.username} />
      )}
      {storiesData.map((profile, i) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
}

export default Stories;
