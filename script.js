var roleMap = new Map();
roleMap.set(1,"Core");
roleMap.set(4,"Core");
roleMap.set(2,"Support");

document.getElementById("Submit").addEventListener("click", function(event) {
  let teamID = 1;
  let games = [];
  let gameSummaries = [];
  let results = "";
  let results2 = "<div class=\"teamGames\">";
  event.preventDefault();
  const value = document.getElementById("Input").value;
  if (value === "")
    return;
  console.log(value);
  const url = "https://api.opendota.com/api/proPlayers?api_key=de0a4062-e879-47d3-a148-963e4775ca6c";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      //This section finds the roster of a team given the team name.
      let found = [];
      for(let i = 0; i < json.length; i++) {
        //Iterate through all pro players looking for team members
        if(json[i].team_name === value) {
          found.push(json[i]);
          teamID = json[i].team_id;
          //console.log("Found match:" + json[i].team_name + json[i].name);
        }
      }
      console.log("Size of results: " + found.length);
      results += "<div class=\"teamResult\"><h2>" + value + "</h2>";
      for(let i = 0; i < found.length; i++) {
        results += "<div class=\"player\"> <img src=\"" + found[i].avatarmedium + "\" align=\"left\"><p>" + found[i].name + " [Role: " + roleMap.get(found[i].fantasy_role) + "]</p></div>";
      }
      results += "</div>";
      if(found.length === 0) {
        results += "Team not found.";
      }
      document.getElementById("Results").innerHTML = results;
    });
});
