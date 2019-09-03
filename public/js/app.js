'use strict';

$(".hidden").hide();

$("#hamburgerbutton").click(function() {
  $(".hidden").show();
  $("hamburgerbutton").hide();
});
