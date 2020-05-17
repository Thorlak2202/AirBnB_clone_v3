const checkedItems = [];

function uncheck (array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

function listerCheck () {
  const allAmenInputs = $('.amenities INPUT');
  allAmenInputs.each(function () {
    $(this).change(function () {
      if ($(this).prop('checked')) {
        checkedItems.push((this.name));
        $('.amenities h4').text(checkedItems.join(', '));
      } else {
        uncheck(checkedItems, this.name);
        $('.amenities h4').text(checkedItems.join(', '));
      }
    });
  });
}

$(window).on('load', function () {
  listerCheck();
});
