/* ----------- Carosel ----------------  */
let currSliding = 0;


let SlidingStreamcontainer = document.getElementById('inner-stream')

let totalSliding = SlidingStreamcontainer.children.length;

// const reachingEndingSlide=()=>{
//     if(currSliding>=totalSliding)
//     return
// if(currSliding<totalSliding)
// SlidingStreamcontainer.children[currSliding].style.display="none"
// currSliding--;

// console.log(currSliding)
// SlidingStreamcontainer.children[currSliding].style.display="flex"


// }

// const reachingBeginningSlide=()=>{

//     if(currSliding>-1)
//     SlidingStreamcontainer.children[currSliding].style.display="none"
//     console.log(currSliding)
//     currSliding++;


//     SlidingStreamcontainer.children[currSliding].style.display="flex"


//     }


// // const caroselWindow=async (val)=>{
// //     try{
// //     SlidingStreamcontainer.children[currSliding].style.display="none"
// //     currSliding+=val
// //     if(currSliding==totalSliding)
// //     {

// //         let id=await setInterval(async ()=>{

// //             await reachingEndingSlide()
// //             if(currSliding==0)
// //             clearInterval(id)

// //         },200)
// //     }
// //     else if(currSliding<0)
// //     {
// //         let ids=await setInterval(async ()=>{
// //             if(currSliding==17)
// //             clearInterval(ids)
// //             await reachingBeginningSlide()
// //         },200)
// //     }
// //     else
// //     {
// //     SlidingStreamcontainer.children[currSliding].style.display="flex";

// //     }
// //     }


// // catch(e)
// // {
// //     console.log(e)
// // }


// }

/* Carosel Window  for next btn */
let nextSliding = 1;
const reachingEndingSlide = () => {

    SlidingStreamcontainer.children[currSliding].style.display = "none"
    currSliding--;
    nextSliding--;
    console.log(currSliding)
    SlidingStreamcontainer.children[currSliding].style.display = "flex"


}


const caroselWindow = async () => {
    try {
        if (nextSliding >= totalSliding) {
            let id = await setInterval(async () => {
                if (nextSliding == 1)
                    clearInterval(id)
                else {
                    reachingEndingSlide()
                }
            }, 150)
        }
        else {
            SlidingStreamcontainer.children[currSliding].style.display = "none"
            SlidingStreamcontainer.children[nextSliding].style.display = "flex"
            currSliding = nextSliding;
            nextSliding++;
        }
    }
    catch (e) {
        console.log(e)
    }
}

/*  for previous btn*/

const reachingBeginningSlide = () => {
    SlidingStreamcontainer.children[currSliding].style.display = "none"
    currSliding++;

    SlidingStreamcontainer.children[nextSliding].style.display = "flex"
    nextSliding++;
    console.log(nextSliding)
}

const prevCaroselWindow = async () => {
    try {

        if (currSliding <= 0) {

            let prevId = await setInterval(async () => {
                if (nextSliding >= totalSliding) {
                    clearInterval(prevId)
                }
                else
                    await reachingBeginningSlide()
            }, 150)
        }
        else {
            SlidingStreamcontainer.children[currSliding].style.display = "none"
            currSliding--;
            nextSliding--;
            SlidingStreamcontainer.children[currSliding].style.display = "flex"
        }
    }
    catch (e) {
        console.log(e)
    }
}

/* Carosole Button-show*/
let automateId = setInterval(caroselWindow, 2500)
const showCaroselBtn = () => {

    Cstatus = 1
    document.getElementById('a-next-btn').style.display = "block"
    document.getElementById('a-prev-btn').style.display = "block"

}
const hiddenCaroselBtn = () => {
    Cstatus = 0
    document.getElementById('a-next-btn').style.display = "none"
    document.getElementById('a-prev-btn').style.display = "none"
    // document.getElementById('a-next-btn').removeEventListener('click')
    // document.getElementById('a-prev-btn').removeEventListener('click')


}
const caroselContainer = document.getElementById('carosel')
caroselContainer.addEventListener('mouseover', showCaroselBtn)
caroselContainer.addEventListener('mouseout', hiddenCaroselBtn)

const nextCaroselBtn = document.getElementById('a-next-btn')
nextCaroselBtn.addEventListener('click', async () => {
    clearInterval(automateId)
    await caroselWindow()
    automateId = await setInterval(caroselWindow, 2500)
})

const prevCaroselBtn = document.getElementById('a-prev-btn')
prevCaroselBtn.addEventListener('click', async () => {

    clearInterval(automateId)
    await prevCaroselWindow()
    automateId = await setInterval(caroselWindow, 2500)
})