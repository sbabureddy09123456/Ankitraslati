
(async function () {
    console.clear();
    $("#qa").hide(); // Hide to show only when code compile done
    $("#wrapper").hide();
    // Anki issue sometimes opacity not setting back to one
    $("#qa").css({ "opacity": "1" });
    console.log("NoteType :" + " " + $("#ankiType").html());

    window.oddImages = {
        "0": ["_oddgif_butterfly-drink.gif"],
        "1": ["_oddgif_bird-zebra.gif"],
        "2": ["_oddgif_butterfly-drink.gif"],
        "3": ["_oddgif_chickk.gif"],
        "4": ["_oddgif_monkey.gif"],
        "5": ["_oddgif_bird-zebra.gif"],
        "6": ["_oddgif_elephant-2.gif", "_oddgif_unicornn.gif"],
        "7": ["_oddgif_elephant-2.gif"],
        "8": ["_oddgif_elephant-2.gif"],
        "9": ["_oddgif_chickk.gif"],
        "10": ["_oddgif_unicornn.gif"],
        "11": ["_oddgif_dog-teddy.gif"]
    }

    window.headingImages = [
        "_nestor_heading_image_bee3.gif",
        "_nestor_heading_image_bird-flying.gif",
        "_nestor_avatar_cat.gif",
        "_nestor_heading_image_chicken.gif",
        "_nestor_heading_image_butterfly.gif",
        "_nestor_heading_image_dragon.gif",
        "_nestor_heading_image_elephant-movement.gif",
        "_nestor_heading_image_girl-waving.gif",
        "_nestor_heading_image_kicking-ball.gif",
        "_nestor_heading_image_rabbit.gif",
        "_nestor_avatar_unicorn.gif",
        "_nestor_heading_image_apple.gif",
    ]

    window.reinforcementImages = [["_reinforcement_1.gif", "reinforcement_you_are_a_rockstar.mp3"], ["_reinforcement_2.gif", "reinforcement_good_job.mp3"], ["_reinforcement_3.gif", "reinforcement_you_are_a_hero.mp3"], ["_reinforcement_4.gif", "reinforcement_super.mp3"], ["_reinforcement_5.gif", "reinforcement_well_done.mp3"], ["_reinforcement_6.gif", "reinforcement_very_good.mp3"], ["_reinforcement_7.gif", "reinforcement_cool.mp3"], ["_reinforcement_8.gif", "reinforcement_super_hero.mp3"], ["_reinforcement_9.gif", "reinforcement_bravo.mp3"]];

    window.animateHeadingImage = true;

    window.deviceType = getDeviceType(); // Device type - desktop, mobile, laptop
    window.userOS = getUserOS(); // OS type - Windows, Android, Linux
    window.deviceWidth = $(window).width();
    window.deviceHeight = $(window).height();
    console.log({ deviceType });
    console.log({ userOS });
    console.log("Screen Size: " + deviceWidth + ' x ' + deviceHeight);

    window.analytics_time = {
        "i": 2, // image
        "a": 1, // audio
        "s": 2, // sentence
        "c": 1, // click
        "t": 0, // default time
        "o": 0, // other times if any
    };

    window.analytics = {
        "correct": 0, // correct moves
        "wrong": 0, // wrong moves
        "max_time": 0, // max time for card
        "time_taken": 0 // time taken for card
    }

    // Loading user info
    if (window.$userInfo_) {
        window.customUserInfo = window.$userInfo_;
    } else {
        window.customUserInfo = {
            "user_info": true,
            "label_name": "Student Name",
            "label_institution": "School Name",
            "label_location": "School Location",
            "gender": "boy",
            "voice": "western",
            "name": "",
            "institution": "The State Police Academy",
            "location": "Chhattisgarh",
            "avatars": [
                "_nestor_avatar_bee3",
                "_nestor_avatar_bird-flying",
                "_nestor_avatar_cat",
                "_nestor_avatar_chicken",
                "_nestor_avatar_butterfly",
                "_nestor_avatar_dragon",
                "_nestor_avatar_elephant-movement",
                "_nestor_avatar_girl-waving",
                "_nestor_avatar_kicking-ball",
                "_nestor_avatar_rabbit",
                "_nestor_avatar_unicorn",
                "_nestor_avatar_apple",
            ]
        }
    }

    window.avatars = window.customUserInfo['avatars'];
    // Check for localStorage and sessionStorage
    var showPopup = false;
    console.log(Modernizr.localstorage);
    if (Modernizr.localstorage) {
        var info = localStorage.getItem("userInfo");
        console.log({ info });
        if (info) {
            window.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            showPopup = false;
        } else {
            window.userInfo = {
                "name": (customUserInfo['name']) ? customUserInfo['name'] : '',
                "institution": (customUserInfo['institution']) ? customUserInfo['institution'] : '',
                "location": (customUserInfo['location']) ? customUserInfo['location'] : '',
                "avatar": "0",
                "gender": (customUserInfo['gender']) ? customUserInfo['gender'] : 'boy',
                "voice": (customUserInfo['voice']) ? customUserInfo['voice'] : 'western'
            }
            showPopup = true;
        }
    } else {
        window.userInfo = {
            "name": (customUserInfo['name']) ? customUserInfo['name'] : '',
            "institution": (customUserInfo['institution']) ? customUserInfo['institution'] : '',
            "location": (customUserInfo['location']) ? customUserInfo['location'] : '',
            "avatar": "0",
            "gender": (customUserInfo['gender']) ? customUserInfo['gender'] : 'boy',
            "voice": (customUserInfo['voice']) ? customUserInfo['voice'] : 'western'
        }
        showPopup = false;
    }
    // showPopup = true;
    console.log(window.userInfo);
    $('.se-pre-con').fadeOut('slow', function () { $(this).remove(); });
    if (customUserInfo['user_info'] && showPopup) {
        $('#qa').fadeIn('slow');
        await addUserInfoPopup(true);
        $(".se-pre-con").show();
        loadHTML();
    } else {
        $('#qa').fadeIn('slow');
        await addUserInfoPopup(false);
        $(".se-pre-con").show();
        loadHTML();
    }
})();

