import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import GameDetail from '@/components/GameDetail'
import Games from '@/components/Games'
import MyNft from '@/components/MyNft'
import NftShop from '@/components/NftShop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/gameDetail',
      name: 'GameDetail',
      component: GameDetail
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/myNft',
      name: 'MyNft',
      component: MyNft
    },
    {
      path: '/nftShop',
      name: 'NftShop',
      component: NftShop
    }
  ]
})
