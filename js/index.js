const inputBox = document.querySelector('.inputField input');
const addBtn = document.querySelector('.inputField button');
const ShowList = document.querySelector('.todoList')
const deleteAllBtn = document.querySelector('.footer button')
const showTime = document.querySelector('.timeline');

//시간 함수
function getTime(){
    const date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = false

    if(hour > 12){
        time = true;
        hour -= 12;
    }

    hour = hour < 10 ? '0' + hour : hour;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    showTime.innerHTML = `${hour}시 ${minutes}분 ${seconds}초 `

    const span = document.createElement('span');
    if(time == true){
        span.innerText = "pm"
        showTime.appendChild(span)
    }else{
        span.innerText = "am"
        showTime.appendChild(span)
    }
}
//time init 함수
function timeInit(){
    getTime();
    setInterval(getTime , 1000)
}

//add btn 함수
function AddBtnActive(Date , Btn){
    if(Date.trim() != 0){
        Btn.classList.add('active');
    }else{
        Btn.classList.remove('active');
    }
}

//delete btn 함수
function DeleteBtnActive(Arr , Btn){
    if(Arr.length > 0){
        Btn.classList.add('active')
    }else{
        Btn.classList.remove('active')
    }
}

//input keyUp
inputBox.addEventListener('keyup' , function(){
    const UserDate = inputBox.value;
    AddBtnActive(UserDate , addBtn)
})

//localstorage key
const LocalKey = "New Todo"
const LOCALSTORAGE =  localStorage
//localstorage 값 배열
let arrList = [];


function IFlocalStorage(getLocalStorage , arrList){
    if(getLocalStorage == null){
        arrList
    }else{
        arrList = JSON.parse(getLocalStorage)
    }
}

//delete btn 
deleteAllBtn.addEventListener('click' , function(){
    arrList;
    LOCALSTORAGE.setItem(LocalKey,JSON.stringify(arrList))
    showList();
})


//add btn
addBtn.addEventListener('click' , function(){
    const UserDate = inputBox.value;
    let getLocalStorage = LOCALSTORAGE.getItem(LocalKey);

    IFlocalStorage();
    
    arrList.push(UserDate);
    LOCALSTORAGE.setItem(LocalKey , JSON.stringify(arrList))

    showList();
    addBtn.classList.remove('active');
})

//showList 함수 
function showList(){
    let getLocalStorage = LOCALSTORAGE.getItem(LocalKey);

    IFlocalStorage();

    const pendding = document.querySelector('.panding')
    pendding.textContent = arrList.length;


    DeleteBtnActive(arrList , deleteAllBtn)

    let NewLitag = '';
    arrList.forEach((element , index) => {
        NewLitag += `<li onclick="LiDelete(${index})">${element}<span><i class="fas fa-trash"></i></span></li>`
    })

    ShowList.innerHTML = NewLitag //list localstorage 저장하고 로드해서 뿌리기
    inputBox.value = "";
}


//delete 함수
function LiDelete(index){
   
    let getLocalStorage = LOCALSTORAGE.getItem(LocalKey);

    arrList = JSON.parse(getLocalStorage)
    arrList.splice(index , 1);
    if(confirm('정말로 삭제 하시겠습니까?') === false){
        return false
    }
    LOCALSTORAGE.setItem(LocalKey,JSON.stringify(arrList))
    showList();
}   

//실행 코드
(function(){
    timeInit()
    showList();
})()