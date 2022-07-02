<template>
  <div>
    <!-- header -->
    <van-nav-bar fixed>
      <template #title>
        <van-button icon="search" class="searchbtn" to="/search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- tab -->
    <van-tabs v-model="active" animated>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name"
        ><article-list :id="item.id"></article-list
      ></van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelsShow = true">
          <my-icon name="gengduo"></my-icon>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelsShow"
      closeable
      position="bottom"
      :style="{ height: '100%', paddingTop: '0.9rem' }"
      close-icon-position="top-left"
    >
      <channel-panel
        :channels="channels"
        :active="active"
        @change-active="
          active = $event;
          isChannelsShow = false;
        "
        @del-event="active = $event"
      ></channel-panel>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannels } from '@/api/home'
import MyIcon from '@/components/MyIcon.vue'
import ArticleList from '@/components/ArticleList.vue'
import ChannelPanel from './components/ChannelPanel.vue'
import { getItem } from '@/utiles/storage'
const CHANNELS = 'CHANNELS'
export default {
  name: 'Home',
  created () {
    this.getMyChannels()
  },
  data () {
    return {
      active: '0',
      channels: [],
      isChannelsShow: false
    }
  },
  methods: {
    async getMyChannels () {
      const channels = getItem(CHANNELS)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) {
        this.channels = channels
      } else {
        try {
          const res = await getMyChannels()
          this.channels = res.data.data.channels
        } catch (err) {
          console.log('err', err)
        }
      }
    }
  },
  computed: {},
  watch: {

  },
  filters: {},
  components: { MyIcon, ArticleList, ChannelPanel }
}

</script>

<style scoped lang='less'>
// header
/deep/.van-nav-bar__title {
  max-width: unset;
}
.searchbtn {
  color: white;
  width: 555px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  border: none;
}
// tab
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  margin-bottom: 8px;
}
.menu {
  min-width: 66px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
}
.menu1 {
  min-width: 66px;
  height: 82px;
  background: rgba(255, 255, 255, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #edeff3;
}
/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>
