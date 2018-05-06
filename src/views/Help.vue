<template>
    <my-page title="帮助" backable>
        <ui-article>
            <h2>说明</h2>
            <p>一个简单的网址导航网站，用户可以添加任意网址。</p>

            <h2>快速添加</h2>
            <p>如何把一个打开的页面快速添加到云设导航？</p>
            <ol>
                <li>把这个链接直接拖拽到收藏夹栏。
                    <a href="javascript:window.open('https://nav.yunser.com?add=true&title=' + document.title + '&url=' + location.href)">添加到云设导航</a>
                    <!-- <a href="javascript:window.open('/?add=true&title=' + document.title + '&url=' + location.href)">呵呵</a> -->
                </li>
                <li>在任意页面点击收藏夹栏的这个链接，就可以直接跳转到快速添加页面。</li>
            </ol>
        </ui-article>
    </my-page>
</template>
