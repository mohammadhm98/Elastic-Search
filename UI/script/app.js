const searchInput = document.querySelector("#search-bar")
const seachForm = document.querySelector("#search-form")
const resultTable = document.querySelector("#result-table")
const returnCount = document.querySelector('#return-count')
const err = document.querySelector('#err')

const paginationNext = document.querySelector("#next")
const paginationPrev = document.querySelector("#prev")
const pagination1 = document.querySelector('#pagination-1')
const pagination2 = document.querySelector('#pagination-2')
const pagination3 = document.querySelector('#pagination-3')
const pagination4 = document.querySelector('#pagination-4')
const pagination5 = document.querySelector('#pagination-5')
const pagination = document.querySelector("#pagination")
const categories = document.querySelectorAll(".cat-item")
const searchType1 = document.querySelector(".search-type-1")
const searchType2 = document.querySelector(".search-type-2")
const searchType3 = document.querySelector(".search-type-3")

seachForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let searchTerm = searchInput.value.trim();
    let searchTarget = getSearchTarget()
    let searchType = getSearchType()
    let pageSize = 10
    getData(searchTerm,searchTarget,pagenum = 1,pageSize,searchType).then(data => updateUI(data ) )
                                    .catch(err => console.log(err))


})
searchType1.addEventListener('click', (e) =>{
  e.preventDefault();
  console.log('dsljhfdsihb')
  searchType1.classList.remove('btn-secondary')
  searchType1.classList.add('btn-primary')

  searchType2.classList.add('btn-secondary')
  searchType2.classList.remove('btn-primary')

  searchType3.classList.add('btn-secondary')
  searchType3.classList.remove('btn-primary')


  let searchTerm = searchInput.value.trim();
    let searchTarget = getSearchTarget()
    let searchType = getSearchType()
    let pageSize = 10
    getData(searchTerm,searchTarget,pagenum = 1,pageSize,searchType).then(data => updateUI(data ) )
                                    .catch(err => console.log(err))


                                
})

searchType2.addEventListener('click', (e) =>{
  e.preventDefault();
  searchType1.classList.add('btn-secondary')
  searchType1.classList.remove('btn-primary')

  searchType2.classList.remove('btn-secondary')
  searchType2.classList.add('btn-primary')

  searchType3.classList.add('btn-secondary')
  searchType3.classList.remove('btn-primary')

  let searchTerm = searchInput.value.trim();
    let searchTarget = getSearchTarget()
    let searchType = getSearchType()
    let pageSize = 10
    getData(searchTerm,searchTarget,pagenum = 1,pageSize,searchType).then(data => updateUI(data ) )
                                    .catch(err => console.log(err))


})

searchType3.addEventListener('click', (e) =>{
  e.preventDefault();
  searchType1.classList.add('btn-secondary')
  searchType1.classList.remove('btn-primary')

  searchType2.classList.add('btn-secondary')
  searchType2.classList.remove('btn-primary')

  searchType3.classList.remove('btn-secondary')
  searchType3.classList.add('btn-primary')

  let searchTerm = searchInput.value.trim();
    let searchTarget = getSearchTarget()
    let searchType = getSearchType()
    let pageSize = 10
    getData(searchTerm,searchTarget,pagenum = 1,pageSize,searchType).then(data => updateUI(data ) )
                                    .catch(err => console.log(err))


})

categories.forEach(function(cat) {
  cat.addEventListener("click", (e) => {
    // e.preventDefault()
    console.log(cat.value)
    if (cat.checked){
      console.log('checked')

      let allnews = document.querySelectorAll('#news-card')
      console.log(allnews)
    }else{
  
      console.log('unchecked')
    }
    
  });
});



paginationNext.addEventListener('click', (e) =>{
  e.preventDefault();
  console.log('next')

  pagenum =  parseInt(pagination1.children[0].innerHTML)
  console.log(pagenum)

  let searchTerm = searchInput.value.trim();
  let searchTarget = getSearchTarget()
  let searchType = getSearchType()
   let  pageSize = 10
  getData(searchTerm,searchTarget,pagenum+1,pageSize, searchType).then(data => {
    updateUI(data)
    pagination1.children[0].innerHTML = pagenum + 1
  } )
                                  .catch(err => console.log(err))


})

