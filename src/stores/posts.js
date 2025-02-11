import { defineStore } from "pinia";
import axios from "axios";

const instanceAxios = axios.create({
  baseURL: 'https://studapi.teachmeskills.by',
  headers: {'Content-Type': 'application/json;charset=utf-8'}
});

export const usePosts = defineStore( 'posts', {
  state() {
    return {
      loading: false,
      postListData: null,
      postItemData: null,
      author__course_group: 15,
      limit: 5
    }
  }, 

  actions: {
    getPostListParams(paramsData) {
      let str = ''
      let arr = Object.keys(paramsData).reduce((acc, param) => {
          return paramsData[param] ? [...acc, `${param}=${paramsData[param]}`] : acc
      }, [])
  
      if (arr.length) {
          str = '?' + arr.join('&')
      }

      return str
    },

    async getPostList(search = '', limit = this.limit, author__course_group = this.author__course_group) {

      const pamarsStr = this.getPostListParams({
        limit, search, author__course_group
      })

      try {
        this.loading = true;

        const response = await instanceAxios.get(`https://studapi.teachmeskills.by/blog/posts/${pamarsStr}`)
        if (response.statusText !== 'OK') {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.postListData = response.data
      } catch(error) {
        console.log(error.message)
      } finally {
        this.loading = false;
      }
    },

    async getPostItem(id) {
      try {
        this.loading = true;

        const response = await instanceAxios.get(`https://studapi.teachmeskills.by/blog/posts/${id}`)
        if (response.statusText !== 'OK') {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.postItemData = response.data
      } catch(error) {
        console.log(error.message)
      } finally {
        this.loading = false;
      }
    }
  }
})