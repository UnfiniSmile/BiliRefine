// ==UserScript==
// @name         哔哩哔哩视频列表增强
// @version      240711.1
// @description  修改视频合集长度_直播视频大小_评论区间隔
// @author       未完待笑(UnfiniSmile)
// @copyright    2024, UnfiniSmile (https://github.com/UnfiniSmile)
// @match        https://*.bilibili.com/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    function applyStyles() {
        GM_addStyle('.base-video-sections-v1 .video-sections-content-list { height: 450px !important; }');//24-7-11解决点击下一个视频失效的问题
        //修改bilibili直播界面
        GM_addStyle('.live-room-app .app-content .app-body {width: auto !important;}');//24-7-9
        GM_addStyle('.live-room-app .app-content .app-body .player-and-aside-area {margin-bottom: 90px;}');//24-7-9
        //修改视频列表宽度，弹幕留言列表宽度，以及解除视频列表字符长度限制
        GM_addStyle('.base-video-sections-v1 .video-section-list .video-episode-card__info-title {width: auto !important;}');//24-4-11
        GM_addStyle('.video-sections-v1 .video-sections-content-list[data-v-4222afdb] {height: 354px;}');//24-4-17
        GM_addStyle('.base-video-sections-v1 .video-sections-head_first-line .first-line-left .first-line-title[data-v-538c7b9a] {max-width: 210px;}');//列表标题宽度max24-6-1
        //新版UP空间评论动态大小
        GM_addStyle(`
            .opus-detail {width: 1080px;}
            .right-sidebar-wrap {margin-left: 1100px;}
            .sub-reply-item .sub-reply-info[data-v-1f8a4018] {margin-top: -4px !important;}
            .sub-reply-item[data-v-1f8a4018] {line-height: 0px !important;padding: 2px 0 0px 42px !important;}
            .reply-item .bottom-line[data-v-7041f671] {margin-top: 0px !important;}
            .reply-item .root-reply-container[data-v-7041f671] {padding: 0px 0 0 80px !important;}
            .reply-item .root-reply-container .content-warp .user-info[data-v-7041f671] {margin-bottom: -10px !important;}
            .reply-item .root-reply-container .content-warp .root-reply[data-v-7041f671] {line-height: 10px !important;}
            .reply-item .root-reply-container .content-warp .root-reply .reply-info[data-v-7041f671] {margin-top: -4px !important;}
            .reply-item .root-reply-container .content-warp .reply-decorate[data-v-7041f671] {transform: translateY(-6px) !important;}`);//24-7-11
    }//GM_addStyle('');
    //针对7-10晚上b站更新写的代码，修改评论区间隔
    function modifyElements() {
        try {
            let root1 = document.querySelector("#comment > div > bili-comments").shadowRoot;
            let threadRenderers = root1.querySelectorAll("#feed > bili-comment-thread-renderer");

            threadRenderers.forEach(threadRenderer => {
                let root2 = threadRenderer.shadowRoot;
                let root3 = root2.querySelector("#comment").shadowRoot;

                root3.querySelectorAll("#body").forEach(body => {
                    body.style.paddingTop = '0px';
                });//修改评论者消息间隔24-7-11
                let Div = root2.querySelector("#div");
                if (Div) {
                    Div.style.paddingBottom = '0px';
                }//修改每位评论者消息间隔24-7-11
                let Header = root3.querySelector("#header");
                if (Header) {
                    Header.style.marginBottom = '-10px';
                }//修改评论者名字空白间隔24-7-11
                let Footer = root3.querySelector("#footer > bili-comment-action-buttons-renderer");
                if (Footer) {
                    Footer.style.marginTop = '-4px';
                }//修改评论者时间空白间隔24-7-11
                let userAvatar = root3.querySelector("#user-avatar");
                if (userAvatar) {
                    userAvatar.style.top = '12px';
                }//修改评论者头像位置24-7-11
                let ornament = root3.querySelector("#ornament");
                if (ornament) {
                    ornament.style.top = '-10px';
                }//修改表情牌子位置24-7-11
                let repliesRenderer = root2.querySelector("#replies > bili-comment-replies-renderer");
                if (repliesRenderer) {
                    let root4 = repliesRenderer.shadowRoot;
                    let expanderContents = root4.querySelectorAll("#expander-contents > bili-comment-reply-renderer");
                    expanderContents.forEach(expanderContent => {
                        let root5 = expanderContent.shadowRoot;
                        let Body2 = root5.querySelector("#body");
                        if (Body2) {
                            Body2.style.padding = '0px 0px 0px 34px';
                        }//修改子评论者消息间隔24-7-11
                        let Footer2 = root5.querySelector("#footer > bili-comment-action-buttons-renderer");
                        if (Footer2) {
                            Footer2.style.marginTop = '-6px';
                        }//修改子评论者时间空白间隔24-7-11
                    });
                }
            });
        } catch (e) {
            console.error("Error modifying elements: ", e);
        }
    }

    function observeMutations() {
        const observer = new MutationObserver(mutations => {
            modifyElements();
            setTimeout(function() {
                modifyElements();
            },3000);//添加延迟结构改善未修改的情况
        });

        observer.observe(document, { childList: true, subtree: true });

        const videoListObserver = new MutationObserver(() => {
            GM_addStyle('.base-video-sections-v1 .video-sections-content-list { height: 450px !important; }');
        });

        const videoSectionsList = document.querySelector('.base-video-sections-v1 .video-sections-content-list');
        if (videoSectionsList) {
            videoListObserver.observe(videoSectionsList, { childList: true, subtree: true });
        }
    }
    window.addEventListener('load', function() {
        applyStyles();
        modifyElements();
        observeMutations();

        var videoSectionsContentList = document.querySelector('.base-video-sections-v1 .video-sections-content-list');
        if (videoSectionsContentList) {
            videoSectionsContentList.style.maxHeight = 'none'
        }//24-4-18修改视频列表高度延迟结构改善
    });
})();
