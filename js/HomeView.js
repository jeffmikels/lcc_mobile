var HomeView = function(store)
{
		this.render = function() {
				this.el.html(HomeView.template());
				return this;
		};

		this.findByName = function() {
				store.findByName($('.search-key').val(), function(employees) {
						$('.employee-list').html(HomeView.liTemplate(employees));
						if (self.iscroll) {
							console.log('Refresh iScroll');
							self.iscroll.refresh();
						} else {
							console.log('New iScroll');
							self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
						}
				});
		};

	this.getBlogPosts = function()
	{
		url = 'http://lafayettecc.org/news/?json';
		$.getJSON(url, this.showBlogList);
	}

	this.showBlogList = function(data)
	{
		$('.blog-list').html(HomeView.liTemplate(data.posts));
// 		if (self.iscroll) {
// 			console.log('Refresh iScroll');
// 			self.iscroll.refresh();
// 		} else {
// 			console.log('New iScroll');
// 			self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: true });
// 		}
	}

	this.initialize = function()
	{
		// Define a div wrapper for the view. The div wrapper is used to attach events.
		this.el = $('<div/>');
		//this.el.on('keyup', '.search-key', this.findByName);
		this.getBlogPosts();
	};

	this.initialize();
}

HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#blog-li-tpl").html());