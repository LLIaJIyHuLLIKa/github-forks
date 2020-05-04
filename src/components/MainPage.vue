<template>
  <div class="main-page">
    <div class="main-page__greeting">
      <h1>Приветствуем на сервисе поиска форков!</h1>
    </div>
    <div class="main-page__menu">
      <router-link to="/">Главная</router-link>
      <router-link to="/githubTable">Таблица форков</router-link>
    </div>
    <div class="main-page__search">
      <input
        @keypress="searchForks($event)"
        v-model="searchQuery"
        type="text"
        placeholder="Введите ссылку репозитория..."
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "main-page",
  data() {
    return {
      searchQuery: "" // поисковый запрос
    };
  },
  methods: {
    searchForks(e) {
      // поиск форков репозитория
      if (e.which == 13) {
        // если нажата клавиша Enter
        const repoMatch = this.searchQuery.match(/:\w+\/:\w+/i);

        if (repoMatch !== null) {
          let resultQuery = "https://api.github.com/repos/" + this.searchQuery.replace(/:/g, "") + "/forks";
          console.log(resultQuery);

          // отправляем запрос и сохраняем форки в хранилище
          axios.get(resultQuery).then(
            response => {
              this.$store.dispatch("setForksListAction", response.data);
              this.$router.push("/githubTable");
            },
            error => {
              console.log(error);
            }
          );
        } else {
          alert("Некорректная ссылка!");
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main-page {
  &__greeting {
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

  &__search {
    width: 70%;
    margin: 0 auto;

    input {
      width: 100%;
      padding: 7px 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
      transition: 0.2s all;

      &::placeholder {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
      }

      &:focus {
        border: 1px solid lightskyblue;
      }
    }
  }
}
</style>