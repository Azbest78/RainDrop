var rainDrops = { 
	name : 'rainDrop',
	backgroundURL : 'https://wallpaperaccess.com/full/1861879.jpg',//'https://wallpaperaccess.com/full/389988.jpg',//'https://wallpaperaccess.com/full/475699.jpg', //'https://szkocki.pl/wp-content/uploads/2018/09/Kilchurn-Castle1.jpg', 
	drops : [],
	config : {
		dropSpawnInternal : 800,
		dropMinDisplayTime : 0,
		dropModDisplayTime : 25,
		dropMinFadeOutTime : 0,
		dropModFadeOutTime : 25
	}
};
var fullWidth = window.innerWidth;
var fullHeight = window.innerHeight;
var intervalDrop; // drop spawn interwal object 

 
function startRain(){
	fullWidth = window.innerWidth;
	fullHeight = window.innerHeight;	
	intervalDrop = setInterval(displayRain, rainDrops.config.dropSpawnInternal);
	document.body.style.backgroundImage = "url('" + rainDrops.backgroundURL + "')";
	
	document.getElementById('dropBackgroundUrl').value = rainDrops.backgroundURL
	document.getElementById('dropSpawnInternal').value =  rainDrops.config.dropSpawnInternal;
	document.getElementById('dropMinDisplayTime').value = rainDrops.config.dropMinDisplayTime;
	document.getElementById('dropModDisplayTime').value = rainDrops.config.dropModDisplayTime;
	document.getElementById('dropMinFadeOutTime').value = rainDrops.config.dropMinFadeOutTime;
	document.getElementById('dropModFadeOutTime').value = rainDrops.config.dropModFadeOutTime;
	
	document.getElementById('dropSpawnInternalInp').value = rainDrops.config.dropSpawnInternal;
	document.getElementById('dropMinDisplayTimeInp').value = rainDrops.config.dropMinDisplayTime;
	document.getElementById('dropModDisplayTimeInp').value = rainDrops.config.dropModDisplayTime;
	document.getElementById('dropMinFadeOutTimeInp').value = rainDrops.config.dropMinFadeOutTime;
	document.getElementById('dropModFadeOutTimeInp').value = rainDrops.config.dropModFadeOutTime;
	
	const fileSelector = document.getElementById('file-input').addEventListener('change', readSingleFile, false);
}

function saveRainDrop(){
const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(rainDrops, null, 2)], {
    type: "text/plain"
  }));
  a.setAttribute("download", rainDrops.name + ".json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function setDropSpawnInternal(value){
	rainDrops.config.dropSpawnInternal = value*1;
	document.getElementById('dropSpawnInternalInp').value = value*1;
	refreshRainDropInterval();
}

function setDropMinDisplayTime(value){
	rainDrops.config.dropMinDisplayTime = value*1;
		document.getElementById('dropMinDisplayTimeInp').value = value*1;
}
 
function setDropModDisplayTime(value){
	rainDrops.config.dropModDisplayTime = value*1;
		document.getElementById('dropModDisplayTimeInp').value = value*1;
}

function setDropMinFadeOutTime(value){
	 rainDrops.config.dropMinFadeOutTime = value*1;
	 	document.getElementById('dropMinFadeOutTimeInp').value = value*1;
}

function setDropModFadeOutTime(value){
	rainDrops.config.dropModFadeOutTime = value*1;
		document.getElementById('dropModFadeOutTimeInp').value = value*1;
}



function displayRain(){
		if(rainDrops.drops.length > 0){
		let fontSize = Math.round(Math.random() * 100 + 10);
		setTimeout(removeFadeOut, getDropDisplayTime(fontSize), createDrop(fontSize), getDropFadeOutTime(fontSize));
	}
	
	function getDropDisplayTime(fontSize){
		return (fontSize * rainDrops.config.dropModDisplayTime)*1 + (rainDrops.config.dropMinDisplayTime * 1);
	}

	function getDropFadeOutTime(fontSize){
		return (fontSize * rainDrops.config.dropModFadeOutTime)*1 + (rainDrops.config.dropMinFadeOutTime *1);
	}
	
	function createDrop(fontSize){
		let text = rainDrops.drops[Math.floor(Math.random() * rainDrops.drops.length)]
		.toUpperCase()
		.replace(/(?<=[a-zA-ZąĄęĘżŻźŹćĆńŃłŁóÓ]{2,})\s+(?=[a-zA-[a-zA-ZąĄęĘżŻźŹćĆńŃłŁóÓ])/gm, '<br>');
		
		let drop = document.createElement("div");
		
		drop.id = "div_drop_" + Math.random();
		drop.style.left = Math.round(Math.random() * fullWidth) + "px";
		drop.style.top = Math.round(Math.random() * fullHeight) + "px";
		drop.style.fontSize = fontSize + 'px';
		drop.className = 'drop';
		drop.innerHTML = text;
		document.body.appendChild(drop);

		return drop;
	}
	
	function removeFadeOut(drop, speed) {
		let seconds = speed/1000;
		drop.style.transition = "opacity " + seconds + "s ease, filter " + seconds + "s ease";
		drop.style.opacity = 0;
		drop.style.filter = "blur(10px)";
		setTimeout(function(){ drop.parentNode.removeChild(drop);}, speed);
	}
};

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var content = e.target.result;
	rainDrops = JSON.parse(content);
	refreshDropList();
	refreshRainDropInterval();
	refreshBackground();
	document.getElementById('file-input').value = "";
  };
  reader.readAsText(file);
}



function displayContents(contents) {
  var element = document.getElementById('file-content');
  element.textContent = contents;
}

  
function addDrop(text){
	let textArr = text.split(';');
	
	for (i = 0; i < textArr.length; i++){
		rainDrops.drops.push(textArr[i].trim());
	}
	document.getElementById("inp").value = "";
	refreshDropList();
}

function setRainDropBackgroundUrl(url){
	rainDrops.backgroundURL = url;
	refreshBackground();
}
function refreshBackground(){
	document.body.style.backgroundImage = "url('" + rainDrops.backgroundURL + "')";
}

function refreshDropList(){
	let divDrops = "";
	for (j = 0; j < rainDrops.drops.length; j++){
		divDrops +='<div class="dropList">'+ rainDrops.drops[j] + '</div>';
	}
	document.getElementById("div_drops_list").innerHTML =  divDrops;
}

function refreshRainDropInterval(){
	clearInterval(intervalDrop);
	intervalDrop = setInterval(displayRain, rainDrops.config.dropSpawnInternal);
}