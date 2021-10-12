import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useState } from "react";
import { db } from "../firebase";
import Moment from "react-moment";
function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db]
  );
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
        setLikes(snapshot.docs);
      }),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [likes]
  );
  const sendComment = async (e) => {
    e.preventDefault();
    const commentToSend = comment;
    setComment("");
    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    });
  };
  // console.log(comments?.data());

  const sendLike = async (e) => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      });
    }
  };
  return (
    <div className="bg-white my-7 border rounded-sm">
      <header className="flex items-center p-5">
        <div className="flex items-center flex-1 ">
          <img
            src={userImg}
            className="h-12 w-12 rounded-full object-contain border p-1 mr-3"
          />
          <p className="font-bold">{username}</p>
        </div>
        <DotsHorizontalIcon className="h-5" />
      </header>
      <section>
        <img src={img} className="object-cover w-full" alt="" />
      </section>
      {session && (
        <footer>
          <div className="flex items-center justify-between px-4 pt-4">
            <div className="flex space-x-4 ">
              {hasLiked ? (
                <HeartIconFilled
                  className="btn text-red-500"
                  onClick={sendLike}
                />
              ) : (
                <HeartIcon className="btn" onClick={sendLike} />
              )}
              <ChatIcon className="btn" />
              <PaperAirplaneIcon className="btn" />
            </div>
            <BookmarkIcon className="btn" />
          </div>
          {/* likes */}
          <p className="p-5 truncate">
            {likes.length > 0 && (
              <p className="mb-1 font-bold">{likes.length} likes</p>
            )}
            <span className="font-bold mr-1"> {username} </span>
            {caption}
          </p>
          {/* comments */}
          {comments.length > 0 && (
            <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex items-center space-x-2 mb-3"
                >
                  <img
                    className="h-7 rounded-full"
                    src={comment.data().userImage}
                    alt=""
                  />
                  <p className="text-sm flex-1">
                    <span className="font-bold">{comment.data().username}</span>
                    {comment.data().comment}
                  </p>
                  <Moment fromNow className="pr-5 text-xs">
                    {comment.data().timestamp?.toDate()}
                  </Moment>
                </div>
              ))}
            </div>
          )}
          <form className="flex items-center p-4">
            <EmojiHappyIcon className="btn" />
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 border-none focus:ring-0 outline-none"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              onClick={sendComment}
              className="font-semibold text-blue-400"
            >
              Post
            </button>
          </form>
        </footer>
      )}
    </div>
  );
}

export default Post;
