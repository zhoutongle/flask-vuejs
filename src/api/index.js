import qs from 'qs'
import Env from './env';
import axios from 'axios'
import {road} from '../road.js'
import routerIndex from '../router/index'

let token = '';
axios.defaults.withCredentials = false;
axios.defaults.headers.common['token'] = token
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  let user = JSON.parse(window.sessionStorage.getItem('access-user'));
  if (user){
    token = user.token
  }
  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.errcode) {
    if (parseInt(response.data.errcode) === 40001) {
      //未登录
      road.$message.error('请重新登录');
      routerIndex.push('/login');
    }
    if (parseInt(response.data.code) === 108 || parseInt(response.data.code) === 109 || response.data.msg === 'TOKEN失效，请重新登录' || response.data.msg === 'TOKEN不存在') {
      //未登录
      response.data.msg = "登录信息已失效，请重新登录";
      road.$message.error(response.data.msg);
      routerIndex.push('/login');
    }
    if (parseInt(response.data.code) === -1) {
      road.$message.error("请求失败");
    }
  }
  return response;
}, function (error) {
  console.dir(error);
  road.$message.error("服务器连接失败");
  return Promise.reject(error);
});

//基地址
let base = Env.baseURL;

//测试使用
export const ISDEV = Env.isDev;

//通用方法
export const POST = (url, params) => {
  return axios.post(`${base}${url}`, qs.stringify(params)).then(res => res)
}

export const GET = (url, params) => {
  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
}

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
}

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
}
