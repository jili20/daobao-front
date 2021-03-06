<template>
  <article className="media">
    <figure className="media-left image is-48x48">
      <img :src="`https://cn.gravatar.com/avatar/${comment.userId}?s=164&d=monsterid`">
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{{ comment.username }} </strong>
          <small className="ml-2"> {{ comment.createTime | date }}</small>
          <br/>
          {{ comment.content }}
        </p>
      </div>
    </div>
  </article>
</template>

<script>

export default {
  name: 'LvCommentsItem', // 一条评论
  props: {
    comment: { // 接收父组件传过来的 对象
      type: Object,
      required: true
    }
  }
}
</script>
