import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import CopyButton from "../components/CopyButton";
import {axiosInstance} from "../apiInstance";
import { showMessage } from "../components/Message";

export default function StatsPage() {
  const { code } = useParams();
  const [link, setLink] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`/links/${code}`)
      .then((res) => setLink(res.data))
      .catch(() => showMessage({msg:"Link not found", type:"error"}))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <div className="container text-center" style={{padding:40}}>Loading...</div>;
  if (!link) return <div className="container text-center" style={{padding:40,color:'var(--danger)'}}>Link not found</div>;

  const shortUrl = `${window.location.origin}/${link.code}`;

  return (
    <div className="container max-w-3xl">
      <div className="card" style={{padding:24}}>
        <h2 style={{fontSize:22, margin:0, marginBottom:12}}>Link Statistics</h2>

        <div style={{marginBottom:12}}>
          <p className="text-muted small">Short URL</p>
          <div className="row" style={{marginTop:6}}>
            <code className="mono" style={{color:"var(--blue)", fontSize:16}}>{shortUrl}</code>
            <CopyButton text={shortUrl} />
          </div>
        </div>

        <div style={{marginBottom:6}}>
          <p className="text-muted small">Target URL</p>
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={{color:"var(--blue)", textDecoration:"none", display:"block", marginTop:6, wordBreak:"break-all"}}
          >
            {link.url}
          </a>
        </div>

        <div className="grid-2" style={{paddingTop:18, borderTop:"1px solid #f3f4f6"}}>
          <div>
            <p className="text-muted small">Total Clicks</p>
            <p style={{fontSize:28, margin:0, color:"var(--blue)", fontWeight:700}}>{link.clicks}</p>
          </div>

          <div>
            <p className="text-muted small">Last Clicked</p>
            <p style={{fontSize:16, margin:0}}>
              {link.last_clicked
                ? formatDistanceToNow(new Date(link.last_clicked), {
                    addSuffix: true,
                  })
                : "Never"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}