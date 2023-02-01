import fecthData from "./utilities/fetch.js";
import HomePage from "./pages/homepage.js";
import AllJobs from "./pages/allJobs.js";
import JobsByCategory from "./pages/jobsByCategory.js";

const homeBTN = document.querySelector("#homeBTN");
const allJobsBTN = document.querySelector("#allJobsBTN");
const categoryJobsBTN = document.querySelector("#categoryJobsBTN");

const content = document.querySelector("#content");

homeBTN.addEventListener("click", () => {
  content.innerHTML = "";
  content.innerHTML = HomePage();
});
allJobsBTN.addEventListener("click", async () => {
  content.innerHTML = "";
  content.innerHTML = await AllJobs();
});
categoryJobsBTN.addEventListener("click", async () => {
  content.innerHTML = "";
  // creating the buttons container
  const btnContainer = document.createElement("div");
  btnContainer.setAttribute("id", "categoryContainer");
  content.append(btnContainer);
  // creating the results container
  const resContainer = document.createElement("div");
  resContainer.setAttribute("id", "resultsContainer");
  content.append(resContainer);
  // creating the search box (input #searchBox nested inside h2)
  const searchBox = document.createElement("input");
  const searchHeader = document.createElement("h4");
  searchHeader.setAttribute("class", "searchHeader");
  searchHeader.textContent = "Or enter your search here and press Enter:";
  searchBox.setAttribute("type", "text");
  searchBox.setAttribute("id", "searchBox");
  searchBox.setAttribute("placeholder", "Search...");
  searchHeader.append(searchBox);
  btnContainer.append(searchHeader);
  await JobsByCategory();
});
