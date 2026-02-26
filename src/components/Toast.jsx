import { useEffect } from "react";

export default function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`toast${type === "err" ? " err-t" : ""}`}>
      {type === "err" ? "❌" : "✅"} {msg}
    </div>
  );
}
