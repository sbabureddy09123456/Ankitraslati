// Justify Multiple Images
// Author: Venkata Ramana. P ("pvrreddy155@gmail.com")
// fit multiple images in a div without overflow
// Responsive - works in desktop, tab and mobile
// Github: itsmepvr.github.io/

(function ($) {
  $.fn.justifyMultipleImages = function () {
    let promise = new Promise((resolve, reject) => {
      if ($(this).find('img').length == 0) {
        resolve('');
        return;
      }
      // get the parent height and width
      var par_height = $(this).height();
      var par_width = $(this).width();
      // get the child height and width
      var child_height = $(this).find('img').height();
      var child_width = $(this).find('img').width();

      // Condition to check overflow for parent
      var isOverflown = $(this)[0].scrollHeight > $(this)[0].clientHeight || $(this)[0].scrollWidth > $(this)[0].clientWidth;
      count = 0;

      if (isOverflown == true) {
        while (isOverflown) {
          child_width -= 1;
          child_height -= 1;
          $(this).find("img").css({ "width": child_width + "px", "height": child_height + "px" });
          isOverflown = $(this)[0].scrollHeight > $(this)[0].clientHeight || $(this)[0].scrollWidth > $(this)[0].clientWidth;
        }
      } else {
        while (!isOverflown) {
          child_width += 1;
          child_height += 1;
          $(this).find("img").css({ "width": child_width + "px", "height": child_height + "px" });
          isOverflown = $(this)[0].scrollHeight > $(this)[0].clientHeight || $(this)[0].scrollWidth > $(this)[0].clientWidth;
          if (isOverflown) {
            child_width -= 2;
            child_height -= 2;
            $(this).find("img").css({ "width": child_width + "px", "height": child_height + "px" });
          }
        }
      }
      console.log({ child_width, child_height })
      resolve('');
    })
    return promise;
  }
})($);
