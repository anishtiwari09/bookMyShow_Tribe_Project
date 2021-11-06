// 
var region = "ncr";
region= JSON.parse(localStorage.getItem("regionName"));
console.log(region);
var getMovies=(params)=>{
    return fetch(`http://localhost:3000/movies?region_like=${params}`)
    .then(res=>res.json())
    .catch(e=>console.log(error))
}
var fetchMovies=async(filter)=>{
    try{
        let query=await createParam(region,filter)
       
        let result=await getMovies(query)
        displayMovies(result)
    }
    catch(e){

    }
}

var displayMovies=data=>{
    let container=document.getElementById('movie-box-container')
    container.innerHTML=null;
    var fragment = new DocumentFragment()
    for(item of data)
    {
        var card=createCard(item);
        fragment.append(card);
    }
    container.append(fragment);
}

var createCard=(item)=>{
    let outerDiv=document.createElement('div')
    let innerDiv=document.createElement('div')
    let movieInfo=document.createElement('div')
    movieInfo.className="movieInfo"
    var title=document.createElement('h5')
    var category=document.createElement('p')
    category.textContent=item.category;
    var availLang=document.createElement('p')
    let alllang=""
    let i=0;
    for(let lang of item.language)
    {
    if(i==0)
    
    alllang+=lang
    else 
    alllang+=', '+lang
    i++
    }
    availLang.textContent=alllang
    title.className="title"
    title.textContent=item.name;
    movieInfo.append(title,category,availLang);
    var img=document.createElement('img');
    var vote=document.createElement('p');
    vote.className="movie-vote";
    vote.innerHTML=`<i class="fa fa-heart" style="color:red;font-size:14px;"></i> &nbsp${item.like}%&nbsp; &nbsp;${item.votes}K&nbsp; Vote`
    img.src=item.poster
    innerDiv.append(img,vote);
    outerDiv.append(innerDiv,movieInfo);
    outerDiv.addEventListener("click",()=>{
       var val =  confirm("Do you want to book tickets for this movie?");
       if(val){
            console.log(item.name);
            localStorage.setItem("movie",JSON.stringify(item.name));
            window.location.href="bookSeats.html";
        
       }
    //  console.log(event.target.parentNode.parentNode);
    })
    return outerDiv;
}
/* Apply Some Filter */
var handleLanguage=()=>
{   
    event.stopImmediatePropagation()
    //event.stopPropagation()
    if(event.target.textContent==""||event.target.textContent=='/n')
    return
   
    let value=Number(event.target.name)
    if(value)
    {
        
        removeFilter("language",event.target.textContent)
        event.target.name=0
       
        
    }
    else if(value==0)
    {
    addFilter("language",event.target.textContent)
    event.target.name=1
   
    }
    selectLanguageBtn(filterObject['language'])
    fetchMovies(filterObject)
    
    
}



var filterObject={
    "language":[],
    "format":[],
    "genres":[]
}
var removeFilter=(key,value)=>
{
    for(let i=0;i<filterObject[key].length;i++)
    {
        if(filterObject[key][i]==value)
        {
            filterObject[key].splice(i,1)
            break;
        }
    }
    
    return
}
var addFilter=(key,value)=>
{
   
    filterObject[key].push(value)
    return
}
var handleFormat=()=>{
   
    event.stopImmediatePropagation()
    event.stopPropagation()
    let value=Number(event.target.name)
    if(value)
    {
        
        removeFilter("format",event.target.textContent)
        event.target.name=0
       
    }
    else if(value==0)
    {
    addFilter("format",event.target.textContent)
    event.target.name=1
   
   
}
fetchMovies(filterObject)

selectFormatBtn(filterObject['format'])
}
var handleGenres=()=>{
    event.stopImmediatePropagation()
    event.stopPropagation()
    if(event.target.textContent==""||event.target.textContent=='\n')
    return
    let value=Number(event.target.name)
    if(value)
    {
        
        removeFilter("genres",event.target.textContent)
        event.target.name=0
        
        
    }
    else if(value==0)
    {
    addFilter("genres",event.target.textContent)
    event.target.name=1
    
    
}
fetchMovies(filterObject)
selectGenresBtn(filterObject['genres'])
}


