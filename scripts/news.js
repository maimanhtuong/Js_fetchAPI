"use strict";
// https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=5&page=5&apiKey=fa52267092e0467ba817f7bc5f422317

const page = 1;
const pageSize = getStorage("urlInfo").pageSize? getStorage("urlInfo").pageSize: 5; 
const category = getStorage("urlInfo").category? getStorage("urlInfo").category: "technology";
console.log(pageSize);
console.log(getStorage("urlInfo"));
console.log(category);
const newsContainer = document.getElementById("news-container");

var paginationContainer = document.getElementById("pagination-container");

var totalResults;
async function getNews(page) {
  let url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=fa52267092e0467ba817f7bc5f422317`;
  let req = new Request(url);
  let response = await fetch(req);
  let data = await response.json();
  return data;
}
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
addEventListener("load", async function () {
  totalResults = await getNews(page).then((data) => data.totalResults);
  renderNews(page);
});

//RENDER Pagination
function pagination(page) {
  console.log(page);
  paginationContainer.innerHTML = "";
  let pageCount = Math.ceil(totalResults / pageSize);
  console.log(totalResults);
  paginationContainer.innerHTML += `
  <li class="page-item" onclick="previous(${page})"><a class="page-link" href="#">Previous</a></li>`;
  if (page === 1) {
    paginationContainer.children[0].style.display = "none";
  }
  for (let i = 1; i <= pageCount; i++) {
    paginationContainer.innerHTML += `
        <li class="page-item" onclick="renderPagination(${i})"><a class="page-link" href="#">${i}</a></li>
        `;
  }

  paginationContainer.innerHTML += `
    <li class="page-item" onclick="next(${page})"><a class="page-link" href="#">Next</a></li>`;
  if (page === pageCount) {
    paginationContainer.children[page + 1].style.display = "none";
  }

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

//Render ON CLICK
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
