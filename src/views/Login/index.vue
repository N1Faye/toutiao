<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <van-icon name="cross" slot="left" />登录</van-nav-bar
    >
    <van-form @submit="onSubmit" ref="form">
      <van-field
        name="mobile"
        v-model.trim="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '手机号格式不正确' },
        ]"
      >
        <my-icon name="shouji" slot="left-icon"></my-icon>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入短信验证码"
        :rules="[
          { required: true, message: '请输入短信验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式不正确' },
        ]"
      >
        <template #button
          ><van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button v-else @click="onSendSms" class="yzm" native-type="button"
            >发送验证码</van-button
          >
        </template>
        <my-icon name="yanzhengma" slot="left-icon"></my-icon>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="loginbtn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSMS, login } from '@/api/user'
import MyIcon from '@/components/MyIcon.vue'
export default {
  created () { },
  data () {
    return {
      mobile: '13911111111',
      code: '246810',
      phone: '',
      sms: '',
      time: 5 * 1000,
      isCountDownShow: false

    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        this.$router.push({ name: 'my' })
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败')
      }
    },
    // 获取验证码
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSMS(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败\n请重试')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        this.$toast.fail('手机号格式\n不正确')
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: { MyIcon }
}
</script>

<style scoped lang='less'>
.yzm {
  width: 156px;
  height: 46px;
  line-height: 70px;
  background-color: #ededed;
  border-radius: 23px;
  color: #666666;
  font-size: 22px;
  padding: 0px;
}
.loginbtn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: white;
  font-size: 30px;
}
.van-count-down {
  position: fixed;
  right: 75px;
}
.yzm {
  position: fixed;
  right: 18px;
}
</style>
