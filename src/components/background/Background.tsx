import "./Background.css";
import { useBackgroundStore } from "../../store/useBackgroundStore";

const Background = () => {
    const { imageUrl, mode } = useBackgroundStore();

    return (
        <>
            <div className="app-background" aria-hidden="true" />
            {imageUrl && (
                <div
                    id="dynamic-hero-bg"
                    style={{
                        position: "fixed",
                        inset: "0px",
                        width: "100%",
                        height: "100vh",
                        backgroundImage: `url("${imageUrl}")`,
                        backgroundSize: mode === "cover" ? "cover" : "contain",
                        backgroundPosition: "center top",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: "transparent",
                        pointerEvents: "none",
                        zIndex: "-1",
                    }}
                />
            )}
        </>
    );
};

export default Background;

