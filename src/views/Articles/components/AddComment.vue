<template>
  <van-field
    v-model.trim="message"
    rows="4"
    autosize
    type="textarea"
    placeholder="请输入留言"
    maxlength="50"
    show-word-limit
    center
    ref="filed"
  >
    <template #extra
      ><van-button
        type="default"
        :disabled="message.length === 0"
        class="btn"
        @click="onClick"
        >发布</van-button
      ></template
    ></van-field
  >
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: {
      type: [String, Number],
      required: true
    },
    art_id: {
      type: [String, Number]
    }
  },
  created () { },
  mounted () {
    // 组件最终会变成DOM结构，$el可以获取这个组件的根标签dom
    this.$refs.filed.$el.querySelector('textarea').focus()
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({
          target: this.target,
          content: this.message,
          art_id: this.art_id
        })
        console.log(res)
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.btn {
  border: none;
}
</style>