paginationPrev.addEventListener('click', (e) =>{
  e.preventDefault();
  console.log('prev')

  pagenum =  parseInt(pagination1.children[0].innerHTML)
  console.log(pagenum)

  if(pagenum > 1){
    let searchTerm = searchInput.value.trim();
    let searchTarget = getSearchTarget()
    let searchType = getSearchType()
    let pageSize = 10
    getData(searchTerm,searchTarget,pagenum-1,pageSize, searchType).then(data => {
      updateUI(data)
      pagination1.children[0].innerHTML = pagenum - 1
    } )
                                    .catch(err => console.log(err))
  
  }
 

})



const updateUI = (data) =>{
    
    const total_count = data.hits.total.value;
    const page_count = data.hits.hits.length
    const news = data.hits.hits;
    console.log(news);
    console.log(total_count);
    resultElement = ``;

    returnCount.innerHTML = ` <p class="text-secondary" id="return-count">  ${total_count.toLocaleString("fa-IR")}   سند بازگردانی شده است  </p>`

    for ( i = 0; i <page_count; i++) {

        
        article = news[i]["_source"];

        
         
        let tags = article["tag_list"].replace(/'/g, '"');
        tags = JSON.parse(tags);

        let tagElement = ``

        for ( j = 0; j<tags.length; j++){

          let rand  =Math.floor(Math.random() * 5) + 1;;
          console.log(rand)
          let color = 'warning'
          if ( rand == 1){
            color = 'primary'
          }else if (rand == 2){
            color = 'secondary'
          }else if (rand == 3){
            color = 'info'
          }else if (rand == 4){
            color = 'danger'
          }
          tagElement+= `
          <span class="badge bg-${color}">${tags[j]}</span> 

          `
        }
        
        resultElement = resultElement.concat()
        resultElement += `
        <div class="card my-2   scale-custom   " style="" id="news-card  ">
                      <div class="card-body ">
                        <h5 class="card-title"><a href="${article["Short_link"]}" class="card-link text-info news-link"> ${article["Title"]}</a></h5>
                        
                        <div class"">
                        <p href="#" class="d-inline   card-link text-secondary small">${article["Date"]}</p>
                        <p class="d-inline     text-secondary small"> - </p>
                        <p class="   d-inline   card-subtitle mb-2 text-secondary small" id="news-subject">${article["Subject"]}</p>
                        </div>
                        <p class="card-text text-muted small">${article["Summary"]}</p>
                        <div class="row">
                        <p class="card-text truncate ">${article["Body"]}</p>
          
                        </div>
                        

                        

                        <div class=""  >
                           ${tagElement}          
                        </div>

                        
                        <div class="row mt-4  ">
                        
                          <p class="card-subtitle mb-2 text-muted" id="news-subject"> شماره خبر:  ${article["News_ID"].toLocaleString("fa-IR")}</p>          
                        </div>
                        
                      </div>
                    </div>
                    `;

         

      };

    
      resultTable.innerHTML = resultElement;
      if(total_count == 0 ){
        returnCount.innerHTML = ` <p class="text-secondary" id="return-count">    موردی یافت نشد </p>`;
        resultTable.innerHTML = ``;
      }else{
        pagination.classList.remove('d-none')
      }

      
      
        
      
      
    // console.log(data.hits.hits[0]["_source"]["Subject"])
}

const getData = async(searchTerm,searchTarget,pagenum,pagesize,searchtype) =>{
    // console.log(searchTarget)

    
    const data = await getSearchResult(searchTerm,searchTarget,pagenum, pagesize,searchtype);
    // console.log(data)
    return data;
}



function getSearchTarget() {
    // Select the checked radio button
    const selectedRadioButton = document.querySelector('input[name="searchtarget"]:checked');
  
    if (selectedRadioButton) {
      // Get the value of the selected radio button
      const selectedValue = selectedRadioButton.value;
    //   console.log(selectedValue)

      err.innerHTML   = ``   
      return selectedValue
    }else{
      err.innerHTML = ` <p class="text-danger" id="return-count">    منبع جست و جو انتخاب نشده است </p>`;
    }
  }

  function getSearchType(){
    let searchType = ''
    if( searchType1.classList.contains('btn-primary')){
      searchType = 'type1'
    }

    if( searchType2.classList.contains('btn-primary')){
      searchType = 'type2'
    }

    if( searchType3.classList.contains('btn-primary')){
      searchType = 'type3'
    }
    console.log(searchType)
    return searchType

  }



