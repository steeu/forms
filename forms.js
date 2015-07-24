
/**
 * wakanda form validation
 */

var Forms = Forms || {};


/**
 * constructor
 */
 
Forms = function(fields) {
	
	// regular expressions for validation
	this.regex = {};
	this.regex.text		= /^[a-zA-Z]+$/; // letters only
	this.regex.number	= /^[0-9]+$/; // numbers only
	this.regex.email	= /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/; // email address
	this.regex.password	= /(?=.*\d)(?=.*[A-Z]).{6,}/; // at least six characters with one number and one uppercase letter
	// form fields array
	this.fields = fields;
	// initialize form
	this.init();
};


/**
 * validate field input
 */

Forms.prototype.validateField = function (field) {
	
	var _this = this,
		reg = null,
		result = false,
		value = field.value;
	

	// validate mandatory fields
	if (field.validation.mandatory && field.value.length === 0) {
		result = false;
		
	// validate confirm fields
	} else if (field.validation.type == 'confirm') {
		// compare value with value to confirm
		var toConfirm = document.getElementById(field.validation.confirm).value;
		
		if (toConfirm.length > 0) {
			result = (toConfirm === value);
		} else {
			result = true;
		}
		
	// validate field content
	} else if (field.validation.mandatory || field.value.length > 0) {
		// validation type
		switch(field.validation.type) {
			case 'number':
				result = _this.regex.number.test(field.value);
				break;
			case 'text':
				result = _this.regex.text.test(field.value);
				break;
			case 'email':
				result = _this.regex.email.test(field.value);
				break;
			case 'password':
				result = _this.regex.password.test(field.value);
				break;
		}
	} else if (field.value.length === 0) {
		result = true;
	}
	// apply css class to input field
	_this.applyCSS(result, field);
	
	return result;	
};


/**
 * validate form input (all fields)
 */

Forms.prototype.validateForm = function (inputField, type) {
	
	var _this = this,
		result = true,
		field = {};
	
	for (var i = 0; i < _this.fields.length; i++) {
		field = document.getElementById(_this.fields[i].field);
		
		// validate
		if (!_this.validateField(field)) {
			result = false;
		}
	};
	
	return result;
};


/**
 * apply css class to input fields
 */

Forms.prototype.applyCSS = function ( isValid, inputField ) {
	
	var _this = this;

	if ( isValid ) {
		inputField.classList.remove('validation-failed');
		inputField.classList.add('validation-successful');
   	} else {
		inputField.classList.remove('validation-successful');
		inputField.classList.add('validation-failed');
	}
	
	return isValid;
};


/**
 * initialize
 */
 
 Forms.prototype.init = function () {
	
	var _this = this;
	
	for (var i = 0; i < _this.fields.length; i++) {
		var field = document.getElementById(_this.fields[i].field);
		
		// validate field
		if (field) {
			field.validation = _this.fields[i];
			field.onkeyup = function ( event ) {
				_this.validateField(this, this.validation.type);
			};
		}
	};
};


/**
 * validate form
 */

Forms.prototype.validate = function (paramsObj) {
	
	var params = paramsObj || {};
	
	// validate all form fields before sending
	if (this.validateForm()) {
		// check if success function defined
		if (typeof params.onSuccess === 'function') {
			params.onSuccess({successMessage: 'Validierung erfolgreich'});
		} else {
			return true;
		}
	} else {
		// check if error function defined
		if (typeof params.onError === 'function') {
			params.onError({errorMessage: 'Bitte überprüfen Sie Ihre Eingaben'});
		} else {
			return false;
		}
	}
};