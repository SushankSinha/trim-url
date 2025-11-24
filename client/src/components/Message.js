// message.js

export function showSuccess(msg, duration = 2500) {
  return showMessage({ msg, type: "success", duration });
}

export function showError(msg, duration = 2500) {
  return showMessage({ msg, type: "error", duration });
}

export function showMessage({ msg, type = "info", duration = 2500 }) {
  const toast = document.createElement("div");
  toast.setAttribute("role", "status");

  Object.assign(toast.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    minWidth: "220px",
    maxWidth: "420px",
    padding: "10px 14px",
    color: "#fff",
    borderRadius: "6px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    opacity: "0",
    transform: "translateY(-6px)",
    transition: "opacity 200ms ease, transform 200ms ease",
    zIndex: 9999,
    fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    fontSize: "14px",
    lineHeight: "1.2",
    cursor: "pointer",
    pointerEvents: "auto",
  });

  if (type === "success") toast.style.background = "linear-gradient(180deg,#4BB543,#3DA337)";
  else if (type === "error") toast.style.background = "linear-gradient(180deg,#E55353,#C43B3B)";
  else toast.style.background = "linear-gradient(180deg,#2F86EB,#1F6FD0)";

  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  const remove = () => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-6px)";
    setTimeout(() => toast.remove(), 200);
  };
  toast.addEventListener("click", remove);

  const timeoutId = setTimeout(remove, duration);

  return {
    dismiss: () => {
      clearTimeout(timeoutId);
      remove();
    },
  };
}
