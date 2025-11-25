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
        const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin;
        const res = await fetch(`${baseUrl}/redirect/${code}`);

        if (!res.ok) {
          if (res.status === 404) {
            setStatus("notfound");
            showMessage({ msg: "Link not found", type: "error" });
          } else {
            setStatus("error");
            showMessage({ msg: "Server error", type: "error" });
          }
          return;
        }

        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          setStatus("error");
          showMessage({ msg: "Invalid response from server", type: "error" });
        }
      } catch (err) {
        setStatus("error");
        showMessage({ msg: "Failed to redirect", type: "error" });
        console.error("Redirect error:", err);
      }
    };

    redirect();
  }, [code]);

  if (status === "loading") {
    return (
      <div className="container max-w-3xl" style={{ paddingTop: "60px", textAlign: "center" }}>
        <div className="spinner" style={{ margin: "0 auto" }} />
        <p style={{ marginTop: "16px", color: "#6b7280" }}>Redirecting...</p>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="container max-w-3xl" style={{ paddingTop: "60px" }}>
        <div className="card" style={{ padding: "32px", textAlign: "center", color: "var(--danger)" }}>
          <h2>Link Not Found</h2>
          <p>This short link doesn't exist or has been deleted.</p>
          <a href="/" className="btn btn-primary" style={{ marginTop: "12px", display: "inline-block" }}>
            Create New Link
          </a>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container max-w-3xl" style={{ paddingTop: "60px" }}>
        <div className="card" style={{ padding: "32px", textAlign: "center", color: "var(--danger)" }}>
          <h2>Server Error</h2>
          <p>Something went wrong while processing your link. Please try again.</p>
          <a href="/" className="btn btn-primary" style={{ marginTop: "12px", display: "inline-block" }}>
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return null;
}
