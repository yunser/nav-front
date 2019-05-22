<template>
    <my-page title="我的收藏" :page="page">
        <div class="common-container container">
            <a href="javascript:;" v-if="!$store.state.user" @click="login">点击登陆</a>
            <div class="container" v-if="$store.state.user">
                <!-- <div @click="test">测试</div> -->
                <!-- <div class="total">共收录 {{ total }} 个网站</div> -->
                <div v-if="!urls.length">没有收藏的网址</div>
                <ul class="nav-list">
                    <li class="item" v-for="link, index in urls">
                        <router-link class="link" :to="`/sites/${link.id}`">
                            <img class="icon" :src="link.icon || '/static/img/nav.svg'" alt="">
                            <h3 class="title">{{ link.title }}</h3>
                        </router-link>
                        <div class="description">{{ link.description }}</div>
                        <div>
                            <a href="#" @click.prevent="remove(link)">删除</a>
                            | 
                            <a href="#" @click.prevent="edit(link, index)">编辑</a>
                        </div>
                        <a class="visit" :href="link.url" target="_blank">访问</a>
                        <br>
                    </li>
                </ul>
                <ui-pagination :total="total" :current="curPage" :pageSize="20" @pageChange="handleClick"></ui-pagination>
            </div>
        </div>
        <ui-float-button class="btn-add" secondary icon="add" @click="add"/>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import oss from '@/util/oss'
    const saveAs = window.saveAs

    export default {
        data () {
            return {
                curPage: 1,
                total: 20,
                isAdd: true,
                link: {
                    title: '',
                    icon: '',
                    url: ''
                },
                urls: [],
                addBoxVisible: false,
                isSetting: false,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/bbc9c680702311e999b6a92ec207965f',
                            target: '_blank',
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
            login() {
                location.href = oss.getOauthUrl()
            },
            loadData() {
            },
            handleClick(newIndex) {
                // console.log('handleClick', newIndex)
                this.$router.push('/me?page=' + newIndex)
                // this.curPage = newIndex
                console.log('录音变化', this.curPage)
                // this.loadData()
            },
            init() {
                let user = this.$store.state.user
                if (!user) {
                    return
                }
                this.curPage = parseInt(this.$route.query.page || 1)
                // return
                this.$http.get(`/urls?page=${this.curPage}&page_size=20`).then(
                    response => {
                        let data = response.data
                        console.log('response.headers', response.headers)
                        this.urls = data
                        this.total = parseInt(response.headers['x-total'])
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                // this.$http.get(`/urls/${encodeURIComponent('https://www.bilibili.com/')}`).then(
                //     response => {
                //         let data = response.data
                //         console.log('latest2', data)
                //         // this.urls = data
                //     },
                //     response => {
                //         console.log('cuol')
                //         if (response.code === 403) {
                //             this.$store.state.user = null
                //         }
                //         this.loading = false
                //     })
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
                this.isAdd = true
                this.addBoxVisible = true
            },
            cancel() {
                this.addBoxVisible = false
            },
            option() {
                this.isSetting = !this.isSetting
            },
            remove(link) {
                let ret = confirm('确认删除？')
                if (!ret) {
                    return
                }
                
                this.$http.delete(`/urls/${link.id}`).then(
                    response => {
                        let data = response.data
                        this.init()
                        console.log('latest2', data)
                        // this.urls = data
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
                // for (let i = 0; i < this.links.length; i++) {
                //     if (this.links[i].id === link.id) {
                //         this.links.splice(i, 1)
                //         break
                //     }
                // }
                // this.$storage.set('links', this.links)
            },
            edit(link, index) {
                this.$router.push(`/urls/${link.id}`)
                // this.addBoxVisible = true
                // this.isAdd = false
                // console.log('编辑', link)
                // this.link.id = link.id
                // this.link.title = link.title
                // this.link.url = link.url
                // this.link.icon = link.icon
            },
            add() {
                this.$router.push(`/url/add`)
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
            },
            test() {
                this.$http.post(`/urls`, {
                    title: '网易云音乐',
                    url: 'https://music.163.com/'
                }).then(
                    response => {
                        let data = response.data
                        console.log('latest3', data)
                        // this.urls = data
                    },
                    response => {
                        console.log('cuol')
                        if (response.code === 403) {
                            this.$store.state.user = null
                        }
                        this.loading = false
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '../scss/var';
    .total {
        margin-bottom: 16px;
    }
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
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
        display: flex;
        flex-wrap: wrap;
        // @include clearfix;
        .item {
            position: relative;
            // float: left;
            width: 320px;
            height: 120px;
            padding: 16px;
            margin-right: 16px;
            margin-bottom: 16px;
            background-color: #fff;
            box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
        .link {
            display: block;
            display: flex;
            // height: 100%;
            align-items: center;
            
            // text-align: center;
        }

        .visit {
            position: absolute;
            top: 16px;
            right: 16px;
        }
        .icon {
            width: 40px;
            height: 40px;
            margin-right: 8px;
            // margin-bottom: 8px;
        }
        .title {
            color: #333;
            max-height: 40px;
            overflow: hidden;
        }
        .description {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
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
    .btn-add {
        position: fixed;
        right: 24px;
        bottom: 24px;
    }
</style>
