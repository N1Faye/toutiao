<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in ArticleList"
          :key="index"
          :title="item.title"
          label="描述信息"
        >
        </van-cell> -->
        <article-item
          v-for="(item, index) in ArticleList"
          :key="index"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import { getArticleList } from '@/api/home'
import ArticleItem from './ArticleItem.vue'
let ele = null
let scrollTop = 0

export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getArticleList()
  },
  mounted () {
    ele = this.$refs.pullrefresh.$el
    ele.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () { ele.scrollTop = scrollTop },
  data () {
    return {
      timestamp: Date.now(),
      ArticleList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.ArticleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        this.timestamp = res.data.data.pre_timestamp
        if (this.timestamp === null) {
          this.finished = true
        }
        this.ArticleList.push(...res.data.data.results)
        this.loading = false
      } catch (err) {

      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      this.finished = false
      this.loading = true
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 180px;
}
/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
