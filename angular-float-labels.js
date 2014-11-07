(function() {
  'use strict';

  angular.module('angular-float-labels', [])
    .directive('placeholder', function($parse) {
      return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
          var label = $('<label class="angular-float-labels-label"></label').html($attrs.placeholder);
          var element = $element;
          var input = $element;
          var parent = element.parent().addClass('angular-float-labels-wrapper');
          var index = element.index();

          var selectize = $attrs.hasOwnProperty('selectize');
          var selectizeInstance;
          if (selectize) {
            selectizeInstance = element.data('selectize') || element.selectize;
            element = element.parent().find('.selectize-control').first();
            input = element.find('.selectize-input input').first();
            parent = element.find('.selectize-input').first();
          }

          function focus() { label.addClass('focused'); }
          function blur() { label.removeClass('focused'); }
          function showLabel() { label.addClass('toggled'); }
          function hideLabel() { label.removeClass('toggled'); }
          function change(e) {
            input.val().length || (!$(this)[0].checkValidity() && $(this).val().length)
              ? showLabel()
              : hideLabel();
          }
          function init() {
            input.addClass('angular-float-labels-element');
            input.before(label);
            input.on('input change', change);
            input.on('focus', focus);
            input.on('blur', blur);
            $scope.$on('$destroy', function() {
              input.off('input change', change);
              input.off('focus', focus);
              input.off('blur', blur);
            });
          }
          function initSelectize() {
            function selectizeToggle(value) {
              value && value.length ? showLabel() : hideLabel();
            }
            function selectizeToggleItems() {
              selectizeToggle(selectizeInstance.items);
            }
            function selectizeBlur() {
              blur();
              selectizeToggleItems();
            }
            function selectizeFocus() {
              focus();
              selectizeToggleItems();
            }
            parent.addClass('angular-float-labels-element');
            parent.before(label);
            selectizeInstance.on('type', selectizeToggle);
            selectizeInstance.on('dropdown_open', selectizeFocus);
            selectizeInstance.on('dropdown_close', selectizeBlur);
            selectizeInstance.on('blur', selectizeBlur);
            selectizeInstance.on('change', selectizeToggleItems)
          }
          selectize ? initSelectize() : init();
          // Without this, the label does not appear in Canary
          setTimeout(function() {
            var initValue = $parse($attrs.ngModel)($scope);
            initValue && initValue.length ? showLabel() : hideLabel();
          });
        }
      };
    });
})();
