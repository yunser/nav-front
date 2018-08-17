<template>
    <my-page2 title="微博生成器">
        
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
    </my-page2>
</template>

<script>
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                link: {
                    title: '',
                    icon: '',
                    url: ''
                },
                links: [
                    {
                        id: '1',
                        icon: 'https://tool.yunser.com/static/img/app-tool.png',
                        title: '云设工具',
                        url: 'https://tool.yunser.com/'
                    },
                    {
                        id: '2',
                        icon: 'https://tool.yunser.com/static/img/app-tool.png',
                        title: '百度',
                        url: 'https://www.baidu.com/'
                    }
                ],
                addBoxVisible: false,
                isSetting: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'settings',
                            click: this.option,
                            title: '管理书签'
                        },
                        {
                            type: 'icon',
                            icon: 'import_export',
                            click: this.exportData,
                            title: '导出书签'
                        },
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help',
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
            add() {
                this.addBoxVisible = true
            },
            cancel() {
                this.addBoxVisible = false
            },
            finish() {
                if (!this.link.title) {
                    alert('请输入网站名称')
                    return
                }
                if (!this.link.url) {
                    alert('请输入网址')
                    return
                }
                if (!/http/.test(this.link.url)) {
                    this.link.url = 'http://' + this.link.url
                }
                if (!this.link.icon) {
                    this.link.icon = 'https://tool.yunser.com/static/img/app-tool.png'
                }
                this.link.id = new Date().getTime()
                this.links.unshift(this.link)
                this.addBoxVisible = false
                this.$storage.set('links', this.links)
            },
            option() {
                this.isSetting = !this.isSetting
            },
            remove(link) {
                for (let i = 0; i < this.links.length; i++) {
                    if (this.links[i].id === link.id) {
                        this.links.splice(i, 1)
                        break
                    }
                }
                this.$storage.set('links', this.links)
            },
            exportData() {
                let cotent = `<!DOCTYPE NETSCAPE-Bookmark-file-1> 
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8"> 
<TITLE>Bookmarks</TITLE> 
<H1>Bookmarks</H1> 
<DL> 
`
                for (let link of this.links) {
                    cotent += `    <DT><A HREF="${link.url}">${link.title}</A></DT>` + '\n'
                }
                cotent += '</DL>'
                let blob = new Blob([cotent], {type: 'text/plain;charset=utf-8'})
                saveAs(blob, 'bookmark_' + new Date().getTime() + '.html')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/var';

    .add-box {
        max-width: 292px;
        padding: 16px;
        background-color: #fff;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        margin-bottom: 24px;
        .btns {
            .btn {
                margin-right: 8px;
            }
        }
    }
    .nav-list {
        @include clearfix;
        .item {
            float: left;
            width: 120px;
            height: 120px;
            margin-right: 16px;
            margin-bottom: 16px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
        .link {
            display: block;
            height: 100%;
            padding: 16px;
            text-align: center;
        }
        .logo {
            width: 40px;
            height: 40px;
            margin-bottom: 8px;
        }
        .title {
            color: #333;
        }
        .item-add {
            box-shadow: none;
            border: 1px dashed #999;
            line-height: 90px;
            font-size: 60px;
            .title {
                color: #999;
            }
        }
    }
</style>
