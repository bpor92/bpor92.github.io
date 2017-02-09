const submit = document.querySelector('#save');
const history = document.querySelector('#history');
const inputs = Array.from(document.querySelectorAll('input'));
let factures, formIsValid, time;





function getTime(){

	function addZero(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}

	const date = new Date();
	const hour = addZero(date.getHours());
	const minutes = addZero(date.getMinutes());
	const seconds = addZero(date.getSeconds());

	const month = addZero(date.getUTCMonth() + 1); //months from 1-12
	const day = addZero(date.getUTCDate());
	const year = date.getUTCFullYear();
	time =  year + "/" + month + "/" + day + " " + hour + ':' + minutes + ':' + seconds;
}


let isValid = {
	costumerName: false,
	costumerSurname: false,
	costumerStreet: false,
	costumerCity: false,
	costumerPostal: false,
	corporationName: false,
	corporationStreet: false,
	corporationCity: false,
	corporationPostal: false,
	corporationId: false,
	price: false
};


function saveFacture(e){
	const costumerName = document.querySelector('#costumerName').value;
	const costumerSurname = document.querySelector('#costumerSurname').value;
	const costumerStreet = document.querySelector('#costumerStreet').value;
	const costumerCity = document.querySelector('#costumerCity').value;
	const costumerPostal = document.querySelector('#costumerPostal').value;

	const corporationName = document.querySelector('#corporationName').value;
	const corporationStreet = document.querySelector('#corporationStreet').value;
	const corporationCity = document.querySelector('#corporationCity').value;
	const corporationPostal = document.querySelector('#corporationPostal').value;
	const corporationId = document.querySelector('#corporationId').value;

	const statusExposed = document.querySelector('#status-exposed').checked;
	const statusDelivered = document.querySelector('#status-delivered').checked;
	const statusPaid = document.querySelector('#status-paid').checked;
	const statusLate = document.querySelector('#status-late').checked;

	const costumerForm = document.querySelector('#costumerForm');
	const corporationForm = document.querySelector('#corporationForm');
	const priceForm = document.querySelector('#priceForm');

	const price = document.querySelector('#price').value;
	const id = chance.guid();
	getTime();
	const facture = {
		costumerName: costumerName,
		costumerSurname: costumerSurname,
		costumerStreet: costumerStreet,
		costumerCity: costumerCity,
		costumerPostal: costumerPostal,
		corporationName: corporationName,
		corporationStreet: corporationStreet,
		corporationCity: corporationCity,
		corporationPostal: corporationPostal,
		corporationId: corporationId,
		status: status,
		price: price,
		id: id,
		time: time
	}
	console.log(facture);
	if(formIsValid === true){
		console.log('w srodku ifa formIsValid', isValid);

		var radioButtons = Array.from($('input:radio'));
		radioButtons.forEach(radio => {
			if(radio.checked === true){
				facture.status = radio.parentElement.innerText;	
			}
		});
		facture.time = time;
		factures.push(facture);
		localStorage.setItem('factures', JSON.stringify(factures));
		costumerForm.reset();
		corporationForm.reset();
		priceForm.reset();
		clearInputs(e);
		formIsValid = false;
		loadHistory();
	}else{
		console.log('prosze poprawnie wypelnic formularz');
	}
	e.preventDefault();
}

function loadHistory(){
	history.innerHTML = '';
	if(localStorage.getItem('factures')){
		factures = JSON.parse(localStorage.getItem('factures'));

		factures.forEach(factur => {
			history.innerHTML += `
			<div class="row justify-content-center">

				<div class="jumbotron history-content col-sm-12 col-md-6">
					<span class="badge badge-default time">${factur.time}</span><br/>
					<span class="history-data">Klient: </span> ${factur.costumerName} ${factur.costumerSurname} <br/>
					<span class="history-data">Firma: </span> ${factur.corporationName}, ${factur.corporationCity} ${factur.corporationStreet} <br/>
					<span class="history-data">Status: </span> ${factur.status}<br/>
					<span class="history-data">Kwota: </span> ${factur.price} zł<br/>
					<span class="history-data">ID faktury: </span> ${factur.id} <br/> 
					<button class="btn btn-danger" onclick="deleteFacture('${factur.id}')">Usuń fakture</button>
				</div>
			</div>
		`
		})
		
	}else{
		factures = [];
	}
}

function deleteFacture(id){
	for(var i = 0; i < factures.length; i++){
		if(factures[i].id == id){
			factures.splice(id, 1);
		}
	}
	localStorage.setItem('factures', JSON.stringify(factures));
	loadHistory();
}

function validate(e){
	if(e.target.id === 'costumerPostal' || e.target.id === 'corporationPostal'){
		const postValidation = /^\d\d-\d\d\d$/;
		validateInput(postValidation, e);
	}else if(e.target.id === 'costumerName' || e.target.id === 'costumerSurname' || e.target.id === 'costumerCity' || e.target.id === 'corporationCity'){
		const stringValidation = /^[a-zA-Z]+$/;
		validateInput(stringValidation, e);
	}else if(e.target.id === 'corporationName' || e.target.id === 'corporationStreet' || e.target.id === 'costumerStreet' ){
		const corporationNameValidation = /^[a-zA-Z\0-9]+$/;
		validateInput(corporationNameValidation, e);
	}else if(e.target.id === 'corporationId'){
		const idValidation = /^\d\d\d-\d\d\d-\d\d-\d\d$/;
		validateInput(idValidation, e);
	}else if(e.target.id === 'price'){
		const priceValidation = /^[0-9]+$/;
		validateInput(priceValidation, e);
	}
}

function validateInput(input, e){
	if(input.test(e.target.value)){
		$(e.target).parent().parent().removeClass('has-danger');
		$(e.target).parent().parent().addClass('has-success');
		$(e.target).parent().siblings().last().css('display', 'none');
		$('.'+e.target.className).addClass('form-control-success');
		for(var property in isValid){
			if(property === e.target.id){
				isValid[e.target.id] = true;
			}
		}
	}else if(e.target.value == ""){
		$(e.target).parent().parent().removeClass('has-danger');
		$(e.target).parent().parent().removeClass('has-success');
		$(e.target).parent().siblings().last().css('display', 'none');
		for(var property in isValid){
			if(property === e.target.id){
				isValid[e.target.id] = false;
			}
		}
	}else{
		$(e.target).parent().parent().removeClass('has-success');
		$(e.target).parent().parent().addClass('has-danger');
		$(e.target).parent().siblings().last().css('display', 'block');
		$('.'+e.target.className).removeClass('form-control-success');
		for(var property in isValid){
			if(property === e.target.id){
				isValid[e.target.id] = false;
			}
		}
	}

	var keys = Object.keys(isValid);
	let status = 1;
	for(var i = 0; i < keys.length; i++){
	    var val = isValid[keys[i]];
		if (val === false) {
            status = 0;
        }
	}

	if(status ==  0){
	    formIsValid = false;
	} else{
	    formIsValid = true;
	}
}

function clearInputs(e){
	var inputText = Array.from($('input:text'));
	inputText.forEach(input => {
		$(input).parent().parent().removeClass('has-danger');
		$(input).parent().parent().removeClass('has-success');
		$(input).parent().siblings().last().css('display', 'none');
	})
}
	

loadHistory();
submit.addEventListener('click', saveFacture);
inputs.forEach(input => { input.addEventListener('input', _.debounce(validate, 1))});





