// ==UserScript==
// @name         change Bilibili comments style
// @version      250625
// @description  change Bilibili comments style
// @author       未完待笑(UnfiniSmile)
// @copyright    2025, UnfiniSmile (https://github.com/UnfiniSmile)
// @match        *://www.bilibili.com/*
// ==/UserScript==

(function () {
    'use strict';
    function videoComment(observer) {

        function tryObserve(root) {
            if (root) {
                observer.observe(root, {
                    childList: true,
                    subtree: true,
                })
            }
        }

        const comments = document.getElementsByTagName("bili-comments");
        for (const comment of comments) {
            const feed = comment?.shadowRoot?.children?.contents?.children?.feed;

            tryObserve(comment?.shadowRoot);

            if (!feed) {
                return;
            }
            for (const commentStack of feed.children) {
                const mainComment = commentStack.shadowRoot.children.comment;
                const replies = commentStack.shadowRoot.children?.replies;
                const roots = [];

                tryObserve(commentStack.shadowRoot);

                if (mainComment) {
                    roots.push(mainComment.shadowRoot);
                }

                if (replies) {
                    tryObserve(replies.children[0].shadowRoot);
                    for (const reply of replies.children[0].shadowRoot.querySelectorAll("bili-comment-reply-renderer")) {
                        roots.push(reply.shadowRoot)
                    }
                }
                for (const root of roots) {
                    tryObserve(root);
                }
            }
        }

    function queryShadowRoots(element, selectors) {
        let current = element;
        for (const selector of selectors) {
            if (!current) return null;
            current = current.shadowRoot ? current.shadowRoot.querySelector(selector) : current.querySelector(selector);
        }
        return current;
    }

    function commentStyles(root = document) {
        const biliCommentsList = root.querySelectorAll("bili-comments");
        if (!biliCommentsList.length) return;

        for (const biliComments of biliCommentsList) {
            const threadRenderers = biliComments.shadowRoot?.querySelectorAll("bili-comment-thread-renderer");
            if (!threadRenderers?.length) continue;

            for (const thread of threadRenderers) {
                const commentRenderers = thread.shadowRoot?.querySelectorAll("bili-comment-renderer");
                if (commentRenderers?.length) {
                    for (const renderer of commentRenderers) {
                        const bodyDiv = queryShadowRoots(renderer, ["#body"]);
                        if (bodyDiv && bodyDiv.style.paddingTop !== "0px") {
                            bodyDiv.style.paddingTop = "0px";

                            const headerDiv = bodyDiv.querySelector("#header");
                            if (headerDiv && headerDiv.style.marginBottom !== "-10px") {
                                headerDiv.style.marginBottom = "-10px";
                            }

                            const avatarLink = bodyDiv.querySelector("#user-avatar");
                            if (avatarLink && avatarLink.style.top !== "8px") {
                                avatarLink.style.top = "8px";
                            }
                        }
                        const ornamentDiv = bodyDiv.querySelector("#ornament");
                        if (ornamentDiv && ornamentDiv.style.top !== "-12px") {
                            ornamentDiv.style.top = "-12px";
                        }
                        const actionButton = renderer.shadowRoot?.querySelector("bili-comment-action-buttons-renderer");
                        if (actionButton?.shadowRoot && !actionButton.shadowRoot.querySelector("#custom-action-style")) {
                            const style = document.createElement("style");
                            style.id = "custom-action-style";
                            style.textContent = `:host { margin-top: -6px !important; }`;
                            actionButton.shadowRoot.appendChild(style);
                        }
                    }
                }

                const divElement = thread.shadowRoot?.querySelector("div#div");
                if (divElement && divElement.style.paddingBottom !== "0px") {
                    divElement.style.paddingBottom = "0px";
                }

                const repliesRenderer = thread.shadowRoot?.querySelector("bili-comment-replies-renderer");
                if (repliesRenderer?.shadowRoot) {
                    const replyRenderers = repliesRenderer.shadowRoot.querySelectorAll("bili-comment-reply-renderer");
                    replyRenderers.forEach(reply => {
                        const replyBody = reply.shadowRoot?.querySelector("#body");
                        if (replyBody && replyBody.style.padding !== "0px 0px 0px 34px") {
                            replyBody.style.padding = "0px 0px 0px 34px";
                        }
                        const actionButton = reply.shadowRoot?.querySelector("bili-comment-action-buttons-renderer");
                        if (actionButton?.shadowRoot && !actionButton.shadowRoot.querySelector("#custom-action-style")) {
                            const style = document.createElement("style");
                            style.id = "custom-action-style";
                            style.textContent = `:host { margin-top: -6px !important; }`;
                            actionButton.shadowRoot.appendChild(style);
                        }
                    });
                }
            }
        }
    }

commentStyles();
}
function start (){
    const commentObserver = new MutationObserver((mutations, observer) => {
    videoComment(commentObserver);
});
    commentObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });
}

start();

})();