function loadHTML() {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    $("#qa").css({ "height": windowHeight + "px", "width": "100%" });
    $("#wrapper").show();
    $("#wrapper").css({ "opacity": "0" });

    // Tooltip bootstrap
    $('[data-toggle="tooltip"]').tooltip();

    // Colors and Shapes Variable
    window.ankiTags = getAnkiTags();
    if (ankiTags['Class'] == 'pre_primary') {
        window.colors = ['red', 'green', 'blue', 'yellow'];
        window.shapes = ["square", "circle", "triangle", "rectangle"];
    } else {
        window.colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'black'];
        window.shapes = ["square", "circle", "triangle", "rectangle", "pentagon", "hexagon", "parallelogram", "rhombus", "octagon"];
    }

    if (ankiTags['Language'] !== 'english') {
        $('body').css({ "line-height": '1.2 !important' });
    }

    // Navbar
    $(".n-wrapper").prepend(`<!-- Navbar top -->
    <div class='n-cardBackground' style='display:none'></div>
    <div class='n-navbar'>
        <div class='n-logo n-navbarItem'>
            <img src='_logo1.png' onerror="if (this.src != '_missing_image.png') this.src = '_missing_image.png';" style='width:30px;height:30px;'>	
        </div>
        <div class='n-schoolName n-navbarItem' onclick='$(".userInfoPopup").fadeIn(200);'><span class='customSchoolName'>${window.userInfo['institution']}</span>&nbsp; - &nbsp;<span class='customSchoolLocation'>${window.userInfo['location']}</span></div>
        <div type='button' class='n-instructions n-navbarItem' data-placement="auto" data-toggle="modal" data-target="#modal_instructions">
            Instructions
        </div>
        <div class='n-timer n-navbarItem' id='n-timer'>
            <span class='n-timer-hour'>00</span><span class='n-timer-min'>:00</span><span class='n-timer-sec'>:00</span>
        </div>
        <div class='n-goldcoin n-navbarItem'>
            <span class='n-coinCount'>0</span><img src='_goldcoin.gif' onerror="if (this.src != '_missing_image.png') this.src = '_missing_image.png';" style='width:30px;height:30px;'>
        </div>
    </div>`);

    // Note Id
    let noteId = $("#noteId").text();

    $(".n-wrapper").append(`<!-- Note Id -->
    <div class='n-noteId'>
      <div class='badge badge-light pull-left n-studentName triggerUserInfoPopup' style='${(window.userInfo['name'] == '') ? 'display:none' : ''}'>${window.userInfo['name']}</div>
      <div class='badge badge-light pull-right' style='${(noteId == '') ? 'display:none' : ''}'>ID:${noteId}</div>
      <div class='showAnswerTooltip font_9'>Click below to Show Answer</div>
    </div>
    `);

    // panel
    $(".panel").prepend(`<div class="n-panelBackground" style='display:none'></div>`);

    // Randomly moving gif
    $(".n-wrapper").append(`<div class='randomlyMoving' style='display:none'></div>`);

    let modalPopup = `<div id="modal_instructions" class="modal fade" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Instructions</h4>
          </div>
          <div class="modal-body">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`;
    $(".n-wrapper").append(modalPopup);

    if (window.userDevice === 'desktop') $(".n-instructions").html("Instructions");
    else $(".n-instructions").html(" ? ");
    let instructions_video = wrapText($("#n-instructions-video").html()).trim();
    let instructions_audio_w = $("#n-instructions-audio-w").text().trim();
    let instructions_audio_n = $("#n-instructions-audio-n").text().trim();
    let instructions_text = wrapText($("#n-instructions-text").html()).trim();
    if (instructions_video != '') {
        let instruction = `<video id="video1" controls width='100%'>
      <source src="${instructions_video}" type="video/mp4">
      Your browser does not support HTML video.
    </video>`;
        $("#modal_instructions .modal-body").html(instruction);
    } else if (instructions_text != '') {
        $("#modal_instructions .modal-body").html(instructions_text);
    } else if (instructions_audio_n != '' && instructions_audio_w != '') {
        if (window.userInfo['voice'] == 'western') {
            var aud = instructions_audio_w;
        } else {
            var aud = instructions_audio_n;
        }
        playAudioTag({
            elem: $("#modal_instructions .modal-body"),
            audio: [aud],
            autoplay: false
        });
    } else if (instructions_audio_n != '' || instructions_audio_w != '') {
        if (instructions_audio_w != '') {
            var aud = instructions_audio_w;
        } else {
            var aud = instructions_audio_n;
        }
        playAudioTag({
            elem: $("#modal_instructions .modal-body"),
            audio: [aud],
            autoplay: false
        });
    } else {
        $(".n-instructions").hide();
    }

    // Set gold coin count
    if (Modernizr.localstorage) var mainScore = localStorage.getItem('mainScore') || 0;
    else var mainScore = 0;
    if (mainScore > 100) {
        mainScore = 0;
    }

    $(".n-coinCount").html(mainScore);

    // Custom Background for card, panel and images
    let card_bg = $("#n-cardBackground");
    let panel_bg = $("#n-panelBackground");
    let image_bg = $("#n-imageBackground").html();
    window.backgroundColors = ["linear-gradient(to right top, #fddde0, #fedae1, #ffd6e4, #fed3e8, #fbd1ed)", "linear-gradient(to right top, #fdd7fc, #f4d5fd, #ebd4fd, #e2d2fc, #d8d1fb)", "linear-gradient(to right top, #e8d7fd, #e0dbff, #d9deff, #d4e1fd, #d1e3fb)", "linear-gradient(to right top, #d7e8fd, #d2edff, #cff2fe, #cef7fc, #d1fbf7)", "linear-gradient(to right top, #d7fdfb, #d2fdf5, #cffdee, #cffce6, #d1fbdc)", "linear-gradient(to right top, #d7fdd9, #dffdd6, #e7fcd3, #effcd2, #f7fbd1)", "linear-gradient(to right top, #fdfbd7, #fff4d4, #ffedd2, #fee7d1, #fbe1d1)", "linear-gradient(to right top, #fdded7, #fddce3, #f3ddf0, #e3e1f9, #d1e5fb)"];

    if (card_bg.length && card_bg.find('img').length) {
        let htm = card_bg.html();
        let n_opacity = "0.6";
        if (htm.indexOf("::") != -1) n_opacity = htm.split("::")[1];
        $(".n-cardBackground").show();
        $(".n-cardBackground").css({ "background-image": "url('" + card_bg.find('img').attr('src') + "')", "opacity": n_opacity });
    } else {
        let bgColor = getRandom(backgroundColors, 1)[0];
        $('.n-wrapper').css({ "background-image": bgColor });
    }
    window.showPanelBackground = false;
    if (panel_bg.length && panel_bg.find('img').length) {
        let htm = panel_bg.html();
        let n_opacity = "0.4";
        if (htm.indexOf("::") != -1) n_opacity = htm.split("::")[1];
        window.showPanelBackground = true;
        $(".n-panelBackground").show();
        $(".n-panelBackground").css({ "background-image": "url('" + panel_bg.find('img').attr('src') + "')", "opacity": n_opacity });
    }
    if (image_bg != '') {
        $(".n-panelImageBackground").css({
            "width": "150px",
            "height": "150px",
            "cursor": "pointer",
            "border-radius": "4px",
            "border": "4px ridge goldenrod",
            "background-color": image_bg,
            "box-shadow": "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            "transition": "all 0.3s cubic-bezier(.25, .8, .25, 1)"
        });
    }
    $(".randomlyMoving").html(`<img onclick='$(".userInfoPopup").fadeIn(200);' src='${window.avatars[window.userInfo['avatar']]}.gif' onerror="if (this.src != '_missing_image.png') this.src = '_missing_image.png';" />`);

    if (Modernizr.sessionstorage) var userSession = sessionStorage.getItem('userSession') || 'false';
    else var userSession = 'false';
    // userSession = 'false';

    setTimeout(function () {
        playBackgroundMusic();
        if (userSession == null || userSession == 'false') {
            userSession = 'true';
            if (Modernizr.sessionstorage) sessionStorage.setItem('userSession', 'true');
            loadWelcomePopup().then(function () {
                $("#wrapper").css({ "opacity": "1" });
                loadInnerCard().then(function (anim) {
                    setDefaults_();
                    Timer();
                    if (anim) {
                        setTimeout(function () {
                            animateDiv('.randomlyMoving', 0);
                        }, 1500);
                    }
                });
            })
        } else {
            $("#wrapper").css({ "opacity": "1" });
            loadInnerCard().then(function (anim) {
                setDefaults_();
                Timer();
                if (anim) {
                    setTimeout(function () {
                        animateDiv('.randomlyMoving', 0);
                    }, 1500);
                }
            });
        }
    }, 100);

}

