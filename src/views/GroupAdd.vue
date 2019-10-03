<template>
    <my-page title="新建收藏夹" :page="page" backable>
        <div class="common-container container">
            <div class="form">
                 <ui-text-field v-model="group.title" label="标题" />
                 <br>
                 <ui-text-field v-model="group.description" label="简介" />
            </div>
            <h2 class="section-title">链接</h2>
            <ul class="url-list">
                <li class="item" v-for="item in urls">
                    <!-- <a class="link" :to="`/groups/${item.id}`"> -->
                        <!-- <h3 class="title">{{ item.title }}</h3> -->
                    <!-- </a> -->
                    <ui-text-field v-model="item.title" label="标题" />
                    <br>
                    <ui-text-field v-model="item.title" label="描述" />
                    <br>
                    <ui-text-field v-model="item.url" label="链接" />
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
                group: {
                    title: '这是标题',
                    description: '这是内容',
                },
                urls: [
                    {
                        title: '标题1',
                        description: '描述1',
                        url: 'https://www.baidu.com/',
                    },
                    {
                        title: '标题2',
                        description: '描述2',
                        url: 'https://fanyi.baidu.com/',
                    },
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'check',
                            click: this.finish,
                        }
                        // {
                        //     type: 'icon',
                        //     icon: 'help',
                        //     href: 'https://project.yunser.com/products/e11d6f009fcf11e99df48144af4c96c0',
                        //     target: '_blank',
                        //     title: '帮助'
                        // }
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
                // this.$router.push(`/group/add`)
                this.urls.push({
                    title: '',
                    description: '',
                    url: '',
                })
            },
            cancel() {
                this.addBoxVisible = false
            },
            finish() {
                if (!this.group.title) {
                    this.$message({
                        type: 'danger',
                        text: '请输入收藏夹标题'
                    })
                    return
                }
                if (this.urls.length < 2) {
                    this.$message({
                        type: 'danger',
                        text: '至少要添加两个链接'
                    })
                    return
                }
                console.log({
                    ...this.group,
                    items: this.urls
                })
                this.$http.post(`/url/groups`, {
                    ...this.group,
                    items: this.urls
                })
                    .then(response => {
                        console.log('个人信息', response.data)
                        this.group = response.data
                    },
                    response => {
                        console.log(response)
                    })
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
    .section-title {
        font-weight: bold;
        font-size: 24px;
        margin: 16px 0 8px 0;
    }
    .url-list {
        .item {
            // margin-right: 16px;
            margin-bottom: 16px;
            padding: 16px;
            // background-color: #fff;
            // box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
            border: 1px solid rgba(0, 0, 0, .12);
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
