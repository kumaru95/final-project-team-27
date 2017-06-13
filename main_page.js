var allElems = [];

function showUploadModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var uploadModal = document.getElementById('upload-modal');

  modalBackdrop.classList.remove('hidden');
  uploadModal.classList.remove('hidden');

}

function closeUploadModal() {

  var modalBackdrop = document.getElementById('modal-backdrop');
  var uploadModal = document.getElementById('upload-modal');

  modalBackdrop.classList.add('hidden');
  uploadModal.classList.add('hidden');

  clearInputValues();

}

function clearInputValues() {

  var inputElems = document.getElementsByClassName('input-element');
  for (var i = 0; i < inputElems.length; i++) {
	var input = inputElems[i].querySelector('input, textarea');
    input.value = '';
  }
}

/*Handlebars Implementation:
 *
 * function generateNewElem(pictureURL, captionText, authorText) {
 *
 * var cardTemplate = Handlebars.templates.card;
 * var cardData = {
 * picture: pictureURL
 * caption: captionText,
 * author: authorText
 * };
 *
 * return cardTemplate(cardData);
 *
 * }
*/

//Non-handlebars implementation:
function generateNewElem(pictureURL, captionText, authorText) {

	console.log(captionText);
	console.log(authorText);

	var cardContainer = document.getElementsByClassName('card-container')[0];
	var newCard = document.createElement('article');
	var newCardPic = document.createElement('div');
	var newCardPicPar = document.createElement('p');
	var newCardPicURL = document.createElement('IMG');
	var newCardContent = document.createElement('div');
	var newCardCaptionBox = document.createElement('p');
	var newCardCaption = document.createElement('a');
	var newCardAuthor = document.createElement('p');
		
	newCard.className = 'card';
	newCardContent.className = 'content';
	newCardCaption.textContent = captionText;
	newCardCaption.href = '#';
	newCardCaptionBox.className = 'caption';
	newCardAuthor.textContent = authorText;
	newCardAuthor.className = 'author';
	newCardPic.className = 'thumbnail';
	newCardPicURL.src = pictureURL;
	newCardPicURL.id = "image";
	
	console.log(newCardCaption.textContent);
	console.log(newCardAuthor.textContent);
		
	cardContainer.appendChild(newCard);
		newCard.appendChild(newCardPic);
			newCardPic.appendChild(newCardPicPar);
				newCardPicPar.appendChild(newCardPicURL);
		newCard.appendChild(newCardContent);
			newCardContent.appendChild(newCardCaptionBox);
				newCardCaptionBox.appendChild(newCardCaption);
			newCardContent.appendChild(newCardAuthor);
}


function insertNewCard() {
	
	var pictureURL = document.getElementById('picture').value;
	var caption = document.getElementById('text-input').value;
	var author = document.getElementById('author-input').value;

	if (pictureURL && caption && author) {

		//Handlebars Implementation:
		//var newElem = generateNewElem(twitText, twitAttribution);
		//var cardContainer = document.querySelector('.card-container');
		//cardContainer.insertAdjacentHTML('beforeend', newElem);
		//allElems.push(newElem);
	  
		generateNewElem(pictureURL, caption, author);

		closeUploadModal();

	} else {

		alert('Specify all fields');

	}
}

function doCardSearch() {

	var searchText = document.getElementById('navbar-search-input');
	var cards = document.getElementsByClassName('card');
	var cardContainer = document.getElementsByClassName('card-container')[0];

	for (i = 0; i < cardContainer.childElementCount; i++)
	{
		var caption = document.getElementsByClassName('caption')[i].textContent;
		var author = document.getElementsByClassName('author')[i].textContent;
			
		var n1 = caption.includes(searchText.value);
		var n2 = author.includes(searchText.value);
			
		console.log(searchText.value + '\n' + caption + '\n' + author + '\n' + n1 + '\n' + n2);
			
		if (!n1 && !n2) cards[i].style.display = 'none';
		else if (cards[i].style.display == 'none') cards[i].style.display = 'flex';
	}
}



window.addEventListener('DOMContentLoaded', function () {

  var elemsCollection = document.getElementsByClassName('card');
  for (var i = 0; i < elemsCollection.length; i++) {
    allElems.push(elemsCollection[i]);
  }

  var uploadButton = document.getElementById('upload');
  uploadButton.addEventListener('click', showUploadModal);

  var modalCloseButton = document.getElementsByClassName('modal-close-button')[0];
  modalCloseButton.addEventListener('click', closeUploadModal);

  var modalCancelButton = document.getElementsByClassName('modal-cancel-button')[0];
  modalCancelButton.addEventListener('click', closeUploadModal);

  var modalAcceptButton = document.getElementsByClassName('modal-accept-button')[0];
  modalAcceptButton.addEventListener('click', insertNewCard);

  var searchButton = document.getElementById('navbar-search-button');
  searchButton.addEventListener('click', doCardSearch);

  var searchInput = document.getElementById('navbar-search-input');
  searchInput.addEventListener('input', doCardSearch);

});