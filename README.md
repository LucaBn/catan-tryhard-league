# 🏝️ Catan Tryhard League

A small web app to track results from our Catan games and finally answer the most important question:

**Who is actually the best player?**

Built with **React** and **Mantine**, it turns a simple spreadsheet into charts, rankings, and player stats — because clearly we needed more reasons to argue.

## 🚀 Features

- 📊 Score progression charts for each player
- 🏆 Leaderboard with total points
- 👤 Player stats (games played, average score, total points)
- ☁️ Data fetched from Google Sheets (CSV)
- ⚡ Fast, single-page application
- 🎨 Clean UI with Mantine components

## 📁 Data Source

Game data is stored in a Google Sheet and published as CSV.

Example format:

```
date,game,player,points
2026-01-01,1,Luca,10
2026-01-01,1,Marco,8
2026-01-01,1,Giovanni,7
2026-01-01,1,Matteo,5
2026-01-01,2,Luca,6
2026-01-01,2,Marco,10
2026-01-01,2,Giovanni,7
2026-01-01,2,Matteo,7
```

Update the sheet → refresh the site → instant new arguments.

## 🛠️ Tech Stack

- React (Vite)
- Mantine UI
- Mantine Charts
- Axios
- Day.js

## 📦 Installation

```
git clone https://github.com/your-username/catan-tryhard-league.git
cd catan-tryhard-league
npm install
npm run dev
```

## 🔌 Configuration

Update the Google Sheets CSV URL in:

```
src/hooks/useSheetsData.js
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
