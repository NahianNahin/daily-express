//  load Categories
const loadCategories = () => {
    
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        // .catch(error => console.log(error));
}

//  Display Categories
const displayCategories = (categories) => {
    
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
      console.log(category);
      const div = document.createElement('div');
      div.innerHTML = `
      <h6 class="text-secondary fw-semibold" onclick="loadNewsByCategories('${category.category_id}','${category.category_name}')">${category.category_name}</h6>
      `;
      categoriesContainer.appendChild(div);
    })
}

   loadCategories();
//  load News by Categories
const loadNewsByCategories = async(id,name) => {
  // loadingSpiner(true);
    try{
        const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data,name);
    }
    catch(error){
        console.log(error);
    }
}
// Display News by Categories
const displayNews = (allNews,name) => {
    allNews = allNews.sort((b, a) => a.total_view - b.total_view);
    console.log(allNews);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    allNews.forEach(singleNews => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.classList.add('mb-3');
        card.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${singleNews.image_url}" class="img-fluid d-md-none d-lg-block" alt="...">
          <img src="${singleNews.thumbnail_url}" class="img-fluid d-md-block d-lg-none d-none" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${singleNews.title}</h5>
            <p class="card-text"><small class="text-muted">${singleNews.details.slice(0,250)}...</small></p>
            <p class="card-text d-lg-none d-md-block"><small class="text-muted">${singleNews.details.slice(151,250)}...</small></p>
            <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-3 align-items-center">
          <div>
            <img src="${singleNews.author.img}" alt="" class="img-fluid rounded-circle" style="width:2rem  ; height: 2rem;">
          </div>
          <div>
            <p class="m-0">${singleNews.author.name ? singleNews.author.name : 'No Data Available'}</p>
            
          </div>
        </div>
        <div><p class="m-0" ><i class="fa-regular fa-eye"></i> ${singleNews.total_view ? singleNews.total_view : 'No Data Available'}</p> </div>
        <div class="d-none d-md-block d-lg-block">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
        </div>
        <div class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadDetails('${singleNews._id}')">
          <i class="fa-solid fa-arrow-right"></i>
        </div>

        <!-- MODAL  -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" id="modal">

        </div>
      </div>
      </div>
            
          </div>
        </div>
      </div>
        `;
        newsContainer.appendChild(card);      
    });
    
    // Display Result Found 
    const displayResultFound = document.getElementById('result-found');
    displayResultFound.innerHTML = ``;
    const result = document.createElement('h6');
    result.innerText = `${allNews.length} items found for category ${name}`
    displayResultFound.appendChild(result);
    // loadingSpiner(false);
}

// loading spinner 
const loadingSpiner = isLoading => {
  const loading = document.getElementById('loading-section');
  if(isLoading){
      loading.classList.remove('d-none');
  }
  else{
      loading.classList.add('d-none');
  }
}

// load details 

const loadDetails = newsId => {
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.data[0]))
  .catch(error => console.log(error));
}
// display in Modal 

const displayDetails = details => {
  const modalContainer = document.getElementById('modal');
  modalContainer.innerHTML = ``;
  const modalContent = document.createElement('div');
  modalContent.classList.add('modal-content');
  modalContent.innerHTML = `
      <div class="modal-header">
      <h5 class="modal-title fw-semibold" id="exampleModalLabel">${details.title}</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <img src="${details.image_url}" alt="" class="img-fluid">
      <p>${details.details}</p>
      <div class="d-flex gap-5 align-items-center">
              <h6><span class="text-bg-warning">Rating :</span>  ${details.rating.number} </h6>
              <h6> <span class="text-bg-warning">Bagde :</span> ${details.rating.badge}</h6>
            </div>
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-2 align-items-center py-4">
          <div>
            <img src="${details.author.img}" alt="" class="img-fluid rounded-circle" style="width:2rem  ; height: 2rem;">
          </div>
          <div>
            <p class="m-0">${details.author.name ? details.author.name : 'No Data Available'}</p>
            
          </div>
        </div>
        <div><p class="m-0" ><i class="fa-regular fa-eye"></i> ${details.total_view ? details.total_view : 'No Data Available'}</p> </div>
        <div class="d-none d-md-block d-lg-block text-warning">
          
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star-half-stroke"></i>
        </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Close</button>
      
    </div>
  `;

  modalContainer.appendChild(modalContent);
}



