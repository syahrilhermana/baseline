(function(namespace, $) {
	"use strict";

	var AppVendor = function() {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function() {
			o.initialize();
		});

	};
	var p = AppVendor.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function() {
		this._initScroller();
		this._initTabs();
		this._initTooltips();
		this._initPopover();
		this._initSortables();
	};

	// =========================================================================
	// SCROLLER
	// =========================================================================

	p._initScroller = function () {
		if (!$.isFunction($.fn.nanoScroller)) {
			return;
		}

		$.each($('.scroll'), function (e) {
			var holder = $(this);
			violet.AppVendor.addScroller(holder);
		});

		violet.App.callOnResize(function () {
			$.each($('.scroll-xs'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (violet.App.minBreakpoint('xs')) {
					violet.AppVendor.removeScroller(holder);
				}
				else {
					violet.AppVendor.addScroller(holder);
				}
			});

			$.each($('.scroll-sm'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (violet.App.minBreakpoint('sm')) {
					violet.AppVendor.removeScroller(holder);
				}
				else {
					violet.AppVendor.addScroller(holder);
				}
			});

			$.each($('.scroll-md'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (violet.App.minBreakpoint('md')) {
					violet.AppVendor.removeScroller(holder);
				}
				else {
					violet.AppVendor.addScroller(holder);
				}
			});

			$.each($('.scroll-lg'), function (e) {
				var holder = $(this);
				if(!holder.is(":visible")) return;
				
				if (violet.App.minBreakpoint('lg')) {
					violet.AppVendor.removeScroller(holder);
				}
				else {
					violet.AppVendor.addScroller(holder);
				}
			});
		});
	};

	p.addScroller = function (holder) {
		holder.wrap('<div class="nano"><div class="nano-content"></div></div>');

		var scroller = holder.closest('.nano');
		scroller.css({height: holder.outerHeight()});
		scroller.nanoScroller();

		holder.css({height: 'auto'});
	};

	p.removeScroller = function (holder) {
		if (holder.parent().parent().hasClass('nano') === false) {
			return;
		}

		holder.parent().parent().nanoScroller({destroy: true});

		holder.parent('.nano-content').replaceWith(holder);
		holder.parent('.nano').replaceWith(holder);
		holder.attr('style', '');
	};
	
	// =========================================================================
	// SORTABLE
	// =========================================================================

	p._initSortables = function () {
		if (!$.isFunction($.fn.sortable)) {
			return;
		}

		$('[data-sortable="true"]').sortable({
			placeholder: "ui-state-highlight",
			delay: 100,
			start: function (e, ui) {
				ui.placeholder.height(ui.item.outerHeight() - 1);
			}
		});

	};
	
	// =========================================================================
	// TABS
	// =========================================================================

	p._initTabs = function () {
		if (!$.isFunction($.fn.tab)) {
			return;
		}
		$('[data-toggle="tabs"] a').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
	};
	
	// =========================================================================
	// TOOLTIPS
	// =========================================================================

	p._initTooltips = function () {
		if (!$.isFunction($.fn.tooltip)) {
			return;
		}
		$('[data-toggle="tooltip"]').tooltip({container: 'body'});
	};

	// =========================================================================
	// POPOVER
	// =========================================================================

	p._initPopover = function () {
		if (!$.isFunction($.fn.popover)) {
			return;
		}
		$('[data-toggle="popover"]').popover({container: 'body'});
	};
	
	// =========================================================================
	// DEFINE NAMESPACE
	// =========================================================================

	window.violet.AppVendor = new AppVendor;
}(this.violet, jQuery)); // pass in (namespace, jQuery):
