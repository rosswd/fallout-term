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
  function checkPassword(passwd, secret) {
    var correct = 0;
    for (var i = 0; i < passwd.length; i++) {
      if (passwd.charAt([i]) === secret[i]) {
        correct++;
      }
    }
    return correct;
  }

  $thCells = $("tbody tr th");

  $thCells.each(function() {
    $(this).hover(
      function() { // mouseenter
        $(this).css({
          // 'background-color': '#FFFFFF',
          'background-color': '#939393',
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
      function() {       // ...hmm, clicking a different cell fails
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
    var attempts = 0;

    $("p").on("click", function() {
      var charsCorrect = 0;

      if (attempts < HR_GUESSES) {
        console.log((HR_GUESSES - attempts) + " attempts remaining");

        if ($(this).text() === hSecret) {
          $terminalDiv.show();
          $terminalDiv.append("<h3>Ready > <span>|</span></h3>");
          $terminalDiv.prepend("<h2>Basic OK</h2>")

          $('html, body').animate({
            scrollTop: $("#js-terminal-div").offset().top
          }, 500);
        }

        charsCorrect = checkPassword($(this).text(), hSecret);
        console.log(charsCorrect + " correct");

        attempts += 1;

        if (attempts === HR_GUESSES) {
          console.log('Maximum attempts exceeded.');
        }
      }

      return false;
    });
  });

}); // main jquery ready ends
