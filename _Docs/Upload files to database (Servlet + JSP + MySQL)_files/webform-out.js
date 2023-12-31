Function.prototype.method = function(name, fn, overwrite) {
    if (!this.prototype[name] || overwrite) {
        this.prototype[name] = fn;
    }
    return this;
};
Function.method('bind', function(context) {
    var that = this, slice = Array.prototype.slice, args = slice.call(arguments, 1);

    return function() {
        return that.apply(context, args.concat(slice.call(arguments)));
    };
});
String.method('trim', function() {
    return this.replace(/(^[\s\xA0]+|[\s\xA0]+$)/g, '');
});
if (!Array.isArray) {
    Array.isArray = function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    };
}

Array.method('indexOf', function(item, start) {
    var i = 0,
        ln = this.length;
    start = start || 0;
    for (i = start; i < ln; i += 1) {
        if (this[i] === item) {
            return i;
        }
    }
    return -1;
}).method('contains', function(item) {
    return this.indexOf(item) > -1;
}).method('forEach', function(fn, bind) {
    if (typeof fn !== "function") {
        throw new TypeError();
    }

    for (var i = 0, l = this.length; i < l; i += 1) {
        if (i in this) {
            fn.call(bind, this[i], i, this);
        }
    }
});
if (!Date.now) {
    Date.now = function() {
        return +new Date();
    };
}

