/////////////////////
AutoForm.addHooks(null, {
	after: {
		insert: function(error, result, template) {
			if (error == undefined) {
				$('select').val($('select').val()).change();
			}
		}
	},
});

/////////////////////
setupModalOnShow_textareaAutosize = function() {
	$('.textarea_autosize').autosize();
}

/////////////////////
setupModalOnShow_listGroup = function() {
	$('.list-group').sortable({
		items: 'li.autoform-array-item',
		axis: 'y',
		update: function(event, ui) {
			var lino = 0;
			var colno = -1;
			$('.autoform-array-item', event.target).each(function(index) {
				$('[data-schema-key *= "."]', this).each(function(index2) {
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
}

/////////////////////
setupModalOnShow_autoformRemoveItem = function() {
	$('.autoform-remove-item-confirm').off('click');
	$('.autoform-remove-item-confirm').on('click', function(ev) {
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
}

/////////////////////
setupModalOnShow_ignoreEnterKey = function() {
	if (document.querySelector('form') != null) {
		document.querySelector('form').onkeypress = function(e) {
			e = e || event;
			var txtArea = /textarea/i.test((e.target || e.srcElement).tagName);
			return txtArea || (e.keyCode || e.which || e.charCode || 0) !== 13;
		};
	}
}

/////////////////////
setupBsTabOnShow = function() {
	$('a[data-toggle="tab"]').off('shown.bs.tab');
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var activated_tab = e.target // activated tab
		var previous_tab = e.relatedTarget // previous tab
		var target_id = $(e.target).attr('href');

		setupBsTabOnShow_googlemap(target_id);
		setupBsTabOnShow_stickynote(target_id);
	});
}

/////////////////////
setupModalOnShow = function() {
	$('.nav-tabs a:first').tab('show');
	$('.tab-content').fadeIn(500);

	setupModalOnShow_textareaAutosize();
	setupModalOnShow_listGroup();
	setupModalOnShow_autoformRemoveItem();
	setupModalOnShow_ignoreEnterKey();
	setupModalOnShow_googlemap3();

	setupBsTabOnShow();
}

/////////////////////
setupModalOnShow2 = function() {
	setupModalOnShow2_googlemap2(null);
}

/////////////////////
setupBsTabOnShow_googlemap = function(area) {
	$('div.js-map', $(area)).each(function(index) {
		$(this).trigger('click');
	});
}

/////////////////////
setupModalOnShow2_googlemap2 = function(area) {
	$('div.tab-pane.active div.js-map').each(function(index) {
		$(this).trigger('click');
	});
}

/////////////////////
setupModalOnShow_googlemap3 = function() {
	$('div.js-map').each(function(index, elem) {
		var tab_href = null;
		$(elem).parents('.nav-tabs a').each(function(index2, elem2) {
			var tab_href = $(elem2).attr('href');
		});
		if (tab_href == null) {
			$(this).trigger('click');
		}
	});
}

/////////////////////
setupBsTabOnShow_stickynote = function(area) {
	$('div.divStickyNotesContainer').each(function(index, elem) {
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
setupModalOnHide_closeErrorMsg = function(area) {
	$('div.form-group').each(function(index) {
		var cls = $(this).attr('class').split(' ');
		for (var i=0, l=cls.length; i<l; ++i) {
			if (cls[i].indexOf('row-') === 0) {
				var tcls = '.' + cls[i] + ' .help-block';
				$(tcls).css('height', '0px');
			}
		}
	});
}

/////////////////////
setupModalOnHide_stickynote = function() {
	$('.jq_stickynote_destroy').each(function(index, elem) {
//console.log("setupModalOnHide_stickynote");
//console.log(elem);
		$(elem).trigger('blur');
	});
}

/////////////////////
setupModalOnHide = function() {
	setupModalOnHide_closeErrorMsg();
	setupModalOnHide_stickynote();
}

/////////////////////
setupModal = function(templateName) {
	if (templateName == undefined) return;

	if (Template[templateName].rendered != undefined) {
		return;
	}

	/////////////////////
	Template[templateName].rendered = function() {
		AutoForm.resetForm(templateName);

		/////////////////////
		$('#jkafModal').off('show.bs.modal');
		$('#jkafModal').on('show.bs.modal', function(a1, a2) {
			var form_id = $("div", a1.currentTarget).attr("id") || " ";
			form_id = form_id.substr(1);
			AutoForm.resetForm(form_id);
			setTimeout(function() {
				setupModalOnShow();
			}, 500);
			setTimeout(function() {
				setupModalOnShow2();
			}, 1500);
		});

		/////////////////////
		$('#jkafModal').off('hide.bs.modal');
		$('#jkafModal').on('hide.bs.modal', function(a1, a2) {
			setupModalOnHide();
		});

		/////////////////////
		setTimeout(function() {
			setupModalOnShow();
		}, 300);
	}

	/////////////////////
	Template[templateName].destroyed = function() {
		console.log("Template destroyed:" + templateName);
	}

	/////////////////////
	AutoForm.addHooks(templateName, {
		onError: function(operation, error, template) {
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

