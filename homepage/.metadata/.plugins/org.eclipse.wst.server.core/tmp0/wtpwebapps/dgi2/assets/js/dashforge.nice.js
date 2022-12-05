// Adding placeholder for search input
(function($) {
    'use strict'

    var Defaults = $.fn.select2.amd.require('select2/defaults');

    $.extend(Defaults.defaults, {
      searchInputPlaceholder: ''
    });

    var SearchDropdown = $.fn.select2.amd.require('select2/dropdown/search');

    var _renderSearchDropdown = SearchDropdown.prototype.render;

	SearchDropdown.prototype.render = function(decorated) {

    	// invoke parent method
		var $rendered = _renderSearchDropdown.apply(this, Array.prototype.slice.apply(arguments));

		this.$search.attr('placeholder', this.options.get('searchInputPlaceholder'));

		return $rendered;
	};

})(window.jQuery);

$(function(){
	'use strict'

	// Basic with search
	$('.select2-region').select2({
		placeholder: 'Select region',
		searchInputPlaceholder: 'Search region'
	}).change(function() {
		var region = $('.select2-region option:selected').text();
		var period = $('.select2-period option:selected').text();
		var regionVal = $('.select2-region option:selected').val();
		var periodVal = $('.select2-period option:selected').val();
		$('.d-sm-flex').find('h4').html('�����ͷ� ���� <b>' + region + '</b> ��Ȳ <span class="tx-color-03 tx-14">(' + period + ')</span>');

		// ���� ���� ���� ����
		localStorage.setItem('region', regionVal);
		
		if (typeof reloadChartjs != 'undefined')
			reloadChartjs(regionVal, periodVal);
	}).init(function() {
		if (window.region != undefined) {
		    $('.select2-region').val(localStorage.getItem('region'));
		    $('.select2-region').select2().trigger('change');
		} else {
			$('.select2-region').val(localStorage.getItem('region'));
		    $('.select2-region').select2().trigger('change');
		}
	});

	// Basic with search
	$('.select2-period').select2({
		placeholder: 'Select period',
		searchInputPlaceholder: 'Search period'
	}).change(function() {
		var region = $('.select2-region option:selected').text();
		var period = $('.select2-period option:selected').text();
		var regionVal = $('.select2-region option:selected').val();
		var periodVal = $('.select2-period option:selected').val();
		$('.d-sm-flex').find('h4').html('�����ͷ� ���� <b>' + region + '</b> ��Ȳ <span class="tx-color-03 tx-14">(' + period + ')</span>');

		// ���� �Ⱓ ���� ����
		localStorage.setItem('period', periodVal);
		
		if (typeof reloadChartjs != 'undefined')
			reloadChartjs(regionVal, periodVal);
	}).init(function() {
		if (window.region != undefined) {
		    $('.select2-period').val(localStorage.getItem('period'));
		    $('.select2-period').select2().trigger('change');
		}
	});
});

// �׺���̼ǹ� Style
var setNavbarMenu = function(index) {
    
    $('li.nav-item').removeClass('active');
    $('li.nav-item').eq(index).addClass('active');
    
}