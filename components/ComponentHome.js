let CardsComponent = document.getElementById('CardsHome');

fetch('http://192.168.1.19/Api-JatNet/getInformationAll.php')
  .then(response => response.json())
  .then(data => document.getElementById('totalShowData').innerHTML = `${data.total}`);

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

var today = new Date();

var hora = today.getHours();

if(hora <= 12) {
	hora = `<ion-icon name="partly-sunny-outline"></ion-icon> Buenos Dias`;
} else if(hora <= 19) {
	hora = `<ion-icon name="sunny-outline"></ion-icon> Buenas tardes`;
} else {
	hora = `<ion-icon name="moon-outline"></ion-icon> Buenas noches`;
}


CardsComponent.innerHTML = `

    <div class="container text-center py-3">
		<img class="imgLogo" src="assets/imgs/jatnetLogo.png">
	</div>
   </ion-grid>
	   <ion-card>
  		<ion-card-header>
    		<ion-card-subtitle class="font-weight-bold text-dark">${hora}</ion-card-subtitle>
    		<ion-card-title class="text-center font-weight-bold"><div id="TimeItem"></div></ion-card-title>
  		</ion-card-header>
	</ion-card>

	 <ion-card>
  		<ion-card-header>
    		<ion-card-subtitle class="font-weight-bold">Repetidores</ion-card-subtitle>
    		<ion-card-title class="text-center font-weight-bold"><div id="totalShowData"></div></ion-card-title>
  		</ion-card-header>
	</ion-card>

	 <ion-card>
  		<ion-card-header>
    		<ion-card-subtitle class="font-weight-bold">Clientes</ion-card-subtitle>
    		<ion-card-title class="text-center font-weight-bold">0</ion-card-title>
  		</ion-card-header>
	</ion-card>
`;
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var day = today.getDate();
  var mes = today.getMonth() + 1;
  var anio = today.getFullYear();
  // add a zero in front of numbers<10
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('TimeItem').innerHTML = `${h}:${m}:${s} - ${day}/${mes}/${anio}`;
  t = setTimeout(function() {
    startTime()
  }, 500);
}
startTime();