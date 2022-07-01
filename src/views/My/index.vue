<template>
  <div>
    <!-- header 登录后 -->
    <div
      class="header hearder-login"
      v-if="$store.state.user && $store.state.user.token"
    >
      <div class="avatar">
        <div class="left">
          <van-image :src="userInfo.photo" round />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <ul class="list">
        <li>
          <p>{{ userInfo.art_count }}</p>
          <p>头条</p>
        </li>
        <li>
          <p>{{ userInfo.fans_count }}</p>
          <p>粉丝</p>
        </li>
        <li>
          <p>{{ userInfo.follow_count }}</p>
          <p>关注</p>
        </li>

        <li>
          <p>{{ userInfo.like_count }}</p>
          <p>获赞</p>
        </li>
      </ul>
    </div>
    <!-- header 登陆前 -->
    <div class="header header-notlogin" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <!-- 收藏 历史 -->
    <van-grid clickable :column-num="2">
      <van-grid-item text="收藏" to="/">
        <my-icon name="shoucang" slot="icon"></my-icon
      ></van-grid-item>
      <van-grid-item text="历史" to="/">
        <template #icon> <my-icon name="lishi" slot="icon"></my-icon> </template
      ></van-grid-item>
    </van-grid>
    <!-- 列表 -->
    <div class="group">
      <van-cell title="消息通知" is-link url="/vant/mobile.html" />
      <van-cell title="小智同学" is-link to="index" />
    </div>
    <!-- 退出登录 -->
    <van-button
      class="logout"
      type="default"
      block
      v-if="$store.state.user && $store.state.user.token"
      @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
// import { mapState } from 'vuex'
import MyIcon from '@/components/MyIcon.vue'
export default {
  name: 'My',
  async created () {
    if (this.user && this.user.token) {
      try {
        const res = await getUserInfo()
        console.log('res', res)
        this.userInfo = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  data () {
    return {
      userInfo: []
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    // ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
// header
.header {
  width: 750px;
  height: 401px;

  background: rgba(51, 150, 250, 0.7) url("@/assets/banner.png");
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
  }
  p {
    font-size: 28px;
    letter-spacing: 1px;
    color: #ffffff;
    margin-top: 15px;
  }
}
.hearder-login {
  padding-top: 116px;
  .avatar {
    padding: 0 32px;
    margin-bottom: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .van-image {
        width: 132px;
        height: 132px;
      }
      span {
        margin-left: 22px;
        font-size: 30px;
        font-weight: normal;
        color: #ffffff;
      }
    }
    .button {
      width: 115px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: #fff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      color: #666666;
    }
  }
}

.list {
  display: flex;
  li {
    flex: 1;
    text-align: center;
    p {
      font-weight: 400;
      color: #ffffff;
      &:nth-child(1) {
        font-size: 36px;
      }
      &:nth-child(2) {
        font-size: 23px;
      }
    }
  }
}
// 收藏 历史
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
  /deep/ .van-grid-item__text {
    font-size: 28px;
  }
}
// group
.group {
  margin: 9px 0;
}
// 退出登录
.logout {
  color: #d86262;
  font-size: 30px;
}
</style>
