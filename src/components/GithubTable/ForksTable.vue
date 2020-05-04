<template>
  <div class="forks-table">
    <div class="forks-table__title">
      <h1>Таблица форков</h1>
    </div>
    <div class="forks-table__menu">
      <router-link to="/">Главная</router-link>
      <router-link to="/githubTable">Таблица</router-link>
    </div>
    <div v-if="forks.length > 0" class="forks-table__content">
      <div class="forks-table__content-table">
        <table>
          <thead>
            <tr>
              <th>Название репозитория</th>
              <th>Владелец</th>
              <th>Количество звёзд</th>
              <th>Ссылка на репозиторий форка</th>
              <th>Избранное</th>
            </tr>
          </thead>
          <tbody>
            <fork-item v-for="fork in paginatedForks" :key="fork.id" :fork="fork">></fork-item>
          </tbody>
        </table>
      </div>
      <div class="forks-table__content-pages">
        <button
          v-for="page in pagesList"
          :key="page"
          @click="moveToPage(page)"
          class="page"
          :class="{'active': page === pageNumber}"
        >{{ page }}</button>
      </div>
    </div>
    <div v-else class="forks-table__description">
      <span>Не найдено ни одного форка. Введите другой репозиторий.</span>
    </div>

    <div v-show="activeAddForkModal===true" class="add-fork__modal">
      <div class="add-fork__modal-title">
        <span>Добавить форк в избранное?</span>
      </div>
      <div class="add-fork__modal-buttons">
        <button @click="closeAddForkModal" class="not-add">Нет</button>
        <button @click="addFork" class="add">Да</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ForkItem from "./ForkItem.vue";

export default {
  name: "forks-table",
  data() {
    return {
      pageNumber: 1, // номер страницы
      perPage: 10 // количество форков на странице
    };
  },
  components: {
    ForkItem
  },
  mounted() {
    // при монтировании компонента создаём в локальном хранилище пустой массив избранных форков
    localStorage.setItem('selectedForks', JSON.stringify([]));        
  },
  methods: {
    moveToPage(page) {
      // переход на другую страницу
      this.pageNumber = page;
    },
    closeAddForkModal() {
      // закрытие модального окна
      this.$store.dispatch("setActiveAddForkModalAction", false);
    },
    addFork() {
      // добавление форка в избранное
      let forks = JSON.parse(localStorage.getItem('selectedForks')) || [];

      forks.push(this.selectedFork);
      localStorage.setItem('selectedForks', JSON.stringify(forks));

      this.$store.dispatch("setFavouriteForksAction", forks);
      this.$store.dispatch("setActiveAddForkModalAction", false);
    }
  },
  computed: {
    ...mapGetters({
      forks: "forksList",
      activeAddForkModal: "activeAddForkModal",
      selectedFork: "selectedFork"
    }),

    pagesList() {
      // массив страниц
      let pages = [];
      let numberOfPages = Math.ceil(this.forks.length / this.perPage);

      for (let index = 1; index <= numberOfPages; index++) {
        pages.push(index);
      }

      return pages;
    },
    paginatedForks() {
      // данные с форками
      let start = this.pageNumber * this.perPage - this.perPage;
      let end = this.pageNumber * this.perPage;

      return this.forks.slice(start, end);
    }
  }
};
</script>

<style lang="scss" scoped>
.forks-table {
  .active {
    background-color: #000;
    color: #fff;
    cursor: default;
  }

  &__title {
    text-align: center;
  }

  &__menu {
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;

    & .router-link-exact-active {
      background-color: orange;
    }

    a {
      padding: 15px;
      margin-right: 15px;
      text-decoration: none;
      color: #000;
      transition: 0.2s all;

      &:hover {
        background-color: orange;
      }
    }
  }

  &__content {
    &-table {
      table {
        width: 95%;
        margin: 0 auto;
        text-align: center;
        border: 1px solid #000;
        border-collapse: collapse;

        th {
          padding: 10px;
          border-right: 1px solid #000;
          border-bottom: 1px solid #000;
        }
      }
    }

    &-pages {
      width: 95%;
      margin: 20px auto 20px auto;
      text-align: right;

      button {
        padding: 8px;
        margin-right: 2px;
        transition: 0.2s all;
        border: 0;
        cursor: pointer;

        &:last-child {
          margin-right: 0;
        }

        &:hover {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }

  &__description {
    text-align: center;
    color: #ccc;
  }

  & .add-fork__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    min-height: 150px;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
    background-color: #fff;
    z-index: 2;

    button {
      border: 0;
      border-radius: 5px;
      padding: 4px 20px;
      cursor: pointer;
    }

    &-title {
      padding: 50px 0;
      text-align: center;
    }

    &-buttons {
      position: relative;
      width: 100%;
      padding: 0 10px;

      .not-add {
        background-color: #f00;
        color: #fff;
      }

      .add {
        position: absolute;
        right: 10px;
        background-color: lightskyblue;
      }
    }
  }
}
</style>