import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    forksList: {},       // список форков
    activeAddForkModal: false,
    selectedFork: {},        // форк, добавляемый в избранное
    favouriteForks: []        // избранные форки
  },
  mutations: {
    setForksList(state, forksList) {
      state.forksList = forksList;
    },
    setActiveAddForkModal(state, activeAddForkModal) {
      state.activeAddForkModal = activeAddForkModal
    },
    setSelectedFork(state, selectedFork) {
      state.selectedFork = selectedFork
    },
    setFavouriteForks(state, favouriteForks) {
      state.favouriteForks = favouriteForks
    }
  },
  actions: {
    setForksListAction({commit}, forksList) {
      commit("setForksList", forksList)
    },
    setActiveAddForkModalAction({commit}, activeAddForkModal) {
      commit("setActiveAddForkModal", activeAddForkModal)
    },
    setSelectedForkAction({commit}, selectedFork) {
      commit("setSelectedFork", selectedFork)
    },
    setFavouriteForksAction({commit}, favouriteForks) {
      commit("setFavouriteForks", favouriteForks)
    }
  },
  getters: {
    forksList: state => state.forksList,
    activeAddForkModal: state => state.activeAddForkModal,
    selectedFork: state => state.selectedFork,
    favouriteForks: state => state.favouriteForks
  }
})
