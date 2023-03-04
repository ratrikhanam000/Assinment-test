const DataFetch = async (primary) => {
  try {
    const data = await fetch(
      "https://openapi.programming-hero.com/api/ai/tools"
    );
    const res = await data.json();
    let tools = res.data.tools;
    DataDisplay(tools.slice(0, primary), primary);
  } catch (error) {
    console.log(error);
  }
};

document.getElementById("showmore").addEventListener("click", () => {
  DataFetch();
});

const DataDisplay = (data, primary) => {
  const aiCards = document.getElementById("aicards");
  aiCards.textContent = "";

  data.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("col");
    card.innerHTML = `
        <div class="card px-3 py-4">
        <img src=${
          element.image
        } class="card-img-top img-fluid rounded" alt="..." style="height:18rem"/>
        <div class="card-body">
          <h5 class="card-title fw-bold text-capitalize">${
            Object.keys(element)[5]
          }</h5>
          <div class="card-text">
          <ol type='1' class="px-2">
          <li class="lead">${element.features[0]}</li>
          <li class="lead">${element.features[1]}</li>
          <li class="lead">${element.features[2]}</li>
          </ol>
          </div>
          <hr>
           <h3>${element.name}</h3>
           <div class="d-flex justify-content-xl-between align-items-center">
           <div>
           <i class="bi bi-calendar4-week"></i> <span>${
             element.published_in
           }</sapn>
           </div>
           <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#aimodal" onclick='onmodal("${
             element.id
           }")' ><i class="bi bi-arrow-right"></i></button>
           </div>
        </div>
      </div>
        `;
    aiCards.append(card);
  });
};
const onmodal = async (e) => {
  let url = `https://openapi.programming-hero.com/api/ai/tool/${e}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const modal = document.querySelector(".modal-body");
    const real = data.data;
    modal.innerHTML = `
<div class="container text-center">
<div class="row row-cols-1 row-cols-md-2 content-row">
<div class="col col-md-6 border p-4">
  <div class="content border-1 rounded">
   <h2 class="text-start mb-2">${
     real.description ? real.description : "not data"
   }</h2>
  </div>
  <div class='row gap-1 mb-5'>
  <div class='col text-success  fw-bold border border-warning rounded'>
  <p class="m-0">${
    real.pricing[0].price ? real.pricing[0].price : "Free of cost "
  }</p>
  <p clas="m-0">${real.pricing[0].plan ? real.pricing[0].plan : "Free plan"}</p>
  </div>
  <div class='col text-success  fw-bold border border-warning rounded'>
  <p class="m-0">${
    real.pricing[1].price ? real.pricing[1].price : "Free of cost "
  }</p>
  <p clas="m-0">${real.pricing[1].plan ? real.pricing[1].plan : "Free plan"}</p>
  </div>
  <div class='col text-success fw-bold border border-warning rounded'>
  <p class="m-0">${
    real.pricing[1].price ? real.pricing[1].price : "Free of cost "
  }</p>
  <p clas="m-0">${real.pricing[1].plan ? real.pricing[1].plan : "Free plan"}</p>
  </div>
  </div>
  <div>
  <div class="d-flex justify-content-between flex-lg-row flex-column px-5">
  <ul class="m-0 text-start px-0">
  <h4>Features</h4>
  <li>${real.features[1].feature_name ? real.features[1].feature_name: "not availabe"}</li>
  <li>${
      real.features[2].feature_name ? real.features[2].feature_name : "not avaialbe"
    }</li>
    <li>${real.features[3].feature_name ? real.features[3].feature_name : "not avaiable"}</li>
  </ul>
  <ul class="m-0 text-start px-0">
  <h4>Integrations</h4>
  <li>${real.features[1].feature_name ? real.features[1].feature_name: "not availabe"}</li>
  <li>${
      real.features[2].feature_name ? real.features[2].feature_name : "not avaialbe"
    }</li>
    <li>${real.features[3].feature_name ? real.features[3].feature_name : "not avaiable"}</li>
  </ul>
  </div>
  </div>
</div>
<div class="col col-md-6">
<div class="card">

<div class="toast align-items-center d-block position-absolute bg-danger text-white top-0 end-0 w-25" role="alert" aria-live="assertive" aria-atomic="true">
<div class="d-flex">
  <div class="toast-body">
    ${Math.round(real.accuracy.score * 100)}%  accuracy
  </div>
</div>
</div>

  <img src=${real.image_link[0]} class="img-fluid rounded" alt="...">
  <div class="card-body">
    <h5 class="card-title fw-bold">${real.input_output_examples[0].input}</h5>
    <p class="card-text">${real.input_output_examples[0].output}</p>
  </div>
</div>
</div>
</div>
</div>
`;
  } catch (error) {
    console.log("Error: ", error);
  }
};

DataFetch(6);