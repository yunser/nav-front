<template>
    <my-page title="键盘导航" :page="page">
        <div class="keyboard-box">
            <div class="keyboard">
                <div class="key-row" v-for="row in keys">
                    <div class="key" v-for="key in row">{{ key }}</div>
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
       
    </my-page>
</template>

<script>
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                keys: [
                    ['~', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'backspace'],
                    ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
                    ['caps', 'A', 'S', 'D','F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'enter'],
                    ['shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?', 'shift'],
                    ['ctrl', 'alt', 'opt', '⌘', ' ', '⌘', 'opt', '←', '↑', '↓', '→']
                ],
                isSetting: false,
                page: {
                    menu: [
                    ]
                }
            }
        },
        mounted() {
            this.init()
            // this.debug()
        },
        methods: {
            init() {
                this.links = this.$storage.get('links', this.links)
                if (this.$route.query.add) {
                    this.addBoxVisible = true
                    this.link.title = this.$route.query.title
                    this.link.url = this.$route.query.url
                    this.link.icon = this.$route.query.icon
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
            },
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
        padding: 16px;
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
        margin: 8px 0;
        &:nth-of-type(1) {
            // backspace
            .key:nth-of-type(14) {
                width: 100px;
            }
        }
        &:nth-of-type(2) {
            // tab
            .key:nth-of-type(1) {
                width: 100px;
            }
        }
        &:nth-of-type(3) {
            // tab
            .key:nth-of-type(1) {
                width: 100px;
            }
        }
        .key {
            width: 50px;
            height: 40px;
            padding: 8px;
            background-color: #fff;
            border: 1px solid #eee;

            background-color: #fff;
            font-family: sans-serif;
            box-shadow: 2px 2px 0px 0px rgba( 225,235,245,0.75 );
            border-radius: 7px;
            margin: 0px 6px;
            font-size: 16px;
            color: rgba( 0,4,12,0.3);
        }
    }
</style>
