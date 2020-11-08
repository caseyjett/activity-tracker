// Learned from Web Cifar Youtube tutorial: Photo Gallery App Part 2 - JavaScript

class PhotoGallery {
    constructor(){
        this.API_KEY = '563492ad6f9170000100000185f4b83f8ac341fe9cdd83cd4caf97bd'; 
        this.galleryDiv = document.querySelector('.gallery'); 
        this.searchForm = document.querySelector('.image-search');
        this.loadMore = document.querySelector('.load-more');
        this.pageIndex = 1;
        this.searchValueGlobal = '';  
        this.eventHandle(); 
    }
    eventHandle(){
        document.addEventListener('DOMContentLoaded',()=>{
            this.getImg(1); 
        });
        this.searchForm.addEventListener('submit', (e)=>{
            this.pageIndex = 1; 
            this.getSearchedImages(e);
        });
        this.loadMore.addEventListener('click', (e)=>{
            this.loadMoreImages(e);
        })
    }
    async getImg(index) {
        this.loadMore.setAttribute('data-img', 'curated');
        const baseURL = `https://api.pexels.com/v1/search?query=$acrobat&page=${index}&per_page=4`; 
        const data = await this.fetchImages(baseURL);
        this.GenerateHTML(data.photos)
        console.log(data)
    }
    async fetchImages(baseURL){
        const response = await fetch(baseURL, {
            method: 'GET', 
            headers: {
                Accept: 'application/json', 
                Authorization: this.API_KEY
            }
        });
        const data = await response.json(); 
        return data; 
    }
    GenerateHTML(photos){
        photos.forEach(photo=>{
          const item= document.createElement('div');
          item.classList.add('item');
          item.innerHTML = `
          <a href='${photo.src.original}' target="_blank">
            <img src="${photo.src.medium}">
            <h3>${photo.photographer}</h3>
          </a>
          `;
          this.galleryDiv.appendChild(item)
        })
      }
    async getSearchedImages(e){
        this.loadMore.setAttribute('data-img', 'search'); 
        e.preventDefault();
        this.galleryDiv.innerHTML=''; 
        const searchValue = e.target.querySelector('input').value; 
        this.searchValueGlobal = searchValue; 
        const baseURL = `https://api.pexels.com/v1/search?query=${searchValue}&page=1&per_page=4`
        const data = await this.fetchImages(baseURL); 
        this.GenerateHTML(data.photos); 
        e.target.reset(); 
    }
    async getMoreSearchedImages(index) {
        const baseURL = `https://api.pexels.com/v1/search?query=${this.searchValueGlobal}&page=${index}&per_page=4`
        const data = await this.fetchImages(baseURL); 
        console.log(data)
        this.GenerateHTML(data.photos);  
    }
    loadMoreImages(e){
        let index = ++this.pageIndex;
        const loadMoreData = e.target.getAttribute('data-img'); 
        if(loadMoreData === 'curated') {
            this.getImg(index)
        } else{
            this.getMoreSearchedImages(index); 
        }
    }
}


const gallery = new PhotoGallery; 