function setDefaults_() {
    $('img').attr('onerror', `if (this.src != '_missing_image.png') this.src = '_missing_image.png';`);
}

$(window).resize(function () {
    console.clear();
    window.deviceType = getDeviceType(); // Device type - desktop, mobile, laptop
    window.userOS = getUserOS(); // OS type - Windows, Android, Linux
    window.deviceWidth = $(window).width();
    window.deviceHeight = $(window).height();
    console.log({ deviceType });
    console.log({ userOS });
    console.log("Screen Size: " + deviceWidth + ' x ' + deviceHeight);
    window.userDevice = checkDeviceFromWidth();
    if (window.userDevice === 'desktop') $(".n-instructions").html("Instructions");
    else $(".n-instructions").html(" ? ");
    if (window.userDevice == 'mobile') $(".n-timer-sec").hide();
    else $(".n-timer-sec").show();
});

// Timer
function Timer() {
    var seconds = (Modernizr.sessionstorage) ? sessionStorage.getItem("n-seconds") || 0 : 0;
    var minutes = (Modernizr.sessionstorage) ? sessionStorage.getItem("n-minutes") || 0 : 0;
    var hours = (Modernizr.sessionstorage) ? sessionStorage.getItem("n-hours") || 0 : 0;
    var t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        let time = '';
        $(".n-timer-hour").html((hours ? (hours > 9 ? hours : "0" + hours) : "00"));
        $(".n-timer-min").html(":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00"));
        $(".n-timer-sec").html(":" + (seconds > 9 ? seconds : "0" + seconds));

        if (Modernizr.sessionstorage) {
            sessionStorage.setItem("n-seconds", seconds);
            sessionStorage.setItem("n-minutes", minutes);
            sessionStorage.setItem("n-hours", hours);
        }

        if (window.userDevice == 'mobile') $(".n-timer-sec").hide();
        else $(".n-timer-sec").show();

        timer();

    }

    function timer() {
        t = setTimeout(add, 1000);
    }
    // start run timer
    timer();
}

// WelcomePopup
function loadWelcomePopup() {
    let promise = new Promise((resolve, reject) => {
        $('.se-pre-con').fadeOut('slow', function () { $(this).remove(); });
        $(".welcomePopup").remove();
        $(".welcomePopup_overlay").remove();
        let popup = `<div class='welcomePopup_overlay font_9'><div class='welcomePopup'>
          <div class='welcomePopup_name font_9'><b>Welcome ${window.userInfo['name']}</b></div>
          <div class='welcomePopup_avatar'><img src='${window.avatars[window.userInfo['avatar']]}.png' onerror="if (this.src != '_missing_image.png') this.src = '_missing_image.png';" /></div>
          Click to continue
      </div>`;
        $(".n-wrapper").append(popup);
        $(".welcomePopup").unbind('click').click(function () {
            loadNoteTypeInfo().then(function () {
                $(".welcomePopup_overlay").fadeOut(2000);
                $(".welcomePopup").fadeOut(2000, function () {
                    resolve();
                });
            });
        });
    });
    return promise;
}

