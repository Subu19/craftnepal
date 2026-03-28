import axios from "axios";
import { useEffect, useRef, useState, FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import CreeperLoading from "../extra/CreeperLoading";
import { useSocket } from "../../providers/SocketProvider";
import { PostData } from "../../types";

interface CommentProps {
    setOpenComment: (open: boolean) => void;
    openComment: boolean;
    postId: string;
}

const Comment = ({ setOpenComment, openComment, postId }: CommentProps) => {
    const [post, setPost] = useState<PostData>();
    const [loading, setLoading] = useState(true);
    const socket = useSocket();
    const [showLikes, setShowLikes] = useState(false);
    const commentRef = useRef<HTMLInputElement>(null);
    const commentBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (socket) {
            socket.on("updateComments:" + postId, (data: { post: PostData }) => {
                setPost(data.post);
            });
        }
    }, [socket, postId]);

    const submitComment = (e: FormEvent) => {
        e.preventDefault();
        if (commentRef.current && commentRef.current.value.trim() !== "") {
            axios
                .post(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "post/comment", {
                    postId: postId,
                    comment: commentRef.current.value.trim(),
                })
                .then((res) => {
                    if (res.data.err) {
                        alert("error while commenting!");
                    } else {
                        if (commentRef.current) commentRef.current.value = "";
                        if (socket)
                            socket.emit("updateComments", {
                                postId: postId,
                            });
                    }
                });
        }
    };

    useGSAP(() => {
        if (openComment) {
            gsap.from(commentBoxRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
            });
        }
    }, [openComment]);

    useEffect(() => {
        if (postId) {
            setLoading(true);
            axios.get(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "post/comments/" + postId).then((res) => {
                if (!res.data.err) {
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
        if (element) element.scrollTo({ top: element.scrollHeight, behavior: "smooth" });
    };

    return (
        <div className={openComment ? "commentContainner" : "commentContainner closeComment"}>
            <div ref={commentBoxRef} className="commentBox">
                <div className="commentHeaders">
                    <div className={showLikes ? "commentHeader" : "commentHeader headerSelected"} onClick={() => setShowLikes(false)}>
                        Comments
                    </div>
                    <div className={showLikes ? "commentHeader headerSelected" : "commentHeader"} onClick={() => setShowLikes(true)}>
                        Likes
                    </div>
                    <i
                        className="material-icons commentexitIcon"
                        onClick={() => {
                            setOpenComment(false);
                        }}
                    >
                        close
                    </i>
                </div>
                {showLikes ? (
                    <div className="userLikeContainner">
                        {post?.likes
                            ? post.likes.map((like, i) => {
                                return (
                                    <div className="userLikes" key={i}>
                                        <img className="userImage" src={import.meta.env.VITE_APP_AVATAR + like.userId + "/" + like.profilePic} alt={like.username}></img>
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
                            ) : post && post.comments ? (
                                post.comments.map((comment, i) => (
                                    <div className="userCommentContainner" key={i}>
                                        <img
                                            className="userImage"
                                            src={import.meta.env.VITE_APP_AVATAR + comment.discordId + "/" + comment.profilePic}
                                            alt={comment.username}
                                        ></img>
                                        <div className="userCommentDetails">
                                            <div className="username">{comment.username}</div>
                                            <div className="userComment">{comment.comment}</div>
                                        </div>
                                        <div className="commentIcons">
                                            <div className="likeIcon"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                ""
                            )}
                        </div>
                        <form className="comment" onSubmit={(e) => submitComment(e)}>
                            <input className="commentInput" aria-autocomplete="none" placeholder="Reply with something.." ref={commentRef}></input>
                            <button type="submit" className="sendButton">
                                <i className="material-icons sendIcon">send</i>
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Comment;
