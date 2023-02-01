import fecthData from "../utilities/fetch.js";
import dataToJobCards from "../utilities/dataToJobCards.js";
import inlineStyle from "../utilities/inlineStyle.js";

//TODO -----===== Utility Functions =====-----
//! getting the content div
const content = document.querySelector("#content");

//! get all the job categories from the API
const getAllCategories = async () => {
  let categoriesData = [];
  categoriesData = await fecthData(
    "https://remotive.com/api/remote-jobs/categories"
  );
  const categories = categoriesData.jobs;
  return categories;
};

//! get all the jobs by category from the API
const getJobsByCategory = async (category) => {
  let jobsData = [];
  jobsData = await fecthData(
    `https://remotive.com/api/remote-jobs?category=${category}&limit=96`
  );
  const jobs = jobsData.jobs;
  // console.log("jobs INSIDE getJobsByCategory Function", jobs);
  return jobs;
};

//! get all the jobs by search from the API
// search example url: https://remotive.com/api/remote-jobs?search=front%20end&limit=96
const searchJobs = async (search) => {
  let jobsData = [];
  jobsData = await fecthData(
    `https://remotive.com/api/remote-jobs?search=${search}&limit=96`
  );
  const jobs = jobsData.jobs;
  console.log("jobs INSIDE searchJobs Function", jobs);
  return jobs;
};

//TODO -----===== Creating the JobsByCategory page =====-----
const JobsByCategory = async () => {
  const btnContainer = document.querySelector("#categoryContainer");
  const resContainer = document.querySelector("#resultsContainer");
  const searchBox = document.querySelector("#searchBox");
  //! Setting the inline style for the results container
  let gridStyle = inlineStyle();
  resContainer.setAttribute("style", gridStyle);
  //! Search box event listener
  searchBox.addEventListener("keyup", async (event) => {
    const userValue = event.target.value;
    console.log("userValue", userValue);
    console.log("event", event);
    if (event.key === "Enter") {
      const jobs = await searchJobs(userValue);
      console.log("jobs INSIDE searchBox EventListener", jobs);
      resContainer.innerHTML = "";
      resContainer.innerHTML = await dataToJobCards(jobs);
    }
  });

  //! Dinamicly creating the buttons for each category
  const categoryButtons = async (categories) => {
    await categories.map((category) => {
      const catBtn = document.createElement("button");
      catBtn.classList.add("categoryBTN");
      catBtn.textContent = category.name;
      catBtn.addEventListener("click", async () => {
        // console.log(event.target.textContent);
        const jobs = await getJobsByCategory(category.slug);
        console.log("jobs INSIDE categoryButtons Function", jobs);
        resContainer.innerHTML = "";
        resContainer.innerHTML = await dataToJobCards(jobs);
      });
      btnContainer.append(catBtn);
    });
  };
  const categories = await getAllCategories();
  await categoryButtons(categories);
  console.log("categories", categories);
  return;
};

export default JobsByCategory;
