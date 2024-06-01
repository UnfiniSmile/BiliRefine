// ==UserScript==
// @name         哔哩哔哩视频列表增强
// @version      240602
// @description  修改视频合集长度_直播视频大小_评论区间隔
// @author       未完待笑(UnfiniSmile)
// @copyright    2024, UnfiniSmile (https://github.com/UnfiniSmile)
// @match        https://*.bilibili.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function() {
        setTimeout(function() {
            
            var videoSectionsContentList = document.querySelector('.base-video-sections-v1 .video-sections-content-list');
            setTimeout(function() {videoSectionsContentList.style.maxHeight = 'none';}, 0);//24-4-18修改视频列表高度延迟结构改善
            GM_addStyle('.base-video-sections-v1 .video-sections-content-list { height: 410px !important; }');//24-5-3不再使用延迟
            //以下是针对bilibili直播界面的code修改max-width，禁用width，
            GM_addStyle('.live-room-app .app-content .app-body { min-width: 720px; max-width: 1600px; width: auto !important; }');//24-2-20
            //修改视频列表宽度，弹幕留言列表宽度，以及解除视频列表字符长度限制
            GM_addStyle('.base-video-sections-v1 .video-section-list .video-episode-card__info-title { width: auto !important; }');//24-4-11
            //GM_addStyle('.bpx-docker-minor {position: relative;width: 115%;}');//setTimeout(function() {GM_addStyle('.base-video-sections-v1[data-v-538c7b9a]{width: 115%;}')},550);//GM_addStyle('.video-sections-v1[data-v-4222afdb] {width: 115%;}');//24-5-28 beta disabled modify videos list width code
            GM_addStyle('.video-sections-v1 .video-sections-content-list[data-v-4222afdb] {height: 354px;}');//24-4-17
            GM_addStyle('.base-video-sections-v1 .video-sections-head_first-line .first-line-left .first-line-title[data-v-538c7b9a] {max-width: 210px;}');//列表标题宽度max24-6-1
            //修改评论区间隔
            GM_addStyle('.opus-detail {width: 1080px;}');//新版UP空间评论动态24-5-3
            GM_addStyle('.right-sidebar-wrap {margin-left: 1080px;}');//24-6-1
            GM_addStyle('.sub-reply-item[data-v-26797283] {line-height: 0px !important;}');//24-5-24
            GM_addStyle('.sub-reply-item[data-v-26797283] {padding: 2px 0 0px 42px !important;}');//24-5-24
            GM_addStyle('.reply-item .bottom-line[data-v-eb69efad] {margin-top: 0px !important;}');//24-5-24
            GM_addStyle('.reply-item .root-reply-container[data-v-eb69efad] {padding: 0px 0 0 80px !important;}');//24-5-24
            GM_addStyle('.reply-item .root-reply-container .content-warp .user-info[data-v-eb69efad] {margin-bottom: -10px !important;}');//24-6-1
            GM_addStyle('.reply-item .root-reply-container .content-warp .root-reply[data-v-eb69efad] {line-height: 10px !important;}');//24-6-1
            GM_addStyle('.reply-item .root-reply-container .content-warp .reply-decorate[data-v-eb69efad] {transform: translateY(-6px) !important;}');//24-5-24
            //GM_addStyle('');以下代码已注释推荐搭配bilibili_evolved//GM_addStyle('.live-room-app .app-content .app-body .player-and-aside-area .left-container { width: calc(100% - 302px - 64px); box-sizing: border-box; }');// 修改.left-container的宽度//GM_addStyle('.live-room-app .app-content .app-body .player-and-aside-area .aside-area { width: 360px; top: 0; right: 0; bottom: 0; border: 1px solid var(--Ga2); border-radius: 12px; }');//修改.aside-area的宽度
        }, 0); // 总延迟,数字是延迟以毫秒为单位，可以根据实际情况调整
    });
})();