// Fallout Password Terminal Challenge

$(function() {

  // Hide Password Grid
  $passwordGrid = $("#js-pwd-grid");
  $passwordGrid.hide();

  // Hide Terminal Div
  $terminalDiv = $("#js-terminal-div");
  $terminalDiv.hide();

  // Create password lists
  var billingPasswords = [
    'kreolo',
    'treelo',
    'grillo',
    'kraalo',
    'ubollo',
    'araalo',
    'buzalo',
    'pifzlo'
  ];

  var hrPasswords = [
    'reticulate',
    'arbicolase',
    'seticolair',
    'ratelicare',
    'vrabilbase',
    'resacubate',
    'rehashfate',
    'fatarketea',
    'ubekgadare',
    'subloglare'
  ];

  var mfPasswords = [
    'worshipfully',
    'whimsicality',
    'wherethrough',
    'watermanship',
    'watchfulness',
    'weatherboard',
    'wattenscheid',
    'weatherglass',
    'westernizing',
    'wretchedness',
    'whoremastery',
    'westernising',
    'wollastonite',
    'wordlessness',
    'wirelessness'
  ];

  // Set the number of allowed guesses
  var BILLING_GUESSES = 5;
  var HR_GUESSES      = 4;
  var MF_GUESSES      = 3;

  // Function to create random passwords
  // To be used later, use secret passwords below for now
  function createSecret(secretList) {
    var n = Math.floor(Math.random() * secretList.length);
    return secretList[n];
  }

  // Set the correct (secret) passwords manually, temporary
  var billingSecret = createSecret(billingPasswords);
  var hrSecret      = createSecret(hrPasswords);
  var mfSecret      = createSecret(mfPasswords);

  // Function to check how many characters are correct
  function checkPassword($passwd, secret) {
    var correct = 0;
    for (var i = 0; i < $passwd.length; i++) {
      for (var j = 0; j < secret.length; j++) {
        if ($passwd[i] === secret[j]) {
          correct++;
        }
      }
    }
    return correct;
  }

  // function printPasswords(passwdList) {
  //   $printDiv.prepend("<p>Here's your password list, choose wisely:</p>");
  //
  //   for (var i = 0; i < passwdList.length; i++) {
  //     $printLi.append("<li>" + passwdList[i] + "</li>");
  //   }
  // }

  $thCells = $("tbody tr th");

  $thCells.each(function() {
    $(this).hover(
      function() { // mouseenter
        $(this).css({
          'background-color': '#FFFFFF',
          'border': '1px solid #3C423C'
        });
      },
      function() { // mouseleave
        $(this).css({
          'background-color': '#3C423C',
          'border': '1px solid #939393'
        });
      }
    ); // .hover() ends

    $(this).one("click",  // one() stops subsequent clicks, on() does not
      function() {
        $(this).css({
          'background-color': '#FFFFFF',
          'border': '3px solid'
        })
      },
      function() {
        $passwordGrid.slideDown("slow", function() {
          for (var i = 0; i < hrPasswords.length; i++) {
            $(this).append("<p>" + hrPasswords[i] + "</p>");
          }

          $(this).show();
          $('html, body').animate({
            scrollTop: $("#js-pwd-grid p").offset().top
          }, 1500);
        }); // .slideDown() ends
      }
    ); // .click() ends
  }); // .each() ends

  $passwordGrid.on("click", function() {
    var hSecret = createSecret(hrPasswords);
    console.log(hSecret);
    $("p").on("click", function() {
      if ($(this).text() === hSecret) {
        $terminalDiv.show();
        $terminalDiv.append("<h1>Ready > <span>|</span></h1>")
        $('html, body').animate({
          scrollTop: $("#js-terminal-div").offset().top
        }, 500);
      } else {
        console.log($(this).text() + ' is not correct!');
      }
      return false;
    });
  });

}); // main jquery ready ends
