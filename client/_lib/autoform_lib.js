AutoForm.addHooks(null, {
	after: {
		insert: function(error, result, template) {
			if (error == undefined) {
				$('select').val($('select').val()).change();
			}
		}
	},
});

setupModalContent = function() {
	$('.nav-tabs a:first').tab('show');
	$('.tab-content').fadeIn(500);
	$('.textarea_autosize').autosize();

	$('.list-group').sortable({
		items: 'li.autoform-array-item',
		axis: 'y',
		update: function(event, ui) {
			var lino = 0;
			var colno = -1;
//console.log("-------------------");
//console.log(event);
//console.log(ui);
			$('.autoform-array-item', event.target).each(function(index) {
//console.log("---");
//console.log(this);
				$('[data-schema-key *= "."]', this).each(function(index2) {
//console.log(lino);
//console.log($(this).attr('data-schema-key').split('.'));
					var skey = $(this).attr('data-schema-key').split('.');
					if (colno == -1) {
						for(var i=0; i<skey.length; i++) {
							if (isNaN(skey[i]) === false) {
								colno = i;
								break;
							}
						}
					}
					skey[colno] = lino;
					$(this).attr('data-schema-key', skey.join('.'));
					var nkey = $(this).attr('name').split('.');
					nkey[colno] = lino;
					$(this).attr('name', nkey.join('.'));
				});
				lino++;
			});
		}
	});
	$('.list-group').disableSelection();

	$('.autoform-remove-item-confirm').off('click');
	$('.autoform-remove-item-confirm').on('click', function(ev) {
//console.log(ev);
//console.log($('.autoform-remove-item', $(ev.target).parent().parent()));
		var t = $('.autoform-remove-item', $(ev.target).parent().parent());
            bootbox.dialog({
              message: "Are you sure you wish to delete this record?",
              buttons: {
                eraseRecord: {
                  label: "Yes!",
                  className: "btn-danger",
                  callback: function() {
		    t.trigger('click');
                  }
                },
                doNotEraseRecord: {
                  label: "No!",
                  className: "btn-primary",
                  callback: function() {
                  }
                }
              }
            });
	});

	if (document.querySelector('form') != null) {
		document.querySelector('form').onkeypress = function(e) {
			e = e || event;
			var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
			return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
		};
	}

	$('a[data-toggle="tab"]').off('shown.bs.tab');
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
console.log("shown.bs.tab");
//console.log(e.target);
//console.log($(e.target).attr('href'));
		var activated_tab = e.target // activated tab
		var previous_tab = e.relatedTarget // previous tab
		var target_id = $(e.target).attr('href');

		// googlemap
		setupGooglemap(target_id);

		// sticky note
		setupStickynote(target_id);
	});

}

setupModalContent2 = function() {
	// googlemap
	setupGooglemap2(null);
}

/////////////////////
setupGooglemap = function(area) {
	$('div.js-map', $(area)).each(function(index) {
		console.log("setupGooglemap js-map 1");
		console.log($(this));
		$(this).trigger('click');
	});
}

setupGooglemap2 = function(area) {
	$('div.tab-pane.active div.js-map').each(function(index) {
		console.log("setupGooglemap2 js-map 2");
		console.log($(this));
		$(this).trigger('click');
	});
}

setupStickynote = function(area) {
	$('div.divStickyNotesContainer').each(function(index, elem) {
		console.log("divStickyNotesContainer 1");
		console.log($(this));
		var tab_href = null;
		$(elem).parents('.nav-tabs a').each(function(index2, elem2) {
			var tab_href = $(elem2).attr('href');
		});
		if (tab_href == null) {
			$(elem).trigger('st_show');
		} else if (tab_href == area) {
			$(elem).trigger('st_show');
		} else {
			$(elem).trigger('st_hide');
		}
	});
}

/////////////////////
setupModal = function(templateName) {
	if (templateName == undefined) return;


	if (Template[templateName].rendered != undefined) {
		return;
	}
	console.log("Template renderd:" + templateName);
	Template[templateName].rendered = function() {
console.log("Template renderd");
		AutoForm.resetForm(templateName);
		$('#jkafModal').off('show.bs.modal');
		$('#jkafModal').on('show.bs.modal', function(a1, a2) {
console.log("show.bs.modal");
			var form_id = $("div", a1.currentTarget).attr("id") || " ";
			form_id = form_id.substr(1);
			AutoForm.resetForm(form_id);
			setTimeout(function() {
				setupModalContent();
			}, 300);
			setTimeout(function() {
				setupModalContent2();
			}, 1000);
		});
		$('#jkafModal').off('hide.bs.modal');
		$('#jkafModal').on('hide.bs.modal', function(a1, a2) {
console.log("hide.bs.modal");
			$('div.form-group').each(function(index) {
				var cls = $(this).attr('class').split(' ');
				for (var i=0, l=cls.length; i<l; ++i) {
					if (cls[i].indexOf('row-') === 0) {
//console.log("row");
//console.log(cls[i]);
						var tcls = '.' + cls[i] + ' .help-block';
						$(tcls).css('height', '0px');
					}
				}
			});
		});
		setTimeout(function() {
			setupModalContent();
		}, 300);
	}

	Template[templateName].destroyed = function() {
		console.log("Template destroyed:" + templateName);
	}

	AutoForm.addHooks(templateName, {
		onError: function(operation, error, template) {
console.log("onError");
console.log(error);
			setTimeout(function() {
				$('div.has-error').each(function(index) {
					var cls = $(this).attr('class').split(' ');
					for (var i=0, l=cls.length; i<l; ++i) {
						if (cls[i].indexOf('row-') === 0) {
							var tcls = '.' + cls[i] + ' .help-block';
							$(tcls).css('height', '16px');
						}
					}
				});
			});

			setTimeout(function() {
				var f_stop = false;
				$('.nav-tabs a').each(function(i, elem) {
					href = $(elem).attr('href');
					if (f_stop == false && $('div' + href + ' .has-error label').length > 0) {
						$('.nav-tabs a[href="' + href + '"]').tab('show');
						f_stop = true;
					}
				});
			}, 50);
		}
	});
}
