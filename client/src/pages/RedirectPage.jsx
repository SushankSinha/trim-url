import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { code } = useParams();
  const [status, setStatus] = useState("loading"); // loading | notfound | error

  useEffect(() => {
    if (!code) return;

    const fetchAndRedirect = async () => {
      try {
        const base = import.meta.env.VITE_BASE_URL || window.location.origin;
        const url = `${base.replace(/\/$/, "")}/links/${encodeURIComponent(code)}`;

        const res = await fetch(url);

        if (res.status === 404) {
          setStatus("notfound");
          return;
        }

        if (!res.ok) {
          setStatus("error");
          return;
        }

        const data = await res.json();
        if (data && data.url) {
          window.location.href = data.url;
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error("Redirect failed:", err);
        setStatus("error");
      }
    };

    fetchAndRedirect();
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
