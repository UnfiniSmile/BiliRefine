// ==UserScript==
// @name         哔哩哔哩视频列表增强
// @version      250624
// @description  修改视频合集长度_直播界面_评论区间隔
// @author       未完待笑(UnfiniSmile)
// @copyright    2025, UnfiniSmile (https://github.com/UnfiniSmile)
// @match        https://*.bilibili.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function applyStyles() {
        GM_addStyle('.video-sections-content-list {max-height: 450px !important; height: 450px !important; }');//24-7-14解决点击下一个视频失效的问题
        GM_addStyle('.video-pod .video-pod__body {max-height: 450px !important;}');//25-1-20fix video list invalid
        //修改bilibili直播界面
        GM_addStyle('.live-room-app .app-content .app-body {width: auto !important;max-width: 1620px!important;}}');//24-7-9
        GM_addStyle('.live-room-app .app-content .app-body .player-and-aside-area {margin-bottom: 90px;}');//24-7-9
        GM_addStyle('.header-info-ctnr .rows-ctnr .lower-row .live-area .area-link {max-width: 144px !important;}');//分区文字显示24-9-5
        //修改视频列表宽度，以及解除视频列表字符长度限制
        GM_addStyle('.video-episode-card__info-title {width: auto !important;}');//24-4-11
        GM_addStyle('.first-line-left .first-line-title {max-width: 210px !important;}');//列表标题宽度max24-6-1
        //专栏评论大小
        GM_addStyle(`
            .opus-detail {width: 1080px;}
            .right-sidebar-wrap {margin-left: 1100px;}`);//25-06-24删除无用参数
    }//GM_addStyle('');
    window.addEventListener('load', function() {
        applyStyles();
    });
})();
