"use strict";
const saveBtn = document.getElementById("btn-submit");

function getValue() {
  var pageSize = document.getElementById("input-page-size");
  if(pageSize.value == ""){
      alert("Please enter a number between 1 and 10");
        return;
    }
  var category = document.getElementById("input-category");
  const urlInfo = { pageSize: pageSize.value, category: category.value };
  setStorage("urlInfo", urlInfo);
  alert("Your settings have been saved");
  window.location.href = "news.html";
}

saveBtn.addEventListener("click", function () {
  getValue();
  console.log(urlInfo);
});
