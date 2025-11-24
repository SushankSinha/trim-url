import { showMessage } from "./Message";

export default function CopyButton({ text, label = "Copy" }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showMessage({ msg: "Copied!", type: "success" });
    } catch {
      showMessage({ msg: "Copy failed", type: "error" });
    }
  };

  return (
    <button onClick={copy} className="btn btn-link small">
      {label}
    </button>
  );
}