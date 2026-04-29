const express = require("express");

const app = express();
const PORT = 3001;

app.use(express.static("public"));

function formatMs(ms) {
  if (!ms) return "-";

  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const millis = ms % 1000;

  return `${minutes}:${String(seconds).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
}

app.get("/updateinfo", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.supertaikyu.live/json/updateinfo.json?_=${Date.now()}`
    );

    const data = await response.json();

    res.json({
      liveMoniUpdateTime: data.LiveMoniUpdateTime,
      masterUpdateTime: data.MasterUpdateTime,
      checkedAt: new Date().toLocaleTimeString()
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "failed to fetch updateinfo" });
  }
});

app.get("/laps", async (req, res) => {
  try {
    const response = await fetch(
      `https://www.supertaikyu.live/json/livemoni.json?_=${Date.now()}`
    );

    const data = await response.json();
    const car104 = data.LiveData.find((c) => c.CarNo === "104");

    res.json({
      updateTime: data.UpdateTime,
      isFinal: data.IsFinal === 1,
      carNo: "104",
      laps: Number(car104?.LAPS ?? 0),
      lastLap: formatMs(car104?.LapTime),
      bestLap: formatMs(car104?.BestLapTime),
      isPit: car104?.IsPit === 1,
      pitCount: car104?.PitCnt ?? 0,
      fetchedAt: new Date().toLocaleTimeString()
    });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "failed to fetch laps" });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});