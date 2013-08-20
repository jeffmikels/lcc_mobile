var EmployeeView = function(employee)
{
	this.initialize = function()
	{
		this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', this.addLocation);
		this.el.on('click', '.add-contact-btn', this.addToContacts);
	};

	this.addLocation = function(event) {
			event.preventDefault();
			console.log('addLocation');
			$('.location', this.el).html('ATTEMPTING TO LOCATE');
			navigator.geolocation.getCurrentPosition(
					function(position) {
							$('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
					},
					function() {
							app.showAlert('Error getting location', "Error");
					});
			return false;
	};

	this.addToContacts = function(event) {
			event.preventDefault();
			console.log('addToContacts');
			if (!navigator.contacts) {
					app.showAlert("Contacts API not supported", "Error");
					return;
			}
			var contact = navigator.contacts.create();
			contact.name = {givenName: employee.firstName, familyName: employee.lastName};
			var phoneNumbers = [];
			phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
			phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
			contact.phoneNumbers = phoneNumbers;
			contact.save();
			return false;
	};


	this.render = function()
	{
		this.el.html(EmployeeView.template(employee));
		return this;
	}

	this.initialize();
}

EmployeeView.template = Handlebars.compile($("#employee-tpl").html());