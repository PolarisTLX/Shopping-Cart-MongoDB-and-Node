//from the stripe website in my test account:
var stripe = Stripe('pk_test_u1QMmOOZllAMGaVz4N54Pd30');

//selecting the form with jQuery using the id from checkout.hbs?
var $form = $('#checkout-form')

//jQuery listener method that will get executed when form is submitted:
$form.submit(function(event) {
  //if we got errors before, when click submit again, the errors get hidden
  //and only appear agaqin (below) if new error pop up
  $('#charge-error').addClass('hidden');
  $form.find('button').prop('disabled', true);
  //stripe card code from the website
  //(different than tutorial, likely due to V2 versus newer V3)
  Stripe.card.createToken({
    number: $('#card-number').val(),
    cvc: $('#card-cvc').val(),
    exp_month: $('#card-expiry-month').val(),
    exp_year: $('#card-expiry-year').val(),
    name: $('#card-name').val()
  }, stripeResponseHandler);
  //to prevent an actual submittion to the server yet becuase it hasnt been validated yet:
  return false;
});

function stripeResponseHandler(status, response) {
  if (response.error) {  //Problem
    //show the errors on the form:
    $('#charge-error').text(response.error.message);
    $('#charge-error').removeClass('hidden');
    $form.find('button').prop('disabled', false);  //Re-enable submission

  } else { //Token was created
      //Get token ID:
      var token = response.id;
      //insert token into the form so it gets submitted to the server:
      $form.append($('<input type="hidden name="stripeToken" />').val(token));
      //submit the form:
      $form.get(0).submit();
  }
}
