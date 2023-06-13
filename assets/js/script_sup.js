let id=localStorage.getItem('say-about');
const container=document.getElementById('container');

//to render details on web page we will b using this function below
function setDetails(data){
    const div=document.createElement('div');
    div.innerHTML=`<div id="main-container">
        <label class="name" for="name"><b>name</b>: ${data.name}</label><br>
        <label class="name" for="id"><b>hero id</b>: ${data.id}</label><br>
        
        <label class="name" for="comics"><b>comics</b> : ${data.comics['available']}</label><br>
        <label class="name" for="story"><b>story</b>: ${data.stories['available']}</label><br>
        <label class="name" for="series"><b>series</b>: ${data.series['available']}</label><br>
        <p class="description" for="description"><b>description</b> : ${data.description}</p><br>
        <div class="suppic"><img  src="${
            data.thumbnail["path"] + "." + data.thumbnail["extension"]
          }"/></div>
            </div>`;
    container.append(div);
}

// to fetch details from apui we use below method
async function getDetails(id){
    let url = "https://gateway.marvel.com/v1/public/characters/" + id + "?apikey=479af95fea303989d02e4a22757147e7&ts=1&hash=b837dd71ea30a412d884f205f4da646f";
    try {
        let resi = await fetch(url);
        return resi.json();
    }
    catch (e) { console.log(e); }
}

getDetails(id).then(function(data){
    setDetails(data.data.results[0]);
})