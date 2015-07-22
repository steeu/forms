# Forms
Wakanda Form Validation

```javascript
// init form
var myForm = new Forms([
	{field: 'textEmail', type: 'email'},
	{field: 'textPassword', type: 'password'},
	{field: 'textPasswordConfirm', type: 'confirm', confirm: 'txtPassword'}
]);

// validate form (ex. save button on click event)
myForm.validate({
	onSuccess: function(event) {
		// success code ex. save
	},
	onError: function(event) {
		// error code ex. alert
	}
});
```
