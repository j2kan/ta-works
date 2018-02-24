$(document).ready(function() {
  $('#btn').on('click', function(e) {
      $("#dialog-confirm").dialog('open');
  });

  $("#dialog-confirm").dialog({
      resizable: false,
      height: 190,
      autoOpen: false,
      width: 330,
      modal: true,
      buttons: {
          "Submit": function() {
              $('#myform').submit(function () {
                 return false;
              });
          },
          Cancel: function() {
              $(this).hide();
          }
      }
  });

  $( ".number" ).on( "click", function() {
    if($( ".number:checked" ).length > 3)
    {
      $('#btn').prop('disabled', false);
    }
    else
    {
      $('#btn').prop('disabled', true);
    }
  });

  // hide all the inital reason inputs
  function hideInputs() {
      $(".reason_class").hide();
  }
  hideInputs();

  // listener for preference, creates a reason button if the rating is greater than 0
  $(".middle").each(function(i, j){
    $(j).find('.pref_class').on('change', function(){
      var val = $(j).find('.pref_class').val();
      // check for rating greater than 0
      if (val > 0) {
        // make the button if it doesn't exist
        if ($(j).find('.input_button').length == 0) {
          $(j).append(createReasonButton());
        }
      }
      // remove created button if rating reflects no longer interested in teaching the course
      // note: if previously rated 2, entered a reason and then later entered 0, the reason will
      // still save in the database.
      else {
        $(j).find('.input_button').remove();
      }
    })
  });

  // this is similar to a button click listener to prompt the user to enter a reason
  function btnClick(e){
    e.preventDefault();
    var currentContext = $(this).parent();
    // makes a temporary dialog for taking user input
    $('<div><p>Please indicate why you are fit for teaching this course. Include any relevant past experience in your answer. <br> (1500 character limit)</p><textarea maxlength=1500 id=tempBox ></textarea></div>').dialog({
      modal: true,
      height: 615,
      width: 750,
      resizable: false,
      draggable: false,
      closeOnEscape: false,
      title: "Enter your reason below.",
      buttons: {
        'OK': function () {
          currentContext.find('.reason_class').val($('#tempBox').val());
          $(this).dialog("destroy");
          $(this).remove();
        },
        'Cancel': function () {
          $(this).dialog("destroy");
          $(this).remove();
        }
      }
    });
    $('#tempBox').val(currentContext.find('.reason_class').val());
  };

  // creates the enter reason button
  function createReasonButton() {
    return $('<button/>', {
      text: 'Enter Reason',
      class: 'input_button',
      click: btnClick
    });
  }
});

