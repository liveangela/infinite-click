/*!
 * Infinite loading html content by button clicking - v0.0.1 - 2016-07-18
 * https://github.com/liveangela/infinite-click
 * Copyright (c) 2016 liveangela
 */
var load_func = function(scrollObj, callback) {
    var defaultObj = {
        container: '#container',
        itemSelector: '',
        nextSelector: '.load-more a',
        trigger: '.load-more button'
    };

    !scrollObj.container && (scrollObj.container = defaultObj.container);
    !scrollObj.nextSelector && (scrollObj.nextSelector = defaultObj.nextSelector);
    !scrollObj.trigger && (scrollObj.trigger = defaultObj.trigger);

    if (!!scrollObj && !!scrollObj.itemSelector) {
        var containerDom = $(scrollObj.container);
        var nextSelectorDom = $(scrollObj.nextSelector);
        var triggerDom = $(scrollObj.trigger);

        if (nextSelectorDom.length > 0 && triggerDom.length > 0) {
            triggerDom.on('click', function() {
                console.log('loading...');
                triggerDom.attr('disabled', 'disabled');

                $.ajax({
                    url: nextSelectorDom.attr('href'),
                    method: 'get',
                    dataType: 'html',
                    timeout: 2000,
                    success: function(htmlText) {
                        var doms = $(htmlText).find(scrollObj.itemSelector);
                        var newNextSelectorDom = $(htmlText).find(scrollObj.nextSelector);
                        var newTriggerDom = $(htmlText).find(scrollObj.trigger);
                        if (newNextSelectorDom.length > 0) {
                            var newHref = newNextSelectorDom.attr('href');
                            nextSelectorDom.attr('href', newHref);
                            containerDom.append(doms);
                        }

                        if (0 == newTriggerDom.length) {
                            triggerDom.hide();
                        }

                        console.log('done');
                        triggerDom.removeAttr('disabled');

                        if (!!callback) {
                            callback();
                        }
                    },
                    error: function(req, status) {
                        console.error(status);
                    }
                });
            });
        }
    } else {
        return false;
    }
};