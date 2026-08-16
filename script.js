const screens = {
  question: document.getElementById("questionScreen"),
  date: document.getElementById("dateScreen"),
  meal: document.getElementById("mealScreen"),
  confirm: document.getElementById("confirmScreen"),
  final: document.getElementById("finalScreen")
};

const state = { date:"", time:"", meal:"" };

function show(name){
  Object.values(screens).forEach(s=>s.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}

const noBtn = document.getElementById("noBtn");
const tease = document.getElementById("tease");
let noAttempts = 0;

function dodge(){
  noAttempts++;
  const messages = [
    "Hmm… that button seems shy. 😂",
    "Nice try. 😌❤️",
    "I think you meant YES.",
    "The universe says try again. 😂",
    "Okay, I'm taking that as a yes. 🥹❤️"
  ];
  tease.textContent = messages[Math.min(noAttempts-1,messages.length-1)];
  const x = Math.round((Math.random()-.5)*150);
  const y = Math.round((Math.random()-.5)*55);
  noBtn.style.transform = `translate(${x}px,${y}px)`;
}
noBtn.addEventListener("mouseenter", dodge);
noBtn.addEventListener("touchstart", e => { e.preventDefault(); dodge(); });
noBtn.addEventListener("click", e => { e.preventDefault(); dodge(); });

document.getElementById("yesBtn").addEventListener("click",()=>show("date"));

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth()+1).padStart(2,"0");
const dd = String(today.getDate()).padStart(2,"0");
dateInput.min = `${yyyy}-${mm}-${dd}`;

document.getElementById("toMealBtn").addEventListener("click",()=>{
  const err=document.getElementById("dateError");
  if(!dateInput.value || !timeInput.value){err.textContent="Choose a date and time first ❤️";return;}
  state.date=dateInput.value; state.time=timeInput.value; err.textContent="";
  show("meal");
});

document.querySelectorAll(".meal").forEach(card=>{
  card.addEventListener("click",()=>{
    document.querySelectorAll(".meal").forEach(c=>c.classList.remove("selected"));
    card.classList.add("selected");
    document.getElementById("customMeal").value="";
    state.meal=card.dataset.meal;
  });
});

document.getElementById("customMeal").addEventListener("input",e=>{
  const value=e.target.value.trim();
  if(value){
    document.querySelectorAll(".meal").forEach(c=>c.classList.remove("selected"));
    state.meal=value;
  }
});

function prettyDate(v){
  return new Intl.DateTimeFormat("en-NG",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(new Date(v+"T00:00:00"));
}
function prettyTime(v){
  return new Intl.DateTimeFormat("en-NG",{hour:"numeric",minute:"2-digit",hour12:true}).format(new Date("2000-01-01T"+v));
}

document.getElementById("toConfirmBtn").addEventListener("click",()=>{
  const err=document.getElementById("mealError");
  if(!state.meal){err.textContent="You have to choose what we're eating. 😌❤️";return;}
  err.textContent="";
  document.getElementById("summaryDate").textContent=prettyDate(state.date);
  document.getElementById("summaryTime").textContent=prettyTime(state.time);
  document.getElementById("summaryMeal").textContent=state.meal;
  show("confirm");
});

document.getElementById("backBtn").addEventListener("click",()=>show("meal"));

document.getElementById("confirmBtn").addEventListener("click",()=>{
  document.getElementById("finalDate").textContent=prettyDate(state.date);
  document.getElementById("finalTime").textContent=prettyTime(state.time);
  document.getElementById("finalMeal").textContent=state.meal;
  show("final");
  launchConfetti();
});

function launchConfetti(){
  const box=document.getElementById("confetti");
  box.innerHTML="";
  for(let i=0;i<42;i++){
    const piece=document.createElement("i");
    piece.style.left=Math.random()*100+"%";
    piece.style.top=(-Math.random()*40)+"px";
    piece.style.animationDelay=(Math.random()*1.2)+"s";
    piece.style.transform=`rotate(${Math.random()*360}deg)`;
    box.appendChild(piece);
  }
}
