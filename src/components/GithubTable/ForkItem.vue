<template>
  <tr>
    <td>
      <span>{{ fork.name }}</span>
    </td>
    <td>
      <span>{{ fork.owner.login }}</span>
    </td>
    <td>
      <span>{{ fork.stargazers_count }}</span>
    </td>
    <td>
      <a :href="fork.html_url">{{ fork.html_url }}</a>
    </td>
    <td>
      <button @click="openAddForkModal" v-if="isSelectedFork===false">Добавить в избранное</button>
      <span v-else>+</span>
    </td>
  </tr>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "fork-item",
  props: {
    fork: Object
  },
  methods: {
    openAddForkModal() {
      // открытие модального окна добавления форка в избранное
      this.$store.dispatch("setActiveAddForkModalAction", true);
      this.$store.dispatch("setSelectedForkAction", this.fork);
    }    
  },
  computed: {
    ...mapGetters({
      favouriteForks: "favouriteForks"
    }),

    isSelectedFork() {
      // проверка на наличие форка в избранном
      return this.favouriteForks.some(selectedFork => selectedFork.id === this.fork.id);
    }
  }
};
</script>

<style lang="scss" scoped>
tr {
  td {
    padding: 10px;
    border-right: 1px solid #000;
    border-bottom: 1px solid #000;
  }
}
</style>