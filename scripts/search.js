"use strict";
const page = 1;
const pageSize = 5;
const searchKey = document.getElementById("input-query");
const searchBtn = document.getElementById("btn-submit");
const newsContainer = document.getElementById("news-container");
const paginationContainer = document.getElementById("pagination-container");
var totalResults;

//GET DATA FROM API
async function getNews(page) {
  let url = `https://newsapi.org/v2/everything?q=${searchKey.value}&page=${page}&pageSize=${pageSize}&apiKey=fa52267092e0467ba817f7bc5f422317`;
  let req = new Request(url);
  let response = await fetch(req);
  let data = await response.json();
  return data;
}

//LISTENER IN SEARCH BUTTON
searchBtn.addEventListener("click", async function () {
  if (searchKey.value.length == 0) {
    alert("Please enter a search query");
  } else {
    totalResults = await getNews(page).then((data) => data.totalResults);
    renderNews(page);
  }
});

//LISTENER IN BUTTONS ENTER
addEventListener("keyup", async function (event) {
  if ("Enter" === event.key) {
    if (searchKey.value.length == 0) {
      alert("Please enter a search query");
    } else {
      totalResults = await getNews(page).then((data) => data.totalResults);
      renderNews(page);
    }
  }
});

//RENDER NEWS
function renderNews(page) {
  getNews(page).then((data) => {
    newsContainer.innerHTML = "";
    data.articles.forEach((article) => {
      newsContainer.innerHTML += `
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <img src="${article.urlToImage}" class="card-img" alt="...">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description}</p>
                                <button class="btn btn-primary">
                                <a href="${article.url}" class="btn btn-primary">Read More</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    });
    pagination(page);
  });
}

//RENDER Pagination
function pagination(page) {
  console.log(paginationContainer);
  paginationContainer.innerHTML = "";
  let pageCount = Math.ceil(totalResults / pageSize);
  console.log(totalResults);

  //ADD PREVIOUS BUTTON IF NOT FIRST PAGE
  paginationContainer.innerHTML += `
  <li class="page-item" onclick="previous(${page})"><a class="page-link" href="#">Previous</a></li>`;
  if (page === 1) {
    paginationContainer.children[0].style.display = "none";
  }

  //ADD BUTTONS PAGE
  for (let i = 1; i <= pageCount; i++) {
    paginationContainer.innerHTML += `
        <li class="page-item" onclick="renderPagination(${i})"><a class="page-link" href="#">${i}</a></li>
        `;
  }

  //ADD NEXT BUTTON IF NOT LAST PAGE
  paginationContainer.innerHTML += `
    <li class="page-item" onclick="next(${page})"><a class="page-link" href="#">Next</a></li>`;
  if (page === pageCount) {
    paginationContainer.children[page + 1].style.display = "none";
  }

  //HIGHLIGTH CURRENT PAGE
  paginationContainer.children[page].children[0].style.backgroundColor =
    "lightgrey";
}

//LOGIC FOR PREVIOUS
function previous(page) {
  console.log(page);
  if (page > 1) {
    page--;
    renderNews(page);
    if (page == 1) {
      let previous = document.getElementsByClassName("page-item")[0];
      previous.style.display = "none";
    }
  } else {
    let previous = document.getElementsByClassName("page-item")[0];
    previous.style.display = "none";
  }
}

//LOGIC FOR NEXT
function next(page) {
  if (page < Math.ceil(totalResults / pageSize)) {
    page++;
    renderNews(page);
  } else {
    let next = document.getElementsByClassName("page-item")[2];
    next.style.display = "none";
  }
}

//RENDER PAGE ON CLICK
function renderPagination(page) {
  if (page == 1) {
    let previous = document.getElementsByClassName("page-item")[0];
    previous.style.display = "none";
  }
  if (page == Math.ceil(totalResults / pageSize)) {
    let next = document.getElementsByClassName("page-item")[2];
    next.style.display = "none";
  }
  console.log(page);
  renderNews(page);
}
