import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { code } = useParams();
  const [status, setStatus] = useState(!code && "notfound" || "loading"); // loading | notfound | error

  useEffect(() => {
    if (!code) {
      return;
    }

    const checkAndRedirect = async () => {
      try {
        const base = import.meta.env.VITE_BASE_URL || window.location.origin;
        const validityUrl = `${base.replace(/\/$/, "")}/links/validity/${encodeURIComponent(code)}`;

        const res = await fetch(validityUrl);

        if (res.status === 404 || !res.ok) {
          setStatus("notfound");
          return;
        }

        // Valid → redirect immediately to the real backend redirect endpoint
        const redirectUrl = `${base.replace(/\/$/, "")}/redirect/${code}`;
        window.location.href = redirectUrl;  // This does the real 302 via your backend
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    checkAndRedirect();
  }, [code]);

  // Loading
  if (status === "loading") {
    return (
      <div className="container max-w-3xl" style={{ paddingTop: "60px", textAlign: "center" }}>
        <div className="spinner" style={{ margin: "0 auto" }} />
        <p style={{ marginTop: "16px", color: "#6b7280" }}>Redirecting...</p>
      </div>
    );
  }

  // Not found
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

  // Error
  return (
    <div className="container max-w-3xl" style={{ paddingTop: "60px" }}>
      <div className="card" style={{ padding: "32px", textAlign: "center", color: "var(--danger)" }}>
        <h2>Server Error</h2>
        <p>Something went wrong. Please try again later.</p>
        <a href="/" className="btn btn-primary" style={{ marginTop: "12px", display: "inline-block" }}>
          Go Home
        </a>
      </div>
    </div>
  );
}