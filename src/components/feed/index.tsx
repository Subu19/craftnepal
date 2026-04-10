import { useRef, useState, ChangeEvent, FormEvent } from "react";
import { useUserStore } from "../../store/useUserStore";
import CreeperLoading from "../extra/CreeperLoading";
import imagePng from "../../assets/images/icons/image.webp";
import "./main.css";
import "./mobile.css";

import { Posts } from "./Post";
import axios from "axios";
import Supporters from "./Supporters";
import ScrollToTop from "../extra/ScrollToTop";

const FeedContainner = () => {
    const fileref = useRef<HTMLInputElement>(null);
    const previewRef = useRef<HTMLImageElement>(null);
    const captionRef = useRef<HTMLInputElement>(null);
    const user = useUserStore((state) => state.user);
    const loading = useUserStore((state) => state.isAuthenticating);

    // const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [posting, setPosting] = useState(false);

    const checkImage = (e: ChangeEvent<HTMLInputElement>) => {
        const imgfiles = e.target.files;
        if (imgfiles && imgfiles.length > 0) {
            const src = URL.createObjectURL(imgfiles[0]);
            if (previewRef.current) {
                previewRef.current.src = src;
                previewRef.current.classList.add("showImage");
            }
            // setSelectedFile(imgfiles[0]);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        setPosting(true);
        e.preventDefault();
        const fd = new FormData(document.getElementById("postForm") as HTMLFormElement);
        axios
            .post(import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_APP_API + "post", fd, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                if (fileref.current) fileref.current.value = "";
                if (previewRef.current) {
                    previewRef.current.src = "";
                    previewRef.current.classList.remove("showImage");
                }
                if (captionRef.current) captionRef.current.value = "";
                setPosting(false);
            })
            .catch(() => {
                alert("Posting failed.. Please try again!");
                setPosting(false);
            });
    };

    return (
        <>
            <ScrollToTop />

            {loading ? (
                <div className="loadingContainner">
                    <CreeperLoading />
                </div>
            ) : (
                <div className="feedMainContainner">
                    <div className="leftFeedSection"></div>

                    <div className="midFeedSection">
                        {!user || user.err ? (
                            <div className="redtext" style={{ marginTop: "30px" }}>
                                You are not logged in. Please login to start posting.
                            </div>
                        ) : (
                            <form id="postForm" className="createPost" onSubmit={(e) => handleSubmit(e)}>
                                <img className="userImage" src={import.meta.env.VITE_APP_AVATAR + user.id + "/" + user.avatar} alt="user"></img>
                                <input className="caption" name="caption" ref={captionRef} required={true} placeholder="Say something.."></input>
                                <img className="imgSelector" src={imagePng} onClick={() => fileref.current?.click()} alt="select"></img>
                                <input
                                    ref={fileref}
                                    className="file"
                                    type="file"
                                    onChange={(e) => checkImage(e)}
                                    accept="image/*"
                                    name="image"
                                    id="imageSelector"
                                    required={true}
                                ></input>
                                {posting ? (
                                    <i className="fa fa-circle-o-notch fa-spin loadingCircle"></i>
                                ) : (
                                    <button className="postButton" type="submit">
                                        Post
                                    </button>
                                )}

                                <div className="previewContainner">
                                    <img className="imagePreview" src="" ref={previewRef} alt="preview"></img>
                                </div>
                            </form>
                        )}

                        <hr></hr>
                        <div className="postContainner">
                            <Posts posting={posting} setPosting={setPosting}></Posts>
                        </div>
                    </div>

                    <Supporters />
                </div>
            )}
        </>
    );
};

export default FeedContainner;
