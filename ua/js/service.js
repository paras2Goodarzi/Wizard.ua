/* =============================================================================
  Ready Page
  ========================================================================== */
jQuery(document).ready(function () {

  /* Vars
    ========================================================================== */
  var currentLang = $('html').attr('lang'),
      _lang = dataLang[currentLang],
      timer4Slider,
      windowWidth = $(window).outerWidth(),
      windowHeight = $(window).outerHeight(),
      activeSliderInMultiTab;

  var $homeSlider1 = $('#home_slider_1'); // only Home-page_1 sec slider

  /* Init Page
    -------------------------------------------------------------------------- */
  function initPage() {
    if ($('#page_preloder').length) initPreloader();
    if ($('.field_password').length) initPassFields();
    if ($('.youtube').length) initYoutubeVideo();
    if ($homeSlider1.length) initHomeSlider();

    if ($('.news-carousel').length) initHistoryCarousel();
    if ($('.news_slider_container').length) initNewsSlider();
    if ($('.sec_home_4').length) initChangeBackground(0);
    if ($('#home_page').length && windowWidth > 767) initBgHomeVideo();

    setTimeout(function () {
      testInputEmpty();
    }, 350);
  }
  initPage();

  /* Preloader
    -------------------------------------------------------------------------- */
  function initPreloader() {
    window.scrollTo(0, 0);
    setTimeout(function () {
      $('body').removeClass('body_active_pre');
      clearInterval(preloadTimer);
        setTimeout(function () {
          $('#page_preloder').css('visibility', 'hidden');
        }, 750);
      }, 3000);

    var time = -2,
        c1 = '#fff',
        c2 = '#14afb7',
        flag = 0,
        preloadTimer = setInterval(function () {
          anim_pre();
        }, 7);

    function anim_pre() {
      drow();
      if (time >= 115) {
        if (c1 != c2 && flag == 0) {
          var sw = '';
          sw = c1;
          c1 = c2;
          c2 = sw;
          $('.stop-1').attr('stop-color', c1);
          $('.stop-2').attr('stop-color', c2);
          flag = 1;
        }
        time = -2;
        flag = 0;
      }
    }

    function drow() {
      time++;
      var time2 = time + 1;
      $('.stop-1').attr('offset', time + '%');
      $('.stop-2').attr('offset', time2 + '%');
    }
  }


  /* Init BgHomeVideo only on desktop
    -------------------------------------------------------------------------- */
  function initBgHomeVideo() {
    var sources = document.querySelectorAll('video.bghomevideo source');
    var video = document.querySelector('video.bghomevideo');
    for (var i = 0; i < sources.length; i++) {
      sources[i].setAttribute('src', sources[i].getAttribute('data-src1'));
    }
    video.load();
    video.muted = "muted";
  }

  /* Set Header type_3
    -------------------------------------------------------------------------- */
  if ($('.js_header_3').length) {
    $('.s_header').addClass('s_header_3');
  }

/* init slide_count
    -------------------------------------------------------------------------- */
  $('.slider_content').each(function () {
    var i = 1;
    $(this).find('.slide_count').each(function () {
      $(this).html(numberWithNull(i));
      i++;
    })

    var totalSlides = $(this).find('.js_slider_item').length;
    $(this).closest('.js_slider_wr').find('.allNumber').html(numberWithNull(totalSlides));
  })

  function numberWithNull(n) {
    return (n <= 9) ? '0' + n : n
  }

  /* Set Password fields
    -------------------------------------------------------------------------- */
  function initPassFields() {
    var btnTogglePass = '<a href="#" title="' + dataLang[currentLang].passwordShow + '" class="toggle_password"></a>';

    $('.field_password, .field_pass').each(function () {
      $(this).append($(btnTogglePass));
    })

    $('body').on('click', '.toggle_password', function (e) {
      e.preventDefault();
      var _self = $(this);
      var id = _self.closest('.field').find('input').attr('id');
      _self.toggleClass('active');
      changePassType(id, _self);
    })

    function changePassType(id, b) {
      var x = document.getElementById(id);
      if (x.type === "password") {
        b.addClass('active').attr('title', dataLang[currentLang].passwordHide);
        x.type = 'text';
      } else {
        b.removeClass('active').attr('title', dataLang[currentLang].passwordShow);
        x.type = "password";
      }
    }
  }

  /* FormStyler
    -------------------------------------------------------------------------- */
  $('input[type="number"], input[type="checkbox"], input[type="radio"], select, .add-files').styler();

/* Input Mask
    -------------------------------------------------------------------------- */
  $('.phone-mask').inputmask({
    "mask": "+38(999)9999999",
    showMaskOnHover: false,
    showMaskOnFocus: true,
  });

  /*
  $("input.tax_code").inputmask({
    "mask": "9{8}",
    showMaskOnHover: false,
    showMaskOnFocus: true,
  });
  */

/* Test input on empty
    -------------------------------------------------------------------------- */
  function testInputEmpty() {
    $('.field input').each(function () {
      if ($(this).val() != "") {
        $(this).closest('.field').addClass('focus');
      }
    });

    $('body').on('focus', '.form input', function () {
      $(this).closest('.field').addClass('focus');
    });

    $('body').on('blur', '.form input', function () {
      if ($(this).val().length === 0) {
        $(this).closest('.field').removeClass('focus');
      }
    });
  }

/* Check input valid Fio fields
    -------------------------------------------------------------------------- */
  var inputsFio = ['#fio', '#fio22'];

  for (let i = 0; i < inputsFio.length; i++) {
    $(inputsFio[i]).on('keyup focus', function () {
      checkFio(inputsFio[i]);
    });
  }

  function checkFio(field) {
    if ($(field).val().split(' ').length != 3) {
      $(field).closest('div').addClass('act_red');
    } else {
      $(field).closest('div').removeClass('act_red');
    }
  }


  /* FullPage
    -------------------------------------------------------------------------- */
  var idFullpage = '.fullpage',
      classSect = '.section',
      footerPage = '.page_footer',
      secHeader = '.s_header',
      secHeaderInner = '.s_header_inner',
      leftMenu = '#leftMenu';
  // var activeSection = 1;

  $(idFullpage).fullpage({
    css3: true,
    lockAnchors: true,
    scrollingSpeed: 1000,
    autoScrolling: true,
    fitToSection: true,
    fitToSectionDelay: 1000,
    scrollBar: false,
    easing: '',
    easingcss3: '',
    loopBottom: false,
    loopTop: false,
    loopHorizontal: true,
    continuousVertical: false,
    continuousHorizontal: false,
    scrollHorizontally: false,
    interlockedSlides: false,
    dragAndMove: false,
    offsetSections: false,
    resetSliders: false,
    fadingEffect: false,
    normalScrollElements: '#element1, .element2',
    scrollOverflow: true,
    scrollOverflowReset: false,
    scrollOverflowOptions: null,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,
    bigSectionsDestination: null,
    keyboardScrolling: true,
    animateAnchor: true,
    recordHistory: true,
    controlArrows: true,
    verticalCentered: true,
    paddingTop: '0',
    paddingBottom: '0',
    responsiveWidth: 1280,
    responsiveHeight: 0,
    responsiveSlides: false,
    parallax: false,
    sectionSelector: classSect,
    lazyLoading: true,
    menu: '#leftMenu',

    //events
    onLeave: function (index, nextIndex, direction) {

    },
    afterLoad: function (anchorLink, index) {
      if (index != 1) {
        $('.s_header.video-visible').removeClass('video-visible--active');
        $('.page_footer').removeClass('video-visible--active');
      }

      if (index != $('.fullpage .section').length && index != 1) {
        $(secHeader).addClass('s_header_2').addClass('main_bg');
        $(secHeaderInner).addClass('main_bg');
        $(footerPage).addClass('dark_color');
        $(leftMenu).show();
      } else {
        $(secHeader).removeClass('s_header_2').removeClass('main_bg');
        $(secHeaderInner).removeClass('main_bg');
        $(footerPage).removeClass('dark_color');
        $(leftMenu).hide();
      }

      if (anchorLink == 'sec_home_4') {
        if ('.sec_home_4') {
          $(secHeader).removeClass('main_bg');
          $(secHeaderInner).removeClass('main_bg');
          $(footerPage).removeClass('dark_color');
          $(leftMenu).addClass('light');
        }
      } else {
        $(leftMenu).removeClass('light');
      }

      if (index == $('.section').length) {
        $(footerPage).addClass('last-section');
        $('.info_modal_wrap').css('display', 'none');
      } else {
        $(footerPage).removeClass('last-section');
        $('.info_modal_wrap').css('display', 'block');
      }

      activeSliderInMultiTab = $('.section[data-anchor=' + anchorLink + ']').attr('data-active-slider');
      // console.log('this anchorLink: ', anchorLink);
      // console.log('this activeSliderInMultiTab: ', activeSliderInMultiTab);

      // Определить активный слайдер в мультитаб
      if ( activeSliderInMultiTab ) {

      } else {

      }

      var obj = Object.keys(objBars);
      for (let i = 0; i < obj.length; i++) {
        objBars[obj[i]].isPause = true;
        if (objBars[obj[i]].section == anchorLink) {
          objBars[obj[i]].isPause = false;
        }
      }
    },
    afterRender: function () {
      $('body').css('opacity', 1);
      if ($(this).hasClass('not-scroll')) {
        $.fn.fullpage.setAutoScrolling(false);
        $.fn.fullpage.setFitToSection(false);
      }
    },
    afterResize: function () {
    },
    afterResponsive: function (isResponsive) {
    },
    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
    },
    onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
    }
  });

  $('.btn_move_down').on('click', function () {
    $.fn.fullpage.moveSectionDown();
  });

  $('.sel_tab').on('click', function () {
    // $.fn.fullpage.reBuild();
  });

  $('.sec_home_2 .sel_tab[data-href="partners_2"]').on('click', function () {
    setTimeout(() => {
      $('#slider_content_partners').slick('setPosition');
    }, 500);
  });


  /* Videos
    -------------------------------------------------------------------------- */
  function initYoutubeVideo() {
    $('.youtube').each(function () {
      var idVideo = $(this).attr('data-id');
      var urlPoster = $(this).attr('data-poster');
      if (urlPoster && urlPoster != undefined && urlPoster != "") {
        $(this).css('background-image', 'url(' + urlPoster + ')');
      } else {
        $(this).css('background-image', 'url(https://i.ytimg.com/vi/' + idVideo + '/hqdefault.jpg)');
      }
    });
  }

  var reviewVideo = $('[data-remodal-id=modal-testemon-video]').remodal();

  $('.btn-play-testemon').on('click', function (e) {
    e.preventDefault();
    reviewVideo.open();
    var idVideo = $(this).attr("data-id");
    var iframe_url = "https://www.youtube.com/embed/" + idVideo + "?autoplay=1&autohide=1";
    if ($(this).data('params')) iframe_url += '&' + $(this).data('params');
    var iframe = $('<iframe/>', { 'src': iframe_url, 'allowfullscreen': 'true', 'id': 'video' + idVideo });
    $('#video-wrapper').append(iframe);
  });

  $(document).on('closed', '.remodal', function (e) {
    $('#video-wrapper iframe').remove();
  });

  $('.partners .btn-play-action').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.partners_wr').removeClass('active').parent().find('.partners_video_wr').addClass('active');
    $('.partners_video_wr.active .slider_content').slick('setPosition');
    // play slider #slider_content_partners
  });

  $('.partners .btn-cancel').on('click', function (e) {
    e.preventDefault();
    $(this).closest('.partners_video_wr').removeClass('active').parent().find('.partners_wr').addClass('active');
    // stop slider #slider_content_partners
  });


  /* EasyTabs
    -------------------------------------------------------------------------- */
  $('.tab-container').easytabs();

  $('.sel_tab').click(function () {
    var tab = $(this).attr('data-href');
    var too = $(this).attr('data-too');
    $("[data-tab='#" + too + "']").easytabs('select', tab);
  });

  $('#tab-container3').on('easytabs:midTransition', function () {
    setTimeout(function () {
      $('.brands.active .slider_content').slick('setPosition');
    }, 50);
  })


  /* Burger-menu toogle
    -------------------------------------------------------------------------- */
  $('.burger-menu').on('click', function () {
    $(this).toggleClass('active');
    $('.s_header_2').toggleClass('main_bg_2');
    $('.s_header_2 .s_header_inner').toggleClass('main_bg_2');
    $('.burger_menu_content').toggleClass('active');
    $('.s_header').toggleClass('active');
  });


  /* View-list/Tile-list toogle
    -------------------------------------------------------------------------- */
  $('.btn_common_tabs li').on('click', function () {
    $(this).closest('.btn_common_tabs').find('li').removeClass('active');
    $(this).addClass('active');
  });

  $('.view-tile-list li').on('click', function () {
    $(this).closest('.view-tile-list-wr').find('.view-tile-list li').removeClass('active');
    $(this).addClass('active');
  });

  $('.view-tile-list .list').on('click', function () {
    $('.view-tile-list .list').removeClass('list--active');
    $(this).addClass('list--active');
  });

  $('.tile-list').on('click', function () {
    $(this).closest('.section').find('.view_title_wr').removeClass('active');
    $(this).closest('.section').find('.title_wr').addClass('active');
    $(this).closest('.sec_contacts').find('.btn_common_tabs').removeClass('active').parent().removeClass('active');
    if ($(this).hasClass('brand-toogle-list')) {
      $('.brands.active .slider_content').slick('setPosition');
    }
  })

  $('.view-list').on('click', function () {
    $(this).closest('.section').find('.view_title_wr').removeClass('active');
    $(this).closest('.sec_contacts').find('.btn_common_tabs').addClass('active').parent().addClass('active');
    $(this).closest('.section').find('.view_wr').addClass('active');
    if ($(this).hasClass('brand-toogle-list')) {
      $('.brands.active .slider_content').slick('setPosition');
    }
  });

  $('.brand-toogle-list').on('click', function () {
    var idxView = $(this).attr('data-grid');
    var idxSlider = $(this).closest('.section').find('.crcl_btm.active .js_toogle_slider').attr('data-slider-'+idxView);
    $(this).closest('.section').attr('data-active-slider', idxSlider);
  });

  $('.js_toogle_slider').on('click', function () {
    var idxView = $(this).closest('.section').find('.list--active').attr('data-grid');
    var idxSlider = $(this).attr('data-slider-' + idxView);
    $(this).closest('.section').attr('data-active-slider', idxSlider);
  });



  /* Forms
    -------------------------------------------------------------------------- */
  var fileNotUploadedErrMess = '<div class="error_mes error_mes_file_not_uploaded allert_field">' + _lang.notSelectedFile +'</div>';
  var fileUploadErrorErrMess = '<div class="error_mes error_mes_file_not_uploaded allert_field">' + _lang.notLoadedFile +'</div>';
  var timerErrorForm;
  var modalSuccess = $('[data-remodal-id=modal-success]').remodal();


  jQuery('#form-reg2 input[type=file]').on('change', prepareUpload);

  function prepareUpload(event) {
    var files = event.target.files;
    jQuery(event.target).parent().find('.error_mes').remove();
    if (!files.length) {
      jQuery(event.target).parent().find('.jq-file__browse').text(_lang.chooseFile)
    }
    var fileName = event.target.name;
    var csrftoken = getCookie('csrftoken');
    var headers = {};
    if (csrftoken && csrftoken.length) {
      headers["X-CSRFToken"] = csrftoken;
    }

    jQuery.each(files, function (key, value) {
      var data = new FormData();
      data.append('file', value);
      data.append('name', fileName);

      jQuery.ajax({
        url: '/api/v1/counterparties/documents',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        headers: headers,
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function (data, textStatus, jqXHR) {
          if (typeof data.error === 'undefined') {
            jQuery(event.target).parent().find('.jq-file__browse').text(_lang.replaceFile)
          }
          else {
            // Handle errors here
            console.log('ERRORS: ' + data.error);
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          jQuery(event.target).parent().append(fileUploadErrorErrMess)
        }
      });
    });
  }

  jQuery(document).on('submit', '#form-reg2', function (e) {
    jQuery(e.target).find('.error_mes').remove();
    e.preventDefault(); // avoid to execute the actual submit of the form.

    var form = $(this);
    var url = form.attr('action');
    var json = getFormData(form);
    delete json.csrfmiddlewaretoken;
    delete json.from;
    var someFilesNotUploaded = false;
    var fileInputs = jQuery('#form-reg2 input[type=file].req');

    fileInputs.each(function (index, input) {
      if (!input.files.length) {
        jQuery(fileInputs[index]).parent().append(fileNotUploadedErrMess)
        someFilesNotUploaded = true;
      }
      if (jQuery(input).parent().find('.error_mes').length) {
        someFilesNotUploaded = true;
      }
    })

    form.find('.allert').remove();

    if ($('#fio').closest('.field').hasClass('act_red')) {
      jQuery('<div class="allert">' + _lang.enterFio +'</div>').insertAfter(form.find('#fio'))
      return;
    }

    if (someFilesNotUploaded) {
      jQuery(form).append('<div style="margin-top: 20px;" class="error_mes error_mes_file_not_uploaded">' + _lang.filesNotUploaded +'</div>');
      return;
    }

    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(json),
      contentType: 'application/json; charset=utf-8',
      success: function (data) {
        window.location = "/dashboard";
      },
      error: function (xhr) {
        // ToDo: handle form Errores
        var errors = xhr.responseJSON || {};
        Object.keys(errors).map(function (key) {
          if (!errors[key]) return;
          errors[key].forEach(function (error) {
            jQuery('<div class="allert">' + error + '</div>').insertAfter(form.find('.field [name=' + key + ']'))
          })
        })
      }
    });
  });

  jQuery('[name=send]').click(function () {
    jQuery(':input.error, .field.error, .data-protection').removeClass('error');
    jQuery('.allert').remove();
    clearTimeout(timerErrorForm);

    var error,
        btn = jQuery(this),
        thisForm = btn.closest('form'),
        ref = thisForm.find('[required]'),
        send_btn = thisForm.find('[name=send]'),
        from = thisForm.find('[name=from]').val(),
        error_mess_1 = '<div class="allert"><span>'+ _lang.fillFields +'</span></div>',
        error_mess_2 = '<div class="allert"><span>'+ _lang.enterValidEmail +'</span></div>',
        error_mess_3 = '<div class="allert"><span>'+ _lang.enterValidPhone +'</span></div>',
        error_mess_4 = '<div class="allert"><span>'+ _lang.enterValidPassword +'</span></div>',
        error_mess_5 = '<div class="allert"><span>'+ _lang.enterValidFio +'</span></div>',
        error_mess_6 = '<div class="allert"><span>'+ _lang.minLengthField +'</span></div>',
        error_mess_7 = '<div class="allert"><span>'+ _lang.uploadAllNeedFiles +'</span></div>',
        error_mess_8 = '<div class="allert"><span>'+ _lang.selectCompanyType +'</span></div>';

    var pas11 = thisForm.find('#login-pass').val(),
        pas22 = thisForm.find('#login-pass2').val(),
        pas1 = thisForm.find('#login-pass4').val(),
        pas2 = thisForm.find('#login-pass5').val(),
        urll = '';

    switch (from) {
      case 'modal-login':
        urll = '/api/v1/auth/login';
        break;
      case 'modal-reg':
        urll = '/api/v1/auth/register';
        break;
      case 'modal-resset-pass':
        urll = '/api/v1/auth/password/reset';
        break;
      case 'modal-resset-pass2':
        urll = '/api/v1/auth/password/change';
        break;
      default:
        urll = '/api/v1/forms'; // 'base-form', 'subscribe-form', 'footerForm', 'burger'
    }

    // Validate form
    if (from == 'modal-reg') {
      if ( $('#fio22').closest('.field').hasClass('act_red') ) {
        jQuery('<div class="allert">'+ _lang.enterFio +'</div>').insertAfter( $('#fio22') )
        return;
      } else {
        $('#fio22').closest('.field').find('.allert').remove()
      }

      if ( !$('select[name=company_type]').val().length ) {
        error = 1;
        $('select[name=company_type]').parent().parent().addClass('error').append(error_mess_8);
      } else {
        $('select[name=company_type]').parent().parent().find('.allert').remove();
      }
    }

    jQuery(ref).each(function () {
      if (jQuery(this).val() == '') {
        var errorfield = jQuery(this);
        jQuery(this).parent('.field').addClass('error').append(error_mess_1);
        error = 1;
        jQuery(":input.error:first").focus();
        return;
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if (jQuery(this).attr("type") == 'email') {
          if (!pattern.test(jQuery(this).val())) {
            jQuery("[name=email]").val('');
            jQuery(this).parent('.field').addClass('error').append(error_mess_2);
            error = 1;
            jQuery(":input.error:first").focus();
          }
        }
        var patterntel = /^((\+380|0)([0-9]{9}))?$/i;
        if (jQuery(this).attr("type") == 'tel') {
          var phone_num = jQuery(this).val();
          phone_num = phone_num.replace('(', '').replace(')', '');
          jQuery(this).val(phone_num);
          if (!patterntel.test(phone_num)) {
            jQuery("[name=tel]").val('');
            jQuery(this).parent('.field').addClass('error').append(error_mess_3);
            error = 1;
            jQuery(":input.error:first").focus();
          }
        }
        var patterntel = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i;
        if (jQuery(this).attr("type") == 'password'
          || jQuery(this).attr("id") == 'login-pass5'
          || jQuery(this).attr("id") == 'login-pass4'
          || jQuery(this).attr("id") == 'login-pass2'
          || jQuery(this).attr("id") == 'login-pass') {
          if (!patterntel.test(jQuery(this).val()) || pas1 != pas2 || pas11 != pas22) {
            // jQuery("[name=password]").val('');
            jQuery(this).parent('.field').addClass('error').append(error_mess_4);
            error = 1;
            jQuery(":input.error:first").focus();
          }
        }
      }
    });

    var msg = thisForm.find('input, textarea, select');
    var form = thisForm;

    if (!(error == 1)) {
      jQuery(send_btn).each(function () {
        jQuery(this).attr('disabled', true);
      });

      $('.loader').show();

      var csrftoken = getCookie('csrftoken');
      var headers = {};
      if (csrftoken && csrftoken.length) {
        headers["X-CSRFToken"] = csrftoken;
      }

      if (from == 'modal-reg') {
        var jsonData = getFormData(form);
        var isJson = true;
        jsonData.phone = jsonData.phone.replace('(', '').replace(')', '');
      } else if (from == 'base-form' || from == 'subscribe-form') {
        var jsonData1 = getFormData(form);
        var isJson = true;
        var jsonData = {
          type: '',
          payload: {}
        };
        jsonData.type = jsonData1.type;
        for (var key in jsonData1) {
          if (key != 'type' && key != 'from') {
            jsonData.payload[key] = jsonData1[key];
          }
        }
      }

      form.find('.error_mes').remove();
      form.find('.allert').remove();
      form.find('.global-form-errors').html('');

      jQuery.ajax({
        type: 'POST',
        url: urll,
        data: isJson ? JSON.stringify(jsonData) : msg,
        contentType: isJson ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded; charset=UTF-8',
        headers: headers,
        success: function (data) {
          switch (from) {
            case 'modal-reg':
              // showSuccess(_lang.successRegistration);
                localStorage.setItem('token', data.token);
                window.location = "/dashboard";
              break;

            case 'modal-login':
              localStorage.setItem('token', data.token);
              window.location = "/dashboard";
              break;

            case 'modal-resset-pass':
              showSuccess(_lang.successResetPassword);
              break;

            case 'modal-resset-pass2':
              $('[data-remodal-id=modal-login]').remodal().open();
              break;

            case 'base-form':
              showSuccess(_lang.successBase);
              thisForm.trigger('reset');
              break;

            case 'subscribe-form':
              showSuccess(_lang.successSubscribe);
              thisForm.trigger('reset');
              break;
          }
        },
        error: function (xhr) {
          var errors = xhr.responseJSON;
          var message = '';

          if (xhr.status != 500 || xhr.status != 403) {
            handleErrors(errors, form);
          } else {
            message = _lang.problemSendForm;
          }

          if (xhr.status == 403 && from == 'modal-login') {
            message = _lang.accountNotVerify;
          }

          if (from == 'base-form' || from == 'subscribe-form') {
            message = _lang.problemSendForm;
          }

          if (message) {
            showGlobErrorForm(message, form);
          }
        },
        complete: function () {
          jQuery(send_btn).each(function () {
            jQuery(this).attr('disabled', false);
          });
          $('.loader').hide();
        }
      });
    } else {
      clearErrorMesForm();
    }
    return false;
  })

  function clearErrorMesForm() {
    clearTimeout(timerErrorForm);
    timerErrorForm = setTimeout(function () {
      jQuery('.field.error, input.error, .data-protection').removeClass('error');
      jQuery('.global-form-errors').html('');
      jQuery('.allert').remove();
    }, 8000);
  }

  function showSuccess(data) {
    $('#modal-success-header').html(data.title);
    $('#modal-success-text').html(data.text);
    modalSuccess.open();
  }

  function handleErrors(errors, form) {
    if (!errors) {
      showGlobErrorForm(_lang.problemSendForm, form);
      return;
    }
    var isShowFieldGlob = false;
    Object.keys(errors).map(function (key) {
      if (!errors[key]) return;
      if (typeof errors[key] === 'object') {
        var errorField = form.find('.field [name=' + key + ']');
        if (key === 'non_field_errors') {
          showGlobErrorForm(errors[key][0], form);
        } else if (errorField.length == 0 && !isShowFieldGlob) {
          showGlobErrorForm(_lang.incorrectData, form);
          isShowFieldGlob = true;
        } else {
          jQuery('<div class="allert">' + errors[key][0] + '</div>').insertAfter($(errorField));
        }
      } else {
        if (errors[key] !== undefined) {
          showGlobErrorForm(errors[key], form);
        }
      }
    })
  }

  function showGlobErrorForm(err, form) {
    jQuery('<div class="allert">' + err + '</div>').appendTo(form.find('.global-form-errors'));
  }


  /* Sliders
    -------------------------------------------------------------------------- */
  function initHomeSlider() {
    $homeSlider1.slick({
      infinite: true,
      arrows: false,
      dots: false,
      accessibility: false,
      autoplay: false,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1199,
          settings: {
            arrows: true,
            prevArrow: $('.home_container_wr .inner').find('.prev_arr'),
            nextArrow: $('.home_container_wr .inner').find('.next_arr')
          }
        }]
    });
  }




  var timeSlid = 3000;


  $('.slider_content_2').slick({
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    accessibility: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '<button class="slider_btn_prev prev_arr bl_arr dark"><i class="left-arrow icon-arrow icon-arrow_left"></i></button>',
    nextArrow: '<button class="slider_btn_next next_arr bl_arr dark"><i class="right-arrow icon-arrow"></i></button>',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  });

  $('.slider_content_3').slick({
    arrows: true,
    dots: false,
    infinite: true,
    autoplay: false,
    accessibility: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: timeSlid,

    prevArrow: '<button class="slider_btn_prev prev_arr bl_arr"><i class="icon-arrow_left icon-arrow icon-arrow_left"></i></button>',
    nextArrow: '<button class="slider_btn_next next_arr bl_arr"><i class="right-arrow icon-arrow"></i></button>',
  });



  var idxGlobBar = 0;
  var objBars = {};

  // init all progressBarContainer
  $('.progressBarContainer').each(function (indexGlobal) {
    $(this).find('.progressBar').each(function (indexInner) {
      var progress = "<span class='inProgress inProgress" + idxGlobBar + " innerIdx-" + indexInner + "'></span>";
      idxGlobBar++;
      $(this).html(progress);
    });

    var idxBar = $(this).attr('id');
    var durationSlider = $(this).attr('data-duration');
    var durationSliderDefault = '3';

    if (idxBar) {
      objBars[idxBar] = {};
      objBars[idxBar].section = $(this).closest('.section').attr('data-anchor');
      objBars[idxBar].isPause = true;
      objBars[idxBar].type = $(this).attr('data-type');

      if (durationSlider) {
        objBars[idxBar].duration = durationSlider;
      } else {
        objBars[idxBar].duration = durationSliderDefault;
      }

      if (idxBar) {
        objBars[idxBar].idSlider = idxBar.substr(4);
      } else {
        objBars[idxBar].idSlider = undefined;
      }
      initProgress(objBars[idxBar].idSlider, objBars[idxBar].duration, idxBar, true);
    }
  });
  // initProgress("home_slider_1", objBars['pbc-home_slider_1'].duration, "pbc-home_slider_1", true);
  // console.log('objBars: ', objBars);

  var onClickbtnSlider = false;
  $('.slider_btn_next, .slider_btn_prev').on('click', function(){
    onClickbtnSlider = true;
  });

  // Init animation ProgressBar and run slider
  function initProgress(slick, timeSlider, progressBar, firstInit) {
    var time = parseInt(timeSlider),
        innerIdxLine = -1,
        barr = $('#' + progressBar).find('.innerIdx-0'),
        $slick = $('#'+slick),
        t, percentValue, canClick = true,
        percentTime;

    $slick.on({
      mouseenter: function () {
        objBars[progressBar].isPause = true;
      },
      mouseleave: function () {
        objBars[progressBar].isPause = false;
      },
      swipe: function (event, slick, direction) {
        startProgressbar(event.target.slick.currentSlide);
      },
      afterChange: function (event, slick, currentSlide) {
        if (onClickbtnSlider) {
          startProgressbar(event.target.slick.currentSlide);
          onClickbtnSlider = false;
        }
      }
    })

    function startProgressbar(onSlide) {
      resetProgressbar();
      percentTime = 0;
      if (!firstInit) {
        objBars[progressBar].isPause = false;
      }

      // currentSlide++ to toogle progressLine
      if (objBars[progressBar].type === 'multibar') {
        resetProgressbar();
        if (onSlide === undefined) {
          if (innerIdxLine < $slick[0].slick.slideCount - 1) {
            innerIdxLine++;
          } else {
            innerIdxLine = 0;
          }
        } else {
          innerIdxLine = onSlide;
        }
        barr = $('#' + progressBar).find('.innerIdx-' + innerIdxLine);
        $('#' + progressBar + ' .dot-count').removeClass('active');
        $('#' + progressBar + ' .dot-count:eq(' + innerIdxLine + ')').addClass('active');
      } else {
        innerIdxLine = 0;
      }

      t = setInterval(interval, 1000);
    }

    function interval() {
      if (objBars[progressBar].isPause === false) {
        percentTime += 100 / (time + 0.1);
        percentValue = percentTime / 100;
        $(barr).addClass('a').css({
          '-webkit-transform': 'scaleX(' + percentValue + ')',
          'transform': 'scaleX(' + percentValue + ')',
        });
        if (percentTime >= 100) {
          $slick.slick('slickNext');
          startProgressbar();
        }
      } else {
        // clearInterval(t);
      }
    }

    function resetProgressbar() {
      $(barr).removeClass('a').css({
        '-webkit-transform': 'scaleX('+ 0 +')',
        'transform': 'scaleX('+ 0 +')'
      });
      clearTimeout(t);
    }

    if (objBars[progressBar].type === 'multibar') {
      $('.progressBarContainer[data-type="multibar"] > div').click(function () {
        if (canClick) {
          canClick = false;
          var idBar = $(this).closest('.progressBarContainer').attr('id'),
              idSlider = idBar.substr(4),
              goToThisIndex = $(this).find(".progressBar").data("slickIndex");

          $('#' + idSlider).slick('slickGoTo', goToThisIndex, false);
          startProgressbar(goToThisIndex);
          setTimeout(() => {
            canClick = true;
          }, 500);
        }
      });
    }

    startProgressbar();
  }

  // show slide-count
  $('.slider_content').on('afterChange', function (event, slick, currentSlide, nextSlide, slideCount) {
    var allN = slick.slideCount,
        slid = $(this),
        countSlid = slid.closest('.js_slider_wr').find('.numberCount'),
        allSlid = slid.closest('.js_slider_wr').find('.allNumber');
        currentSlide = currentSlide + 1;

    allSlid.html(numberWithNull(allN));
    countSlid.html(numberWithNull(currentSlide));
  });


  // change background on 4-th screen at Home page
  function initChangeBackground(curNumber) {
    function reset4Slider() {
      clearTimeout(timer4Slider);
      $('.sec_home_4 .sec_bg.active').removeClass('active');
      $('.sec_home_4 .inProgress.active').removeClass('active');
    }

    function play4Slider(curNumber) {
      reset4Slider(curNumber);
      if (curNumber > 3) curNumber = 0;
      $('.sec_home_4 .sec_bg:eq(' + curNumber + ')').addClass('active');
      $('.sec_home_4 .innerIdx-' + curNumber).addClass('active');
      curNumber++;
      timer4Slider = setTimeout(function () {
        play4Slider(curNumber);
      }, 5000);
    }

    $('.sec_home_4 .s_slider_item').on('click', function() {
      var idxSlide = $(this).find('.progressBar').attr('data-slick-index');
      reset4Slider();
      setTimeout(() => { play4Slider(idxSlide); }, 50);
    });
    play4Slider(curNumber);
  }



  // Init news slider at Home
  function initNewsSlider() {
    $('.news_slider_container').slick({
      arrows: true,
      dots: false,
      infinite: true,
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 769,
          settings: {
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<button class="slider_btn_prev prev_arr bl_arr light"><i class="left-arrow icon-arrow_left"></i></button>',
            nextArrow: '<button class="slider_btn_next next_arr bl_arr light"><i class="right-arrow icon-arrow"></i></button>'
          }
        }
      ]
    });
  }

  // Init carousel news
  function initHistoryCarousel() {
    var $carouselNews = $('.news-carousel'),
        $newsSlide = $carouselNews.find('.news-slide'),
        x = 0,
        current = 0,
        itemMoving = $(window).outerWidth() < 1024 ? 1 : 2;

        $carouselNews.css({ width: ($newsSlide.length * $newsSlide.outerWidth(true)) + 540 });

    $('.news-arrows').on('click', 'a', function (e) {
      e.preventDefault();

      if ($(this).hasClass('next')) {
        var next = current >= $newsSlide.length - 1 ? 0 : current + itemMoving;
        if (next > $newsSlide.length - 1) next = $newsSlide.length - 1;
      } else {
        var next = current == 0 ? $newsSlide.length - 1 : current - itemMoving;
        if (next <= 0) next = 0;
      }

      $carouselNews.find('.news-slide.no-visible').removeClass('no-visible');
      $carouselNews.find('.news-slide:lt(' + next + ')').addClass('no-visible');

      TweenMax.to($carouselNews, 0.5, { x: next == 0 ? 0 : -$newsSlide.eq(next).position().left });
      current = next;
    });
  }






})