function loadNoteTypeInfo() {
    let promise = new Promise((resolve, reject) => {
        let notetype = $("#ankiType").html();
        let info = window.notetypes_info;
        if (info.hasOwnProperty(notetype)) {
            var val = info[notetype];
            $(".welcomePopup_name").hide();
            $(".welcomePopup_avatar").html(val);
            $(".welcomePopup_avatar").css({ "text-align": "left", "width": "100%", "height": "auto", "border": "1px solid gray", "border-radius": "0", "padding": "8px" });
            let bgg = getRandom(window.backgroundColors, 1);
            $(".welcomePopup").css({ "font-size": "24px", "width": "100%", "cursor": "pointer", "background-image": bgg[0] });
            $(".welcomePopup").unbind('click').click(function () {
                resolve();
            });
        } else {
            resolve();
        }
    });
    return promise;
}

// Backrground Music using html5 Audio
function playBackgroundMusic() {
    let promise = new Promise((resolve, reject) => {
        let aud = $("#n-backgroundMusic").text();
        if (aud == '') return;
        $(".n-wrapper").append(`<audio id='backgroundMusic' style='display:none;' autoplay loop>
    <source src="${aud}" type="audio/mpeg">
    </audio>`);
        let audio = document.getElementById('backgroundMusic');
        audio.volume = 0.09;
        var promise = document.getElementById('backgroundMusic').play();
        window.isBackgroundMusicPlaying = true;
        if (promise !== undefined) {
            promise.then(_ => {
                console.log('background music playing....');
                resolve('');
            }).catch(error => {
                window.isBackgroundMusicPlaying = false;
                $('.n-wrapper').unbind('click').click(function () {
                    if (!window.isBackgroundMusicPlaying) {
                        document.getElementById('backgroundMusic').play();
                        window.isBackgroundMusicPlaying = true;
                    }
                });
            });
        }
    });
    return promise;
}

// Randomly movie div across page

function makeNewPosition() {
    var hh = $(".randomlyMoving").height();
    var h = $(window).height() - hh;
    var w = $(window).width() - hh;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];

}

function animateDiv(myclass, cnt) {
    var newq = makeNewPosition();
    if (cnt == 0) {
        var oldq = makeNewPosition();
        $(myclass).css({ "top": oldq[0], "left": oldq[1] });
        $(myclass).show();
    }
    $(".panelHeadingImage").attr('src', window.headingImages[window.userInfo['avatar']]);
    $(myclass).animate({ top: newq[0], left: newq[1] }, 1000, function () {
        cnt++;
        if (cnt >= 3) {
            $(myclass).animate({ top: 0, left: '0' }, 1000, function () {
                if ($(".panelHeadingImage").length > 0) {
                    $(".randomlyMoving").fadeOut('slow');
                    $(".panelHeadingImage").css({ "visibility": "visible" });
                    $(".panelHeadingImage").fadeIn('slow');
                }
            });
        } else {
            animateDiv(myclass, cnt);
        }
    });
};

// Set Window Size
function setWindowSize() {
    let promise = new Promise((resolve, reject) => {
        window.mainWindowWidth = $(window).width();
        window.mainWindowHeight = $(window).height();
        $("#qa").css({ "height": mainWindowHeight + "px", "width": mainWindowWidth + "px" });
        window.userDevice = checkDeviceFromWidth();
        console.log("Device type based on width -- " + userDevice);
        resolve();
    });
    return promise;
}

