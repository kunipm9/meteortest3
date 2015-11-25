Router.route('pdfFile', {
	where: 'server',                                              
	path: '/sss.pdf',                                              
	action: function() {
		var headers = {
			'Content-type': 'application/pdf',
			'Content-Disposition': "attachment; filename=test.pdf"
		};
		SSR.compileTemplate('pdftest', Assets.getText('pdftest.html'));
		var html = SSR.render("pdftest", {username: "arunoda"});
		this.response.writeHead(200, headers);
		var r = wkhtmltopdf(html).pipe(this.response);
		//var r = wkhtmltopdf("http://www.google.com").pipe(this.response);
	}
});
  
