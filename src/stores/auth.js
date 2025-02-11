import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import cookie from 'js-cookie';

const instanceAxios = axios.create({
  baseURL: 'https://studapi.teachmeskills.by',
  headers: {'Content-Type': 'application/json;charset=utf-8'}
});

export const useAuth = defineStore('auth', {
  // data() { return {}}
  state() {
    return {
      accessToken: '',
      refreshToken: '',
      tokenKey: 'postsApp__accessToken',
      refreshTokenKey: 'postsApp__refreshToken',
      loading: false,

      accessUrl: 'http://studapi.teachmeskills.by//activate/OTAwNQ/cl17wn-509a2a3589302457cbe87a2a27719428'
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

    async createUser(data) {
      return await instanceAxios.post('/auth/users/', data )
    },

    // после регистрации и того, как пришло письмо с url на почту, и вы сохранили этот url здесь в state -> url, 
    // отправляем полученные данные на сервер для активации профиля
    async authUserActivation() {
      const data = this.getDataUserFromUrl()

      await instanceAxios.post('/auth/users/activation/', data )
    },

    // этот метод для получения нашего uid и token в формате объекта из строки url (в satete)
    // этот url вам должет придти на почту после регистрации
    getDataUserFromUrl() {
      const str = this.accessUrl.split('activate/')[1]

      // const uid = str.split('/')[0]
      // const token = str.split('/')[1]
      [ uid, id ] = str.split('/');

      return {uid, token}
    },

    async signIn(email, password) {
      this.loading = true;

      try {
        const response = await instanceAxios.post('/auth/jwt/create/', { email, password });

        if (response.statusText !== 'OK') {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resData = response.data
        this.accessToken = resData?.access;
        this.refreshToken = resData?.refresh;
        this.setToken();

        console.log(this.getAuthUsersMe())
        console.log('verifyToken: ', this.verifyToken())

        // this.router.push('/');
      } catch (error) {
        console.log(error.message)

      } finally {
        this.loading = false;
      }
    },

    // с помощью этого запроса можно получить данные юзера, например его id
    async getAuthUsersMe() {
      return await instanceAxios.get('/auth/users/me/', {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
          }
      });
    },

    // с помощью этого запроса можно проверить ваш токен
    async verifyToken() {
      return await instanceAxios.post('/auth/jwt/verify/', {
          token: this.accessToken
        }
      );
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

    checkAccessToken() {
      this.accessToken = cookie.get(this.tokenKey) || '';
      this.refreshToken = cookie.get(this.refreshTokenKey) || '';

      return !!this.accessToken;
    },

    checkExpToken() {
      if (this.accessToken()) {
        const payload = jwtDecode(this.accessToken);

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

    setToken() {
      const decodedToken = jwtDecode(this.accessToken);
  
      if (decodedToken && decodedToken.exp) {
        const expireDate = new Date(decodedToken.exp * 1000 || 0);
        
        cookie.set(this.tokenKey, this.accessToken, {
          // expires: expireDate,
          domain: location.hostname,
          path: '/'
        });

        cookie.set(this.refreshTokenKey, this.refreshToken, {
          domain: location.hostname,
          path: '/'
        });
      }
    },

    isAuth() {
      return this.checkAccessToken();
    }
  }, 
})