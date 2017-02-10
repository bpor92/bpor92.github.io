const submit = document.querySelector('#bookmark-form');
const result = document.querySelector('#bookmarks-result');
let bookmarkList;


function saveBookmark(e){
	const siteName = document.querySelector('#site-name-input').value;
	const siteUrl = document.querySelector('#site-url-input').value;

	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	bookmarkList.push(bookmark);
	console.log(bookmarkList);
	localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
	getItem();
	showResult();
	this.reset();
	e.preventDefault();

}

function getItem(){
	result.innerHTML = '';
	if(localStorage.getItem('bookmarkList')){
		bookmarkList = JSON.parse(localStorage.getItem('bookmarkList'));
	}else{
		bookmarkList = [];
	}
}

function showResult(){

	for(var i = 0; i < bookmarkList.length; i++){
		var name = bookmarkList[i].name;
		var url = bookmarkList[i].url;
		result.innerHTML += `
		<div class="jumbotron">
			<div class="panel panel-primary">
				<div class="panel-heading text-center">${name}</div>
				<div class="panel-body">Adres URL: <a href="${url}">${url}</a></div>
			</div>
			<button class="btn btn-danger" onclick="deleteBookmark('${name}')">Delete</button>
		</div>
		`;
	}
}

function deleteBookmark(name){

	for(var i = 0; i < bookmarkList.length; i++){
		if(bookmarkList[i].name == name){
			bookmarkList.splice(i, 1);
		}
	}
	localStorage.setItem('bookmarkList', JSON.stringify(bookmarkList));
	getItem();
	showResult();
}




//execute function
getItem();
showResult()
//define events
submit.addEventListener('submit', saveBookmark);

