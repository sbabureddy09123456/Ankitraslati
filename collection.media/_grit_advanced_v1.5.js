
// Venkata Ramana P Aug-27 2019
// grit algorithm

function generateGrit(para, main_id, stpwords, stopwords, convo) {
  $("#panelFooter").slideUp('slow');
  $("#panelChoice").show();
  window.location.href = '#panelHeading';
  $("#" + main_id).html('');
  para = para.replace(/'/g, "\'");
  if (!convo) {
    $("#extra").html(para);
    $("#extra").blast({ delimiter: 'word' });
    var par_words1 = [];
    $("#extra .blast").each(function () {
      par_words1.push($(this).html());
    })
  } else {
    para = para.replace(/<br>/g, ' <br> ');
    par_words1 = para.split(" ");
  }

  var s_words = stopwords;
  var par_words2 = par_words1.filter(function (val) {
    return s_words.indexOf(val.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")) == -1;
  });


  var par_words = [];
  $.each(par_words2, function (i, el) {
    if ($.inArray(el, par_words) === -1) par_words.push(el);
  });
  if (stpwords != '') {
    var br = ['<br><br>', ''];
    stpwords = stpwords.split(",,");
    stpwords = stpwords.concat(br);
    var par_words = par_words.filter(function (val) {
      return stpwords.indexOf(val) == -1;
    })
  }

  var numOfBlanks = parseInt(par_words.length / 3);
  if (numOfBlanks <= 0) numOfBlanks = 1;
  var blank_words = getRandom(par_words, numOfBlanks);

  var blankCount = 0;
  var choiceWords = [];
  $("#" + main_id).html("");

  for (i = 0; i < par_words1.length; i++) {
    if (blank_words.indexOf(par_words1[i]) > -1) {
      $("#" + main_id).append(` <div id='blank_id${blankCount}' class='blank' data-name="${par_words1[i]}">?</div>`);
      choiceWords.push(par_words1[i]);

      blankCount++;
    } else {
      if (stpwords.indexOf(par_words1[i]) != -1 && stpwords.indexOf(':')) {
        $("#" + main_id).append(" <span style='color:#6D4BFE'>" + par_words1[i] + "</span> ");
      } else {
        $("#" + main_id).append(" " + par_words1[i] + " ");
      }
    }
  }

  //choice word display
  $("#panelChoice").html("<span class='badge badge-primary' style='position:absolute;top:0;left:0;'>options</span>");
  for (var i = 0; i < choiceWords.length; i++) {
    $('#panelChoice').append("<div class='choicee' id='choice" + i + "'>" + choiceWords[i] + "</div>");
  }
  //shuffle
  var parent = $("#panelChoice");
  var divs = parent.children();
  while (divs.length) {
    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
  }
  var focasName = '';
  var focasId = '';
  var blankThis = '';

  $("#" + main_id + " .blank:first").addClass('blank-active');

  var clickCount = 0;
  var inpCount = $(".blank").length;
  var score = 0;

  $('#panelChoice .choicee').click(function () {

    focasName = $('.blank-active').attr('data-name');
    focasId = $('.blank-active').attr('id');
    blankThis = $('.blank-active');
    var btnVal = $(this).text();
    focasId = focasId.replace('blank_id', '');
    $('#choice' + focasId).addClass("swirl-out-bck");

    clickCount++;
    if (focasName == btnVal) {
      $(blankThis).replaceWith("<span style='color:green;font-weight:bold'>" + focasName + "</span>");
      score++;
      if (clickCount < inpCount) {
        $(".blank").removeClass('blank-active');
        $("#" + main_id + " .blank:first").addClass('blank-active');
        $("#"+main_id).scrollTop($("#"+main_id).scrollTop() + $("#" + main_id + " .blank:first").position().top
          - $("#"+main_id).height() / 2 + $("#" + main_id + " .blank:first").height() / 2);
      }
    } else {
      $(this).addClass('shake-lr');
      $(".choicee").css({ "pointer-events": "none" });
      setTimeout(function () {
        $(".choicee").removeClass('shake-lr');
        $(".choicee").css({ "pointer-events": "auto" });
      }, 500);
      $(blankThis).replaceWith("<span style='color:#dc3545;font-weight:bold'>" + focasName + "</span>");
    }

    if (clickCount == inpCount) {
      $("#" + main_id).append('<br><br><strong class="text-info">You have scored ' + score + ' out of ' + inpCount + '</strong>');
      totalInputScore = totalInputScore + score;
      totalScore = totalScore + inpCount;
      $("#panelFooter").slideDown('slow');
      window.location.href = '#panelFooter';
      $('#panelChoice').css({ 'display': 'none' });
    }
    $(".blank").removeClass('blank-active');
    $("#" + main_id + " .blank:first").addClass('blank-active');

  })
}



