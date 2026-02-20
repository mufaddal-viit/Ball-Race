function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export async function fetchGameConfig() {
  await delay(300);

  return {
    season: "Season 01",
    title: "Neon Arena",
    subtitle: "Fast reflex drills in a competitive arcade shell.",
    activeEvent: "Double Accuracy Weekend",
  };
}

export async function fetchDailyTip() {
  await delay(260);

  return {
    tip: "Track the target with your cursor path instead of reacting after each jump.",
  };
}

export async function fetchLeaderboard() {
  await delay(420);

  return [
    { id: "naseem", username: "Naseem", score: 98, streak: 11 },
    { id: "ayan", username: "Ayan", score: 94, streak: 8 },
    { id: "zoro", username: "Zoro", score: 90, streak: 7 },
    { id: "you", username: "You", score: 86, streak: 5 },
  ];
}
