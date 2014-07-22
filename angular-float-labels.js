(function() {
  'use strict';

  angular.module('angular-float-labels', [])
    .directive('placeholder', function() {
      return {
        restrict: 'A',
        link: function($scope, $element, $attrs) {
          var wrapper = $('<span class="angular-float-labels-wrapper"></span>');
          var label = $('<label class="angular-float-labels-label"></label').html($attrs.placeholder);
          var index = $element.index();
          var parent = $element.parent();

          function focus() { label.addClass('focused'); }
          function blur() { label.removeClass('focused'); }
          function showLabel() { label.addClass('toggled'); }
          function hideLabel() { label.removeClass('toggled'); }
          function change(e) {
            $element.val().length || (!$(this)[0].checkValidity() && !$(this).val().length)
              ? showLabel()
              : hideLabel();
          }
          function init() {
            $element.addClass('angular-float-labels-element');
            wrapper.append(label).append($element);
            if (index === 0) {
              parent.prepend(wrapper);
            }
            else {
              wrapper.insertAfter(parent.children()[index - 1]);
            }

            $element.on('input change', change);
            $element.on('focus', focus);
            $element.on('blur', blur);
            $scope.$on('$destroy', function() {
              $element.off('input change', change);
              $element.off('focus', focus);
              $element.off('blur', blur);
            });
          }
          init();
        }
      };
    });
})();
