const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function trySyncPending() {
  const pending = JSON.parse(localStorage.getItem("hg_pending_batches") || "[]");
  if (pending.length === 0) return;

  const token = localStorage.getItem("hg_token");
  if (!token) return;

  for (let batch of pending) {
    try {
      await fetch(`${API_BASE}/batches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(batch)
      });
    } catch (err) {
      console.warn("sync failed", err);
      return;
    }
  }

  localStorage.removeItem("hg_pending_batches");
  console.log("Pending batches synced.");
}
