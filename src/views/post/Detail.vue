<template>
  <div class="columns container">
    <!--文章详情-->
    <div class="column is-three-quarters">
      <!--主题-->
      <el-card
          class="box-card"
          shadow="never"
      >
        <div
            slot="header"
            class="has-text-centered"
        >
          <p class="is-size-5 has-text-weight-bold">{{ topic.title }}</p>
          <div class="has-text-grey is-size-7 mt-3">
            <span>{{ dayjs(topic.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
            <el-divider direction="vertical"/>
            <span>发布者：{{ topicUser.alias }}</span>
            <el-divider direction="vertical"/>
            <span>查看：{{ topic.view }}</span>
          </div>
        </div>

        <!--Markdown-->
        <div id="preview"/>

        <!--标签-->
        <nav class="level has-text-grey is-size-7 mt-6">
          <div class="level-left">
            <p class="level-item">
              <b-taglist>
                <router-link
                    v-for="(tag, index) in tags"
                    :key="index"
                    :to="{ name: 'tag', params: { name: tag.name } }"
                >
                  <b-tag type="is-info is-light mr-1">
                    {{ "#" + tag.name }}
                  </b-tag>
                </router-link>
              </b-taglist>
            </p>
          </div>
          <!-- 编辑 删除 帖子 -->
          <div
              v-if="token && user.id === topicUser.id"
              class="level-right"
          >
            <!-- 编辑 跳转到新的页面 -->
            <router-link
                class="level-item"
                :to="{name:'topic-edit',params: {id:topic.id}}"
            >
              <span class="tag">编辑</span>
            </router-link>
            <a class="level-item">
              <span
                  class="tag"
                  @click="handleDelete(topic.id)"
              >删除</span>
            </a>
          </div>
        </nav>
      </el-card>
      <!-- 子组件-回复组件，给子组件传帖子 id，目的根据帖子 id 得到所有评论 -->
      <lv-comments :slug="topic.id"/>
    </div>

    <div class="column">
      <!--作者 把自定义的用户信息 :user 传给子组件-->
      <Author
          v-if="flag"
          :user="topicUser"
      />
      <!--推荐 把帖子 id 传给子组件 :topic-id -->
      <recommend
          v-if="flag"
          :topic-id="topic.id"
      />
    </div>
  </div>
</template>

<script>
import {deleteTopic, getTopic} from '@/api/post'
import {mapGetters} from 'vuex'
import Author from '@/views/post/Author'
import Recommend from '@/views/post/Recommend'
import LvComments from '@/components/Comment/Comments'
import Vditor from 'vditor'
import 'vditor/dist/index.css'

export default {
  name: 'TopicDetail',
  components: {Author, Recommend, LvComments},
  computed: {
    ...mapGetters([
      'token', 'user'
    ])
  },
  data() {
    return {
      flag: false,
      topic: {
        content: '',
        id: this.$route.params.id // 获取路由上的帖子 id
      },
      tags: [],
      topicUser: {}
    }
  },
  mounted() {
    this.fetchTopic()
  },
  methods: {
    renderMarkdown(md) {
      // 解析 预览，转 html 内容显示出来
      Vditor.preview(document.getElementById('preview'), md, {
        hljs: {style: 'github'}
      })
    },
    // 初始化
    async fetchTopic() {
      getTopic(this.$route.params.id).then(response => {
        const {data} = response
        document.title = data.topic.title

        this.topic = data.topic
        this.tags = data.tags
        this.topicUser = data.user
        // this.comments = data.comments
        this.renderMarkdown(this.topic.content)
        this.flag = true
      })
    },
    /**
     * 删除 帖子
     * @param id
     */
    handleDelete(id) {
      deleteTopic(id).then(value => {
        const {code, message} = value
        alert(message)

        if (code === 200) {
          setTimeout(() => {
            this.$router.push({path: '/'})
          }, 500)
        }
      })
    }
  }
}
</script>

<style>
#preview {
  min-height: 300px;
}
</style>
