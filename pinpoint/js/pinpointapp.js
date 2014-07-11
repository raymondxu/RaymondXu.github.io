//Author: Raymond Xu
//Version: July 10, 2014
//
//Adapted from Google Maps API
//============================

var map;
var geocoder;
var bounds = new google.maps.LatLngBounds();
var markersArray = [];
distancesArray = [];

var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

function initialize() {
  var opts = {
    center: new google.maps.LatLng(0, 0),
    zoom: 1
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), opts);
  geocoder = new google.maps.Geocoder();
}

function addMarker(location, isDestination) {
  var icon;
  if (isDestination) {
    icon = destinationIcon;
  } else {
    icon = originIcon;
  }
  geocoder.geocode({'address': location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      bounds.extend(results[0].geometry.location);
      map.fitBounds(bounds);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: icon
      });
      markersArray.push(marker);
    } else {
      alert('Geocode was not successful for the following reason: '
        + status);
    }
  });
}

function deleteOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

function callback(response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {
        alert('Error was: ' + status);
      } else {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        var outputDiv = document.getElementById('outputDiv');
        outputDiv.innerHTML = '';
        deleteOverlays();

        //Collect data from distance matrix
        //=================================
        for (var i = 0; i < origins.length; i++) { //iterate through distance data structure, origin-major
          var results = response.rows[i].elements;
          addMarker(origins[i], false); //place a marker on the location on the map
          for (var j = 0; j < results.length; j++) {
            addMarker(destinations[j], true); //place a marker on the location on the map
            // outputDiv.innerHTML += origins[i] + ' to ' + destinations[j] //print out each permutation's data
            //     + ': ' + results[j].distance.text + ' in '
            //     + results[j].duration.text + '<br>';

                distancesArray.push(results[j].distance.text); //save all the distance data

          }
        }


          //Calculate aggregate distances
          //=============================
          var aggregateDistancesArray = [];        
          var sum; //the sum of distances from all origin addresses for a single destination
        
          for(var i = 0; i < destinations.length; i ++) {
            sum = 0; //reset the sum for each destination
            for(var j = 0; j < origins.length; j++) {
              var permutation = response.rows[j].elements[i].distance.text; //access the stored distance data
              sum += convertToFloat(permutation); //clean the data
            }
            aggregateDistancesArray.push(sum); //store aggregate distance data
          }
        

          //Find minimum aggregate distance
          //===============================
          var min = aggregateDistancesArray[0];
          var minIndex = 0; //store the index as well to retrieve the actual destination with the minimum aggregate distance
          for(var x = 0; x < aggregateDistancesArray.length; x++) {
            if(aggregateDistancesArray[x] < min) {
              min = aggregateDistancesArray[x];
              minIndex = x;
            }
          }

          var optimalDestination = destinations[minIndex];
          //Print the information to the html page
          outputDiv.innerHTML += "Meet at " + optimalDestination + ". " +  min + " miles from everyone.";


      } //end of else
} //end of callback method
        
        
        
        
        
//Converts a numerical string to a float and strips it of commas
//==============================================================
function convertToFloat(dirtyString) {
  var tempArray = dirtyString.split(" "); //strip the units, assumed to be km
  var str = tempArray[0]; //this is the numerical string
  for(var i = 0; i < str.length; i++) {
    str = str.replace("," , ""); //strip commas
  }
  return parseFloat(str); //convert to float
}


google.maps.event.addDomListener(window, 'load', initialize);
      


    






//Beginning of Angular JS
//=======================
var ngAddApp = angular.module("ngAddApp", []);

    ngAddApp.controller("MainCtrl", ['$scope', function ($scope) {

      var numOf1 = 1; //number of origin address boxes
      var numOf2 = 1; //number of destination address boxes

      $scope.items1 = [ {} ]; //array of origin address boxes
      $scope.newItem1 = function () {

        if(numOf1 * numOf2 < 30) {
          $scope.items1.push( {} );
          numOf1++;
        }
      }

      $scope.items2 = [ {} ]; //array of destination address boxes
      $scope.newItem2 = function () { 

        if(numOf1 * numOf2 < 30) {
          $scope.items2.push( {} );
          numOf2++;
        }
      }



      $scope.go = function() {

        distancesArray = [];
        originsArray = new Array($scope.items1.length);
        destinationsArray = new Array($scope.items2.length);

        for(var i1 in $scope.items1) {
          originsArray[i1] = $scope.items1[i1].text;
        }

        for(var i2 in $scope.items2) {
          destinationsArray[i2] = $scope.items2[i2].text;
        }

        calculateDistances(originsArray, destinationsArray);
        
      }

}]);


function calculateDistances(originsArray, destinationsArray) {
    var service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
        {
          origins: originsArray,
          destinations: destinationsArray,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,
          avoidTolls: false
        }, callback);
}







$(document).ready(function(){
  //Smooth scroll to anchor
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({scrollTop: target.offset().top}, 1000);
              return false;
            }
        }
      });
  });


});