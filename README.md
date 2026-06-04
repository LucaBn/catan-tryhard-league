# 🏝️ Catan Tryhard League

👉 https://catan-tryhard-league.pages.dev

A small web app to track results from your Catan games and finally answer the most important question:

**Who is actually the best player?**

Built with **React** and **Mantine**, it turns a simple spreadsheet into charts, rankings, and player stats — because clearly we all need more reasons to argue.

## 🚀 Features

- 🏆 Leaderboard
- 📊 Score progression charts for each player
- 👤 Detailed player stats
- 🎉 Fun insights (“Fan Facts”)
- ☁️ Data fetched from Google Sheets (CSV)
- ⚡ Fast, no backend, no accounts
- 🎨 Clean UI with Mantine components

## 🌐 How it works

Each group can use their own Google Sheet.

Just open the app with your sheet ID.

This one uses an example template ID:

https://catan-tryhard-league.pages.dev?id=1DrXpjuFCPClz4YB0PTb5zDlS_4__t03xxqlHKz4XVg8

If no ID is provided, the app will ask for it.

## 🧪 Template

Start from this ready-to-use sheet:

https://docs.google.com/spreadsheets/d/1DrXpjuFCPClz4YB0PTb5zDlS_4__t03xxqlHKz4XVg8

Steps:

1. Make a copy to your Drive
2. Update your game results
3. Copy the sheet ID from the URL
4. Open the app and use your ID when required

Notes

- `game` → same number = same game
- `points` → your scoring system (10 or more = win by default)
- No strict limits on players (supports 3–6+)

## 🛠️ Tech Stack

- React (Vite)
- Mantine UI
- Mantine Charts

## 📦 Installation

```
git clone https://github.com/lucabn/catan-tryhard-league.git
cd catan-tryhard-league
npm install
npm run dev
```

## 🏗️ Build

`npm run build`

## 🌍 Deployment

Designed to be deployed on Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

Third-party libraries used in this project are subject to their own licenses, which can be found in [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md).
