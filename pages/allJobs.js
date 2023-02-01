import fecthData from "../utilities/fetch.js";
import dataToJobCards from "../utilities/dataToJobCards.js";
import inlineStyle from "../utilities/inlineStyle.js";

const getAllJobs = async () => {
  let jobsData = [];
  const data = await fecthData("https://remotive.com/api/remote-jobs?limit=96");
  jobsData = data.jobs;
  return jobsData;
};

const AllJobs = async () => {
  const style = inlineStyle();
  console.log("style", style);
  const jobs = await getAllJobs();
  console.log("jobs", jobs);
  const workCards = await dataToJobCards(jobs);
  return `<div id="resultsContainer" style=${style}>
  ${workCards}
  </div>`;
};

export default AllJobs;
