### day01
    vant的基本使用
    vant的业务组件(联系人组件)
    数组的api复习

### day02
    将联系人练习中数据做活(axios请求)
    promise;async;await的复习

### 工程化
    脚手架(工程化工具)
        webpack
        babel
        eslint
        postcss
        .....
    项目目录的设计(工程化思想)

### 基于vue4.0 脚手架的封装
    主要是用来让axios请求自动化 可配置
    组件
        this.$http.模块名.请求方法({请求参数1,请求参数2})
        this.$http 来自于: mian.js
            import http from "@/http"
            Vue.prototype.$http = http;
        http 来自于:http/index.js
            import contact from "./contact"
            export default {
                contact
            }
        contact 来自于:  http/contact/index.js
            import api from "./api" // 发送请求需要的配置
            import axios from "./axios"// 发送请求需要的那个axios实例
            // 当前这个工具函数 会根据api 和  axios来生成当前模块要往外提供的请求方法
            import utilFn from "@/util/http"
            export default utilFn(axios,api)

            utilFn(axios,api) 吐出:
                {
                    getxxx:()=>{},
                    updatexxx:()=>{}
                }
