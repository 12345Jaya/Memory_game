// let a=document.getElementById('time')
// let b=new Date().getMinutes()
// let c=b
// if(c<=9) c='0'+c
// a.innerHTML=new Date().getHours()+":"+c;

// -----images-----
const image = [
    "images/bubu1.jpeg",
    "images/bubu3.jpeg",
    "images/bubu4.jpeg",
    "images/bubu5.jpeg",
    "images/bubu6.jpg",
    "images/bubu7.png",
    "images/bubu8.jpg",
    "images/bubu9.jpg",
    "images/bubu10.jpg",
    "images/bubu11.jpg",
    "images/bubu12.jpg",
    "images/bubu13.jpg",
    "images/bubu15.png",
    "images/bubu16.jpg",
    "images/bubu17.png",
    "images/download.png"
];
const ind=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
let img_pos=[]
function shuffle(array){
    for(let i=0;i<array.length;i++){
        let j=Math.floor(Math.random()*16);
        [array[i],array[j]]=[array[j],array[i]];
    }
    return array;
}
function getImages(image,ind){
    console.log("hiiii")
    let mod_images=shuffle(image);
    let mod_ind=shuffle(ind);
    for(let i=0,j=0;i<16,j<8;i+=2,j++){
        let d=document.getElementById('div'+String(mod_ind[i])); 
        let e=document.getElementById('div'+String(mod_ind[i+1]));
        let image1=document.createElement('img')
        let image2=document.createElement('img')
        image1.src=mod_images[j]
        image2.src=mod_images[j]
        d.innerHTML=""
        d.appendChild(image1);
        e.innerHTML=""
        e.appendChild(image2);
    }
}
// -------initial state--------
function fun(){
    temp=[]
    for(let i=1;i<=16;i++){
        let d=document.getElementById('div'+String(i));
        temp.push(d.querySelector('img').getAttribute('src'));
        d.innerHTML='?';
    }
    img_pos=temp
}

// ------game------
let points=0;
function check(a,b){
    if(a.querySelector('img').src==b.querySelector('img').src){
        a.click(false)
        b.click(false)
        points+=20;
        document.getElementById('points_span').innerHTML=points;
    }
    else{
        setTimeout(()=>{
            a.innerHTML="?"
            b.innerHTML="?"
        },1000);
    }
}
function getNum(num){
   let a=num.slice(3)
   console.log(a,typeof a)
   console.log(Number(a),typeof(Number(a)))
   return Number(a)
}
a=[]
let moves=20;
let count_no_of_times=0;
function selectCards(event){
    let d=event.target
    let index=getNum(d.id)
    d.innerHTML=""
    let img=document.createElement('img')
    img.src=img_pos[index-1]
    d.appendChild(img)
    a.push(d)
    if(count_no_of_times%2==0 && a.length==2){
        check(a[0],a[1])
        moves-=2
        a=[]
    }
    document.getElementById('moves_span').innerHTML=moves/2;
}
function Game(){
    let count=30;
    const a=document.getElementsByClassName('cell')
    for(let i=0;i<a.length;i++){
        a[i].onclick=(event) => selectCards(event)
    }
    let timer=setInterval(()=>{
        if(count<10) 
            document.getElementById('time').innerHTML="0"+count+":00";
        else
            document.getElementById('time').innerHTML=count+":00";
        count--;
        if(count<0 || moves<=0 || points==160){
            clearInterval(timer)
            if(points<=40)
                document.body.innerHTML=('<div class="res_div"><h1 class="res_h1">You lost the game!</h1></br><button class="res_btn" onClick="location.reload()">click this to get back</button></div>');
            else if(points==160)
                document.body.innerHTML=('<div class="res_div"><h1 class="res_h1">Excellent, you have great memory!</h1></br><button class="res_btn" onClick="location.reload()">click this to get back</button></div>');
            else
                document.body.innerHTML=(`<div class="res_div"><h1 class="res_h1">Congratulations! You got ${points} points.</h1></br><button class="res_btn" onClick="location.reload()">click this to get back</button></div>`);
        }
    },1000)
}

document.getElementById('start').addEventListener('click',
    ()=> {
        alert(' Game started! \n You have 10 moves and 30 seconds time. \n If you select the same cards you gain 20 points. \n If you get less than 40 points you will loose')
        getImages(image,ind);
        setTimeout(()=>fun(),2000);
        Game();
    }
);
document.getElementById('stop').addEventListener('click',
    ()=>location.reload()
);