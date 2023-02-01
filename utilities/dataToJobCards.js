const dataToJobCards = async (jobsArr) => {
  const placeholderImg = "../images/placeholder.png";
  const workCards = await jobsArr.map((job) => {
    // console.log("job", job.tags.length);
    const jobTags = job.tags.map((tag, index) => {
      if (index < 12) {
        return `<li class="work-card__tag">${
          tag[0].toUpperCase() + tag.slice(1).toLowerCase()
        }</li>`;
      } else {
        return "";
      }
    });
    // console.log("job image", job.company_logo_url);
    const jobImg = job.company_logo_url ? job.company_logo_url : placeholderImg;
    // console.log("jobTags", jobTags);
    return `<div class="work-card">
              <div class="work-card__img">
                <img src="${jobImg}" style="display:block; margin:auto; max-width: 100px; border-radius: 0.25rem" alt="${
      job.title
    }"/>
              </div>
              <div class="work-card__content">
                <h3 class="work-card__title">${job.title}</h3>
                <p class="work-card__category">Category: ${job.category}</p>
                <p class="work-card__company">Company Name: ${
                  job.company_name
                }</p>
                <h4 class="work-card__skills">Skills:</h4>
                <ul class="work-card__tags">${jobTags.join("")}</ul>
                <div class="link-container">
                <a href="${
                  job.url
                }" class="work-card__link" target="_blank">Apply For Position!</a>
                </div>
              </div>
            </div>`;
  });
  return `${workCards.join("")}`;
};

export default dataToJobCards;
