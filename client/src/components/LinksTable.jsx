import { formatDistanceToNow } from "date-fns";
import CopyButton from "./CopyButton";

export default function LinksTable({ links, onDelete }) {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div className="table-wrapper">
        <table className="table" role="table">
          <thead>
            <tr>
              <th>Short Link</th>
              <th>Target URL</th>
              <th className="center">Clicks</th>
              <th className="center">Last Clicked</th>
              <th className="center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <td style={{ width: 260 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span className="mono" style={{ color: "var(--blue)" }}>
                      {window.location.origin}/{link.code}
                    </span>
                    <CopyButton text={`${window.location.origin}/${link.code}`} />
                  </div>
                </td>

                <td className="truncate">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: "#374151", textDecoration: "none" }}
                  >
                    {link.url}
                  </a>
                </td>

                <td className="center">
                  <span className="badge">{link.clicks}</span>
                </td>

                <td className="center text-muted" style={{ whiteSpace: "nowrap" }}>
                  {link.last_clicked
                    ? formatDistanceToNow(new Date(link.last_clicked), { addSuffix: true })
                    : "Never"}
                </td>

                <td className="center">
                  <button
                    onClick={() => onDelete(link.code)}
                    className="btn"
                    style={{ color: "var(--danger)", background: "transparent" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
