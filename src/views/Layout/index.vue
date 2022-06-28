<template>
  <div>
    <router-view class="main"></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/home" icon="home-o"
        >首页
        <my-icon name="shouye" slot="icon"></my-icon>
        <!-- <template #icon>
          <i class="toutiao toutiao-shouye"></i> </template
      > -->
      </van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="video-o"
        >视频
        <my-icon name="shipin" slot="icon"></my-icon>
      </van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="question-o"
        >问答
        <my-icon name="wenda" slot="icon"></my-icon>
      </van-tabbar-item>
      <van-tabbar-item replace to="/my" icon="manager-o">
        <my-icon name="wode" slot="icon"></my-icon>
        我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
import MyIcon from '@/components/MyIcon.vue'
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
/deep/ .van-tabbar-item__text {
  font-size: 20px !important;
}
.main {
  padding-bottom: 100px;
  background: #f5f7f9;
}
</style>
