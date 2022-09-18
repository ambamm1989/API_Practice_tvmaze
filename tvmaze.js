"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
const missImage = "http://tinyurl.com/missing-tv";

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm( /* term */) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.

  return [
    {
      id: 1767,
      name: "The Bletchley Circle",
      summary:
        `<p><b>The Bletchley Circle</b> follows the journey of four ordinary 
           women with extraordinary skills that helped to end World War II.</p>
         <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their 
           normal lives, modestly setting aside the part they played in 
           producing crucial intelligence, which helped the Allies to victory 
           and shortened the war. When Susan discovers a hidden code behind an
           unsolved murder she is met by skepticism from the police. She 
           quickly realises she can only begin to crack the murders and bring
           the culprit to justice with her former friends.</p>`,
      image:
          "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
    }
  ]
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg" 
              alt="Bletchly Circle San Francisco" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
async function searchTv(list){
  let awTv = await axios.get(`http://api.tvmaze.com/search/shows?q=${list}`);

  let episodes = awTv.data.map(result => {
    let epTV = result.show;
    return {
      id: epTV.id,
      name: epTV.name,
      summary: epTV.summary,
      image: epTV.image ? epTV.image.medium : missImage,
    };
  });
  return episodes;
}

function showShows(episodes) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for(let epTV of episodes) {
    let $objTv = $(
      `<div class="col-md-6 col-lg-3 Show" eptv-data-id="${epTV.id}">
      <div class="card" eptv-data-id="${epTV.id}">
     <img class="top-pic" src="${epTV.image}">
    <div class="main">
              <h5 class="ep-title">${epTV.name}</h5>
        <p class="ep-sum">${epTV.summary}</p>
          <button class="btn for episodes">Episodes</button>
      </div>
      </div>  
    </div>
   `);
    $showsList.append($objTv);
  }
}

$("#search-form").on("submit", async function formSearch(tvs){
tvs.preventDefault();

let list = $("#search-query").val();
if (!list) return;
$("#episodes-area").hide();
let episodes = await searchTv(list);
populateShows((episodes));
});

async function tvShows(info){
  let awTv = await axios.get(`http://api.tvmaze.com/shows/${info}/episodes`);

  let program = awTv.data.map(program => ({
    id: program.id,
    name: program.name,
    season: program.season,
    number: program.number,
  
  }));
  return program
}

function popEp (program) {
  const $pop = $("#episodes-list");
  $pop.empty();

  for (let program of popEp(program)){
    let $popList = $(
      `<li>
        ${popEp.name}
        (season ${program.season}, program ${program.number})
      </li>
    `);
    $pop.append($popList);
  }
  $("#episodes-area").show();
   
}

$("#shows-list").on("click", ".get-popEd", async function clickProgram(tvs){
  let tvId = $(tvs.target).closest(".epTv").data("epTv-id");
  let program = await getPopEd(tvId);
  populateEpisodes(program);
});