var createQuery=(query,data,key)=>{
   
for(let item of data)
{
    query+='&'+key+'_like='+item
   
    
}
return query
}
var createParam=(region,filter)=>{
    let query=region
   
   let key;
    for(key in filter)
    {
        if(filter[key].length>0)
        query=createQuery(query,filter[key],key)
    }
    return query
}
//creationg privacy or about
function locationChange(region)
{
    
    let locationEle=document.getElementById('locationChange')
    let loc;
    locationEle.innerHTML=null;
    if(region=="ncr")
    {
        loc='National Capital Region (NCR)'
    locationEle.textContent='Movies In National Capital Region (NCR)'
    }
    else
    {
        loc=region
        locationEle.textContent=`Movies In ${region}`
    }
    let about=`<div>
    <article>
        <h4>Enjoy Online Ticket Booking for Movies in ${loc} With BookMyShow</h4>
        <p>If you are planning for <strong>movie ticket bookings</strong> for the latest movies in ${loc}, dont look any further. Now it is easy to get on with <strong>online ticket
                booking</strong> with BookMyShow. Your one-stop solution for movies to watch
            this weekend. Everyone enjoys watching their favorite movies on the big screen, and the excitement
            of watching it with friends is unparalleled. If you have been eagerly waiting for a movie that you
            can watch with your friends and family,
            now you know where to get the tickets from. When you watch a film ina cinema theatre, you get to
            watch it on a massive screen with surround-sound, and that enhances your movie-watching experience.
            Thus, allowing you to be a part
            of the actual movie. Get to know about <strong>all movies</strong> and <strong> trailers</strong> to
            watch here. Also, know <strong>how to book movie tickets.</strong></p>
    </article>
    <article>
        <h4>Latest Movies To Watch in ${loc} With Family And Friends</h4>
        <p>Each year the cinema worid is enlightened with the latest movie trailers, increasing the excitement
            among everyone. This year, just like the previous year, you have been waiting for some of the
            biggest <strong>Bollywood movies</strong> to be released
            with the biggest star cast. Enjoy your tavourite movie, not just with your friends, but in a cinema
            hall ${loc} that will be filled with like-minded people. Be a part of
            everyone's reaction. Dates are already announced,
            and all you need to do is book the tickets for the preferred date so that you dont end up missing
            the first-day first show! Dont worry we have the list of <strong> near you</strong> and
            <strong>movie showtimes</strong>.</p>
    </article>
    <article>
        <h4>Upcoming Hollywood Movies That You Can't Miss</h4>
        <p>Have you checked out the latest movie reviews of some of the best Hollywood movies ? If so, we bet
            you would want to watch them all in the nearest movie theatre! The Hollywood movies running in
            cinemas now are already making the
            audience want for more, and with the new releases happening in the coming months, we recommend
            booking the tickets now in ${loc}. Check out all the latest movie trailers
            here!</p>
    </article>
    <article>
        <h4>Exciting Tollywood Movies To Book Tickets For</h4>
        <p>Just like Bollywood and Hollywood movies, Tollywood seems to have a few good movie showtimes as well.
            You can plan for movies to watch this Friday with these Tollywood movies because the star cast is
            superb, and the storylines of
            these movies have already started making news. Don't miss any upcoming movies.</p>
    </article>
    <article>
        <h4>The Joy Of Movie Tickets Bookings with Just a Few Clicks</h4>
        <p>Grab on your popcorn because there are many movies to watch today in ${loc}.
            If you want to save some money, don't miss out on our movie offers and discounts. Check out the
            movies running in cinemas time,
            and call all your friends to enjoy the best movie-watching experience together. There are many big
            releases in the pipeline, and it is expected that these movies will have the perfect casting and
            direction. Get ready for upcoming movies in
            theatres.</p>
    </article>
    <article>
        <p>Dont wait anymore and book your movie tickets from BookMyShow today at the best price! Your access to
            your favourite movie in ${loc} is only a click away!</p>
    </article>
    <article id="privacy">
        <h4>Privacy Note</h4>
        <p>By using www.bookmyshow.com(our website), you are Tuly accepting the Privacy Policy avalable at
            https://bookmyshow.com/privacy governing your access to Bookmyshow and provision of services by
            Bookmyshow to you. IT you do
            not accept terms mentioned in the Privacy Policy, you must not share any of your personal
            information and immediately exit Bookmyshow.</p>
    </article>
</div>`
let aboutEle=document.getElementById('about')
aboutEle.innerHTML=about

}
var filterOff=()=>{
    event.stopImmediatePropagation()
 if(event.target.textContent!='clear'&&event.target.parentNode.className=='filter-off')
 {
    let parent=event.target.parentNode
    let firstChild=parent.children[0]
    if(firstChild.className=='angular-filter angular-up')
    {
    parent.children[0].className='angular-filter angular-down'
    parent.children[1].className='one4f'
    parent.parentNode.children[1].className='hidden filter-button'
}
    else{
        parent.children[0].className='angular-filter angular-up'
        parent.children[1].className='one4f filter-color'
        parent.parentNode.children[1].className='visible filter-button'
    }
    
 }
 else if(event.target.textContent=='clear'){
     resetFilter(event.target.parentNode.parentNode)
 }
}



