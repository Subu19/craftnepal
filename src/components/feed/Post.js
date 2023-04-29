import React, { useContext, useEffect, useRef, useState } from "react";
import heartIcon from "../../assets/images/icons/heart.png";
import { useFetchFeed } from "../../hooks/useFetchFeed";
import CreeperLoading from "../extra/CreeperLoading";
import config from "../../config.json";
import axios from "axios";
import { UserContext } from "../../providers/UserProvider";
import { useSocket } from "../../providers/SocketProvider";
import Comment from "./Comment";
const Post = ({ mainPost, setOpenComment, setPostId, setPosting }) => {
  const [post, setPost] = useState(mainPost);
  const socket = useSocket();
  const commentRef = useRef();
  const [user, loading] = useContext(UserContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (post.likes.length > 0) {
      post.likes.find((like) => like.userId == user.id)
        ? setLiked(true)
        : setLiked(false);
    }
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("updatePost:" + post._id, (data) => {
        setPost(data.post);
      });
    }
  }, [socket]);
  const likePost = () => {
    if (!liked)
      axios
        .post(config.baseUrl + config.api + "post/like", { postId: post._id })
        .then((res) => {
          if (res.data.err) {
            alert("error while liking!");
          } else {
            setLiked(true);
            if (socket)
              socket.emit("updatePost", {
                postId: post._id,
              });
          }
        })
        .catch((err) => console.log(err));
    else
      axios
        .post(config.baseUrl + config.api + "post/unlike", { postId: post._id })
        .then((res) => {
          if (res.data.err) {
            alert("error while Unliking!");
          } else {
            setLiked(false);
            if (socket)
              socket.emit("updatePost", {
                postId: post._id,
              });
          }
        });
  };
  const submitComment = (e) => {
    e.preventDefault();
    if (commentRef.current.value.trim() !== "") {
      axios
        .post(config.baseUrl + config.api + "post/comment", {
          postId: post._id,
          comment: commentRef.current.value.trim(),
        })
        .then((res) => {
          if (res.data.err) {
            alert("error while commenting!");
          } else {
            commentRef.current.value = "";
            if (socket)
              socket.emit("updatePost", {
                postId: post._id,
              });
          }
        });
    }
  };
  const getTime = (postTime) => {
    var time = Date.now() - postTime;
    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    seconds = seconds % 60;
    minutes = minutes % 60;
    if (minutes < 1) {
      return seconds + " sec ago";
    } else if (hours < 1) {
      return minutes + " min ago";
    } else if (days < 1) {
      return hours + " hr ago";
    } else {
      return days + " days ago";
    }
  };

  return (
    <div className="post">
      {post.author.id == user.id || user.isAdmin ? (
        <>
          <i class="fa fa-ellipsis-v optionIcon"></i>
          <Options setPosting={setPosting} postId={post._id}></Options>
        </>
      ) : (
        ""
      )}

      <div className="postHeader">
        <img
          className="userImage"
          src={config.avatar + post.author.id + "/" + post.author.profilePic}
        ></img>
        <b className="username">{post.author.username}</b>
        <i className="postDate">{getTime(post.id)}</i>
      </div>
      <div className="postCaption">{post.caption}</div>
      <img
        className="postImage"
        src={config.baseUrl + "uploads/" + post.postImage}
      ></img>
      <div className="postFooter">
        <div className="footerIcons">
          <div className="likes">
            <img
              className={liked ? "heartIcon" : "unheartIcon"}
              src={heartIcon}
              onClick={() => likePost()}
            ></img>
            <b className="footerTitle">{post.likes.length}</b>
          </div>
          <div
            className="comments "
            onClick={() => {
              setOpenComment(true);
              setPostId(post._id);
            }}
          >
            <i class="material-icons commentIcon">chat</i>
            <b className="footerTitle">{post.comments.length}</b>
          </div>
        </div>
        <form className="comment" onSubmit={(e) => submitComment(e)}>
          <input
            className="commentInput"
            aria-autocomplete="false"
            placeholder="Reply with something.."
            ref={commentRef}
          ></input>
          <button type="submit" className="sendButton">
            <i class="material-icons sendIcon">send</i>
          </button>
        </form>
      </div>
    </div>
  );
};

const Options = ({ postId, setPosting }) => {
  const [show, setShow] = useState(false);
  const deletePost = () => {
    const c = confirm("Are you sure you want to delete this post?");
    if (c) {
      setPosting(true);
      axios
        .post(config.baseUrl + config.api + "post/delete/" + postId)
        .then((res) => {
          setPosting(false);
        })
        .catch((err) => {
          alert("Error while deleting!");
        });
    }
    setShow(false);
  };
  return (
    <>
      <i class="fa fa-ellipsis-v optionIcon" onClick={() => setShow(!show)}></i>
      {show ? (
        <div className="optionContainner">
          <div className="options">
            <div className="option" onClick={() => deletePost()}>
              <i class="material-icons">delete_sweep</i> Delete
            </div>

            <i class="fa fa-sort-up optionPointer"></i>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export const Posts = ({ posting, setPosting }) => {
  const { feed, loading, limit, setLimit, loadingMore } = useFetchFeed(posting);
  const [openComment, setOpenComment] = useState(false);
  const [postId, setPostId] = useState();

  return (
    <>
      {loading ? (
        <div className="loadingContainner">
          <CreeperLoading></CreeperLoading>
        </div>
      ) : feed.err ? (
        <div className="contentTitle">Something went wrong!</div>
      ) : feed ? (
        feed.map((post) => (
          <Post
            setPosting={setPosting}
            mainPost={post}
            setOpenComment={setOpenComment}
            setPostId={setPostId}
          ></Post>
        ))
      ) : (
        ""
      )}
      {!loadingMore ? (
        <button
          className="showMore"
          onClick={() => {
            setLimit(limit + 10);
          }}
        >
          Show More
        </button>
      ) : !loading ? (
        <i class="fa fa-circle-o-notch fa-spin loadingCircle"></i>
      ) : (
        ""
      )}

      {openComment ? (
        <Comment
          setOpenComment={setOpenComment}
          openComment={openComment}
          postId={postId}
        ></Comment>
      ) : (
        ""
      )}
    </>
  );
};

export default Post;
