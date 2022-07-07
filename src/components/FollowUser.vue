<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :icon="value ? '' : 'plus'"
    :plain="value"
    @click="onClick"
    :loading="isAjax"
    :disabled="isAjax"
    >{{ value ? "已关注" : "关注" }}
  </van-button>
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    target: {
      type: [Number, String],
      required: true
    }
  },
  name: 'FollowUser',
  created () { },
  data () {
    return {
      isAjax: false
    }
  },
  methods: {
    async onClick (value) {
      this.isAjax = true

      if (this.value) {
        try {
          await delUser(this.target)
          this.$emit('input', !this.value)
          this.isAjax = false
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await addUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) {
          console.log(err)
        }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