var resetFilter=(target)=>{
let key=target.children[0].children[1].textContent
var key2=target.children[1]
key=key.toLowerCase()

for(let i=0;i<key2.children.length;i++)
{
    key2.children[i].name=0
    
}
filterObject[key]=[]
   
    if(key=='language')
    {
        handleLanguage()
    }
    else if(key=='genres')
    {
    handleGenres()
    
    }
    else
    handleFormat()
}


var createSelectedFilterBtn=(arr,selectedId)=>{
    let container=document.getElementById(selectedId)
    let fragmented=document.createDocumentFragment()
    let items;
    container.innerHTML=null;
    console.log('genres')
    
    container.innerHTML=null;
    let count=0;
    //console.log(Array.isArray(arr))
    for(var item of arr)
    {
        var btn=document.createElement('button')
       
         btn.setAttribute('class','one4f selected-filter')
         btn.name="1"
         btn.style.backgroundColor="#dc3558"
         btn.style.color="white"
         btn.innerHTML=item
         fragmented.append(btn)
    }
    // for(count=0;count<selectedGenres.length;count++);
    // {
    //     const btn=document.createElement('button')
    //     btn.className="one4f filter-color"
    //     btn.innerHTML=selectedGenres[count];
    //     fragmented.append(btn)
        
    // }
    console.log(count)
    container.append(fragmented)
}
var selectGenresBtn=(arr)=>{

    let genresArray=Object.assign([],arr)
//const selectedGenres=[...object]
//console.log(genresArray.length)
genresArray.sort()
createSelectedFilterBtn(genresArray,"selected-genres");
}
var selectLanguageBtn=(arr)=>{
    let languageArray=Object.assign([],arr)
    languageArray.sort()
    console.log(languageArray)
    createSelectedFilterBtn(languageArray,'selected-language')
    removeSelectedLanguage(languageArray)
}
var selectFormatBtn=(arr)=>{
    let formatArray=Object.assign([],arr)
    formatArray.sort()
    createSelectedFilterBtn(arr,'selected-format')
}

window.addEventListener('load',()=>{
    fetchMovies(filterObject)
    var languageBtn=document.getElementById('button-language')
languageBtn.addEventListener('click',handleLanguage)
var genresBtn=document.getElementById('genres')
genresBtn.addEventListener('click',handleGenres)
var formatBtn=document.getElementById('format')
formatBtn.addEventListener('click',handleFormat) 
locationChange(region)
let filter_drop=document.getElementsByClassName('filter-off')
for(let i=0;i<filter_drop.length;i++)
{
    filter_drop[i].addEventListener('click',filterOff)
}
removeSelectedLanguage([])
})

var removeSelectedLanguage=(arr)=>{
    var total=["English","Hindi","kannada","Punjabi","Tamil","Telugu"]
    let set=new Set(arr)
    var container=document.getElementById('button-language2')
    var fragment=new DocumentFragment()
    container.innerHTML=null;
    for(let item of total )
    {
        if(!set.has(item))
        {
            var btn=document.createElement('button')
            btn.className="one4f filter-color"
            btn.textContent=item
            fragment.append(btn)
        }

    }
    container.append(fragment)
}