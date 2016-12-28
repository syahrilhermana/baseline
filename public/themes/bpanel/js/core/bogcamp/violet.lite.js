(function (namespace, $) {
	"use strict";

	var apps = function () {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function () {
			o.initialize();
		});

	};
	var p = apps.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function () {
		this._enableEvents();

		this._initButtonStates();
		this._initIconSearch();
		this._initInversedTogglers();
		this._initDatePicker();
	};

	// =========================================================================
	// EVENTS
	// =========================================================================

	// events
	p._enableEvents = function () {
		var o = this;

		$('.card-head .tools .btn-refresh').on('click', function (e) {
			o._handleCardRefresh(e);
		});
		$('.card-head .tools .btn-collapse').on('click', function (e) {
			o._handleCardCollapse(e);
		});
		$('.card-head .tools .btn-close').on('click', function (e) {
			o._handleCardClose(e);
		});
		$('.card-head .tools .btn-import').on('click', function (e) {
			o._handleDataImport(e);
		});
		$('.card-head .tools .btn-export').on('click', function (e) {
			o._handleDataExport(e);
		});
		$('.card-head .tools .btn-filter').on('click', function (e) {
			o._handleCardFilter(e);
		});
	};


	// =========================================================================
	// CARD ACTIONS
	// =========================================================================

	p._handleCardRefresh = function (e) {
		var o = this;
		var card = $(e.currentTarget).closest('.card');
		violet.AppCard.addCardLoader(card);
		setTimeout(function () {
			violet.AppCard.removeCardLoader(card);
		}, 1500);
	};

	p._handleCardCollapse = function (e) {
		var card = $(e.currentTarget).closest('.card');
		violet.AppCard.toggleCardCollapse(card);
	};

	p._handleCardClose = function (e) {
		var card = $(e.currentTarget).closest('.card');
		violet.AppCard.removeCard(card);
	};

	p._handleDataImport = function (e) {
		console.log( "show import card" );
		$(".card-import").show(500);
	};

	p._handleDataExport = function (e) {
		jQuery.facebox('<div style="padding: 17px; font-size: 14px;">Processing....</div>');
	};

	p._handleCardFilter = function (e) {
		console.log( "show filter card" );
		$(".card-filter").show(500);
	};


	// =========================================================================
	// INVERSE UI TOGGLERS
	// =========================================================================
	
	p._initInversedTogglers = function () {
		var o = this;

		
		$('input[name="menubarInversed"]').on('change', function (e) {
			o._handleMenubarInversed(e);
		});
		$('input[name="headerInversed"]').on('change', function (e) {
			o._handleHeaderInversed(e);
		});
	};
	
	p._handleMenubarInversed = function (e) {
		if($(e.currentTarget).val() === '1') {
			$('#menubar').addClass('menubar-inverse');
		}
		else {
			$('#menubar').removeClass('menubar-inverse');
		}
	};
	p._handleHeaderInversed = function (e) {
		if($(e.currentTarget).val() === '1') {
			$('#header').addClass('header-inverse');
		}
		else {
			$('#header').removeClass('header-inverse');
		}
	};
	
	// =========================================================================
	// BUTTON STATES (LOADING)
	// =========================================================================

	p._initButtonStates = function () {
		$('.btn-loading-state').click(function () {
			var btn = $(this);
			btn.button('loading');
			setTimeout(function () {
				btn.button('reset');
			}, 3000);
		});
	};

	// =========================================================================
	// ICON SEARCH
	// =========================================================================

	p._initIconSearch = function () {
		if($('#iconsearch').length === 0) {
			return;
		}

		$('#iconsearch').focus();
		$('#iconsearch').on('keyup', function () {
			var val = $('#iconsearch').val();
			$('.col-md-3').hide();
			$('.col-md-3:contains("' + val + '")').each(function (e) {
				$(this).show();
			});

			$('.card').hide();
			$('.card:contains("' + val + '")').each(function (e) {
				$(this).show();
			});
		});
	};

	// =========================================================================
	// Date Picker
	// =========================================================================

	p._initDatePicker = function () {
		if (!$.isFunction($.fn.datepicker)) {
			return;
		}

		$('#date').datepicker({autoclose: true, todayHighlight: true});
		$('#date-month').datepicker({autoclose: true, todayHighlight: true, minViewMode: 1});
		$('#date-format').datepicker({autoclose: true, todayHighlight: true, format: "yyyy/mm/dd"});
		$('#date-range').datepicker({todayHighlight: true});
		$('#date-month-range').datepicker({autoclose: true, todayHighlight: true, minViewMode: 1});
		$('#date-inline').datepicker({todayHighlight: true});
	};

	// =========================================================================
	// UPLOAD STYLE
	// =========================================================================
	// We can attach the `fileselect` event to all file inputs on the page
	$(document).on('change', ':file', function() {
		var input = $(this),
			numFiles = input.get(0).files ? input.get(0).files.length : 1,
			label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
		input.trigger('fileselect', [numFiles, label]);
	});

	// We can watch for our custom `fileselect` event like this
	$(document).ready( function() {
		$(':file').on('fileselect', function(event, numFiles, label) {

			var input = $(this).parents('.input-group').find(':text'),
				log = numFiles > 1 ? numFiles + ' files selected' : label;

			if( input.length ) {
				input.val(log);
			} else {
				if( log ) alert(log);
			}

		});

		$('.cancel').on('click', function(){
			var form = document.getElementById("form-import");
			var error = document.getElementById("error");

			$('#file-name').val("");
			error.style.display = "none";
			form.reset();
		});

		$('#form-import').submit(function(){
			var form = document.getElementById("form-import");
			var file = $('#file-name').val();
			var error = document.getElementById("error");

			if (file == "") {
				error.style.display = "";
				error.innerHTML = "File must be selected.";
				return false;
			}

			jQuery.facebox('<div style="padding: 17px; font-size: 14px;">Processing....</div>');
			form.submit();
		});

		$('#form-filter').submit(function(){
			var form = document.getElementById("form-filter");

			jQuery.facebox('<div style="padding: 17px; font-size: 14px;">Processing....</div>');
			form.submit();
		});
	});
		
	// =========================================================================
	namespace.apps = new apps;
}(this.violet, jQuery));
