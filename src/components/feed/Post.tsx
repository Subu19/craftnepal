import { useEffect, useRef, useState, FormEvent, memo } from "react";
import heartIcon from "../../assets/images/icons/heart.webp";
import { useFetchFeed } from "../../hooks/useFetchFeed";
import CreeperLoading from "../extra/CreeperLoading";

import axios from "axios";
import { useUserStore } from "../../store/useUserStore";
import { useSocket } from "../../providers/SocketProvider";
import Comment from "./Comment";
import { PostData } from "../../types";

interface PostProps {
    mainPost: PostData;
    setOpenComment: (open: boolean) => void;
    setPostId: (id: string) => void;
    setPosting: (posting: boolean) => void;
}

const Post = memo(({ mainPost, setOpenComment, setPostId, setPosting }: PostProps) => {
    const [post, setPost] = useState<PostData>(mainPost);
    const socket = useSocket();
    const commentRef = useRef<HTMLInputElement>(null);
    const user = useUserStore((state) => state.user);

    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (post.likes.length > 0) {
            // eslint-disable-next-line eqeqeq
            post.likes.find((like) => like.userId == user.id) ? setLiked(true) : setLiked(false);
        }
    }, [post.likes, user.id]);

    useEffect(() => {
        if (socket) {
            socket.on("updatePost:" + post._id, (data: { post: PostData }) => {
                setPost(data.post);
            });
        }
    }, [socket, post._id]);

    const likePost = () => {
        if (!liked)
            axios
                .post(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "post/like", { postId: post._id })
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
                .catch(() => { });
        else
            axios.post(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "post/unlike", { postId: post._id }).then((res) => {
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

    const submitComment = (e: FormEvent) => {
        e.preventDefault();
        if (commentRef.current && commentRef.current.value.trim() !== "") {
            axios
                .post(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "post/comment", {
                    postId: post._id,
                    comment: commentRef.current.value.trim(),
                })
                .then((res) => {
                    if (res.data.err) {
                        alert("error while commenting!");
                    } else {
                        if (commentRef.current) commentRef.current.value = "";
                        if (socket)
                            socket.emit("updatePost", {
                                postId: post._id,
                            });
                    }
                });
        }
    };

    const getTime = (postTime: number) => {
        const time = Date.now() - postTime;
        let seconds = Math.floor(time / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
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
            {post.author.id === user.id || user.isAdmin ? (
                <>
                    <i className="fa fa-ellipsis-v optionIcon"></i>
                    <Options setPosting={setPosting} postId={post._id}></Options>
                </>
            ) : (
                ""
            )}

            <div className="postHeader">
                <img className="userImage" src={import.meta.env.VITE_APP_AVATAR + post.author.id + "/" + post.author.profilePic} alt={post.author.username} loading="lazy" />
                <b className="username">{post.author.username}</b>
                <i className="postDate">{getTime(post.id)}</i>
            </div>
            <div className="postCaption">{post.caption}</div>
            <img className="postImage" src={import.meta.env.VITE_APP_BASE_URL + "/uploads/" + post.postImage} alt="post" loading="lazy" />
            <div className="postFooter">
                <div className={user.id ? "footerIcons" : "footerIcons blockSign"}>
                    <div className="likes">
                        <img
                            className={(liked ? "heartIcon" : "unheartIcon") + (user.id ? "" : " disableUser")}
                            src={heartIcon}
                            onClick={() => likePost()}
                            alt="like"
                            loading="lazy"
                        ></img>
                        <b className="footerTitle">{post.likes.length}</b>
                    </div>
                    <div
                        className={user.id ? "comments " : "disableUser comments"}
                        onClick={() => {
                            setOpenComment(true);
                            setPostId(post._id);
                        }}
                    >
                        <i className="material-icons commentIcon">chat</i>
                        <b className="footerTitle">{post.comments.length}</b>
                    </div>
                </div>
                {user.id ? (
                    <form className="comment" onSubmit={(e) => submitComment(e)}>
                        <input className="commentInput" aria-autocomplete="none" placeholder="Reply with something.." ref={commentRef}></input>
                        <button type="submit" className="sendButton">
                            <i className="material-icons sendIcon">send</i>
                        </button>
                    </form>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
});

const Options = ({ postId, setPosting }: { postId: string; setPosting: (posting: boolean) => void }) => {
    const [show, setShow] = useState(false);
    const deletePost = () => {
        // eslint-disable-next-line no-restricted-globals
        const c = confirm("Are you sure you want to delete this post?");
        if (c) {
            setPosting(true);
            axios
                .post(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "post/delete/" + postId)
                .then(() => {
                    setPosting(false);
                })
                .catch(() => {
                    alert("Error while deleting!");
                });
        }
        setShow(false);
    };
    return (
        <>
            <i className="fa fa-ellipsis-v optionIcon" onClick={() => setShow(!show)}></i>
            {show ? (
                <div className="optionContainner">
                    <div className="options">
                        <div className="option" onClick={() => deletePost()}>
                            <i className="material-icons">delete_sweep</i> Delete
                        </div>

                        <i className="fa fa-sort-up optionPointer"></i>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};
export const Posts = memo(({ posting, setPosting }: { posting: boolean; setPosting: (posting: boolean) => void }) => {
    const { feed, loading, limit, setLimit, loadingMore, error } = useFetchFeed(posting);
    const [openComment, setOpenComment] = useState(false);
    const [postId, setPostId] = useState<string>();

    return (
        <>
            {loading ? (
                <div className="loadingContainner">
                    <CreeperLoading></CreeperLoading>
                </div>
            ) : error ? (
                <div className="contentTitle">Something went wrong!</div>
            ) : Array.isArray(feed) ? (
                feed.map((post: PostData) => <Post key={post._id} setPosting={setPosting} mainPost={post} setOpenComment={setOpenComment} setPostId={setPostId}></Post>)
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
                <i className="fa fa-circle-o-notch fa-spin loadingCircle"></i>
            ) : (
                ""
            )}

            {openComment && postId ? <Comment setOpenComment={setOpenComment} openComment={openComment} postId={postId}></Comment> : ""}
        </>
    );
});

export default Post;
