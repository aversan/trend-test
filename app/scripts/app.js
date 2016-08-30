import $ from '../blocks/jquery/jquery';

$(() => {
	$('.select3').each(function() {
		var $select3 = $(this);
		var $toggle = $select3.children('.select3__toggle');
		var $toggleFrom = $toggle.find('.from');
		var $toggleTo = $toggle.find('.to');
		var $dropdown = $select3.children('.select3__dropdown');
		var $inputFrom = $dropdown.find('.select3__input-from');
		var $inputTo = $dropdown.find('.select3__input-to');
		var $dropdownItemsFrom = $inputFrom.siblings('.select3__dropdown-item');
		var $dropdownItemsTo = $inputTo.siblings('.select3__dropdown-item');
		var $dropdownItems = $dropdownItemsFrom.add($dropdownItemsTo);


		var open = function() {
			$select3.addClass('is-open').trigger('open.select3');
		}

		var close = function() {
			$select3.removeClass('is-open').trigger('close.select3');
		}

		var update = function() {
			if ($inputFrom.val()) {
				$select3.removeClass('is-empty-from');
			} else {
				$select3.addClass('is-empty-from');
			}

			if ($inputTo.val()) {
				$select3.removeClass('is-empty-to');
			} else {
				$select3.addClass('is-empty-to');
			}

			if ($inputFrom.val() && $inputTo.val()) {
				$toggleFrom.empty().text($inputFrom.val());
				$toggleTo.empty().text($inputTo.val());
			} else {
				$toggleFrom.empty().text($toggleFrom.data('placeholder'));
				$toggleTo.empty().text($toggleTo.data('placeholder'));
			}

			if ($inputFrom.val()) {
				$inputTo.prop('disabled', false);
			} else {
				$inputTo.prop('disabled', true);
			}
		}

		var updateDefault = function(){
			$inputFrom.val('');
			$inputTo.val('');
			$toggleFrom.empty().text($toggleFrom.data('placeholder'));
			$toggleTo.empty().text($toggleTo.data('placeholder'));
			$select3.addClass('is-empty-from is-empty-to');
			$dropdownItems.removeClass('active');
			$inputTo.prop('disabled', true);
		}

		$toggle.on('click.select3', function() {
			if (!$select3.hasClass('is-open')) {
				open();
			} else {
				close();
			}
		});

		$select3.on('open.select3', function() {
			$inputFrom.focus();
		});

		$select3.on('close.select3', function() {
			if (!$inputFrom.val() || !$inputTo.val()) {
				updateDefault();
			} else {
				update();
			}
		});

		$inputFrom.on('change.select3', function(){
			update();
			$inputTo.focus();
		});


		$inputTo.on('change.select3', function(){
			update();
			close();
		});

		$inputFrom.focusin(function(){
			$select3.addClass('is-focus-from');
		});

		$inputFrom.focusout(function(){
			$select3.removeClass('is-focus-from');
		});

		$inputTo.focusin(function(){
			$select3.addClass('is-focus-to');
		});

		$inputTo.focusout(function(){
			$select3.removeClass('is-focus-to');
		});

		$inputFrom.keypress(function(){
			$dropdownItemsFrom.removeClass('active').filter(function() {
  				return $(this).data("value") == $inputFrom.val();
			}).addClass('active');
		});

		$inputTo.keypress(function(){
			$dropdownItemsTo.removeClass('active').filter(function() {
  				return $(this).data("value") == $inputTo.val();
			}).addClass('active');
		});

		$dropdownItemsFrom.on('click.select3', function() {
			var $self = $(this);
			var $value = parseInt($self.data('value'));

			if (!$self.hasClass('active')) {
				$self.siblings().removeClass('active').end().addClass('active');
				$inputFrom.val($value).trigger('change.select3');
			}
		});

		$dropdownItemsTo.on('click.select3', function() {
			var $self = $(this);
			var $value = parseInt($self.data('value'));

			if (!$self.hasClass('active')) {
				$self.siblings().removeClass('active').end().addClass('active');
				$inputTo.val($value).trigger('change.select3');
			}
		});

		$(document).keydown(function(e) {
		    if (e.keyCode == 27) {
		        close();
		    }
		});

		$(document).on('click', function(e){
			close();
		});

		$select3.on('click.select3', function(e){
			e.stopPropagation();
		})

		updateDefault();
	});
});
