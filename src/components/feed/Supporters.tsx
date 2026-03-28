import { useEffect, useState } from "react";
import "./supporters.css";
import axios from "axios";

interface Supporter {
    name: string;
}

const Supporters = () => {
    const [supporters, setSupporters] = useState<Supporter[] | null>(null);
    useEffect(() => {
        axios
            .get(import.meta.env.VITE_APP_BASE_URL + "supporters.json")
            .then((res) => {
                setSupporters(res.data);
            })
            .catch(() => {});
    }, []);
    return (
        <div className="rightFeedSection">
            <div className="contentTitle redtext textcenter">Supporters</div>
            <div className="supporterContainner">
                {Array.isArray(supporters)
                    ? supporters.map((user, i) => {
                          return <div className="supporter" key={i}>{user.name}</div>;
                      })
                    : ""}
            </div>
        </div>
    );
};

export default Supporters;
