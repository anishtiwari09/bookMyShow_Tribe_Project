var articles = document.getElementById("articles");
var video = document.getElementById("video");
var trending = document.getElementById("trending");

function changeColor(e){
    var likes = e.nextSibling.nextSibling.innerHTML;
    var c = e.classList;
    for( var i = 0; i < c.length; i++ ){
        if( c[i] === "fa-heart-o"){
            e.classList.remove( "fa-heart-o" );
            e.classList.add( "fa-heart" );
            e.nextSibling.nextSibling.innerHTML = Number(likes) + 1;
            break;
        }
        if( c[i] === "fa-heart"){
            e.classList.remove( "fa-heart" );
            e.classList.add( "fa-heart-o" );
            e.nextSibling.nextSibling.innerHTML -= 1;
            break;
        }
    }
}

function changeShare(e){
    var c = e.classList;
    for( var i = 0; i < c.length; i++ ){
        if( c[i] === "fa-bookmark-o"){
            e.classList.remove( "fa-bookmark-o" );
            e.classList.add( "fa-bookmark" );
            break;
        }
        if( c[i] === "fa-bookmark"){
            e.classList.remove( "fa-bookmark" );
            e.classList.add( "fa-bookmark-o" );
            break;
        }
    }

}

var fb = document.getElementsByClassName("fa-facebook")[0];
var insta = document.getElementsByClassName("fa-instagram")[0];
var youtube = document.getElementsByClassName("fa-youtube-play")[0];
var twitter = document.getElementsByClassName("fa-twitter")[0];
var linkedin = document.getElementsByClassName("fa-linkedin")[0];

fb.addEventListener("click", () =>  {
    window.open('https://www.facebook.com/BookMyShowIN', '_blank');
})
insta.addEventListener("click", () =>  {
    window.open('https://www.instagram.com/bookmyshowin/', '_blank');
})
youtube.addEventListener("click", () =>  {
    window.open('https://www.youtube.com/user/BookMyShow/featured', '_blank');
})
twitter.addEventListener("click", () =>  {
    window.open('https://twitter.com/BookMyShow/', '_blank');
})
linkedin.addEventListener("click", () =>  {
    window.open('https://www.linkedin.com/company/bookmyshow/', '_blank');
})


var time = ["58 Mins ago", "5 Hours ago", "1 Day ago", "1 Day ago", "2 Days ago", "2 Days ago", "2 Days ago", "3 Days ago", "4 Days ago", "4 Days ago", "4 Days ago", "6 Days ago", "6 Days ago", "6 Days ago", "6 Days ago", "1 Week ago", "2 Weeks ago", "2 Weeks ago"];

var likes = [ 3, 4, 8, 10, 11, 18, 13, 38, 48, 44, 23, 45, 66, 53, 34, 64, 83, 99, 93, 199, 200, 232, 283, 340];

window.addEventListener( "load", displayTredning);
trending.addEventListener( "click", displayTredning);

function displayTredning(){
    fetch( '../DATA/articles.json' )
    .then( res => res.json() )
    .then( res => {
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
        <i class="fa fa-bookmark-o fa-lg" onclick="changeShare(this)" aria-hidden="true"></i>
    </div>

    <div class="flex-2">
        <img src=${author} alt="" class="author">
        <p class="time-flex">${time}</p>
        <i class="fa fa-heart-o fa-lg" onclick="changeColor(this)" aria-hidden="true"></i>
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

    var url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=40&q=latest%20movies%20trailer&key=AIzaSyB2M6fUG-_3ZmsVG3AzaZQCX7nz5MluBEw`;

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
        <i class="fa fa-bookmark-o fa-lg" onclick="changeShare(this)" aria-hidden="true"></i>
    </div>

    <div class="flex-2">
        <img src=${thumbnail} alt="" class="author">
        <p class="time-flex">${timing}</p>
        <i class="fa fa-heart-o fa-lg" onclick="changeColor(this)" aria-hidden="true"></i>
        <p class="like-flex">${like}</p>
        <i class="fa fa-share-alt fa-lg"  aria-hidden="true"></i>
    </div>

    </div>`;

    div.appendChild( div1 );

    articles.appendChild( div );
}