// Add User info Popup
function addUserInfoPopup(show) {
    let promise = new Promise((resolve, reject) => {

        let innerHtml = ``;
        if (window.customUserInfo['avatars'].length !== 0) {
            innerHtml += `<div id='downloadAnchorElem' class='userInfoPopup-pic' data-val='${window.userInfo['avatar']}'><img src='${window.customUserInfo['avatars'][window.userInfo['avatar']]}.png' onerror="if (this.src != '_missing_image.png') this.src = '_missing_image.png';" /><br><div class='button_3d_3 userInfoPopup-avatarBtn'>Change Avatar</div></div>`;
            innerHtml += `<div class='avatarPopup font_9' style='display:none'>
            <div class='avatarPopup_header'><h3>Choose Avatar</h3></div>
            <div class='avatarPopup_body'>${window.customUserInfo['avatars'].map(function (avatar, index, arr) {
                return (window.userInfo['avatar'] == index.toString()) ? `<div class="avatarPopup_icon avatarPopup_icon_selected" data-val="${index}"><img src="${avatar}.png"  onerror="if (this.src != '_missing_image.png') this.src = '_missing_image.png';"/></div>` : `<div class="avatarPopup_icon" data-val="${index}"><img src="${avatar}.png" onerror="if (this.src != '_missing_image.png') this.src = '_missing_image.png';" /></div>`;
            }).join('')}
            </div>
            <div class='avatarPopup_footer'><div class='btn btn-info avatarPopup-save'>Save</div><div class='btn btn-danger avatarPopup-cancel'>Cancel</div></div>
            </div>`;
        }
        if (window.customUserInfo['label_name'] !== '') {
            innerHtml += `<div class='userInfoPopup-label'>${window.customUserInfo['label_name']}</div><input class='userInfoPopup-input userInfoPopup-name' value='${window.userInfo['name']}' />`;
        }
        if (window.customUserInfo['label_institution'] !== '') {
            innerHtml += `<div class='userInfoPopup-label'>${window.customUserInfo['label_institution']}</div><input class='userInfoPopup-input userInfoPopup-institution' value='${window.userInfo['institution']}' />`;
        }
        if (window.customUserInfo['label_location'] !== '') {
            innerHtml += `<div class='userInfoPopup-label'>${window.customUserInfo['label_location']}</div><input class='userInfoPopup-input userInfoPopup-location' value='${window.userInfo['location']}' />`;
        }
        innerHtml += `<table class='userInfoPopup-table'>`;
        if (window.customUserInfo['label_voice'] !== '') {
            innerHtml += `
            <tr>
                <td><div class='userInfoPopup-label'>Voice: </div></td>
                <td><div class='userInfoPopup-bt button_3d_1 ${(window.userInfo['voice'].toLowerCase() === 'western') ? 'userInfoPopup-voice-selected' : ''} userInfoPopup-voice' data-value='western'>Western</div></td>
                <td><div class='userInfoPopup-bt button_3d_1 ${(window.userInfo['voice'].toLowerCase() === 'native') ? 'userInfoPopup-voice-selected' : ''} userInfoPopup-voice' data-value='native'>Native</div></td>
            </tr>
            `;
        }
        innerHtml += "</table>";

        var html_ = `<div class='userInfoPopup font_2' style='${(show == false) ? 'display:none' : ''}'>
        <div class='userInfoPopup-box'>
          <div class='userInfoPopup-content'>${innerHtml}</div>
          <div>
            <div class='userInfoPopup-btn'><div class='userInfoPopupButtons userInfoPopup-save'>Save</div><div class='userInfoPopupButtons userInfoPopup-cancel'>Cancel</div></div>
          </div>
        </div>
      </div>`;
        $(".n-wrapper").append(html_);

        // UserInfoPopup Trigger Events
        var info = window.customUserInfo;
        var info_ = window.userInfo;
        $(".userInfoPopup-gender").unbind('click').click(function () {
            $(".userInfoPopup-gender").removeClass('userInfoPopup-gender-selected').removeClass('btn-info');
            $(this).addClass('userInfoPopup-gender-selected').addClass('btn-info');
        });
        $(".userInfoPopup-voice").unbind('click').click(function () {
            $(".userInfoPopup-voice").removeClass('userInfoPopup-voice-selected').removeClass('btn-info');
            $(this).addClass('userInfoPopup-voice-selected').addClass('btn-info');
        });
        $(".userInfoPopup-avatarBtn").unbind('click').click(function () {
            let val = $(".userInfoPopup-pic").attr('data-val');
            $(".avatarPopup_icon").removeClass('avatarPopup_icon_selected');
            $(`.avatarPopup_icon[data-val='${val}']`).addClass('avatarPopup_icon_selected');
            $(".avatarPopup").fadeIn(100);
        });
        $(".avatarPopup_icon").unbind('click').click(function () {
            $(".avatarPopup_icon").removeClass('avatarPopup_icon_selected');
            $(this).addClass('avatarPopup_icon_selected');
        });
        $(".avatarPopup-cancel").unbind('click').click(function () {
            let val = $(".userInfoPopup-pic").attr('data-val');
            $(".avatarPopup_icon").removeClass('avatarPopup_icon_selected');
            $(`.avatarPopup_icon[data-val='${val}']`).addClass('avatarPopup_icon_selected');
            $(".avatarPopup").fadeOut(400);
        });
        $(".avatarPopup-save").unbind('click').click(function () {
            let val = $('.avatarPopup_icon_selected').attr('data-val');
            $(".userInfoPopup-pic").attr('data-val', val);
            $(".userInfoPopup-pic img").attr('src', info['avatars'][val] + '.png');
            if (window.animateHeadingImage && $(".panelHeadingImage").length > 0) {
                $(".panelHeadingImage").attr('src', window.headingImages[val]);
                $(".panelHeadingImage").css({ "visibility": "hidden" });
            }
            $(".avatarPopup").fadeOut(400);
        });
        $(".userInfoPopup-save").unbind('click').click(function () {
            if (info['avatars'].length > 0) info_['avatar'] = $(".userInfoPopup-pic").attr('data-val');
            if (info['label_name'] !== '') info_['name'] = $(".userInfoPopup-name").val();
            if (info['label_institution'] !== '') info_['institution'] = $(".userInfoPopup-institution").val();
            if (info['label_location'] !== '') info_['location'] = $(".userInfoPopup-location").val();
            if (info['gender'] !== '') info_['gender'] = $(".userInfoPopup-gender-selected").attr('data-value');
            if (info['voice'] !== '') info_['voice'] = $(".userInfoPopup-voice-selected").attr('data-value');
            if (Modernizr.localstorage) localStorage.setItem('userInfo', JSON.stringify(info_));
            $(".randomlyMoving img").attr('src', `${window.customUserInfo['avatars'][info_['avatar']]}.gif`);
            if (info_['name'] == '') $(".n-studentName").hide();
            else $(".n-studentName").html(info_['name']).show();
            if (info_['institution'] == '') $(".customSchoolName").hide();
            else $(".customSchoolName").html(info_['institution']).show();
            if (info_['location'] == '') $(".customSchoolLocation").hide();
            else $(".customSchoolLocation").html(info_['location']).show();
            $(".userInfoPopup").fadeOut(200);
            animateDiv('.randomlyMoving', 0);
            resolve('userInfoPopup_save');
        });
        $(".userInfoPopup-cancel").unbind('click').click(function () {
            $(".userInfoPopup").fadeOut(200);
            resolve('userInfoPopup_cancel');
        });

        if (!show) {
            resolve('');
        }

    });
    return promise;
}

// Check Device 
function checkDeviceFromWidth() {
    let windowWidth = $(window).width();
    let userDevice = "desktop";
    if (windowWidth >= 1025) {
        userDevice = "desktop";
    } else if (windowWidth >= 768 && windowWidth <= 1024 && window.orientation == 90 || window.orientation == -90) {
        if (window.orientation == 90 || window.orientation == -90) {
            userDevice = "tablet-landscape";
        } else {
            userDevice = "tablet-portrait";
        }
    } else if (windowWidth >= 320 && windowWidth <= 767) {
        userDevice = "mobile";
    }
    return userDevice;
}

// Check for IOS Device
function iOS() {
    return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}

//   Random elements from array
function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

