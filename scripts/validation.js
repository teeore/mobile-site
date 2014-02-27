//create addLoadEvent() if it does not exist
if(typeof(addLoadEvent)!='function'){

	function addLoadEvent(func) {
	  var oldonload = window.onload;
	  if (typeof window.onload != 'function') {
		window.onload = func;
	  } else {
		window.onload = function() {
		  oldonload();
		  func();
		}
	  }
	}

}

//check if the node is a correct form element
function checkTagNode(node){
	//console.log(typeof(node) + node.tagName);
	if(typeof(node)=='object' && (node.tagName=='INPUT' || node.tagName=='SELECT')){
		return true;
	}
	return false;
}

//convert node list to array
function nodeListToArray(nodelist){
	var ary = [];
	for(var i=0; i<nodelist.length; i++){
		ary.push(nodelist[i]);
	}
	return ary;
}

function isRequired(node){

	var type = node.getAttribute('type');
	var className = node.className;

	//console.log(type + '-' + className);

	if(type == 'hidden' || 
		type == 'submit' || 
		type == 'image' ||
		className.match(/^ *([\w-]+ +)*notrequired( +[\w-]+)?/)
		){
		return false;
	}

	return true;
}

function doSubmit() {
 
 var form_nodelist=document.getElementsByTagName('form');

 for(var i=0; i<form_nodelist.length; i++){
	var f=form_nodelist[i];

	if(checkTagNode(f.email)){

		//console.log(f.email);
		//console.log(f.email.tagName);
		//console.log(typeof(f.email));	

		f.onsubmit = function(){
			var field_ary = nodeListToArray(this.getElementsByTagName('input'));
			var select_ary = nodeListToArray(this.getElementsByTagName('select'));
			var dob,theMonth,theDay;
			
			field_ary = field_ary.concat(select_ary);
			//field_nodelist = appendNodelist(field_nodelist, select_nodelist);

			for(var j=0; j<field_ary.length; j++){
				var field = field_ary[j];
				var name = field.getAttribute('name');
				var val = field.value;
				
				//console.log(name + '-' + val);

				if(isRequired(field)){
					switch(name){
						case 'email':
							if(!val.match(/^\S+@\S+\.\S+$/)){
								alert('Please enter a valid e-mail address.');
								field.select();
								field.focus();
								return false;
							}
						break;
						case 'gender':
							//console.log(field[0]);
							//console.log('gender: ' + f.gender.length);
							if (!f.gender[0].checked && !f.gender[1].checked) { 
								alert('Please select your gender.'); 
								return false; 
							}
						break;
						case 'zip':
							if (val == "") { 
								alert('Please enter zip code.');
								field.focus();
								return false;
							}
						break;
						case 'dob_month':
							if(val.match(/\d{1,2}/)) {
								theMonth = parseInt(val,10);	
								if(!(theMonth <= 12 && theMonth >= 1)){
								alert('Please enter a valid month of birth.');
								field.focus();
								return false; 
								}
							} 
							else {
								alert('Please enter a valid month of birth.');
								field.focus();
								return false; 
							}
						break;
						case 'dob_day':
							if(val.match(/\d{1,2}/)) {
								theDay = parseInt(val,10);
								if(!(theDay >= 1 && theDay <= 31)) {
									alert(theDay);
									alert('Please enter a valid day of birth.'); 
									field.focus(); 
									return false; 
								}
							}
							else {
								alert('Please enter a valid day of birth.'); 
								field.focus(); 
								return false; 
							}
						break;
						case 'dob_year':
							if(!val.match(/\d{4}/) || val=="0000") { 
								alert('Please enter a valid year of birth (xxxx).'); 
								field.focus(); 
								return false; 
							}
						break;
						case 'fname':
							if(!val){
								alert('Please enter a first name');
								field.focus();
								return false;
							}
						break;
						case 'lname':
							if(!val){
								alert('Please enter a last name');
								field.focus();
								return false;
							}
						break;
						case 'address':
							if(!val){
								alert('Please enter an address');
								field.focus();
								return false;
							}
						break;
						case 'agree':
							if(!val){
								alert('Please agree to the Terms and Conditions and Official Rules');
								field.focus();
								return false;
							}
						break;
					}
				}
				
			}

		}//end onsubmit
	}//end if
 }//end for
}

function addCloseEvent(){
	var close = document.getElementById('close-reg-msg');
	if(close){
		if(window.opener){
		close.innerHTML = 'Close';
		close.onclick = function(){
			window.close();
			return false;
		}
		}
	}
}

addLoadEvent(doSubmit);
addLoadEvent(addCloseEvent);