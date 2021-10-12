import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import Post from "./Post";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );
  // console.log(posts);
  // const posts = [
  //   {
  //     id: 123,
  //     username: "hhhiteshhh",
  //     userImg: "https://links.papareact.com/3ke",
  //     img: "https://links.papareact.com/3ke",
  //     caption: "This is DOPE",
  //   },
  //   {
  //     id: 123,
  //     username: "hhhiteshhh",
  //     userImg: "https://links.papareact.com/3ke",
  //     img: "https://links.papareact.com/3ke",
  //     caption: "This is DOPE",
  //   },
  // ];

  return (
    <div>
      {posts.map((post, i) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          caption={post.data().caption}
          userImg={post.data().profileImg}
          img={post.data().image}
        />
      ))}
    </div>
  );
}

export default Posts;
