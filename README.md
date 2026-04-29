# Super Taikyu Live Viewer (Car 104)

Super Taikyu のライブタイミングから  
**Car No.104 のラップ数をリアルタイム表示**するシンプルなWebアプリです。

---

## 🚀 機能

- Car No.104 の LAPS 表示
- Last Lap / Best Lap 表示
- PIT状態表示
- `updateinfo.json` を使った更新検知
- 自動更新（1秒ごと）

---

### 設定
① インストール
```bash
npm install
② サーバー起動
node server.js
③ ブラウザでアクセス
http://localhost:3001

ブラウザ
  ↓
/updateinfo を定期チェック
  ↓
更新あれば /laps を取得
  ↓
画面更新
