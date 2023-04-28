import Aos from "aos";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config.json";
import CreeperLoading from "../extra/CreeperLoading";
import { useSocket } from "../../providers/SocketProvider";
const Comment = ({ setOpenComment, openComment, postId }) => {
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(true);
  const socket = useSocket();
  const [showLikes, setShowLikes] = useState(false);
  const commentRef = useRef();

  useEffect(() => {
    if (socket) {
      socket.on("updateComments:" + postId, (data) => {
        setPost(data.post);
      });
    }
  }, [socket]);
  const submitComment = (e) => {
    e.preventDefault();
    if (commentRef.current.value.trim() !== "") {
      axios
        .post(config.baseUrl + config.api + "post/comment", {
          postId: postId,
          comment: commentRef.current.value.trim(),
        })
        .then((res) => {
          if (res.data.err) {
            alert("error while commenting!");
          } else {
            commentRef.current.value = "";
            if (socket)
              socket.emit("updateComments", {
                postId: postId,
              });
          }
        });
    }
  };
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    if (postId) {
      setLoading(true);
      axios
        .get(config.baseUrl + config.api + "post/comments/" + postId)
        .then((res) => {
          if (!res.err) {
            setPost(res.data);
            setLoading(false);
          } else {
            alert("error showing comment");
          }
        });
    }
  }, [postId]);
  useEffect(() => {
    if (!loading && post) {
      scroll();
    }
  }, [loading, post]);
  const scroll = () => {
    const element = document.getElementsByClassName("userComments")[0];
    if (element)
      element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
  };
  return (
    <div
      className={
        openComment ? "commentContainner" : "commentContainner closeComment"
      }
    >
      <div
        className="commentBox"
        data-aos="fade-up"
        data-aos-anchor-placement="bottom-bottom"
        data-aos-easing="ease-out-back"
      >
        <div className="commentHeaders">
          <div
            className={
              showLikes ? "commentHeader" : "commentHeader headerSelected"
            }
            onClick={() => setShowLikes(false)}
          >
            Comments
          </div>
          <div
            className={
              showLikes ? "commentHeader headerSelected" : "commentHeader"
            }
            onClick={() => setShowLikes(true)}
          >
            Likes
          </div>
          <i
            class="material-icons commentexitIcon"
            onClick={() => {
              setOpenComment(false);
            }}
          >
            close
          </i>
        </div>
        {showLikes ? (
          <div className="userLikeContainner">
            {post.likes
              ? post.likes.map((like) => {
                  return (
                    <div className="userLikes">
                      <img
                        className="userImage"
                        src={
                          config.avatar + like.userId + "/" + like.profilePic
                        }
                      ></img>
                      <div className="username">{like.username}</div>
                    </div>
                  );
                })
              : ""}
          </div>
        ) : (
          <>
            {" "}
            <div className="userComments">
              {loading ? (
                <div className="loadingContainner">
                  <CreeperLoading></CreeperLoading>
                </div>
              ) : post ? (
                post.comments.map((comment) => (
                  <>
                    <div className="userCommentContainner">
                      <img
                        className="userImage"
                        src={
                          config.avatar +
                          comment.discordId +
                          "/" +
                          comment.profilePic
                        }
                      ></img>
                      <div className="userCommentDetails">
                        <div className="username">{comment.username}</div>
                        <div className="userComment">{comment.comment}</div>
                      </div>
                      <div className="commentIcons">
                        <div className="likeIcon"></div>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                ""
              )}
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
          </>
        )}
      </div>
    </div>
  );
};

export default Comment;
