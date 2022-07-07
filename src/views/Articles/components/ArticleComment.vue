<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <commen-item
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @repaly-show="$emit('repaly-show', $event)"
      ></commen-item>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import CommenItem from './CommenItem.vue'
export default {
  props: {
    source: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      required: true,
      validator (value) {
        return ['a', 'c'].includes(value)
      }
    },
    commentList: {
      typr: Array,
      required: true
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      // commentList: [],
      paramsObj: {
        source: this.source,
        type: this.type,
        limit: 5,
        offset: null
      },
      loading: false,
      finished: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        if (res.data.data.results.length === 0) {
          this.finished = true
        }

        this.$emit('set-count', res.data.data.total_count)
        console.log(res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        this.paramsObj.offset = res.data.data.last_id
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getCommentList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommenItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
