/* Desk app — STEP 3 stub. Plan B: poll /d/{DATA_PATH}/ JSON. Plan A: /api + SSE. */
(function () {
  const hash = new URLSearchParams((location.hash || "#").slice(1));
  if (hash.get("t")) localStorage.setItem("APP_TOKEN", hash.get("t"));
  if (hash.get("d")) localStorage.setItem("DATA_PATH", hash.get("d"));

  const token = localStorage.getItem("APP_TOKEN") || "";
  const dataPath = localStorage.getItem("DATA_PATH") || "";
  const hostingB = !!dataPath;

  async function loadState() {
    try {
      if (hostingB) {
        const r = await fetch(`./d/${dataPath}/state.json`, { cache: "no-store" });
        if (!r.ok) throw new Error("state " + r.status);
        return r.json();
      }
      const r = await fetch("/api/state", { headers: { Authorization: "Bearer " + token } });
      if (!r.ok) throw new Error("state " + r.status);
      return r.json();
    } catch (e) {
      console.warn("state load", e);
      return null;
    }
  }

  async function tick() {
    const s = await loadState();
    if (s && typeof s.balance === "number") {
      document.getElementById("balance").textContent =
        "$" + s.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    if (window.DeskChart) DeskChart.drawHome(document.getElementById("home-chart"), (s && s.chart) || []);
  }

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
  tick();
  setInterval(tick, 15000);
})();
