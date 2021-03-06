<template>
  <section>
    <div class="columns">
      <div class="column is-full">
        <el-card class="box-card" shadow="never">
          <div slot="header" class="clearfix">
            <span><i class="fa fa fa-book"> 主题 / 更新主题</i></span>
          </div>
          <div>
            <el-form :model="topic" ref="topic" class="demo-topic">
              <el-form-item prop="title">
                <el-input
                    v-model="topic.title"
                    placeholder="输入新的主题名称"
                ></el-input>
              </el-form-item>

              <!-- Markdown 编译器 -->
              <div id="vditor"></div>

              <b-taginput
                  v-model="tags"
                  class="my-3"
                  maxlength="15"
                  maxtags="3"
                  ellipsis
                  placeholder="请输入主题标签，限制为 15 个字符和 3 个标签"
              />
              <el-form-item class="mt-3">
                <el-button type="primary" @click="handleUpdate()"
                >更新
                </el-button>
                <el-button @click="resetForm('topic')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </div>
    </div>
  </section>
</template>

<script>
import {getTopic, update} from "@/api/post";
import Vditor from "vditor";
import "vditor/dist/index.css";

export default {
  name: "TopicEdit",
  components: {},
  data() {
    return {
      topic: {}, // 帖子对象
      tags: [] // 标签集合
    }
  },
  created() {
    this.fetchTopic();
  },
  methods: {
    // md 帖子内容
    renderMarkdown(md) {
      // 创建 Markdown 对象
      this.contentEditor = new Vditor("vditor", {
        height: 460,
        placeholder: "输入要更新的内容",
        preview: {
          hljs: {style: "monokai"},
        },
        mode: "sv",
        after: () => {
          // 把获取到的内容 显示到编译器上
          this.contentEditor.setValue(md);
        },
      })
    },
    fetchTopic() {
      // 获取帖子详情内容
      getTopic(this.$route.params.id).then((value) => {
        this.topic = value.data.topic;
        this.tags = value.data.tags.map(tag => tag.name);
        this.renderMarkdown(this.topic.content);
      })
    },
    // 查新帖子
    handleUpdate: function () {
      // 取到 编译器里的内容
      this.topic.content = this.contentEditor.getValue();
      // 调用接口 修改帖子
      update(this.topic).then((response) => {
        const {data} = response;
        console.log(data);
        // 更新后 跳到帖子详情页面
        setTimeout(() => {
          this.$router.push({
            name: "post-detail",
            params: {id: data.id},
          });
        }, 800);
      })
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.contentEditor.setValue("");
      this.tags = "";
    },
  },
}
</script>

<style>
.vditor-reset pre > code {
  font-size: 100%;
}
</style>
