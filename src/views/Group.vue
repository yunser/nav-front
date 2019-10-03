<template>
    <my-page title="收藏夹" :page="page">
        <div class="common-container container">
            <ul class="group-list">
                <li class="item" v-for="item in groups">
                    <router-link class="link" :to="`/groups/${item.id}`">
                        <h3 class="title">{{ item.title }}</h3>
                    </router-link>
                </li>
            </ul>
        </div>
        <ui-float-button class="btn-add" secondary icon="add" @click="add"/>
    </my-page>
</template>

<script>
    /* eslint-disable */
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                groups: [],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/e11d6f009fcf11e99df48144af4c96c0',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.$http.get('/url/groups')
                    .then(response => {
                        console.log('data', response.data)
                        this.groups = response.data
                    },
                    response => {
                        console.log(response)
                    })
            },
            debug() {
                this.isSetting = true
            },
            add() {
                this.$router.push(`/group/add`)
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
                console.log('this.$store.state.user', this.$store.state.user)
                // return
                if (this.$store.state.user) {
                    
                    return
                }
                if (!this.link.icon) {
                    this.link.icon = 'https://tool.yunser.com/static/img/app-tool.png'
                }
                if (this.isAdd) {
                    this.link.id = new Date().getTime()
                    this.links.unshift(this.link)
                    this.$storage.set('links', this.links)
                } else {
                    for (let i = 0; i < this.links.length; i++) {
                        if (this.links[i].id === this.link.id) {
                            this.links.splice(i, 1, this.link)
                            this.$storage.set('links', this.links)
                            break
                        }
                    }
                }
                this.addBoxVisible = false
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
            edit(link, index) {
                this.addBoxVisible = true
                this.isAdd = false
                console.log('编辑', link)
                this.link.id = link.id
                this.link.title = link.title
                this.link.url = link.url
                this.link.icon = link.icon
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
    .group-list {
        .item {
            // margin-right: 16px;
            margin-bottom: 16px;
            // background-color: #fff;
            // box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
        // .link {
        //     display: block;
        //     height: 100%;
        //     padding: 16px;
        //     text-align: center;
        // }
        // .logo {
        //     width: 40px;
        //     height: 40px;
        //     margin-bottom: 8px;
        // }
        // .title {
        //     color: #333;
        //     max-height: 40px;
        //     overflow: hidden;
        // }
        // .item-add {
        //     box-shadow: none;
        //     border: 1px dashed #999;
        //     line-height: 90px;
        //     font-size: 60px;
        //     .title {
        //         color: #999;
        //     }
        // }
    }
    .btn-add {
        position: fixed;
        right: 24px;
        bottom: 24px;
    }
</style>