// Random Color for panels
function randomLightColors(cnt = 1) {
    const panelColors = ["#D6E6FD", "#E0D6FD", "#EED6FD", "#FAD6FD", "#FDD6DE", "#D6FBFD", "#D6FDD6", "#EEFDD6", "#FDFBD6", "#FDE9D6"];
    cnt = parseInt(cnt);
    if (cnt == 1) return getRandom(panelColors, cnt)[0];
    else return getRandom(panelColors, cnt);
}

// Coin Flip
function coinFlip(noAudio = false) {
    $(".coinRemove").remove();
    let mainScore = (Modernizr.localstorage) ? localStorage.getItem('mainScore') : 0;
    mainScore++;
    $(".n-coinCount").html(mainScore);
    if (Modernizr.localstorage) localStorage.setItem('mainScore', mainScore);
    $(".n-wrapper").append(`
    <div class='coin-main coinRemove'>
      <div class='coin flipCoin'>
        <div class='currency'>${mainScore}</div>
      </div>
    </div>
    `);

    $(".coin-main").animate({ top: "100px" }, {
        duration: 2000,
        specialEasing: {
            width: "linear",
            height: "easeOutBounce"
        },
        complete: function () {
            if (!noAudio) {
                playAudio('reinforce');
            }
            $(".coin").removeClass('flipCoin');
            $(".coin-main").delay(2000).fadeOut('slow');
        }
    });

    if (noAudio) {
        setupReinforcementImage();
    }

}

// Play Audio
function playAudio(audio = '') {
    let promise = new Promise(function (resolve, reject) {
        const wrongbeep = ['oh no.mp3', 'youre-almost-there.wav'];
        const correctbeep = ['good_beep1.wav', 'good_beep2.wav', 'good_beep3.wav'];
        const reinforceaudio = ['come-on-1.wav', 'nice-work.wav', 'you-got-it-2.wav', 'nice-work.wav', 'you-got-it-2.wav'];
        if (audio == 'correct') {
            audio = getRandom(correctbeep, 1)[0];
        } else if (audio == 'wrong') {
            audio = getRandom(wrongbeep, 1)[0];
        } else if (audio == 'reinforce') {
            audio = getRandom(reinforceaudio, 1)[0];
        } else {
            if (audio.indexOf('.mp3') == -1 && audio.indexOf('.wav') == -1) {
                audio = audio + ".mp3";
            }
            else audio = audio;
        }
        var playAudio = new Audio(audio);
        playAudio.src = audio;
        index = 0;
        playAudio.play();
        playAudio.addEventListener('error', function failed(e) {
            resolve('Audio error');
        });
        playAudio.onended = function () {
            resolve('Audio ended');
        };
    });
    return promise;
}

// Start up play
function startUpPlay(audio = '') {
    let promise = new Promise(function (resolve, reject) {
        if (audio != '' && audio != undefined && audio != null && audio != ' ') {
            $(".startUpAudioLink").remove();
            $("#qa").append("<a class='startUpAudioLink'></a>");
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                var loc = window.location.pathname;
                loc = loc.replace("__viewer__.html", "");
                $(".startUpAudioLink").attr("href", "playsound:file://" + loc + audio + "");
            } else {
                $(".startUpAudioLink").attr("href", 'javascript:pycmd("ankiplay' + audio + '")');
            }
            window.location.href = $(".startUpAudioLink").attr('href');
            if (audio.indexOf('!!!') != -1) {
                let dur = audio.split("!!!");
                dur = parseFloat(dur[1]);
                setTimeout(function () {
                    resolve('audio ended');
                }, eval(dur + 1000));
            } else {
                setTimeout(function () {
                    resolve('audio ended');
                }, 1000)
            }
        } else {
            resolve('audio ended');
        }
    })
    return promise;
}

function popUpNotify(msg, typ) {
    $('#notify').remove();
    $("#qa").append("<div class='notify font_3' id='notify'>" + msg + "</div>");
    var winWidth = $(window).width();
    var tt = winWidth - $("#notify").outerWidth();
    $("#notify").css({ "margin-left": "" + tt / 2 + "px" });
    $('#notify').addClass('bounce-in-top');
    var typ = typ || '';
    $(".n-wrapper").css({ "opacity": "0.3", "pointer-events": "none" });
    if (typ == '') {
        setTimeout(function () {
            $("#notify").removeClass("bounce-in-top").addClass("flip-out-hor-top");
            $(".n-wrapper").css({ "opacity": "1", "pointer-events": "auto" });
        }, 3000)
    }
    $("#notify").addClass("bounce-out-top");
    setTimeout(function () {
        $("#notify").addClass("bounce-out-top");
        $("#qa").css({ "opacity": "1", "backface-visibilty": "none" });
    }, 2500);
}

// Clean Text
function wrapText(sen, font) {
    sen = $('<div />').html(sen).find('span').contents().unwrap().end().end().html();
    sen = $('<div />').html(sen).find('div').contents().unwrap().end().end().html();
    sen = sen.replace('<!--anki-->', '');
    font = font || '';
    if (font == '') {
        sen = $('<div />').html(sen).find('font').contents().unwrap().end().end().html();
    }
    sen = sen.replace(/&nbsp;/g, ' ');
    sen = sen.replace(/ +/g, ' ');
    return sen;
}

// Clean Audio
function wrapAudio(sen) {
    var span = document.createElement('span');
    span.innerHTML = sen;
    var sen = span.textContent || span.innerText;
    sen = sen.replace(/<!--anki>/, '');
    sen = sen.replace(/&nbsp;/g, ' ');
    sen = sen.replace(/ /g, '');
    return sen;
}

// Shuffle array function
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// preloader with css spinner
function preLoader(elem) {
    $(".preLoader").remove();
    elem.append('<div class="preLoader"><div class="preLoader-overlay"></div><div class="preLoader-spinner"></div></div>');
}

// Check for line height
(function ($) {
    $.fn.checkLineHeight = function () {
        console.log('Check Line Height removed..')
    }
})($);

