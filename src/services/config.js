import conf from "../conf/conf";

class Service {
  url;
  feed;
  countries;
  assets;
  teams;
  login;
  registration;
  constructor() {
    this.url = conf.cricketurl;
    this.feed = conf.feed;
    this.countries = conf.countries;
    this.assets = conf.assets;
    this.teams = conf.teams;
    this.login = conf.login;
    this.registration = conf.registration;
  }

  async getFeed() {
    const response = await fetch(`${this.url}${this.feed}`, {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  }

  async getCountries() {
    const response = await fetch(`${this.url}${this.countries}`, {
      method: "GET",
      credentials: "include",
    });

    return await response.json();
  }

  async LoginEmail(email) {
    let options = {
      method: "POST", // 'Post' should be 'POST'
      credentials: "include",
      headers: {
        "Content-Type": "application/json", // Specify the content type
      },
      body: JSON.stringify({
        processId: 1,
        emailId: email, // Correct the structure
      }),
    };

    let res = await fetch(`${this.url}${this.login}`, options);
    return await res.json();
  }

  async LoginEmailVerify(otp, email) {
    let options = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        processId: 2,
        emailId: email,
        otp: otp,
      }),
    };

    let res = await fetch(`${this.url}${this.login}`, options);

    return await res.json();
  }

  async UserRegistration(email, userName, countryId) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        processId: 1,
        emailId: email,
        countryId: countryId,
        userName: userName,
      }),
      credentials: "include",
    };

    try {
      const res = await fetch(`${this.url}${this.registration}`, options);

      // Check for HTTP errors
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error in UserRegistration:", error);
      // Optionally, rethrow the error or return a default value
      throw error; // Re-throw to handle it further up the chain
    }
  }

  getTeamImage(teamA, teamB) {
    let res = [];

    const team1 = res.push(`${this.assets}${this.teams}${teamA}.png`);
    const team2 = res.push(`${this.assets}${this.teams}${teamB}.png`);

    return res;
  }
}

const dataService = new Service();

export default dataService;
