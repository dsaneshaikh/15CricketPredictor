const conf = {
  cricketurl: String(import.meta.env.VITE_CRICKET_URL),
  feed: String(import.meta.env.VITE_CRICKET_FEED),
  countries: String(import.meta.env.VITE_CRICKET_COUNTRIES),
  savePrediction: String(import.meta.env.VITE_CRICKET_SAVEPREDICTION),
  getPrediction: String(import.meta.env.VITE_CRICKET_GETPREDICTION),
  assets: String(import.meta.env.VITE_ASSETS_URL),
  teams: String(import.meta.env.VITE_ASSETS_TEAMS),
  login: String(import.meta.env.VITE_CRICKET_SESSION_LOGIN),
  registration: String(import.meta.env.VITE_CRICKET_SESSION_USER_REGISTRATION),
};

export default conf;