// Modal Popup Image
(function ($) {
    $.fn.modalImage = function () {
        $(this).find('img').click(function () {
            var srcc = $(this).attr('src');
            if (srcc != '_inline_replay_button.png') {
                $('#modalDynamic').remove();
                $('#qa').append('<div id="modalDynamic" class="i-modal"><span class="i-close">&times;</span><img class="i-modal-content" id="modalImg"></div>');
                $("#modalDynamic").show();
                $("#modalImg").attr('src', srcc);
                $("#modalDynamic").click(function () {
                    $("#modalDynamic").hide();
                    $("#modalDynamic").remove();
                })
            }
        })
    }

})($);

function playAudioTag(options) {
    return new Promise(function (resolve, reject) {
        // Establish default settings
        // noControls -> dont show controls only play button
        // unidirection -> hide prev next buttons
        var settings = $.extend({
            elem: $("#qa"),
            audio: [],
            noControls: false,
            unidirection: false,
            show: true,
            autoplay: true
        }, options);
        if (settings.show) {
            // Intialise variables
            let audioArray = [];
            let audioCount = 0;
            let totalAudioCount = 0;
            let actPath = settings.elem;
            let audPath = '';
            if (!Array.isArray(settings.audio)) audioArray[0] = settings.audio;
            else audioArray = settings.audio;
            totalAudioCount = audioArray.length;
            let extraControls = true; // Extra controls includes audio repeat, next audio, prev audio
            if (settings.noControls) {
                if (settings.autoplay) {
                    actPath.html(`<div class='n-audio-button'>
            <div id="audio_button">
                <div id="triangle"></div>
                <div id="lighter_triangle"></div>
                <div id="darker_triangle"></div>
            </div>
          <audio class='n-audio' autoplay='autoplay' style='display:none'></audio></div>`);
                } else {
                    actPath.html(`<div class='n-audio-button'>
                    <div id="audio_button">
                        <div id="triangle"></div>
                        <div id="lighter_triangle"></div>
                        <div id="darker_triangle"></div>
                    </div>
                    <audio class='n-audio' style='display:none'></audio></div>`);
                }
                audPath = actPath.find('audio');
                for (let i = 0; i < totalAudioCount; i++) {
                    audPath.append('<source src="' + audioArray[i] + '" type="audio/mp3" data-track-number="' + i + '">');
                }
                extraControls = false;
            } else {
                if (settings.autoplay) {
                    actPath.html("<div class='n-audio-repeat'>&#x21bb;</div><audio class='n-audio' controlsList='nodownload' autoplay='autoplay'></audio><div class='n-audio-prev'>&vltri;</div><div class='n-audio-next'>&vrtri;</div>");
                } else {
                    actPath.html("<div class='n-audio-repeat'>&#x21bb;</div><audio class='n-audio' controlsList='nodownload'></audio><div class='n-audio-prev'>&vltri;</div><div class='n-audio-next'>&vrtri;</div>");
                }
                audPath = actPath.find('audio');
                for (let i = 0; i < totalAudioCount; i++) {
                    audPath.append('<source src="' + audioArray[i] + '" type="audio/mp3" data-track-number="' + i + '">');
                }
                audPath.attr('controls', "true");
                audPath.attr('preload', "auto");
                if (settings.unidirection) {
                    extraControls = false;
                    actPath.find(".n-audio-repeat").hide();
                    actPath.find(".n-audio-next").hide();
                    actPath.find(".n-audio-prev").hide();
                } else {
                    if (totalAudioCount == 1) {
                        extraControls = false;
                        actPath.find(".n-audio-repeat").hide();
                        actPath.find(".n-audio-next").hide();
                        actPath.find(".n-audio-prev").hide();
                    }
                }
            }
            syncPlay(audioCount);
            function syncPlay(audioCount) {
                if (audioCount > 0) audPath.attr('autoplay', 'autoplay');
                if (settings.noControls) {
                    // Create audio element
                    var songURL = audPath.find('source[data-track-number="' + audioCount + '"]').attr('src');
                    audPath.attr('src', songURL);
                    actPath.find(".n-audio-button").unbind('click').click(function () {
                        audioCount = 0;
                        var songURL = audPath.find('source[data-track-number="' + audioCount + '"]').attr('src');
                        audPath.attr('src', songURL);
                        audPath.get(0).play();
                    });
                    audPath.unbind('ended').on('ended', function () {
                        setTimeout(function () {
                            audioCount++;
                            if (audioCount >= totalAudioCount) {
                                audioCount = 0;
                                resolve('Audio ended');
                            } else {
                                syncPlay(audioCount);
                            }
                        }, 1000);
                    });
                } else {
                    if (extraControls) {
                        if (audioCount == 0) {
                            actPath.find(".n-audio-next").removeClass('n-audio-disable');
                            actPath.find(".n-audio-prev").addClass('n-audio-disable');
                        } else if (audioCount == totalAudioCount - 1) {
                            actPath.find(".n-audio-prev").removeClass('n-audio-disable');
                            actPath.find(".n-audio-next").addClass('n-audio-disable');
                        } else {
                            actPath.find(".n-audio-next").removeClass('n-audio-disable');
                            actPath.find(".n-audio-prev").removeClass('n-audio-disable');
                        }
                    }
                    // Create audio element
                    var songURL = audPath.find('source[data-track-number="' + audioCount + '"]').attr('src');
                    audPath.attr('src', songURL);
                    audPath.on('ended', function () {
                        setTimeout(function () {
                            audioCount++;
                            if (audioCount >= totalAudioCount) {
                                audioCount = 0;
                                resolve('Audio ended');
                            } else {
                                syncPlay(audioCount);
                            }
                        }, 1000);
                    });
                    actPath.find('.n-audio-next').unbind('click').click(function () {
                        audioCount++;
                        syncPlay(audioCount);
                    });
                    actPath.find(".n-audio-prev").unbind('click').click(function () {
                        audioCount--;
                        syncPlay(audioCount);
                    });
                    actPath.find(".n-audio-repeat").unbind('click').click(function () {
                        syncPlay(audioCount);
                    });
                }
            }
        } else {
            var audionameslist = settings.audio;
            var playAudio = new Audio(audionameslist[0]);
            playAudio.src = audionameslist[0];
            index = 0;
            playAudio.play();
            playAudio.addEventListener('error', function failed(e) {
                if (index < audionameslist.length - 1) {
                    playAudio.src = audionameslist[index + 1];
                    playAudio.play();
                    index++;
                } else {
                    index = 0;
                    resolve('Audio ended');
                }
            });
            playAudio.onended = function () {
                if (index < audionameslist.length - 1) {
                    playAudio.src = audionameslist[index + 1];
                    playAudio.play();
                    index++;
                } else {
                    index = 0;
                    resolve('Audio ended');
                }
            };
        }
    })
};