/* */
(function(wfs, wfso) {
    var createObject = function(o) {
        function F() {
        }
        F.prototype = o;
        return new F();
    };

    var createIframe = (function() {
        var win = window, doc = document, isIE = !!(window.attachEvent && !(/opera/i.test(window.navigator.userAgent)));
        function setCss(el, css) {
            try {
                el.style.setAttribute('cssText', css);
            }
            catch (ex) {
                el.style.cssText = css;
            }

            if (!css) {
                el.removeAttribute('style');
            }
        }

        function createElement(desc) {
            var k, i = 0, el, tag = desc.nodeName, attr = desc.attr || {};

            try {
                if ('name' in attr) {
                    el = doc.createElement('<' + tag + ' name="' + attr.name + '">');
                }
            } catch (ex) {
            }

            if (!el || el.nodeName !== tag.toUpperCase()) {
                el = doc.createElement(tag);
            }

            for (k in attr) {
                if ('style' === k) {
                    setCss(el, attr[k]);
                }
                else {
                    el.setAttribute(k, attr[k]);
                }
            }

            return el;
        }

        return function(def) {
            var src,
                iframe,
                readyState = isIE ? 'onreadystatechange' : 'onload',
                attr = {
                src: 'about:blank',
                name: '',
                id: '',
                width: '1',
                height: '1',
                frameborder: '0',
                marginheight: '0',
                marginwidth: '0',
                scrolling: '0'
            };

            def = def || {};

            if (!def.id) {
                def.id = 'ixiframe';
            }

            if (!def.name) {
                def.name = def.id;
            }

            for (key in attr) {
                if (key in def) {
                    attr[key] = def[key];
                }
            }
            iframe = createElement({
                nodeName: 'iframe',
                attr: attr
            });

            if ('function' === typeof def.onLoad) {
                def.onLoad.isCalled = false;

                iframe[readyState] = function() {
                    if (def.onLoad.isCalled) {
                        return;
                    }
                    if (this.readyState && !(/loaded|complete/.test(this.readyState))) {
                        return;
                    }

                    def.onLoad(iframe);
                    def.onLoad.isCalled = true;
                };
            }

            iframe.src = attr.src;

            return iframe;
        };
    })();

    var loadJS = function(win, doc) {
        var loadedFiles = [],
            register = {},
            hasOwn = Object.prototype.hasOwnProperty,
            isIE = !!(win.attachEvent && !(/opera/i.test(win.navigator.userAgent)));

        (function() {
            var head = doc.getElementsByTagName('head')[0];

            function cycle(src) {
                var ix = loadedFiles.length;

                if ('string' !== typeof src) {
                    return;
                }

                src = src.replace(/\?.*$/, '');

                loadedFiles[ix] = src;
                register[ix] = {
                    loaded: true,
                    src: src,
                    'static': true
                };
            }

            function regFile(scripts) {
                var ln = scripts.length, i, ix, src;

                for (i = 0; i < ln; i += 1) {
                    cycle(scripts[i].src || 'stylesheet' === scripts[i].rel && scripts[i].href);
                }
            }

            regFile(head.getElementsByTagName('script'));
            regFile(head.getElementsByTagName('link'));
        })();

        function applyCallbacks(cb) {
            var ln = cb.length, fn;

            while (ln) {
                fn = cb.shift();
                if ('function' === typeof fn) {
                    fn();
                }
                ln -= 1;
            }
        }

        function loadJSFile(index) {
            var s = doc.createElement("script"),
                reg = register[index], i, ln,
                readystate, error,
                readyState = isIE ? 'onreadystatechange' : 'onload';

            if (reg.loaded) {
                applyCallbacks(reg.callbacks);
                return;
            }

            readystate = function() {
                if (this.readyState && !(/loaded|complete/.test(this.readyState))) {
                    return;
                }

                reg.loaded = true;
                applyCallbacks(reg.callbacks);
            };

            error = function() {
                applyCallbacks(reg.callbacks);
            };

            s.async = true;

            s[readyState] = readystate;
            s.onerror = error;

            s.setAttribute("type", "text/javascript");
            s.setAttribute("src", reg.src + '?' + Date.now());

            doc.getElementsByTagName("head")[0].appendChild(s);
        }

        return function() {
            var args = Array.prototype.slice.call(arguments),
                src = args[0],
                callback = args[1], i, ln, index;

            if (!src) {
                return;
            }

            if ('string' === typeof src) {
                index = loadedFiles.indexOf(src);

                if (index === -1) {
                    index = loadedFiles.length;

                    loadedFiles[index] = src;
                    register[index] = {
                        loaded: false,
                        src: src,
                        callbacks: []
                    };

                    if (callback) {
                        register[index].callbacks.push(callback);
                    }

                    loadJSFile(index);
                    return;
                }

                if (register[index].loaded) {
                    callback();
                    return;
                }

                register[index].callbacks.push(callback);
                return;
            }
            ln = src.length;

            (function iter(ix) {
                var s = src[ix], cb;
                if (ix === ln) {
                    callback && callback();
                    return;
                }

                if ('object' === typeof src[ix]) {
                    s = src[ix].src;
                    cb = src[ix].callback;
                }

                loadJS(win, doc)(s, function() {
                    if (cb) {
                        cb();
                    }
                    iter(ix + 1);
                });
            })(0);
        };
    };
    /* end loadJS */
    window.wfComm = {};
    window.wfComm.loadJS = loadJS;
    var checkHost = (("https:" == document.location.protocol) ? "https://" : "http://");
    var myI = false;

    var getInstance = function(wfs, wfso) {

        var src = {
            is_captcha_enabled: checkHost + 'www.google.com/recaptcha/api/js/recaptcha_ajax.js',
            type: wfso[wid].host + 'javascripts/common/jquery/jquery.tools.small.min.js'
        }
        var library_mark = {};
        var libraries = [];
        var oldInstance = false;
        var IIsLoaded = function(I) {
            if (typeof I == 'string' && I == 'fresh') {
                myI = createObject($);
                var t = myI.fn;
                myI.fn = t;
                delete jQuery;
            } else if (typeof I == 'function') {
                myI = createObject(I);
                var t = myI.fn;
                myI.fn = t;
            }
            _run();
        }

        for (a in wfs) {
            if (typeof wfs[a]['is_captcha_enabled'] != 'undefined' && wfs[a]['is_captcha_enabled'] != 'no') {
                library_mark['is_captcha_enabled'] = true;
            }
             library_mark['is_captcha_enabled'] = true;
        }
        for (a in wfso) {
            if (typeof wfso[a]['type'] != 'undefined' && wfso[a]['type'] != 'inline') {
                library_mark['type'] = true;
            }
        }
        for (a in library_mark) {
            if (typeof src[a] != 'undefined' && library_mark[a] == true && a != 'is_captcha_enabled') {
                libraries.push(src[a]);
            }
        }
        window.wfComm.libraries = libraries;
        window.wfComm.IIsLoaded = IIsLoaded;

        var pre_lib = (library_mark['is_captcha_enabled'] != undefined) ? [src['is_captcha_enabled']] : [];

        loadJS(window, document)(pre_lib, function() {
            libraries.unshift(checkHost + 'ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js');
            var ifr = createIframe({onLoad: function(ifr) {
                    ifr.contentWindow.document.write('<script type="text/javascript">parent.wfComm.loadJS(window, document)(parent.wfComm.libraries,  function(){ parent.wfComm.IIsLoaded(jQuery); });</script>');
                }});
            ifr.style.cssText = 'position: absolute; left: -1px;';
            document.body.appendChild(ifr);
        });
    }

    var _run = function() {

        var addTestObj = function(itemId) {
            wfs[itemId].id = itemId;
            wfs[itemId].test = function()
            {
                /* uruchom */
                var $webform = myI.noConflict(true);
                var $body = $webform('body', document);

                wfs[this.id].cookie =
                    {
                        createCookie: function(name, value, days)
                        {
                            if (days) {
                                var date = new Date();
                                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); //days*24*60*60*1000 //days*5000
                                var expires = "; expires=" + date.toGMTString();
                            }
                            else
                                var expires = "";
                            document.cookie = name + "=" + value + expires + "; path=/";
                        },
                        readCookie: function(name)
                        {
                            var nameEQ = name + "=";
                            var ca = document.cookie.split(';');
                            for (var i = 0; i < ca.length; i++)
                            {
                                var c = ca[i];
                                while (c.charAt(0) == ' ')
                                    c = c.substring(1, c.length);
                                if (c.indexOf(nameEQ) == 0)
                                    return c.substring(nameEQ.length, c.length);
                            }
                            return null;
                        },
                        eraseCookie: function(name)
                        {
                            createCookie(name, "", -1);
                        }
                    }
                $webform.fn.selectRange = function(start, end)
                {
                    return this.each(function()
                    {
                        if (this.setSelectionRange)
                        {
                            this.focus();
                            this.setSelectionRange(start, end);
                        }
                        else if (this.createTextRange)
                        {
                            var range = this.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', end);
                            range.moveStart('character', start);
                            range.select();
                        }
                    });
                };

                wfs[this.id].preview = function(wid)
                {
                    if (wfso[wid].type == 'inline')
                    {
                        setTimeout("wfs[" + this.id + "].otherfnc.onLoad(wid);", 100);
                        return false;
                    }
                    ;
                    /* html */
                    $body.find('#WFWrapper').remove();
                    var WFWrapper = $webform('<div id="WFWrapper"></div>').css(
                        {
                            position: 'absolute',
                            top: -1000,
                            left: 0,
                            'padding': '15px 15px 0 0',
                            'z-index': 9999
                        }).appendTo($body);

                    wfso[wid].WFWrapper = WFWrapper;

                    var html = unescape(wfso[wid].item);
                    html = html.replace(/::o::/g, 'ó').replace(/::O::/g, 'Ó');
                    html = html.replace('url("', 'url(').replace('")', ')');
                    html = html.replace('url("', 'url(').replace('")', ')');
                    html = html.replace('url("', 'url(').replace('")', ')');

                    WFWrapper.html(html);
                    var liEl = WFWrapper.find('li[class*="wf-"]');

                    liEl.each(function()
                    {
                        if ($webform(this).css('display') == 'none') {
                            $webform(this).find('input, select, textarea').attr('disabled', 'disabled');
                        }
                    });

                    /* html */

                    /* effect */

                    var viewportHeight = window.innerHeight ? window.innerHeight : $webform(window).height();
                    var viewportWidth = window.innerWidth ? window.innerWidth : $webform(window).width();
                    var scrollTop = $webform(document).scrollTop();
                    //topStart, leftStart, topEnd, leftEnd, mask

                    wfs[this.id].effectWraper = function(obj, viewParam, formParam)
                    {

                        $webform(obj).css('display', 'none');
                        $webform(obj).find('.close').css({
                            'top': '0 !important',
                            'right': '0 !important'});
                        var topStart = 0;
                        var leftStart = 0;
                        var topEnd = 0;
                        var leftEnd = 0;
                        var formWidth = $webform(obj).outerWidth();
                        var formHeight = $webform(obj).outerHeight();

                        switch (formParam[2])
                        {
                            case 'top_left':
                                leftEnd = viewportWidth * 0.1;
                                topEnd = (viewParam[2] + viewParam[1] * 0.1 < 10) ? 10 : viewParam[2] + viewParam[1] * 0.1;
                                break;
                            case 'top_center':
                                leftEnd = (viewParam[0] / 2) - (formWidth / 2);
                                topEnd = (viewParam[2] + viewParam[1] * 0.1 < 10) ? 10 : viewParam[2] + viewParam[1] * 0.1;
                                break;
                            case 'top_right':
                                leftEnd = viewportWidth - (viewportWidth * 0.1) - formWidth;
                                topEnd = (viewParam[2] + viewParam[1] * 0.1 < 10) ? 10 : viewParam[2] + viewParam[1] * 0.1;
                                break;
                            case 'center_left':
                                leftEnd = viewportWidth * 0.1;
                                topEnd = (viewParam[2] + (viewportHeight / 2) - (formHeight / 2) < 10) ? 10 : viewParam[2] + (viewportHeight / 2) - (formHeight / 2);
                                break;
                            case 'center':
                                leftEnd = (viewParam[0] / 2) - (formWidth / 2);
                                topEnd = (viewParam[2] + (viewportHeight / 2) - (formHeight / 2) < 10) ? 10 : viewParam[2] + (viewportHeight / 2) - (formHeight / 2);
                                break;
                            case 'center_right':
                                leftEnd = viewportWidth - (viewportWidth * 0.1) - formWidth;
                                topEnd = (viewParam[2] + (viewportHeight / 2) - (formHeight / 2) < 10) ? 10 : viewParam[2] + (viewportHeight / 2) - (formHeight / 2);
                                break;
                            case 'bottom_left':
                                leftEnd = viewportWidth * 0.1;
                                topEnd = (viewParam[2] + viewParam[1] * 0.9 - formHeight < 10) ? 10 : viewParam[2] + viewParam[1] * 0.9 - formHeight;
                                break;
                            case 'bottom_center':
                                leftEnd = (viewParam[0] / 2) - (formWidth / 2);
                                topEnd = viewParam[2] + viewParam[1] * 0.9 - formHeight;
                                break;
                            case 'bottom_right':
                                leftEnd = viewportWidth - (viewportWidth * 0.1) - formWidth;
                                topEnd = (viewParam[2] + viewParam[1] * 0.9 - formHeight < 10) ? 10 : viewParam[2] + viewParam[1] * 0.9 - formHeight;
                                break;
                        }

                        switch (formParam[1])
                        {
                            case 'top':
                                leftStart = leftEnd
                                topStart = viewParam[2] - formHeight;
                                break;
                            case 'bottom':
                                leftStart = leftEnd;
                                topStart = viewParam[2] + formHeight + viewParam[1];
                                break;
                            case 'left':
                                leftStart = -formWidth;
                                topStart = topEnd;
                                break;
                            case 'right':
                                leftStart = viewParam[0] + formWidth;
                                topStart = topEnd;
                                break;
                        }
                        //efekt
                        switch (formParam[0])
                        {
                            case 'none':
                                $webform(obj).css({
                                    'left': leftEnd,
                                    'top': topEnd,
                                    'display': 'block'
                                });
                                break;
                            case 'slide':
                                $webform(obj).css({
                                    'left': leftStart,
                                    'top': topStart,
                                    'display': 'block'
                                });
                                $webform(obj).animate({
                                    'left': leftEnd,
                                    'top': topEnd
                                }, {
                                    queue: false,
                                    duration: 500,
                                    specialEasing: 'linear'
                                });
                                break;
                            case 'fade':
                                $webform(obj).css({
                                    'left': leftEnd,
                                    'top': topEnd,
                                    'opacity': 0,
                                    'display': 'block'
                                });
                                $webform(obj).animate({
                                    'opacity': 1
                                }, {
                                    queue: false,
                                    duration: 500,
                                    specialEasing: 'linear'
                                });
                                break;
                        }

                    }
                    var overflow = $body.css('overflow-x');
                    $body.css('overflow-x', 'hidden');
                    var mask = (wfso[wid].type != 'popover') ? 0.4 : 0;
                    var WFWrapperFormId = wfso[wid].id;

                    var ai = $webform('​<div id="ajax_indicator" style="display: none; width: 100%; height: 100%; position: fixed; top: 0; z-index: 1000; left: 0; z-index:999; background:#000000;"></div>').css({opacity: 0});
                    ai.appendTo($body);
                    ai.css({display: 'block'}).animate({
                        opacity: mask
                    },
                    {
                        queue: false,
                        duration: 100,
                        complete: function() {
                            WFWrapper.css({top: -10000, left: -10000});
                            WFWrapper.css({'width': (WFWrapper.find('.wf-formTpl').outerWidth())});
                            wfs[WFWrapperFormId].effectWraper(WFWrapper, [viewportWidth, viewportHeight, scrollTop], [wfso[WFWrapperFormId].effect, wfso[WFWrapperFormId].animate, wfso[WFWrapperFormId].position]);
                            setTimeout("wfs[" + WFWrapperFormId + "].otherfnc.onLoad(" + wid + ");", 100);

                            setTimeout(function() {
                                var cl = $webform('<div></div>').bind({
                                    click: function(e) {
                                        e.preventDefault();
                                        WFWrapper.remove();
                                        $body.find('#ajax_indicator, .toolTipElem').remove();
                                    }
                                }).appendTo(WFWrapper);
                                cl.attr('id', 'wfCloseX');
                            }, 1);
                        }
                    });

                    /* effect */
                }


                var wfrc =
                    {
                        init: function(p, that)
                        {
                            p = (p == 'undefined') ? ["wf-captcha"] : p;
                            var c = p[0];
                            var liEl = $body.find(that).find('.' + c);


                            var divEl = liEl.find('div[class*="wf-captcha"]');


                            if (divEl.get(0) == undefined)
                            {
                                return false;
                            }
                            var id = divEl.attr('class').replace(c + '-', '');
                            var display = liEl.css('display');

                            switch (display)
                            {
                                case 'block':
                                    var templ = this.templates[1].replace('[[captchaerror]]', divEl.attr('wf-captchaerror')).replace('[[captchaword]]', divEl.attr('wf-captchaword')).replace('[[captchasound]]', divEl.attr('wf-captchasound'));
                                    divEl.html(templ);

                                    divEl.find('.wf-rc-reload').bind('click', function(e) {
                                        Recaptcha.reload();
                                        e.preventDefault();
                                    });
                                    divEl.find('.wf-rc-audio').bind('click', function(e) {
                                        Recaptcha.switch_type('audio');
                                        divEl.find('.recaptcha_only_if_image').attr('style', 'display:none !important;');
                                        divEl.find('.recaptcha_only_if_audio').attr('style', 'display:inline-block !important;');
                                        e.preventDefault();
                                    });
                                    divEl.find('.wf-rc-image').bind('click', function(e) {
                                        Recaptcha.switch_type('image')
                                        divEl.find('.recaptcha_only_if_image').attr('style', 'display:inline-block !important;');
                                        divEl.find('.recaptcha_only_if_audio').attr('style', 'display:none !important;');
                                        e.preventDefault();
                                    });
                                    Recaptcha.create('6LdiJgYAAAAAAA6oxIDZxOmCQEbR3-SKm-jIsRn6',
                                        c + '-' + id,
                                        {
                                            theme: 'custom',
                                            custom_theme_widget: c + '-' + id,
                                            callback: function()
                                            {
                                                //Recaptcha.focus_response_field();
                                                divEl.css({'display': 'block'});
                                                divEl.find('.recaptcha_only_if_image').attr('style', 'display:inline-block !important;');
                                                divEl.find('.recaptcha_only_if_audio').attr('style', 'display:none !important;');
                                                divEl.find('input[name="recaptcha_response_field"]').bind(
                                                    {
                                                        'click': function()
                                                        {
                                                            tt.valid.onFocus(this);
                                                        },
                                                        'keyup': function()
                                                        {
                                                            tt.valid.onFocus(this);
                                                        }
                                                    });

                                            }
                                        }
                                    );
                                    break;
                                default:
                                    divEl.html(' ');
                                    if (Recaptcha != undefined)
                                    {
                                        Recaptcha.destroy();
                                    }
                                    break;
                            }
                            return true;
                        },
                        templates: {
                            1: '<div class="wf-rc-boxm"><div id="recaptcha_image"></div><div class="recaptcha_only_if_incorrect_sol" style="color:red">[[captchaerror]]</div><div style=""><span class="wf-label recaptcha_only_if_image">[[captchaword]]</span><span class="wf-label recaptcha_only_if_audio">[[captchasound]]</span></div><div style=""><input type="text" class="wf-input wf-input-captcha wf-req wf-valid__captcha" style="width:140px !important;" id="recaptcha_response_field" name="recaptcha_response_field" /><a class="wf-rc-reload" style="" href="#">Get another CAPTCHA</a><a class="wf-rc-image recaptcha_only_if_audio" style="" href="#javascript:Recaptcha.switch_type(\'image\')">Get an image CAPTCHA</a></div></div>'
                        }
                    };
                var tt =
                    {
                        type: 0,
                        onCompleteText: 'Thank You!',
                        init: function(a)
                        {
                            switch (tt.type)
                            {
                                case 0:
                                    var fE = $body.find(a),
                                        target = fE.find('form').attr('target') && fE.find('form').attr('target') !== undefined ? fE.find('form').attr('target') : '_top';

                                    fE.find('form').attr('target', target);
                                    fE.each(function() {
                                        tt.valuehints.init($webform(this).attr('id'));
                                        $webform(this).find('input[type="submit"]').bind('click', function(e)
                                        {
                                            tt.valid.onSubmit(this);
                                            e.preventDefault();
                                        });
                                        $webform(this).find('*[data-placeholder="yes"]').bind({
                                            focus: function() {
                                                tt.placeholder.hide(this);
                                            },
                                            blur: function() {
                                                tt.placeholder.show(this);
                                            }
                                        }).each(function () {
                                            tt.placeholder.init(this);
                                        });
                                        $webform(this).find('*[class*="wf-valid"], *[class*="wf-input"]').not(':hidden').bind({
                                            'focus': function() {
                                                tt.valid.onFocus(this);
                                            },
                                            'blur': function() {
                                                tt.valid.onBlur(this);
                                            }
                                        });
                                    });
                                    break;
                            }

                        },
                        param: function(o)
                        {
                            if (typeof(o) == 'object')
                            {
                                tt.type = o.type;
                                tt.complete = o.complete;
                            }
                        },
                        html: ['<div  style="-webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; border:1px solid #f55e5e; background:#f8f8f8; padding:8px;"><div style="z-index:1; background:#f8f8f8;" class="dialog errorMsg"><p class="jsToolTipTextBox" style="padding:0; margin:0; font-size:12px; color:#555555;"> </p></div></div> <div class="arrPoint" style="background: url(data:image/gif;base64,R0lGODlhFwANAPEDAPj4+P////VfXwAAACH/C1hNUCBEYXRhWE1Q/z94cGFja2V0IGJlZ2luPSLvaWQ6N0RDODA2MzFFMDBCMTFERkI4NjJDNEM4RTI3NkIxN0EiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW6sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQFAAADACwAAAAAFwANAAACL5yPI8l9EpabKoBIGwQc52dxnZRtouhN5omSzMq2WhizqQHXZ5rr+9Lz/WhCXaAAADs=) no-repeat 0 0; height:13px; left:20px; position:absolute; top:13px; width:23px; z-index:-1;"></div>'],
                        showToolTip: function(name, errorMsg, form, formType)
                        {
                            //class="jsToolTipTextBox"
                            var elem = form.find('*[name^="' + name + '"]');
                            elem = (elem.is(':hidden')) ? elem.parent() : elem;
                            var id = $webform(form).parent().attr('id');
                            if ($body.find('.toolTipElem' + name + id).get(0))
                                return false;
                            var frg = document.createDocumentFragment();
                            var toolTipEl = (function(html) {
                                var d = document.createElement('div');
                                d.innerHTML = html;
                                return d.children[0];
                            })('<div class="toolTipElem toolTipElem' + name + id + '" id="toolTipElem' + name + id + '"></div>');//$webform('<div class="toolTipElem toolTipElem'+name+id+'"></div>', document);

                            toolTipEl = $webform(toolTipEl);

                            toolTipEl.html(tt.html[formType]);
                            toolTipEl.find('.jsToolTipTextBox').text(errorMsg);
                            toolTipEl.bind('click', function(e) {
                                toolTipEl.animate(
                                    {
                                        'opacity': 0
                                    }, {
                                    queue: false,
                                    duration: 300,
                                    specialEasing: 'linear',
                                    complete: function()
                                    {
                                        toolTipEl.remove();
                                    }
                                });
                            });

                            var top = ($webform.browser.msie && $webform.browser.version && parseInt($webform.browser.version) <= 8) ? elem.offset().top + document.documentElement.scrollTop : elem.offset().top;
                            var left = elem.offset().left;
                            var width = elem.outerWidth();
                            var height = elem.outerHeight();
                            var tooltipheight = toolTipEl.outerHeight();
                            var scrollTop = $webform(document).scrollTop();
                            var scrollTopp = document.documentElement.scrollTop;

                            toolTipEl.css(
                                {
                                    'width': '182px',
                                    'position': 'absolute',
                                    'top': (top + height + 18 - 13),
                                    'left': (left),
                                    'opacity': 0,
                                    'z-index': 9999,
                                    'padding-top': '13px'
                                });
                            $body.append(toolTipEl);
                            //toolTipEl.appendTo();
                            toolTipEl.animate(
                                {
                                    'opacity': 1
                                },
                            {
                                queue: false,
                                duration: 500,
                                specialEasing: 'linear',
                                complete: function()
                                {
                                    toolTipEl.find('div[class="arrPoint"]').animate(
                                        {
                                            'top': 1
                                        },
                                    {
                                        queue: false,
                                        duration: 200,
                                        specialEasing: 'linear',
                                        complete: function()
                                        {
                                            toolTipEl.find('div[class="arrPoint"]').css('z-index', 2);
                                        }
                                    });
                                }
                            });
                        },
                        hideToolTip: function(name, formId)
                        {
                            var toolTipEl = $body.find('#toolTipElem' + name + formId);
                            toolTipEl.animate({
                                'opacity': 0
                            },
                            {
                                queue: false,
                                duration: 500,
                                specialEasing: 'linear',
                                complete: function()
                                {
                                    toolTipEl.remove();
                                }
                            });
                        },
                        placeholder: {
                            init: function (ob) {
                                ob.defaultValue = ob.value;
                            },
                            show: function (ob) {
                                if (!ob.value && ob.defaultValue) {
                                    ob.value = ob.defaultValue;
                                }
                            },
                            hide: function (ob) {
                                if (ob.value === ob.defaultValue) {
                                    ob.value = '';
                                }
                            }
                        },
                        valid:
                            {
                                regexp:
                                    {
                                        'emailf': ['^(?:[\\w\-\+]|(?=.{1,63}$)([\\w-_\+]+\.){1,64})[\\w-_\+]@(?=.{1,63}$)(?:(?:[A-Za-z0-9]|[0-9a-zA-Z]+[0-9a-zA-Z-]+[0-9a-zA-Z]+){1,63}\.)+[A-Za-z]{2,8}$', 'Adres e-mail jest nieprawidłowy', ''],
                                        'email': ['^([a-zA-Z0-9_\+\.\-])+\@(([a-zA-Z0-9\-\+\_])+\.)+([a-zA-Z0-9]{2,8})+$', 'Adres e-mail jest nieprawidłowy', ''],
                                        'required': ['\\S', 'To pole jest wymagane', 'g'],
                                        'length0to255': ['^.{0,255}$', 'Treść za długa', 'g'],
                                        'zip': ['', 'To pole jest wymagane', 'g'],
                                        'phone': ['', 'To pole jest wymagane', 'g']
                                    },
                                check: function(r, form)
                                {
                                    var e = r.error;
                                    var size = 0, key;
                                    for (key in e)
                                    {
                                        if (e.hasOwnProperty(key))
                                            size++;
                                    }
                                    if (size > 0)
                                    {
                                        for (a in r.error)
                                        {
                                            tt.showToolTip(a, r.error[a], form, 0);
                                            if (a == 'recaptcha_response_field')
                                            {
                                                Recaptcha.reload();
                                            }
                                        }
                                        return false;
                                    }
                                    else
                                    {
                                        return true;
                                    }
                                },
                                onFocus: function(obj)
                                {

                                    var name = $webform(obj).attr('name').replace(/\[\]/g, '');
                                    var formId = $webform(obj).parents('form').parent().attr('id');
                                    tt.hideToolTip(name, formId);
                                },
                                onBlur: function(obj)
                                {
                                    switch (tt.type)
                                    {
                                        case 0:
                                            var r = (r == undefined) ? {
                                                'error': {}
                                            } : r;
                                            var ename = '';
                                            if (-1 == $webform(obj).attr('class').indexOf('wf-valid__'))
                                            {
                                                ename = 'length0to255';
                                            }
                                            else
                                            {
                                                ename = $webform(obj).attr('class').split('wf-valid__')[1].split(' ')[0];
                                            }

                                            var oname = $webform(obj).attr('name').replace(/\[\]/g, '');

                                            if (tt.valid.regexp[ename] != undefined)
                                            {
                                                var re = new RegExp(tt.valid.regexp[ename][0], tt.valid.regexp[ename][2]);
                                            }
                                            else
                                            {
                                                var re = new RegExp('');
                                            }

                                            if ($webform(obj).attr('type') == 'text')
                                            {
                                                if (re.test($webform(obj).val()) == true || $webform(obj).val() == '')
                                                {
                                                    delete r.error[oname];
                                                }
                                                else
                                                {
                                                    r.error[oname] = tt.valid.regexp[ename][1];
                                                }
                                            }
                                            else if ($webform(obj).attr('type') == 'checkbox' || $webform(obj).attr('type') == 'radio')
                                            {
                                                var cl = $webform(obj).parents('.wf-inputpos').find('input:checked').length;
                                                if (cl > 0)
                                                {
                                                    delete r.error[oname];
                                                }
                                                else
                                                {
                                                    r.error[oname] = tt.valid.regexp[ename][1];
                                                }
                                            }

                                            if (tt.valid.check(r, $webform(obj).parents('form')))
                                            {
                                                return true;
                                            }

                                            break;
                                    }
                                },
                                onSubmit: function(o)
                                {
                                    switch (tt.type)
                                    {
                                        case 0:
                                            var r = (r == undefined) ? {
                                                'error': {}
                                            } : r;
                                            var form = $webform(o).parents('form');
                                            form.find('*[class*="wf-valid"]:visible, .wf-date-hidden[type="hidden"][class*="wf-valid"]').each(function()
                                            {

                                                var obj = this;
                                                var ename = $webform(obj).attr('class').split('wf-valid__')[1].split(' ')[0];
                                                var oname = $webform(obj).attr('name').replace(/\[\]/g, '');

                                                if (tt.valid.regexp[ename] != undefined)
                                                {
                                                    var re = new RegExp(tt.valid.regexp[ename][0]);
                                                }
                                                else
                                                {
                                                    var re = new RegExp('');
                                                }

                                                if ($webform(obj).attr('type') == 'text')
                                                {
                                                    if (re.test($webform(obj).val()) == true)
                                                    {
                                                        delete r.error[oname];
                                                    }
                                                    else
                                                    {
                                                        r.error[oname] = tt.valid.regexp[ename][1];
                                                    }
                                                }
                                                else if ($webform(obj).attr('type') == 'checkbox' || $webform(obj).attr('type') == 'radio')
                                                {
                                                    var cl = $webform(obj).parents('.wf-inputpos').find('input:checked').length;
                                                    if (cl > 0)
                                                    {
                                                        delete r.error[oname];
                                                    }
                                                    else
                                                    {
                                                        r.error[oname] = tt.valid.regexp[ename][1];
                                                    }
                                                }
                                                else if ($webform(obj).get(0).tagName == 'SELECT')
                                                {
                                                    var cl = $webform(obj).parents('.wf-inputpos').find('option:selected').length;
                                                    if (cl > 0)
                                                    {
                                                        delete r.error[oname];
                                                    }
                                                    else
                                                    {
                                                        r.error[oname] = tt.valid.regexp[ename][1];
                                                    }
                                                }
                                                else if ($webform(obj).hasClass('wf-date-hidden'))
                                                {
                                                    if (/^[0-9]{1,4}-[0-9]{1,4}-[0-9]{1,4}$/.test($webform(obj).val()) == true)
                                                    {
                                                        delete r.error[oname];
                                                    }
                                                    else
                                                    {
                                                        r.error[oname] = tt.valid.regexp[ename][1];
                                                    }
                                                }
                                                else
                                                {
                                                    if (re.test($webform(obj).val()) == true)
                                                    {
                                                        delete r.error[oname];
                                                    }
                                                    else
                                                    {
                                                        r.error[oname] = tt.valid.regexp[ename][1];
                                                    }
                                                }
                                            });

                                            if (tt.valid.check(r, form))
                                            {
                                                var d = {};
                                                var action = form.attr('action');
                                                form.find('input[type!="checkbox"][type!="radio"]:visible, input[type="hidden"], textarea').each(function()
                                                {
                                                    d[$webform(this).attr('name')] = $webform(this).val();
                                                });

                                                form.find('input[type="checkbox"], input[type="radio"]').each(function(index)
                                                {
                                                    if ($webform(this).is(':checked'))
                                                    {
                                                        d[$webform(this).attr('name')] = (d[$webform(this).attr('name')] == undefined) ? [] : d[$webform(this).attr('name')];

                                                        d[$webform(this).attr('name')][d[$webform(this).attr('name')].length] = $webform.trim($webform(this).val());
                                                    }
                                                });

                                                form.find('option').each(function(index)
                                                {
                                                    if ($webform(this).is(':selected'))
                                                    {
                                                        if ($webform(this).parent().attr('name').indexOf('custom') != -1)
                                                        {
                                                            d[$webform(this).parent().attr('name')] = (d[$webform(this).parent().attr('name')] == undefined) ? [] : d[$webform(this).parent().attr('name')];
                                                            if ($webform(this).val() != undefined || $webform(this).val() != '')
                                                            {
                                                                d[$webform(this).parent().attr('name')][d[$webform(this).parent().attr('name')].length] = $webform(this).text();
                                                            }
                                                            else
                                                            {
                                                                d[$webform(this).parent().attr('name')][d[$webform(this).parent().attr('name')].length] = $webform(this).val();
                                                            }

                                                        }
                                                    }
                                                });

                                                var formAction = form.attr('action');

                                                var qStr = '';
                                                for (a in d)
                                                {

                                                    var s = a;
                                                    var sT = s.split('custom_')
                                                    if (sT[1] != undefined)
                                                    {
                                                        sT[1] = sT[1].substring(0, 32);
                                                        s = 'custom_' + sT[1];
                                                    }

                                                    if (typeof(d[a]) == 'string')
                                                    {
                                                        qStr += '&' + s + '=' + encodeURIComponent(d[a]);
                                                    }
                                                    else if (typeof(d[a]) == 'object')
                                                    {
                                                        for (i = 0; i < d[a].length; i++)
                                                        {
                                                            qStr += '&' + s + '[' + i + ']=' + encodeURIComponent(d[a][i]);
                                                        }
                                                    }
                                                }

                                                var separator = (formAction.indexOf('?') !== -1) ? '&' : '?';

                                                qStr = qStr.replace(/\[\[/g, '[').replace(/\[\]/g, '');
                                                qStr += '&callback=?';
                                                qStr = formAction + separator + 'type=ajax' + qStr;

                                                $webform.getJSON(qStr,
                                                    function(result)
                                                    {
                                                        var widtmp = $webform(form).find('[name="webform_id"]').val(), tmprcpl;
                                                        if (result.error != '' && typeof result.error == 'string') {
                                                            if (result.error == 'campaign_user_not_active') {
                                                                var b = form.children('div').eq(0), bl;
                                                                b.css({'position': 'relative', 'overflow': 'hidden'});
                                                                bl = $webform('<var style="display:block; position:absolute; top:0; left:0; width:100%; height:100%; min-height:100%; background:#FFFFFF;"></var>').css({opacity: 0.4});
                                                                bb = $webform('<var style="display:block; overflow:hidden; position:absolute; top:0; left:0; z-index:2; width:80%; padding:7% 5%; margin:5%;  -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px;"></var>');

                                                                bbl = $webform('<var style="display:block; overflow:hidden; position:absolute; top:0; left:0; z-index:2; width:100%; height:100%;  background:#000000; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px;"></var>').css({opacity: 0.4});
                                                                bt = $webform('<var style="display:inline-block; position:relative; z-index:3; width:100%; text-align:center; color:#FFFFFF; font-family:Arial; font-size:12px; ">' + result.table + '</var>');

                                                                bl.appendTo(b);
                                                                bb.appendTo(b);
                                                                bbl.appendTo(bb);
                                                                bt.appendTo(bb);
                                                            }
                                                        } else if (result.error && result.error.show_recaptcha  && result.error.show_recaptcha === 'yes') {

                                                            if (wfs[widtmp].recaptchaelinserted && wfs[widtmp].recaptchaelinserted[0]) {
                                                                wfs[widtmp].recaptchaelinserted.remove();
                                                            }

                                                            wfs[widtmp].recaptchaelinserted = wfs[widtmp].recaptchael.clone(true);

                                                            wfs[widtmp].recaptchaelinserted.removeAttr('style').css({display: 'block'});

                                                            $webform(form).find('li').eq(0).after(wfs[widtmp].recaptchaelinserted);

                                                            wfrc.init(["wf-captcha"], '#WFItem' + widtmp);

                                                        }  else {
                                                            if (tt.valid.check(result, form))
                                                            {
                                                                form.find('input[type="submit"]').unbind('click').bind('click', function(e)
                                                                {
                                                                    e.preventDefault();
                                                                });

                                                                var webformToUse = wid;
                                                                if ('undefined' != typeof result.table && 'undefined' != typeof result.table.webform_id)
                                                                {
                                                                    webformToUse = result.table.webform_id;
                                                                }

                                                                switch (wfso[webformToUse].stay_url)
                                                                {
                                                                    case 'yes':

                                                                        tt.valid.onComplete(form);
                                                                        break;
                                                                    case 'no':
                                                                        var elem = form.find('input[type="submit"]');
                                                                        //elem.unbind('submit').trigger('click');
                                                                        elem.unbind('click').trigger('click');
                                                                        form.unbind('submit');
                                                                        form.unbind('click');
                                                                        //form.submit();
                                                                        break;
                                                                }

                                                            }
                                                        }

                                                    });
                                            }
                                    }
                                },
                                onComplete: function(form)
                                {
                                    var elem = form.find('input[type="submit"]');
                                    var top = elem.offset().top;
                                    var left = elem.offset().left;
                                    var width = elem.outerWidth();
                                    var height = elem.outerHeight();
                                    switch (tt.complete)
                                    {
                                        case 1:
                                            var ocElem = $webform('<div class="onComplete"></div>');
                                            ocElem.css({
                                                'top': (top + height / 2 - 10),
                                                'left': (left),
                                                'opacity': 0,
                                                'z-index': 9999
                                            });
                                            ocElem.appendTo('body');
                                            ocElem.animate({
                                                'opacity': 1
                                            },
                                            {
                                                queue: false,
                                                duration: 500,
                                                specialEasing: 'linear',
                                                complete: function()
                                                {

                                                }
                                            });
                                            break;

                                        case 2:
                                            var ocElem = $webform('<input type="button" class="wf-button" value="' + (tt.onCompleteText) + '">').css(
                                                {
                                                    'opacity': 0,
                                                    'display': 'none'
                                                });
                                            elem.after(ocElem);
                                            elem.animate({
                                                'opacity': 0
                                            }, {
                                                queue: false,
                                                duration: 500,
                                                specialEasing: 'linear',
                                                complete: function() {
                                                    elem.css({
                                                        'display': 'none'
                                                    }).remove();
                                                    ocElem.css({
                                                        'display': 'inline'
                                                    });
                                                    ocElem.animate({
                                                        'opacity': 1
                                                    }, {
                                                        queue: false,
                                                        duration: 500,
                                                        specialEasing: 'linear',
                                                        complete: function() {
                                                        }
                                                    });
                                                }
                                            });
                                            break;
                                    }
                                },
                                send: function(id)
                                {
                                    $webform('#' + id).trigger('click');
                                }
                            },
                            valuehints:
                                {
                                    init: function(fid)
                                    {
                                        tt.valuehints[fid] = (tt.valuehints[fid] == undefined) ? {} : tt.valuehints[fid];
                                        var form = $webform('#' + fid);
                                        var inputs = form.find('input[type="text"]');
                                        tt.valuehints[fid].inputs = {};
                                        inputs.each(function()
                                        {
                                            if ($webform(this).val() != '' && ($webform(this).get(0) !== document.activeElement))
                                            {
                                                tt.valuehints[fid].inputs[$webform(this).attr('name')] = $webform(this).val();
                                            }
                                        });
                                        inputs.bind(
                                            {
                                                'keyup': function(e)
                                                {
                                                    //wfs[this.id].otherfnc.inputvalue = $webform(this).val();
                                                    if ($webform(this).val() == tt.valuehints[fid].inputs[$webform(this).attr('name')] && tt.valuehints[fid].inputs[$webform(this).attr('name')] != '')
                                                    {
                                                        $webform(this).val('');
                                                    }
                                                    $webform(this).removeClass('inputDefaultStyle');
                                                },
                                                'focus': function(e)
                                                {
                                                    if ($webform(this).val() == tt.valuehints[fid].inputs[$webform(this).attr('name')] && tt.valuehints[fid].inputs[$webform(this).attr('name')] != '') {
                                                    }
                                                    $webform(this).selectRange(1);
                                                },
                                                'blur': function(e)
                                                {
                                                    if ($webform(this).val() == '' || $webform(this).val() == tt.valuehints[fid].inputs[$webform(this).attr('name')]) {
                                                        $webform(this).val(tt.valuehints[fid].inputs[$webform(this).attr('name')]);
                                                        $webform(this).addClass('inputDefaultStyle')
                                                    }
                                                }
                                            }).addClass('inputDefaultStyle');
                                    }
                                }
                        };

                        wfs[this.id].recaptchael = false;
                        wfs[this.id].otherfnc = {};
                        wfs[this.id].otherfnc.id = this.id;
                        wfs[this.id].otherfnc.onLoad = function()//wid
                        {
                            var WFIel = $body.find('div[id*="WFItem' + this.id + '"]'),
                                that = this,
                                poweredByLink;
                            WFIel.find('li:visible:last').addClass('clearfix');


                            WFIel.find('li').each(
                                function() {
                                    if ($webform(this).hasClass('wf-captcha')) {
                                        wfs[that.id].recaptchael = $webform(this);
                                    }
                                    if (('' + $webform(this).css('display')).toLowerCase() == 'none') {
                                        $webform(this).remove();
                                    }
                                }
                            );
                            poweredByLink = WFIel.find('.wf-poweredbylink')[0];
                            if (poweredByLink) {
                                poweredByLink.style.color = '';
                                poweredByLink.style.cssText += 'color:inherit!important;';
                            }

                            /* FB settings */
                            if (wfso[this.id].facebook_form == 1) {

                                var fbForm = document.createElement('iframe');
                                fbForm.setAttribute('src', wfso[this.id].host + 'show_facebook_webform.js?wid=' + this.id);
                                fbForm.setAttribute('width', (parseInt(WFIel.outerWidth()) < 300) ? 300 : WFIel.outerWidth());
                                fbForm.setAttribute('height', WFIel.outerHeight());
                                fbForm.setAttribute('scrolling', 'no');
                                fbForm.setAttribute('frameborder', 'no');
                                fbForm.setAttribute('id', 'GRFBForm_' + this.id);
                                //fbForm.style
                                WFIel[0].appendChild(fbForm);


                                WFIel.find('form').css({position: 'absolute', opacity: 0});
                            }
                            /* */

                            tt.valid.regexp.email[1] = wf.t[this.id].validation_address_invalid;
                            tt.valid.regexp.required[1] = wf.t[this.id].validation_required_field;
                            tt.valid.regexp.length0to255[1] = wf.t[this.id].translations_text_to_long;
                            tt.onCompleteText = wf.t[this.id].thank_you;

                            WFIel.each(function()
                            {
                                var id = $webform(this).attr('id').replace('WFItem', '');
                                var optionsEl = $webform(this).find('option')
                                optionsEl.each(function()
                                {
                                    if ($webform(this).val() == undefined)
                                    {
                                        $webform(this).val($webform(this).text());
                                    }
                                });

                                tt.param(
                                    {
                                        'type': 0,
                                        'complete': 2
                                    });

                                tt.init('#WFItem' + id);
                                wfrc.init(["wf-captcha"], '#WFItem' + id);
                                wfs[id].otherfnc.datamanage($webform(this));

                                /*counter*/
                                if ('undefined' == typeof counter)
                                {
                                    var counter = new Object();
                                }
                                counter[this.id] = $webform(this).find('.wf-counter');

                                if (counter[this.id].css('display') == 'block')
                                {
                                    var qCounter = WFIel.find('.wf-counterq');
                                    qCounter.html(' - ')
                                    var cSrc = qCounter.attr('name');
                                    $webform.getJSON(unescape(cSrc) + "&callback=?", function(data)
                                    {
                                        qCounter.html(data.counter);
                                    });
                                }
                                /*counter*/
                            });
                        }
                        wfs[this.id].otherfnc.datamanage = function(form)
                        {
                            var drITable = $webform(form).find('.wf-date-hidden');
                            if (drITable.get(0) == undefined)
                            {
                                return false;
                            }

                            drITable.each(function()
                            {
                                var drI = $webform(this);

                                var thisWebformId = drI.parents('form').find('input[name="webform_id"]').val();
                                var parLi = drI.parents('li[class*="wf-field"]');
                                parLi.css(
                                    {
                                        'height': parLi.height()
                                    });
                                var drIT = $webform('<input type="hidden" class="' + drI.attr("class") + '" name="' + drI.attr("name") + '" value="' + drI.val() + '" />');
                                var patt = drI.val();
                                var pattern = drI.val().split('-');




                                drI.after(drIT);
                                drI.remove();
                                var selBox = $webform('<div class="selBox" style="float:left! important; clear:both !important; width:100% !important;"></div>');
                                drIT.after(selBox);
                                var mm = $webform('<select style="width: 38% !important; float:left !important; display:block !important;" class="wf-input wf-date-mm" name="data_mm" rel="mm"><option value="mm">' + wf.t[thisWebformId]['translations_date_field_default_month'] + '</option></select>');
                                var dd = $webform('<select style="width: 30% !important; float:left !important; display:block !important;" class="wf-input wf-date-dd" name="data_dd" rel="dd"><option value="dd">' + wf.t[thisWebformId]['translations_date_field_default_day'] + '</option></select>');
                                var yyyy = $webform('<select style="width: 32% !important; float:left !important; display:block !important;" class="wf-input wf-date-yyyy" name="data_yyyy" rel="yyyy"><option value="yyyy">' + wf.t[thisWebformId]['translations_date_field_default_year'] + '</option></select>');
                                var clr = $webform('<em class="clearer clear"></em>');
                                for (i = 0; i < pattern.length; i++)
                                {
                                    var o = (eval(pattern[i]));
                                    var s = wfs[thisWebformId].otherfnc.datamanageSetup[pattern[i]][0];
                                    var e = wfs[thisWebformId].otherfnc.datamanageSetup[pattern[i]][1];
                                    for (l = s; l <= e; l++) {
                                        l = (l.toString().length == 1) ? '0' + l.toString() : l;
                                        var opt = $webform('<option value="' + l + '">' + l + '</option>').appendTo(o);
                                    }
                                    o.bind('change', function(e) {
                                        var valT = [];
                                        var sel = $webform(this).parent().find('select');
                                        sel.each(function() {
                                            valT[valT.length] = $webform(this).val();
                                        });
                                        drIT.val(valT.join('-'));
                                    });
                                    o.appendTo(selBox);
                                    clr.appendTo(selBox);
                                }
                            });

                        }
                        wfs[this.id].otherfnc.datamanageSetup =
                            {
                                'dd': [1, 31],
                                'mm': [1, 12],
                                'yyyy': [1900, 2030]
                            }
                        wfs[this.id].otherfnc.hiddenInputValue = function(wid)
                        {
                            wfso[wid].inputvalue = '';
                            var WFItem = $body.find('#WFItem' + wid);
                            var inputs = WFItem.find('input[type="text"]');
                            wfso[wid].inputs = {};
                            inputs.each(function()
                            {
                                wfso[wid].inputs[$webform(this).attr('name')] = $webform(this).val();
                            });
                            inputs
                                .unbind('keydown focus blur')
                                .bind(
                                {
                                    'keydown': function(e)
                                    {
                                        //wfs[this.id].otherfnc.inputvalue = $webform(this).val();
                                        if ($webform(this).val() == wfso[wid].inputs[$webform(this).attr('name')] && wfso[wid].inputs[$webform(this).attr('name')] != '') {
                                            $webform(this).val('');
                                        }
                                        $webform(this).removeAttr('style');
                                    },
                                    'focus': function(e)
                                    {
                                        if ($webform(this).val() == wfso[wid].inputs[$webform(this).attr('name')] && wfso[wid].inputs[$webform(this).attr('name')] != '')
                                            $webform(this).selectRange(1);
                                    },
                                    'blur': function(e)
                                    {
                                        if ($webform(this).val() == '' || $webform(this).val() == wfso[wid].inputs[$webform(this).attr('name')]) {
                                            $webform(this).val(wfso[wid].inputs[$webform(this).attr('name')]);
                                            $webform(this).css({
                                                'color': '#929292',
                                                'font-style': 'italic'
                                            });
                                        }
                                    }
                                })
                                .css({
                                'color': '#929292',
                                'font-style': 'italic'
                            });
                        }
                        wfs[this.id].otherfnc.valid = {};
                        wfs[this.id].otherfnc.valid.onLoad = function()
                        {
                        }
                        wfs[this.id].otherfnc.valid.set = function(obj, arr)
                        {
                            var parLi = $webform(obj.parents('li[class*="wf-req"]'));
                            var parLiClass = parLi.attr('class');
                            var allcheck = '';
                            $body.find('.' + parLiClass + '_valid').remove();


                            for (i = 0; i < arr.length; i++)
                            {
                                var check = wfs[wid].otherfnc.valid.type(obj.val(), arr[i]);
                                allcheck = allcheck + check;
                                var vBox = $body.find('.' + parLiClass + '_valid');
                                if (check != false) {
                                    if (vBox.get(0) == undefined)
                                    {
                                        var vBox = $webform('<li style="displa:none;" class="' + parLiClass + '_valid"><div class="wf-inputpos"></div><em class="clearfix clearer"></em></li>');
                                        parLi.after(vBox);
                                    }
                                    $webform('<div><span style="color:#ffa200; font-size:12px; font-style:italic;">' + check + '</span></div><em class="clearfix clearer"></em>').appendTo(vBox.find('.wf-inputpos'));
                                }
                            }
                            if (allcheck.length == 0)
                            {
                                vBox.remove();
                                return true;
                            }
                            else
                            {
                                vBox.css(
                                    {
                                        'display': 'block'
                                    });
                                return false;
                            }
                        }
                        wfs[this.id].otherfnc.valid.checkall = function(el, liclass, wid, error)
                        {
                            if (error != undefined)
                            {
                                var vBox = $webform('<li style="display:none; padding-top:1px; padding-bottom:5px;  padding-top:2px;" class="' + liclass + '_valid"><em class="clearfix clearer"></em></li>');
                                $body.find('#WFItem' + wid).find('.' + liclass).after(vBox);
                                $webform('<div style="padding:3px; "><span style="color:#ffa200; font-size:12px; font-style:italic;">' + error + '</span></div><em class="clearfix clearer"></em>').appendTo(vBox);
                            }
                            return false;
                        }

                        wfs[this.id].submit = {}
                        wfs[this.id].submit.onLoad = function(wid)
                        {
                            var form = $body.find('#WFItem' + wid).find('form');
                            form.unbind('submit').bind('submit', function(e)
                            {
                                var formAction = form.attr('action');

                                var elTab = form.find('input,select,textarea').not(':disabled');
                                var qStr = '';
                                elTab.each(function()
                                {
                                    qStr += '&' + $webform(this).attr('name') + '=' + encodeURIComponent($webform(this).val());
                                });
                                qStr += '&callback=?';
                                qStr = formAction + '?type=ajax' + qStr;
                                $webform.getJSON(qStr,
                                    function(result)
                                    {
                                        if (wfs[wid].submit.valid(result.error, wid))
                                        {
                                            form.find('.wf-submit').find('.wf-button').val('Thank You!');

                                            switch (wfso[wid].stay_url)
                                            {
                                                case 'yes':
                                                    form.unbind('submit').bind('submit', function(e)
                                                    {
                                                        e.preventDefault();
                                                        return false;
                                                    });
                                                    break;
                                                case 'no':
                                                    form.unbind('submit').submit();
                                                    break;
                                            }
                                        }
                                    }
                                );

                                e.preventDefault();
                            });
                        }

                        wfs[this.id].submit.send = function()
                        {

                        }
                        wfs[this.id].submit.valid = function(obj, wid)
                        {
                            $body.find('#WFItem' + wid).find('li[class*="_valid"]').remove(); //.slideUp('slow',function(){ $webform(this).remove(); });
                            var q = 0;
                            for (a in obj)
                            {
                                q++;
                                var el = $body.find('#WFItem' + wid).find('*[name="' + a + '"]');
                                var liclass = el.parents('li[class*="wf-"]').attr('class');
                                wfs[this.id].otherfnc.valid.checkall(el, liclass, wid, obj[a]);
                            }
                            $body.find('#WFItem' + wid).find('li[class*="_valid"]').slideDown(100);
                            if (obj == '')
                                return true;
                            else
                                return false;
                        }

                        if (window.top.location.host.indexOf('getresponse') == -1 || (hostmywebform && hostmywebform === 'yes'))
                        {
                            if (wfs[this.id].cookie.readCookie('GetResponseComWebform' + this.id) == null)
                            {
                                setTimeout("wfs[" + this.id + "].preview(" + this.id + ");", (parseInt(wfso[this.id].delay) * 1000));
                                wfs[this.id].cookie.createCookie('GetResponseComWebform' + this.id, 'WebformCookie', parseInt(wfso[this.id].period));
                            }
                            else
                            {
                                if (wfso[this.id].type == 'inline')
                                {
                                    setTimeout("wfs[" + this.id + "].otherfnc.onLoad(" + this.id + ");", 100);
                                }
                                ;
                            }
                        }
                        else
                        {
                            setTimeout("wfs[" + this.id + "].preview(" + this.id + ");", (parseInt(wfso[wid].delay) * 1000));
                        }
                    }

                    if (wfs[itemId].finishload == undefined)
                    {
                        wfs[itemId].test();
                        wfs[itemId].finishload = 1;
                    }
                }

                for (i = 0; i < wfso.items.length; i++)
                {
                    if ('object' == typeof wfs[wfso.items[i]])
                    {
                        addTestObj(wfso.items[i]);
                    }
                }

            }
            /*RUN*/
            getInstance(wfs, wfso);

        })(wfs, wfso);

