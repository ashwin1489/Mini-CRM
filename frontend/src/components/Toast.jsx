import { useEffect, useState } from "react";

export default function Toast({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(t);
    }
  }, [message]);

  if (!visible) return null;

  return <div className="toast">{message}</div>;
}