// Header Audio Play
function headerAudioPlay() {
    let promise = new Promise((resolve, reject) => {
        if (window.userInfo['voice'] == 'native') var audio = $("#n-header-audio-n").text();
        else var audio = $("#n-header-audio-w").text();
        if (audio == '') audio = $("#n-header-audio-w").text();
        if (audio == '' || audio == undefined) {
            resolve('');
        } else {
            playAudio(audio).then(function (res) {
                resolve('');
            });
        }
    });
    return promise;
}

// Anki Tags
function getAnkiTags() {
    let tags = {
        'Class': "",
        'Card_mode': "",
        'Card_type': "",
        'Language': "english",
        "Background_volume": "20"
    };
    let ankiTags = $("#ankiTags").html();
    if (ankiTags == undefined || ankiTags == '') return tags;
    ankiTags = ankiTags.split(" ");
    ankiTags.forEach(element => {
        element = element.split(":");
        element[0] = element[0].charAt(0).toUpperCase() + element[0].slice(1);
        if (element[1] !== undefined) tags[element[0]] = element[1];
        else tags[element[0]] = element[1];
    });
    return tags;
}

function isValidArray(arr) {
    if (!Array.isArray(arr)) return false;
    if (arr.length == 1 && arr[0] == '') return false;
    else return true;
}

function getAudio(audio_1, audio_2 = audio_1 + '_n') {
    if ($(audio_1).length == 0) {
        console.log("getAudio error - audio_1 not found");
        return '';
    }
    audio_1 = $(audio_1).text();
    if ($(audio_2).length == 0) {
        console.log("getAudio error - audio_2 not found");
        audio_2 = '';
    }
    else audio_2 = $(audio_2).text();
    var audio = '';
    if (window.userInfo['voice'] === 'native' && audio_2 !== '') {
        audio = audio_2;
    } else {
        console.log("getAudio - native voice not found, defaults to western")
        audio = audio_1;
    }
    audio = audio.replace(/&nbsp/g, '');
    return audio;
}

function clearAllTimeouts() {
    // Clear all timeouts
    var id = window.setTimeout(function () { }, 0);
    while (id--) {
        window.clearTimeout(id);
    }
}

function setBackgroundMusicVolume() {
    var backAud = document.getElementById('backgroundMusic');
    if (backAud == null) return;
    var tags = window.ankiTags;
    var noise = tags['Background_volume'];
    if (noise) {
        noise = parseInt(noise);
        if (noise != NaN) {
            if (noise > 100) noise = 100;
            else if (noise <= 0) noise = 0;
            backAud.volume = noise / 100;
        }
    }
}

// Get device type - desktop, tablet, mobile
function getDeviceType() {
    var ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
            ua
        )
    ) {
        return "mobile";
    }
    return "desktop";
};

// Get OS
function getUserOS() {
    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }

    return os;
}

function cardAnalytics(input) {
    var timer;
    if (input == 'startTimer') {
        timer = setInterval(() => {
            window.analytics['time_taken']++;
        }, 1000);
    } else if (input == 'correct') {
        window.analytics['correct']++;
    } else if (input == 'wrong') {
        window.analytics['wrong']++;
    } else if (input == 'done') {
        clearInterval(timer);
    }
}

function setupHeadingImage_1() {
    let sideImage = window.headingImages_1[window.userInfo['avatar']];
    if (sideImage.length > 1) sideImage = getRandom(sideImage, 1);
    console.log(sideImage);
    $(".panelHeadingImage").attr('src', sideImage[0]);
}
function setupHeadingImage_2() {
    let sideImage = window.headingImages_1[window.userInfo['avatar']];
    $(".panelHeadingImage").attr('src', sideImage);
}
function setupReinforcementImage() {
    let promise = new Promise((resolve, reject) => {
        var images = ["_reinforcement_baloon1.png", "_reinforcement_baloon2.png", "_reinforcement_candy1.png", "_reinforcement_candy2.png", "_reinforcement_candy3.png", "_reinforcement_icecream1.png", "_reinforcement_icecream2.png", "_reinforcement_leaves2.png", "_reinforcement_leaves3.png", "_reinforcement_leaves1.png", "_reinforcement_leaves4.png"];
        var img = images[Math.floor(Math.random() * images.length)];
        $("#wrapper").append('<div class="reinforcement_set coinRemove"></div>');
        for (var i = 0; i < 7; i++) {
            $(".reinforcement_set").append(`<div><img class='img${i}' src='' /></div>`);
            $(".reinforcement_set .img" + i).attr('src', img);
        }
        $(".panelReinforcementImage").remove();
        $(".panel").append(`<img class='panelReinforcementImage coinRemove' src='_missing_image.png' />`);
        var image = getRandom(window.reinforcementImages, 1)[0];
        $(".panelReinforcementImage").attr('src', image[0]);
        setTimeout(() => {
            $(".panelReinforcementImage").fadeIn('slow');
        }, 800);
        setTimeout(() => {
            playAudio(image[1]).then(() => {
                resolve('');
            })
        }, 2000);
    });
    return promise;
}

function getDuration() {
    return false;
}