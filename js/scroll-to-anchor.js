/**
 * SCROLL TO ANCHOR LINK
 * - Hỗ trợ di chuyển lúc ban đầu khi trên đường dẫn HTTP
 * - Hỗ trợ di chuyển tới vị trí cụ thể (Number) và di chuyển tới vị trí của ID/Class Node
 * - Hỗ trợ Header Bar (vị trí fixed) : sẽ trừ đi chiều cao để thấy được trọn vẹn vùng target
 * - Hỗ trợ WPAdmin: sẽ trừ đi chiều cao của id "wpadminbar" nếu nó tồn tại
 * - Hỗ trợ phần chênh lệch với thuộc tính `data-goto-diff()`
 */
$(function() {
  // return false;
  var $goAnchor = $('[data-goto-anchor]');
  var goDuration = 400;


  // Thiết lập di chuyển Anchor Link lúc ban đầu khi có ID trên đường link http
  setTimeout(thietlapDichuyenAnchorlinkBangHTTP, 200)


  // Thiết lập di chuyển tới Anchor Link trên các Link
  $goAnchor.each(function() {
    var $this = $(this);

    $this.on('click', function(e) {
      e.preventDefault() 
      thietlapDichuyentoiAnchorLink($this);
    })
  })


  /**
   * FUNCTION THIẾT LẬP DI CHUYỂN TỚI ANCHOR LINK
   */
  function thietlapDichuyentoiAnchorLink($link, target) {
    var duration = $link.data('goto-duration') || goDuration;
    var diff = $link.data('goto-diff');
    var chenhlech = false;
    var type = false;
    var $target;

    // Thiết lập đối tượng target
    if (target == undefined) {
      target = $link.data('goto-anchor');
    }


    // Hỗ trợ [data-goto-anchor] là Number và ID/Class DOM
    if ($.isNumeric(target)) {
      type = 'vitri';
    }
    else if ( !/^\s*$/.test(target) ) {
      $target = $( target );
      if ($target.length) type = 'idClass';
    }

    // Điều kiện tiếp tục thực hiện
    if (!type) return;


    // Setup phần chêch lệch
    chenhlech = GetChenhLech(diff);
    var chenhlechHeader = GetChenhLechHeader();
    var chenhlechWPAdminbar = GetChenhLechWPAdminbar();

    // Setup phần vị trí cụ thể
    var vitriTarget = false;
    if (type == 'vitri') {
      vitriTarget = target
    }
    else if (type == 'idClass') {
      vitriTarget = $target.offset().top - chenhlechHeader - chenhlechWPAdminbar
    }

    // console.log("#1", $target, $target.offset().top, $target[0].getBoundingClientRect())
    if (vitriTarget !== false) {
      $([document.documentElement, document.body]).animate({
        scrollTop: vitriTarget - chenhlech + 1
      }, {
        duration: duration,

        // Đóng lại Menu khi click và Link
        start: function() {
          if (!!window.navMain) {
            window.navMain.pushOff()
          }
        },

        // Fixed phần chênh lệch không đúng vị trí sau khi di chuyển scrolling
        complete: function() {
          var chenhlechFinal = GetChenhLech(diff);
          if (chenhlechFinal != chenhlech) {

            $([document.documentElement, document.body]).animate({
              scrollTop: vitriTarget - chenhlechFinal + 1
            }, 100)
          }
        }
      })
    }
  }


  /**
   * THIẾT LẬP DI CHUYỂN TỚI ANDCHOR LINK TRÊN HTTP LÚC BAN ĐẦU
   */
  function thietlapDichuyenAnchorlinkBangHTTP() {
    var hrefHash = window.location.hash;
    if (hrefHash != "") {
      var $target = $(hrefHash);

      if ($target.length) {
        thietlapDichuyentoiAnchorLink($target, hrefHash)
      } 
    }
    return false
  }


  // Function setup phần chênh lệnh
  function GetChenhLech(diff) {
    if ($.isNumeric(diff)) {
      return parseInt(diff)
    }
    else if (/^\.|#/.test(diff)) {
      return $(diff).outerHeight();
    }
    return 0;
  }

  // Thiết lập chênh lệch Header Fixed
  // Chỉ thiết lập chênh lệch khi phần Header ở vị trí "fixed"
  function GetChenhLechHeader() {
    var $header = $(".site-branding.scroll-inner");
    var hHeader = $header.outerHeight();
    
    // if ($header.css('position') == 'fixed') {
    if ($header.length) {
      return hHeader;
    }
    return 0;
  }

  // Thiết lập chênh lệch WP AdminBar
  function GetChenhLechWPAdminbar() {
    var $wpAdminBar = $("#wpadminbar");
    var hAdminbar = $wpAdminBar.outerHeight();
    
    // if ($header.css('position') == 'fixed') {
    if ($wpAdminBar.length) {
      return hAdminbar;
    }
    return 0;
  }
});