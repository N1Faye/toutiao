<template>
  <div>
    <!-- 我的频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          plain
          type="danger"
          round
          size="small"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channels" :key="item.id"
          ><div
            class="inner"
            @click="onClick(index)"
            :style="{ color: index === active ? '#ff69b4' : '' }"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-if="index !== 0"
              v-show="isCloseShow"
            /></div
        ></van-col>
      </van-row>
    </div>
    <!-- 推荐频道 -->
    <div class="channel-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col
          span="6"
          v-for="item in RecommengList"
          :key="item.id"
          @click="add(item.id)"
          ><div class="inner van-ellipsis">
            <van-icon name="plus" />{{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>

import { setItem } from '@/utiles/storage'
import { getAllArticleList, saveChannels } from '@/api/home'
const CHANNELS = 'CHANNELS'
export default {
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  async created () {
    try {
      const res = await getAllArticleList()
      this.RecommengList = res.data.data.channels.filter(item => this.channels.every(item1 => item1.id !== item.id))
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      RecommengList: [],
      isCloseShow: false
    }
  },
  methods: {
    add (id) {
      try {
        const index = this.RecommengList.findIndex(item => item.id === id)
        this.channels.push(this.RecommengList[index])
        this.RecommengList.splice(index, 1)
        this.$toast.success('添加成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('添加失败')
      }
    },

    onClick (index) {
      if (this.isCloseShow && index !== 0) {
        try {
          this.RecommengList.unshift(this.channels[index])
          this.channels.splice(index, 1)
          if (index < this.active) {
            this.$emit('del-event', this.active - 1)
          }
          this.$toast.success('删除成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('删除失败')
        }
      } else if (this.isCloseShow && index === 0) {
        this.$toast.fail('推荐不能删除')
      } else {
        this.$emit('change-active', index)
      }
    }
  },
  computed: {

  },
  watch: {
    channels: {
      async handler (newVal) {
        if (this.$store.state.user && this.$store.state.user.token) {
          const arr = []
          newVal.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          })
          console.log(arr)
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) {
            console.log(err)
          }
        } else {
          setItem(CHANNELS, newVal)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channel-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px 16px 16px;
  }
  h3 {
    font-size: 32px;
    font-weight: 400;
    color: #333;
  }
  .van-button {
    width: 104px;
    height: 48px;
    border-radius: 20px;
  }
}
.inner {
  width: 160px;
  height: 86px;
  background: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  font-weight: 400;
  color: #222;
  text-align: center;
  line-height: 86px;
  margin-left: 11px;
  margin-bottom: 22px;
  position: relative;
  .van-icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
  }
}
</style>