/* =============================================================================
    Functions
   ========================================================================== */

/* Get Form Data
  -------------------------------------------------------------------------- */
function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};

  $.map(unindexed_array, function (n, i) {
    indexed_array[n['name']] = n['value'];
  });

  return indexed_array;
}

/* Get Cookie v1
  -------------------------------------------------------------------------- */
// function getCookie(name) {
//   var matches = document.cookie.match(new RegExp(
//     "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//   ));
//   return matches ? decodeURIComponent(matches[1]) : undefined;
// }


/* Get Cookie v2
  -------------------------------------------------------------------------- */
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}


/* Google Map
  -------------------------------------------------------------------------- */
function initMap() {
  var map;
  var initLatLng = $('.mapClick:eq(0)').attr('data-coordinates')
  var initLatlngStr = initLatLng.split(',', 2);
  var initLat = parseFloat(initLatlngStr[0]);
  var initLng = parseFloat(initLatlngStr[1]);
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  var mapOptions = {
    zoom: 17,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    draggable: true,
    scaleControl: false,
    center: new google.maps.LatLng(initLat, initLng),
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  var mapElement = document.getElementById('map');

  // Create the Google Map using our element and options defined above
  if (mapElement) {
    map = new google.maps.Map(mapElement, mapOptions);
  }

  var img = 'https://wizard.ua/static/corporate_ua/img/mark.png';

  // Let's also add a marker while we're at it
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(initLat, initLng),
    icon: img,
    map: map
  });

  $('.mapClick').on('click', function (e) {
    e.preventDefault();
    var tar = $(this).attr('data-target');
    var latLng = $(this).attr('data-coordinates');
    var latlngStr = latLng.split(',', 2);
    var lat = parseFloat(latlngStr[0]);
    var lng = parseFloat(latlngStr[1]);

    $('.city.active').removeClass('active');
    $('.city[data-target="' + tar + '"]').addClass('active');

    marker.setPosition(new google.maps.LatLng(lat, lng));
    map.panTo(new google.maps.LatLng(lat, lng));
  });
}


// $('#info_mod_open').on('click', function () {
//     $('.info_modal_wrap').toggleClass('hid_inf');

//     if ($('.info_modal_wrap').hasClass('hid_inf')) {
//         $('#info_mod_open').html('Детальніше');
//     } else {
//         $('#info_mod_open').html('Сховати');
//     }
// });

// $('.my_clos').on('click', function () {
//     $('.info_modal_wrap').toggleClass('hid_nax');
// })


// ToDo: нельзя так делать, переделать на css
// if (windowWidth < 1200) {
//     $('.brands .slider_content_3').slick('unslick');
// }
