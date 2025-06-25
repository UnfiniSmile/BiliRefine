# BiliRefine

这是一个修改哔哩哔哩视频合集长度_直播界面_评论区间隔的js脚本

* [Tampermonkey project](https://greasyfork.org/zh-CN/scripts/480765-%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E8%A7%86%E9%A2%91%E5%88%97%E8%A1%A8%E5%A2%9E%E5%BC%BA?locale_override=1)

<p>
    <img src=".picture/videoListHightComparison.jpg">
    <img src=".picture/commentSectionSpacingComparison.jpg">
</p>

## 详细功能

1. 修改哔哩哔哩视频合集长度
2. 修改视频列表合集标题宽度
3. 解除视频列表标题字符长度限制
4. 修改直播视频界面大小
5. 修改直播分区文字长度限制
6. 修改直播推荐视频距离
7. ~~消除直播痕迹追踪~~
8. 修改全部评论区间隔



[√]  重启对修改评论区间隔的支持 25.06.24

## 致谢（Credits）

本项目关于评论区更新监测代码参考自：

- [@gaogaotiantian/biliscope](https://github.com/gaogaotiantian/biliscope)

感谢其开源贡献。

原项目使用 [MIT License](https://opensource.org/licenses/MIT) 许可。

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
    //see code details
---

[![Star History Chart](https://api.star-history.com/svg?repos=UnfiniSmile/BiliRefine&type=Date)](https://star-history.com/#UnfiniSmile/BiliRefine&Date)
