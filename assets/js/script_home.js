const searchBox = document.getElementById('search_id');
const searchRes= document.getElementById('results_list');

// to show fetched data on web page we use below method
function addToDom(row){
    const li=document.createElement('li');
    let fav_stats={...localStorage};
    fav_status='';
    console.log(row["description"]);
    if(fav_stats[row.id]=='true'){
        fav_status='liked';
    }
    li.innerHTML=`<li>
                    <div class ="sup-name slabel"<label data-id="${row.id}" class="search-hero slabel">${row.name}</label></div>
                    <br>
                    <div class= "pic"><img class="sup-img" src="${
                        row.thumbnail["path"] + "." + row.thumbnail["extension"]
                      }"/>
                    </div>
                    <button class="heart-like-button right ${fav_status}" data-id="${row.id}">Add to fav</button>
                    
                    </li>`
    searchRes.append(li);
}
// following method add each fetched element one by one 
function renderList(res){
    searchRes.innerHTML='';
    for(i of res){
        addToDom(i);
    }
}

// below method parse our fetched json to become usable
function assign(d) {
    res = d.data.results;
    console.log(res);
    if(res.length>10){
        res=res.slice(0,7);
    }
    renderList(res);
}

// following event listeners are used for listening users input 
searchBox.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        console.log("Enter key is pressed");
        if (e.target.value.length > 0) {
            let url="https://gateway.marvel.com/v1/public/characters?nameStartsWith="+e.target.value+"&limit=8&ts=1&apikey=479af95fea303989d02e4a22757147e7&hash=b837dd71ea30a412d884f205f4da646f";
            fetch(url)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    assign(data);
                });
        }
        else{
            renderList('');
        }
    }
})




function handleclick(e){
    clickedEleClasses=e.target.classList;
    console.log(clickedEleClasses[0]);
    if(clickedEleClasses[0]==='heart-like-button'){
        console.log(e.target.dataset.id);
        let id=e.target.dataset.id;
        if(localStorage.getItem(id)=='true'){
            localStorage.setItem(id,false);
            e.target.classList.remove('liked');
            alert('removed from favs');
        }
        else{
            localStorage.setItem(id,true);
            e.target.classList.add('liked');
            alert('added to favs');
        }
    }

    else if(clickedEleClasses[1]==='slabel'){
        console.log('label clicked', e.target.dataset.id);
        localStorage.setItem('say-about',e.target.dataset.id);
        document.location.href = 'superhero.html';
    }
}
document.addEventListener('click',handleclick);