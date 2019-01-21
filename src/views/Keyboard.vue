<template>
    <my-page title="键盘导航" :page="page">
        <div class="keyboard-box">
            <div class="keyboard">
                <div class="key-row" v-for="row in keys">
                    <div class="key" v-for="key in row" 
                        :title="getTitle(key)"
                        @click="clickKey($event, key)">
                        {{ key }}
                        <div class="dot" v-if="hasKey(key)"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="add-box" v-if="addBoxVisible">
            <div>
                <ui-text-field v-model="link.title" label="网站名称" />
            </div>
            <div>
                <ui-text-field v-model="link.url" label="网址" hintText="http://" />
            </div>
            <div>
                <ui-text-field v-model="link.icon" label="图标网址（不填则显示默认图标）" />
            </div>
            <div class="btns">
                <ui-raised-button class="btn" label="添加" primary @click="finish" />
                <ui-raised-button class="btn" label="取消" @click="cancel" />
            </div>
        </div>
        <ui-drawer class="drawer-box" right :open="drawerVisible" @close="toggleDrawer()">
            <ui-appbar title="编辑链接">
                <ui-icon-button icon="close" slot="left" @click="toggleDrawer" />
                <ui-icon-button icon="check" slot="right" @click="save" />
            </ui-appbar>
            <div class="body" v-if="link">
                <ui-text-field v-model="link.title" label="标题" />
                <br>
                <ui-text-field v-model="link.url" label="链接" />
            </div>
        </ui-drawer>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                keys: [
                    ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'backspace'],
                    ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
                    ['caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'enter'],
                    ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?', 'shift'],
                    ['ctrl', 'alt', 'opt', '⌘', ' ', '⌘', 'opt', '←', '↑', '↓', '→']
                ],
                isSetting: false,
                link: null,
                links: [
                    {
                        key: 'B',
                        title: '百度一下',
                        url: 'https://www.baidu.com/'
                    }
                ],
                //
                drawerVisible: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/keyboard/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
            // this.debug()
        },
        methods: {
            toggleDrawer() {
                this.drawerVisible = !this.drawerVisible
            },
            init() {
                this.links = this.$storage.get('klinks', this.links)
                if (this.$route.query.add) {
                    this.addBoxVisible = true
                    this.link.title = this.$route.query.title
                    this.link.url = this.$route.query.url
                    this.link.icon = this.$route.query.icon
                }
            },
            getTitle(key) {
                let obj = {}
                for (let i = 0; i < this.links.length; i++) {
                    obj[this.links[i].key] = this.links[i]
                }
                return obj[key] ? obj[key].title : ''
            },
            hasKey(key) {
                let obj = {}
                for (let i = 0; i < this.links.length; i++) {
                    obj[this.links[i].key] = this.links[i]
                }
                return obj[key]
            },
            save() {
                let found = false
                for (let i = 0; i < this.links.length; i++) {
                    if (this.links[i].key === this.link.key) {
                        this.links.splice(i, 1, this.link)
                        break
                    }
                }
                if (!found) {
                    this.links.push(this.link)
                }
                this.$storage.set('klinks', this.links)
                this.drawerVisible = false
            },
            clickKey(e, key) {
                console.log(key)
                let link = null
                for (let i = 0; i < this.links.length; i++) {
                    if (this.links[i].key === key) {
                        link = this.links[i]
                        break
                    }
                }
                if (e.ctrlKey) {
                    console.log('ctrlKey')
                    if (link) {
                        this.link = link
                    } else {
                        this.link = {
                            key: key,
                            url: '',
                            title: ''
                        }
                    }
                    this.drawerVisible = true
                } else {
                    if (link) {
                        window.open(link.url)
                    } else {
                        this.$message({
                            type: 'info',
                            text: '该键没有绑定任何网址'
                        })
                    }
                }
            },
            debug() {
                // this.addBoxVisible = true
                // this.link = {
                //     title: '百度翻译',
                //     logo: 'https://tool.yunser.com/static/img/app-tool.png',
                //     url: 'http://fanyi.baidu.com/'
                // }
                // this.finish()
                this.isSetting = true
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/var';

    .keyboard-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 16px 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        .keyboard {
            width: 962px;
            height: 299px;
            padding: 16px 16px;
            background-color: rgba(246,248,250,1);
            border-radius: 16px;
            box-shadow: 0px 0px 0px 1px rgba(216,219,242,0.6), 1px 1px 0px 3px rgba(216,219,242,0.2);
        }
    }
    .key-row {
        display: flex;
        margin-bottom: 8px;
        &:nth-of-type(1) {
            // backspace
            .key:nth-of-type(14) {
                width: 80px;
            }
        }
        &:nth-of-type(2) {
            // tab
            .key:nth-of-type(1) {
                width: 80px;
            }
        }
        &:nth-of-type(3) {
            // caps
            .key:nth-of-type(1) {
                width: 102px;
            }
            // enter
            .key:nth-of-type(13) {
                width: 100px;
            }
        }
        &:nth-of-type(4) {
            // shift
            .key:nth-of-type(1) {
                width: 140px;
            }
            // shift
            .key:nth-of-type(12) {
                width: 96px;
            }
        }
        &:nth-of-type(5) {
            // ctrl
            .key:nth-of-type(1) {
                width: 96px;
            }
            // blank
            .key:nth-of-type(5) {
                width: 206px;
            }
        }
        .key {
            position: relative;
            width: 50px;
            height: 48px;
            padding: 8px;
            background-color: #fff;
            border: 1px solid #eee;
            font-family: sans-serif;
            box-shadow: 2px 2px 0px 0px rgba( 225,235,245,0.75 );
            border-radius: 7px;
            margin: 0px 8px;
            font-size: 12px;
            color: #333;
            cursor: pointer;
            &:hover {
                background-color: #f9f9f9;
            }
            .dot {
                position: absolute;
                left: 8px;
                bottom: 8px;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #4285f4;
                opacity: 0.2;
            }
        }
    }
    .drawer-box {
        width: 320px;
        .body {
            padding: 16px;
        }
    }
</style>
