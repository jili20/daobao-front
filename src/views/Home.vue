<template>
  <div class="container">
    <div class="box">🔔{{ billboard.content }}</div>
    <div class="columns">
      <!--  https://bulma.io/documentation/columns/basics/ -->
      <!--  is-three-quarters 占四分之三  -->
      <div class="column is-three-quarters">
        <TopicList></TopicList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>

  </div>
</template>

<script>
import {getBillboard} from '@/api/billboard'
import CardBar from "@/views/card/CardBar"
import TopicList from '@/views/post/Index'

// @ is an alias to /src

export default {
  name: 'Home',
  components: {CardBar, TopicList},
  data() {
    return {
      billboard: {
        content: ''
      }
    }
  },
  created() {
    this.fetchBillboard()
  },
  methods: {
    async fetchBillboard() {
      getBillboard().then((value => {
        const {data} = value
        this.billboard = data
      }))

    }
  }

}
</script>
<style>
</style>
