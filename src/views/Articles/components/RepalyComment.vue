<template>
  <div class="main">
    <van-nav-bar :title="title" @click-left="$emit('close-event', false)" fixed
      ><template #left> <van-icon name="cross" /> </template
    ></van-nav-bar>
    <commen-item :item="comment" class="comment"></commen-item>
    <van-cell title="全部回复" />
    <commen-item
      v-for="(item, index) in commentList"
      :key="index"
      :item="item"
      @repaly-show="isShow = true"
    ></commen-item>
    <div class="comment1"></div>
    <div class="bottom">
      <van-button round block @click="isAddCommentShow = true">评论</van-button>
    </div>
    <van-popup position="bottom" v-model="isAddCommentShow">
      <add-comment
        v-if="isAddCommentShow"
        :target="comment.com_id"
        :art_id="$route.params.article_id"
        @add-comment="
          commentList.unshift($event);
          isAddCommentShow = false;
          comment.reply_count++;
        "
      ></add-comment>
    </van-popup>
  </div>
</template>
<script>
import CommenItem from './CommenItem.vue'
import { getCommentList } from '@/api/comment'
import AddComment from './AddComment.vue'
export default {
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    this.getCommentList()
  },
  data () {
    return {
      commentList: [],
      paramsObj: {
        source: this.comment.com_id,
        type: 'c',
        limit: 20,
        offset: null
      },
      isShow: false,
      isAddCommentShow: false
    }
  },
  methods: {
    async getCommentList () {
      try {
        const res = await getCommentList(this.paramsObj)
        console.log(res.data.data.total_count)
        this.commentList = res.data.data.results
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    title () {
      const count = this.comment.reply_count
      if (this.comment.reply_count === 0) {
        return '暂无回复'
      } else {
        return count + '条回复'
      }
    }
  },
  watch: {},
  filters: {},
  components: { CommenItem, AddComment }
}
</script>

<style scoped lang='less'>
.comment {
  margin-top: 92px;
}
.comment1 {
  margin-bottom: 110px;
}
.bottom {
  width: 750px;
  height: 110px;
  position: fixed;
  bottom: 0;
  padding: 10px 30px;
  box-sizing: border-box;
  background-color: #3296fa;
}
</style>
