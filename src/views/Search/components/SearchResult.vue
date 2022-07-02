<template>
  <div class="main">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-item
          v-for="(item, index) in searchHistory"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      searchHistory: [],
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        this.searchHistory.push(...res.data.data.results)
        this.loading = false
        this.refreshing = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.page++
      this.getSearchResult()
    },
    onRefresh () {
      this.searchHistory = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.main {
  height: calc(100vh - 108px);
  overflow: auto;
}
</style>
