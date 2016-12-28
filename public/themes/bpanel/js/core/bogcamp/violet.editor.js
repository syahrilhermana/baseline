(function (namespace, $) {
	"use strict";

	var editors = function () {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function () {
			o.initialize();
		});

	};
	var p = editors.prototype;

	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function () {
		this._initCKEditor();
	};

	// =========================================================================
	// CKEDITOR
	// =========================================================================

	p._initCKEditor = function () {
		$('#ckeditor').ckeditor();

		CKEDITOR.disableAutoInline = true;
		if ($('#inlineContent1').length > 0)
			CKEDITOR.inline('inlineContent1');
		if ($('#inlineContent2').length > 0)
			CKEDITOR.inline('inlineContent2');
	};

	// =========================================================================
	namespace.editors = new editors;
}(this.violet, jQuery)); // pass in (namespace, jQuery):
