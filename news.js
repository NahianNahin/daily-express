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
            <p class="card-text"><small class="text-muted">${singleNews.details.slice(0,150)}...</small></p>
            <p class="card-text d-lg-none d-md-block"><small class="text-muted">${singleNews.details.slice(151,250)}...</small></p>
            <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex gap-3 align-items-center">
          <div>
            <img src="${singleNews.author.img}" alt="" class="img-fluid rounded-circle" style="width:2rem  ; height: 2rem;">
          </div>
          <div>
            <p class="m-0">${singleNews.author.name}</p>
            
          </div>
        </div>
        <div><p class="m-0" ><i class="fa-regular fa-eye"></i> ${singleNews.total_view}</p> </div>
        <div class="d-none d-md-block d-lg-block">
          <i class="fa-solid fa-star-half-stroke"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
          <i class="fa-regular fa-star"></i>
        </div>
        <div class="btn btn-outline-danger">
          <i class="fa-solid fa-arrow-right"></i>
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

}





