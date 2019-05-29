import * as API from './'

export default {
  //登录
  login: params => {
	//return "success";
    return API.POST('/users/login', params)
  },
  //登出
  logout: params => {
    //return "success";
    return API.GET('/users/logout', params)
  },
  //获得用户列表
  getuserslist: params => {
    return API.GET('/users/listpage', params)
  }
}
