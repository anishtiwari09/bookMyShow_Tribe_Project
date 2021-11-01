var articles = document.getElementById("articles");
var video = document.getElementById("video");
var trending = document.getElementById("trending");

var time = ["58 Mins ago", "5 Hours ago", "1 Day ago", "1 Day ago", "2 Days ago", "2 Days ago", "2 Days ago", "3 Days ago", "4 Days ago", "4 Days ago", "4 Days ago", "6 Days ago", "6 Days ago", "6 Days ago", "6 Days ago", "1 Week ago", "2 Weeks ago", "2 Weeks ago"];

var likes = [ 3, 4, 8, 10, 11, 18, 13, 38, 48, 44, 23, 45, 66, 53, 34, 64, 83, 99, 93, 199, 200, 232, 283, 340];

window.addEventListener( "load", displayTredning);
trending.addEventListener( "click", displayTredning);

function displayTredning(){
    fetch( '../DATA/articles.json' )
    .then( res => res.json() )
    .then( res => {
        console.log( res );
        articles.innerHTML = "";
        for( var i = 0; i < res.length; i++ ){
            makeArticleCard( res[i] );
        }
    });
}

function makeArticleCard( {author, heading, image, likes, time} ){
    var div = document.createElement("div")
    div.className = "article";
    div.innerHTML = `
    <div class="flex">
    <img src=${image} alt="" class="article-img">
    <div class="inside-flex">
    <div class="flex-1">
        <p class="article-heading">
            ${heading}
        </p>
        <i class="fa fa-bookmark-o fa-lg" aria-hidden="true"></i>
    </div>

    <div class="flex-2">
        <img src=${author} alt="" class="author">
        <p class="time-flex">${time}</p>
        <i class="fa fa-heart-o fa-lg" aria-hidden="true"></i>
        <p class="like-flex">${likes}</p>
        <i class="fa fa-share-alt fa-lg" aria-hidden="true"></i>
    </div>
    </div>
    </div>
`;
    let clear = document.createElement( "div" );
    clear.className = "clear";

    articles.appendChild( div );
    articles.appendChild( clear );
}

video.addEventListener("click", fetchData);

function fetchData(){

    var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&q=latest%20movies%20trailer&key=AIzaSyB2M6fUG-_3ZmsVG3AzaZQCX7nz5MluBEw`;

    fetch( url )
    .then( response => response.json() )
    .then( res => {
        displayVideo( res.items );
    });

}

function displayVideo( arr ){

    articles.innerHTML = "";
    for( var i = 1; i < arr.length; i++ ){
        var obj = arr[i];
        var id = obj.id.videoId;
        var title = obj.snippet.title;
        console.log( obj );
        var thumbnail;
        if( i % 2 == 0 ){
            thumbnail = "https://secure.gravatar.com/avatar/91d9647d48311247adced62f7e9fdbbb?s=96&d=mm&r=g";
        }
        else{
            thumbnail = "https://secure.gravatar.com/avatar/0081c64428025cafd4ef5f2cc54cf47c?s=96&d=mm&r=g";
        }
        createCard( id, title, thumbnail, time[i], likes[i] );
    }

}

function createCard( id, title, thumbnail, timing, like ){
    
    var div = document.createElement("div");
    div.id = "video";

    var videoCard = document.createElement("iframe");
    videoCard.src = `https://www.youtube.com/embed/${id}`;
    videoCard.height = "242px";
    videoCard.width = "431px";
    videoCard.style.borderRadius = "10px";
    videoCard.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoCard.allowFullscreen;
    articles.appendChild( videoCard );

    div.appendChild( videoCard );

    var div1 = document.createElement("div");
    div1.className = "article";
    div1.innerHTML = `<div class="inside-flex">


    <div class="flex-1">
        <p class="article-heading">
            ${title}
        </p>
        <i class="fa fa-bookmark-o fa-lg" aria-hidden="true"></i>
    </div>

    <div class="flex-2">
        <img src=${thumbnail} alt="" class="author">
        <p class="time-flex">${timing}</p>
        <i class="fa fa-heart-o fa-lg" aria-hidden="true"></i>
        <p class="like-flex">${like}</p>
        <i class="fa fa-share-alt fa-lg" aria-hidden="true"></i>
    </div>

    </div>`;

    div.appendChild( div1 );

    articles.appendChild( div );
}