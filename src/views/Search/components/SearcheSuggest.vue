<template>
  <van-cell-group>
    <van-cell
      v-for="(item, index) in List"
      :key="index"
      icon="search"
      @click="$emit('search', item)"
      ><template #title> <span v-html="highlight(item)"></span> </template
    ></van-cell>
  </van-cell-group>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  created () { },
  data () {
    return {
      List: []
    }
  },
  methods: {
    highlight (str) {
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color:red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newVal) {
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newVal)
            this.List = res.data.data.options
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        }, 900)
      },
      immediate: true // 立即监听
    }
  },
  beforeDestroy () {
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
