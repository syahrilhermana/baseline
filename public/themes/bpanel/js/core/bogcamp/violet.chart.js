(function (namespace, $) {
	"use strict";

	var chart = function () {
		// Create reference to this instance
		var o = this;
		// Initialize app when document is ready
		$(document).ready(function () {
			o.initialize();
		});

	};
	var p = chart.prototype;

	// =========================================================================
	// MEMBERS
	// =========================================================================


	// =========================================================================
	// INIT
	// =========================================================================

	p.initialize = function () {
		// Morris
		this._initMorris();
	};
	// =========================================================================
	// MORRIS
	// =========================================================================

	p._initMorris = function () {
		if (typeof Morris !== 'object') {
			return;
		}

		if ($('#morris-bar-graph').length > 0) {
			Morris.Bar({
				element: 'morris-bar-graph',
				data: [
					{x: '2011 Q1', y: 3, z: 2, a: 3},
					{x: '2011 Q2', y: 2, z: null, a: 1},
					{x: '2011 Q3', y: 0, z: 2, a: 4},
					{x: '2011 Q4', y: 2, z: 4, a: 3}
				],
				xkey: 'x',
				ykeys: ['y', 'z', 'a'],
				labels: ['Y', 'Z', 'A'],
				barColors: $('#morris-bar-graph').data('colors').split(',')
			});
		}
	};

	// =========================================================================
	namespace.chart = new chart;
}(this.violet_chart, jQuery)); // pass in (namespace, jQuery):
