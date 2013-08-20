var BlogView = function(post)
{
	this.render = function() {
			this.el.html(BlogView.template(post));
			return this;
	};

	this.initialize = function()
	{
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
	};

	this.initialize();
}

BlogView.template = Handlebars.compile($("#blog-tpl").html());
BlogView.liTemplate = Handlebars.compile($("#blog-li-tpl").html());