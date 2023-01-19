//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;

const container = document.getElementById("container");
const select = document.getElementById("select");
const showselect = document.getElementById("showselect");

const shows = getAllShows();

shows.forEach((show) => {
  const option = document.createElement("option");
  option.value = show.id;
  option.innerHTML = show.name;
  showselect.appendChild(option);
});

select.addEventListener("change", pickOption);

function pickOption() {
  console.log(select.value);
  if (select.value == "all") {
    episodes.forEach((episode) => {
      // this is the select option for the episode

      const option = document.createElement("option");
      option.innerHTML = `S0${episode.season}E0${episode.number} - ${episode.name}`;
      option.value = episode.id;
      select.appendChild(option);

      // This is the episode div
      const div = document.createElement("div");
      div.innerHTML = ` 
        <img src="${episode.image.original}" />
       <h2>${episode.name}</h2>
        <p>season: ${episode.season}</p>
        <p>episode number: ${episode.number}</p>
        <p> S0${episode.season}E0${episode.number}</p>
        <p>${episode.summary}</p>
        
    `;
      div.id = episode.id;

      // putting the episode div in the container
      // add
      container.appendChild(div);
    });
  } else {
    const episode = episodes.find((ep) => {
      if (ep.id == select.value) {
        return true;
      }
    });
    console.log(episode);
    container.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = ` 
        <img src="${episode.image.original}" />
       <h2>${episode.name}</h2>
        <p>season: ${episode.season}</p>
        <p>episode number: ${episode.number}</p>
        <p> S0${episode.season}E0${episode.number}</p>
        <p>${episode.summary}</p>
        
    `;
    div.id = episode.id;

    // putting the episode div in the container
    // add
    container.appendChild(div);
  }
  // window.location.href = `#${select.value}`
}

// Array of all the episodes - Each episode is an object
// const episodes = getAllEpisodes();
let episodes = [];
fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    episodes = data;
    episodes.forEach((episode) => {
      // this is the select option for the episode

      const option = document.createElement("option");
      option.innerHTML = `S0${episode.season}E0${episode.number} - ${episode.name}`;
      option.value = episode.id;
      select.appendChild(option);

      // This is the episode div
      const div = document.createElement("div");
      div.innerHTML = ` 
        <img src="${episode.image.original}" />
       <h2>${episode.name}</h2>
        <p>season: ${episode.season}</p>
        <p>episode number: ${episode.number}</p>
        <p> S0${episode.season}E0${episode.number}</p>
        <p>${episode.summary}</p>
        
    `;
      div.id = episode.id;

      // putting the episode div in the container
      // add
      container.appendChild(div);
    });
  });

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", filterEpisodes);

function filterEpisodes() {
  const newEpisodes = episodes.filter((episode) => {
    if (episode.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      return true;
    } else {
      false;
    }
  });

  container.innerHTML = "";

  newEpisodes.forEach((episode) => {
    // This is the episode div
    const div = document.createElement("div");
    div.innerHTML = ` 
        <h2>${episode.name}</h2>
        <p>season: ${episode.season}</p>
        <p>episode number: ${episode.number}</p>
        <p>${episode.summary}</p>
        <img src="${episode.image.original}" />
    `;

    // putting the episode div in the container
    // add
    container.appendChild(div);
  });
}
