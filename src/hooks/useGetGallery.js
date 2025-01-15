import axios from "axios";
import { useEffect, useState } from "react";

export const useGetGallery = (posting) => {
    const [loading, setLoading] = useState(true);
    const [gallery, setGallery] = useState(null);
    useEffect(() => {
        if (!posting) {
            setLoading(true);
            getData();
        }
    }, [posting]);
    const getData = () => {
        axios
            .get(process.env.REACT_APP_BASE_URL + process.env.REACT_APP_API + "gallery")
            .then((res) => {
                setGallery(res.data);
                setLoading(false);
                console.log(res.data);
            })
            .catch((err) => {
                setGallery({ err: "Something went wrong", data: null });
                setLoading(false);
            });
    };

    return { loading, gallery };
};
