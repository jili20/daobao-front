<template>
  <article class="media">
    <div class="media-content">
      <form @submit.prevent="onSubmit">
        <b-field>
          <b-input
              v-model.lazy="commentText"
              type="textarea"
              maxlength="400"
              placeholder="Add a comment..."
              :disabled="isLoading"
          ></b-input>
        </b-field>
        <nav class="level">
          <div class="level-left">
            <b-button
                type="is-primary"
                native-type="submit"
                class="level-item"
                :disabled="isLoading"
            >
              发表评论
            </b-button>
          </div>
        </nav>
      </form>
    </div>
  </article>
</template>

<script>
import { pushComment } from '@/api/comment'
import {mapGetters} from 'vuex'

export default {
  name: 'LvCommentsForm', // 评论表单
  data() {
    return {
      commentText: '',
      isLoading: false
    }
  },
  props: {
    slug: {
      type: String,
      default: null
    }
  },
  computed: {
    ...mapGetters([ // 从 vuex 里取出 token,作者是判断是否是已登录用户
      'token'
    ])
  },
  methods: {
    async onSubmit() {
      this.isLoading = true
      // 需要增加 表单不为空校验
      if (this.token != null && this.token !== '') {
        let postData = {}
        console.log(this.commentText)
        postData['content'] = this.commentText
        postData['topic_id'] = this.slug
        await pushComment(postData)
        this.$emit('loadComments', this.slug)
        this.$message.success('留言成功')
      }else {
        this.$message.error('请先登录')
      }

      // try {
      //   let postData = {}
      //   console.log(this.commentText)
      //   postData['content'] = this.commentText
      //   postData['topic_id'] = this.slug
      //   await pushComment(postData)
      //   this.$emit('loadComments', this.slug)
      //   this.$message.success('留言成功')
      // } catch (e) {
      //   this.$buefy.toast.open({
      //     // message: `请先登录. ${e}`,
      //     message: `请先登录`,
      //     type: 'is-danger'
      //   })
      // } finally {
      //   this.isLoading = false
      // }


    }
  }
}
</script>
