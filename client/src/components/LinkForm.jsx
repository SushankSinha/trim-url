import { useState } from "react";
import { axiosInstance } from "../apiInstance";
import { showMessage } from "./Message";

export default function LinkForm({ onSuccess }) {
  const [url, setUrl] = useState("");
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url.trim()) {
      showMessage({ msg: "URL is required", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post(`/links`, {
        url: url.trim(),
        code: custom || undefined,
      });

      if (res.status === 201) {
        showMessage({ msg: "Link created!", type: "success" });
        setUrl("");
        setCustom("");
        onSuccess();
      }
    } catch (err) {
      showMessage({
        msg: err.response?.data?.error || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: 16 }}>
      <div className="grid-3">
        <input
          type="url"
          placeholder="Paste your long URL…"
          className="input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Custom code"
          className="input"
          value={custom}
          onChange={(e) =>
            setCustom(
              e.target.value.replace(/[^A-Za-z0-9]/g, "").slice(0, 8)
            )
          }
          disabled={loading}
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="submit"
            className={`btn btn-primary`}
            disabled={loading}
            style={{ width: "100%" }}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}
