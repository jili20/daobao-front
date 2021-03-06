<template>
  <section class="box comments">
    <hr/>
    <h3 class="title is-5">评论</h3>
    <lv-comments-form :slug="slug" v-if="token" @loadComments="fetchComments"/>

    <!-- 循环遍历评论列表，给评论项组件传评论数据   -->
    <lv-comments-item
        v-for="comment in comments"
        :key="`comment-${comment.id}`"
        :comment="comment"
    />
  </section>
</template>

<script>
import {mapGetters} from 'vuex'
import {fetchCommentsByTopicId} from '@/api/comment'
import LvCommentsForm from './CommentsForm'
import LvCommentsItem from './CommentsItem' // 评论列表项组件

export default {
  name: 'LvComments', // 评论组件
  components: {
    LvCommentsForm,
    LvCommentsItem
  },
  data() {
    return {
      comments: [] // 所有评论列表
    }
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  async mounted() {
    await this.fetchComments(this.slug)
  },
  methods: {
    // 初始化：获取当前帖子 所有评论
    async fetchComments(topic_id) {
      console.log(topic_id)
      fetchCommentsByTopicId(topic_id).then(response => {
        const {data} = response
        this.comments = data
      })
    }
  }
}
</script>
