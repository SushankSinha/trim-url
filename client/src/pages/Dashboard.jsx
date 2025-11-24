import { useState, useEffect } from "react";
import LinkForm from "../components/LinkForm";
import LinksTable from "../components/LinksTable";
import SearchBar from "../components/SearchBar";
import { axiosInstance } from "../apiInstance";
import { showMessage } from "../components/Message";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLinks = async () => {
    try {
      const res = await axiosInstance.get(`/links`);
      setLinks(res.data);
      setFiltered(res.data);
    } catch (err) {
      showMessage({ msg: "Failed to load links", type: "error" });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    setFiltered(
      links.filter(
        (l) =>
          l.code.toLowerCase().includes(term) ||
          l.url.toLowerCase().includes(term)
      )
    );
  }, [search, links]);

  const handleDelete = async (code) => {
    if (!confirm("Delete this link permanently?")) return;

    try {
      await axiosInstance.delete(`/links/${code}`);
      showMessage({ msg: "Link deleted", type: "success" });
      fetchLinks();
    } catch (err) {
      showMessage({ msg: "Failed to delete", type: "error" });
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "60vh" }} className="container">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="container max-w-6xl">
      <div
        className="row"
        style={{ alignItems: "flex-start", marginBottom: 18 }}
      >
        <div style={{ flex: 1 }}>
          <LinkForm onSuccess={fetchLinks} />
        </div>

        <div style={{ width: 280 }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="card text-center"
          style={{ padding: "48px 20px", color: "#6b7280" }}
        >
          {search ? "No results found" : "No links yet. Create one!"}
        </div>
      ) : (
        <LinksTable links={filtered} onDelete={handleDelete} />
      )}
    </div>
  );
}
