let lastLiveMoniUpdateTime = null;
let lastDisplayedLaps = null;

async function loadLaps() {
  const res = await fetch("/laps");
  const data = await res.json();

  if (data.error) {
    throw new Error(data.error);
  }

  const card = document.getElementById("card");

  document.getElementById("laps").textContent = data.laps ?? "--";
  document.getElementById("pit").textContent = data.isPit ? "PIT IN" : "";
  document.getElementById("lastLap").textContent = data.lastLap ?? "-";
  document.getElementById("status").textContent = `更新: ${data.fetchedAt}`;

  document.getElementById("debug").innerHTML =
    `Data fetched: ${data.fetchedAt}<br>` +
    `UpdateTime: ${data.updateTime}<br>` +
    `Final: ${data.isFinal ? "YES" : "NO"}`;

  if (lastDisplayedLaps !== null && lastDisplayedLaps !== data.laps) {
    card.classList.remove("updated");
    void card.offsetWidth;
    card.classList.add("updated");
  }

  lastDisplayedLaps = data.laps;
}

async function checkUpdate() {
  try {
    const res = await fetch("/updateinfo");
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const current = data.liveMoniUpdateTime;

    if (!current) {
      document.getElementById("status").textContent =
        "updateinfo に LiveMoniUpdateTime がありません";
      return;
    }

    if (lastLiveMoniUpdateTime === null) {
      lastLiveMoniUpdateTime = current;
      await loadLaps();
      return;
    }

    if (current !== lastLiveMoniUpdateTime) {
      lastLiveMoniUpdateTime = current;
      await loadLaps();
    } else {
      document.getElementById("debug").innerHTML +=
        `<br>Checked: ${data.checkedAt} / No update`;
    }

  } catch (e) {
    document.getElementById("status").textContent = "更新チェック失敗";
    console.error(e);
  }
}

checkUpdate();
setInterval(checkUpdate, 1000);
