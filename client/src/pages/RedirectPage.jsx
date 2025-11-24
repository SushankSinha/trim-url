import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showMessage } from "../components/Message";

export default function RedirectPage() {
  const { code } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!code) return;

    const redirect = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BASE_URL}/redirect/${code}`,
          { redirect: "manual" }
        );

        if (res.status === 302) {
          const location = res.headers.get("Location");
          window.location.href = location;
        } else if (res.status === 404) {
          setStatus("notfound");
          showMessage({msg: "Link not found", type: "error"});
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
        console.error(err)
      }
    };

    redirect();
  }, [code]);

  if (status === "loading") return <p>Redirecting...</p>;
  if (status === "notfound") return <div className="card" style={{color:"red"}}>Link not found.</div>;
  if (status === "error") return <div className="card" style={{color:"red"}}>Server error.</div>;

  return null;
}
