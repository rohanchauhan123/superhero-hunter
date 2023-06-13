// alert('page is up')
let favids;
let res = [];
const container = document.getElementById('main-container');



function render(data) {
    if(data.id===undefined)return;
    const card = document.createElement('div');

    let fav_stats={...localStorage};
    fav_status='';
    if(fav_stats[data.id]=='true'){
        fav_status='liked';
    }

    card.innerHTML = `<div class="cards">
        <div class="card-body">
            <h2>${data.name}</h2>
            <p><b>id</b> : ${data.id} <br> </p>
        </div>
        <div class="card-footer">
            <button class="read-more-btn" data-id="${data.id}">Read More</button>
            <span class="heart-like-button right ${fav_status}" data-id="${data.id}"></span>
        </div>
    </div>`;

    container.append(card);
}

async function getDetailsByid(id) {
    let url = "https://gateway.marvel.com/v1/public/characters/" + id + "?apikey=479af95fea303989d02e4a22757147e7&ts=1&hash=b837dd71ea30a412d884f205f4da646f";
    console.log(id);
    try {
        let resi = await fetch(url);
        return resi.json();
    }
    catch (e) { console.log(e); }

}
function getfavs() {
    favids = { ...localStorage };
    for (i of Object.entries(favids)) {
        if (i[1] === 'true') {
            getDetailsByid(i[0]).then(function (jdata) {
                res.push(jdata);
                // console.log(res[0].data.results[0]);
                render(jdata.data.results[0]);
            })
        }
    }

}



getfavs();


function handleclick(e){
    clickedEleClasses=e.target.classList;
    console.log(clickedEleClasses[0]);
    if(clickedEleClasses[0]==='heart-like-button'){
        console.log(e.target.dataset.id);
        let id=e.target.dataset.id;
        localStorage.setItem(id,false);
        alert('removed from favs');
        document.location.href = 'Favorites.html';
        
    }

    else if(clickedEleClasses[0]==='read-more-btn'){
        console.log(e.target.dataset.id);
        localStorage.setItem('say-about',e.target.dataset.id);
        document.location.href = 'superhero.html';
    }
}
document.addEventListener('click',handleclick);