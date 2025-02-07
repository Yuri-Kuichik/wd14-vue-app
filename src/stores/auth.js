import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'https://studapi.teachmeskills.by'
});
instanceAxios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

export const useAuth = defineStore('auth', {
  // data() { return {}}
  state() {
    return {
      accessToken: 'qwe',
      refreshToken: '',
      loading: false
    }
  },

  // computed: {}
  getters: {
    
  },

  // methods: {}
  actions: {
    async getPosts(data) {
      
      try {
        const res = await instanceAxios.get('/blog/posts/?author__course_group=15')
        console.log(res)
      } catch(error) {
        // handle error
        console.log(error.message)
      } finally {
        // always executed
      }

      const resData = await instanceAxios.post('/auth/jwt/create/', data)

      console.log(resData)
    },

    async signIn(email, password) {
      this.loading = true;
      // await this.getPosts(data);

      try {
        const response = await instanceAxios.post('https://studapi.teachmeskills.by/auth/jwt/create/', { email, password });

        if (response.statusText !== 'OK') {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resData = response.data
        console.log('tokenData: ', resData)
        this.accessToken = resData.access;
        this.refreshToken = resData.refresh;

        this.$router.push('/');
      } catch (error) {
        console.log(error.message)

      } finally {
        this.loading = false;
      }

    },

    checkAccessToken() {
      if (this.accessToken) {
        const payload = jwtDecode(this.accessToken);
        console.log(payload)

        let expTime = payload.exp * 1000;
        let curTime = new Date().getTime();

        const resTime = expTime - curTime
        console.log('resTime: ', resTime)
        if (resTime <= 0 ) {
          // refresh token
          this.refreshAccessToken()
        }
      } else {

      }
    },

    async refreshAccessToken() {
      try {
        const res = await instanceAxios.post('/auth/jwt/refresh/', {
          refresh: this.refreshToken
        })
        console.log('refreshToken -> result: ', res)
      } catch(error) {
        // handle error
        console.log(error.message)
      } finally {
        // always executed
      }
    },

    checkExpToken() {
      this.checkAccessToken()
    }
  }, 
})