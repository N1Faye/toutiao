<template>
  <div>
    <form action="/">
      <van-search
        autofocus
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="rgb(50, 150, 250)"
        @search="onSearch"
        @focus="isSearch = false"
        @cancel="$router.go(-1)"
      />
    </form>
    <search-history
      v-if="searchText === ''"
      @search="onSearch"
    ></search-history>
    <template v-else>
      <search-result v-if="isSearch" :searchText="searchText"></search-result>
      <searche-suggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></searche-suggest>
    </template>
  </div>
</template>

<script>
import SearcheSuggest from './components/SearcheSuggest.vue'
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  created () { },
  data () {
    return {
      searchText: '',
      isSearch: false

    }
  },
  methods: {
    onSearch (str) {
      this.searchText = str
      this.isSearch = true
      this.$store.commit('setSearchHistoryList', str)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { SearchHistory, SearcheSuggest, SearchResult }
}
</script>

<style scoped lang='less'>

</style>
