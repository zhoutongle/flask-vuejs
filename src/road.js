//备注：road.js定义了一个新的Vue对象，目的是调用elementUI的提示信息
//（$message，比如当服务器连接失败时，提示“服务器连接失败”），不需要用到的可移除相关配置
import Vue from 'vue'

export let road = new Vue()
