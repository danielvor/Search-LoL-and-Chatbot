// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../index.html";
}


function getSummonerStats() {
    const summonerName = document.getElementById("summonerInput").value;
  
    fetch(`/search/summoner/${summonerName}`)
      .then((response) => response.json())
      .then((data) => displaySummonerStats(data))
      .catch((error) => console.error(error));
  }
  
  function displaySummonerStats(stats) {
    const playerStats = document.getElementById("playerStats");
    playerStats.innerHTML = "";
  
    const iconImg = document.createElement("img");
    iconImg.src = stats.iconUrl;
    playerStats.appendChild(iconImg);
  
    const summonerLevel = document.createElement("h3");
    summonerLevel.textContent = `Summoner Level: ${stats.summonerLevel}`;
    playerStats.appendChild(summonerLevel);
  
    const tierRank = document.createElement("h3");
    tierRank.textContent = `Rank: ${stats.tier} ${stats.rank}`;
    playerStats.appendChild(tierRank);
  
    const winLoss = document.createElement("h3");
    winLoss.textContent = `Wins: ${stats.wins} | Losses: ${stats.losses}`;
    playerStats.appendChild(winLoss);
  
    const winRate = document.createElement("h3");
    winRate.textContent = `Win Rate: ${stats.winRate}%`;
    playerStats.appendChild(winRate);
  
    const chartCanvas = document.createElement("canvas");
    chartCanvas.id = "winLossChart";
    playerStats.appendChild(chartCanvas);
  
    const ctx = chartCanvas.getContext("2d");
    new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Wins", "Losses"],
        datasets: [
          {
            data: [stats.wins, stats.losses],
            backgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      },
      options: {
        responsive: true,
        legend: {
          position: "right",
        },
      },
    });
  }
  


