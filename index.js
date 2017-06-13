

        //function to search on search button click
        function search(){
            var substring = search_field.value;
            var articles = document.getElementsByClassName("twit-content");
            [...document.getElementsByClassName('twit-content')].forEach(function(item, index){
                var a = item.innerText.includes(substring);
                console.log(a);
                if(!a){
                    item.parentNode.remove();
                }
            })
        }

        // Get the modal
        var modal = document.getElementById('create-twit-modal');

        // Get the button that opens the modal
        var btn = document.getElementById("create-twit-button");

        // Get the <span> element that closes the modal
        var modal_close = document.getElementsByClassName("modal-close-button")[0];
        // Get the cancel button
        var modal_cancel_btn = document.getElementsByClassName("modal-cancel-button")[0];

        // Get the create-twit button
        var modal_create_twit = document.getElementsByClassName("modal-accept-button")[0];

        // Get the input author field
        var modal_input_author = document.getElementById("twit-attribution-input");

        // Get the twit text field
        var modal_input_text = document.getElementById("twit-text-input");

         // Get the search button
        var search_button = document.getElementById("navbar-search-button");

        // Get the search field
        var search_field = document.getElementById("navbar-search-input");



        // When the user clicks the button, open the modal 
        btn.onclick = function() {
            modal.style.display = "block";
        }

        // When the user clicks on <span> (x) or cancel button, close the modal
        modal_close.onclick = function() {
            modal.style.display = "none";
            modal_input_text.value = "";
            modal_input_author.value = "";
        }
        modal_cancel_btn.onclick = function() {
            modal.style.display = "none";
            modal_input_text.value = "";
            modal_input_author.value = "";
        }

        //search button click event
        search_button.onclick = function() {
            search();
        }


        //When user clicks on create-twit button
        modal_create_twit.onclick = function() {
            //if any input fields are blank, alert !
            if(modal_input_text.value == "" || modal_input_author.value == ""){
                alert("fields are blank !");
                return;
            }

            //ARTICLE div
            var x = document.createElement("ARTICLE");
            x.className = "twit";

            //icon div
            var icon_div = document.createElement('div');
            icon_div.className = 'twit-icon';
            var icon = document.createElement('i');
            icon.className = "fa fa-bullhorn";
            icon_div.appendChild(icon);
            x.appendChild(icon_div);

            //twit-content div
            var content_div = document.createElement('div');
            content_div.className = 'twit-content';
            var p1 = document.createElement('p');
            p1.className = "twit-text";
            var node1 = document.createTextNode(modal_input_text.value);
            p1.appendChild(node1);
            var p2 = document.createElement('p');
            p2.className = "twit-attribution";
            var node2 = document.createTextNode(modal_input_author.value);
            p2.appendChild(node2);
            content_div.appendChild(p1);
            content_div.appendChild(p2);
            x.appendChild(content_div);
            document.getElementsByClassName("twit-container")[0].appendChild(x);


            //hide the modal
            modal.style.display = "none";

            //remove values from modal fields
            document.getElementById("twit-attribution-input").value = "";
            document.getElementById("twit-text-input").value = "";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }


