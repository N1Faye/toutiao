<template>
  <van-cell>
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">hello</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{ item.pubdate | dateformate }}</span>
        <van-button
          size="mini"
          type="default"
          @click="$emit('repaly-show', item)"
          >回复</van-button
        >
      </p>
    </div>
    <template>
      <van-loading v-if="isLoading" />
      <van-icon
        v-else
        slot="right-icon"
        :name="item.is_liking ? 'like' : 'like-o'"
        :color="item.is_liking ? 'red' : ''"
        @click="onClick"
        >{{ item.like_count > 0 ? item.like_count : "赞" }}</van-icon
      >
    </template>
  </van-cell>
</template>

<script>
import { addLike, delLike } from '@/api/comment'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () { },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async onClick () {
      this.isLoading = true
      if (this.item.is_liking) {
        try {
          await delLike(this.item.com_id)
          this.item.like_count--
          this.item.is_liking = false
        } catch (err) {
          console.log()
        }
      } else {
        try {
          await addLike(this.item.com_id)
          this.item.like_count++
          this.item.is_liking = true
        } catch (err) {
          console.log(err)
        }
      }
      this.isLoading = false
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
