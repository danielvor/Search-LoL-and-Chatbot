const express = require("express");
const { json } = require("express");
require("dotenv").config();
const path = require("path");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Configuração para servir arquivos estáticos
app.listen(process.env.PORT || 3333);

app.get("/", async (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/summoner/:summonerName", async (req, res) => {
    const { summonerName } = req.params;
    const summonerIdResponse = await axios
      .get(
        `${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${encodeURI(
          summonerName
        )}`,
        { headers: { "X-Riot-Token": process.env.LOL_KEY } }
      )
      .catch((e) => {
        return res.status(e.response.status).json(e.response.data);
      });
  
    const { id, profileIconId, summonerLevel } = summonerIdResponse.data;
  
    const responseRanked = await axios
      .get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`, {
        headers: { "X-Riot-Token": process.env.LOL_KEY },
      })
      .catch((e) => {
        return res.status(e.response.status).json(e.response.data);
      });
  
    let tier = "Unranked";
    let rank = "";
    let wins = 0;
    let losses = 0;
    let queueType = "";
  
    if (responseRanked.data && responseRanked.data.length > 0) {
      // Verifica se há dados de classificação
      const rankedData = responseRanked.data[0];
      tier = rankedData.tier;
      rank = rankedData.rank;
      wins = rankedData.wins;
      losses = rankedData.losses;
      queueType = rankedData.queueType;
    }
  
    res.json({
      iconUrl: `${process.env.LOL_ICONS}/${profileIconId}.png`,
      summonerLevel,
      tier,
      rank,
      wins,
      losses,
      queueType,
      winRate: ((wins / (wins + losses)) * 100).toFixed(1),
    });
  });
  