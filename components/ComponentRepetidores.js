let Repetidor = document.getElementById('ItemRepetidor');

function getListRepetidores() {
fetch('http://192.168.1.19/Api-JatNet/PasswordsRepetidores.php')
.then(response => response.json())
.then(data => {
    for (let ItemData of data) {
        let NombreRepetidor = Array(ItemData.nombre_repetidor);
        let PasswordRepetidor = ItemData.password_repetidor;
        let UbicacionRepetidor = ItemData.ubicacion_repetidor;
        let IdUbicacion = ItemData.id_repetidor;
        let itemIon = document.querySelector('ion-list');
        itemIon.innerHTML += `
				<ion-card>
					<ion-card-title><ion-item class="font-weight-bold">${NombreRepetidor}</ion-item></ion-card-title>
 			 			<ion-card-header>
    						<ion-card-subtitle><strong>Contraseña:</strong> ${PasswordRepetidor}</ion-card-subtitle>
    						<ion-card-subtitle><strong>Ubicacion:</strong> ${UbicacionRepetidor}</ion-card-subtitle>
  						</ion-card-header>
               <ion-grid>
                <ion-row>
                 <ion-col>
                  <ion-button expand="full" color="danger" id="getDeleteItem" onclick="getIdItem(${idItem});" shape="round">Eliminar</ion-button>
                </ion-col>
                </ion-row>
              </ion-grid>
				</ion-card>
		`;



        let ButtonDelete = document.getElementById('getDeleteItem');
        
        let getIdItem  = (id) => {
          console.log(id);
        }

    }




    const searchbar = document.querySelector('ion-searchbar');
    const items = Array.from(document.querySelector('ion-list').children);
    searchbar.addEventListener('ionInput', handleInput);



    function handleInput(event) {
        const query = event.target.value.toLowerCase();
        requestAnimationFrame(() => {
            items.forEach(item => {
                const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
                item.style.display = shouldShow ? 'block' : 'none';
            });
        });
    }
});
}



getListRepetidores();




// Component Add
customElements.define('modal-content', class ModalContent extends HTMLElement {
      connectedCallback() {
        this.innerHTML = `
          <ion-header translucent>
            <ion-toolbar>
              <ion-title>Agregar Repetidor</ion-title>
              <ion-buttons slot="end">
                <ion-button onclick="dismissModal()">Cerrar</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content fullscreen>
            <ion-list>
              <ion-grid>
            <ion-col>
               <div class="container">
                 <form id="FormAddRepetidor">
              <div class="mb-3">
                <label for="Nombre" class="form-label">Nombre del Repetidor</label>
                <input type="text" name="nombre" class="form-control" id="NombreRepetidor" required>
              </div>
              <div class="mb-3">
                <label for="Contraseña" class="form-label">Contraseña del Repetidor</label>
                <input type="text" name="password" class="form-control" id="PasswordRepetidor" required>
              </div>
              <div class="mb-3">
                <label for="Ubicacion" class="form-label">Ubicacion del Repetidor</label>
                <input type="text" name="ubicacion" class="form-control" id="UbicacionRepetidor" required>
              </div>
              <button type="submit" class="btn btn-success btn-block">Agregar</button>
        </form>
      </div>
          </ion-col>
          </ion-grid>
            </ion-list>
          </ion-content>
        `;

        // Add Repetidor
        document.getElementById('FormAddRepetidor').addEventListener("submit", function(e) {
            e.preventDefault();
            let nombreRepetidor = document.getElementById('NombreRepetidor').value;
            let PasswordRepetidor = document.getElementById('PasswordRepetidor').value;
            let UbicacionRepetidor = document.getElementById('UbicacionRepetidor').value;
            let addDataRepetidor = new XMLHttpRequest();
            addDataRepetidor.open('POST', `http://192.168.1.19/Api-JatNet/addInformationRepetidor.php?nombre=${nombreRepetidor}&password=${PasswordRepetidor}&ubicacion=${UbicacionRepetidor}`);
            addDataRepetidor.send();
            addDataRepetidor.onreadystatechange = function() { //Call a function when the state changes.
                if (addDataRepetidor.readyState == 4 && addDataRepetidor.status == 200) {
                    if (addDataRepetidor.responseText === "OK") {
                        currentModal.dismiss().then(() => { currentModal = null; });
                        document.getElementById('ListRepetidores').innerHTML = "";
                        getListRepetidores();
                    } else {
                        alert("Ocurrio un error");
                    }
                }
            }
        }, false);
      }
    });


    let currentModal = null;
    const button = document.querySelector('ion-button');
    button.addEventListener('click', createModal);

    async function createModal() {
      const modal = await modalController.create({
        component: 'modal-content'
      });

      await modal.present();
      currentModal = modal;
    }

    function dismissModal() {
      if (currentModal) {
        currentModal.dismiss().then(() => { currentModal = null; });
      }
    }
	// End Component Add
