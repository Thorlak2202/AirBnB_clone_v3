const checkedItems = [];

function remove (array, element) {
  const index = array.indexOf(element);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

function amenCheck () {
  const allAmenInputs = $('.amenities INPUT');
  allAmenInputs.each(function () {
    $(this).change(function () {
      if ($(this).prop('checked')) {
        checkedItems.push(this.name);
        const itemsString = checkedItems.join(', ');
        $('.amenities h4').text(itemsString);
      } else {
        remove(checkedItems, this.name);
        const itemsString = checkedItems.join(', ');
        $('.amenities h4').text(itemsString);
      }
    });
  });
}

function fetchPlaces () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'JSON',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        let place = data[i];
        $('.places ').append('<article><div class="title_box"><h2>' +place.name + '</h2><div class="price_by_night">' + place.price_by_night + '</div></div><div class="information"><div class="max_guest">' + place.max_guest + '</div><div class="number_rooms">' + place.number_rooms +'</div><div class="number_bathrooms">' + place.number_bathrooms + '</div></div><div class="description">' +place.description + '</div></article>')
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

function checkStatus () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function (data) {
        if (data.status === 'OK') {
          $('DIV#api_status').toggleClass('available');
        }
      },
      error: function (data) {
        console.log(data);
      }
    });
  }

$(window).on('load', function () {
  amenCheck();
  fetchPlaces();
  checkStatus();
});
