export default (axios,api)=>{
    const httpUtil = {};
    for(let name in api){
        const {url,method,isForm,hooksForReq} =api[name];
        //当hooks为undefined的时候; 我们是不能解构赋值的
        //不能const 因为const是一个块级作用域
        if(hooksForReq){
            //api[name] 是一个闭包
            // 变量 和 属性在使用时的区别
            api[name].beforeReq = hooksForReq.beforeReq;
            api[name].AfterReq = hooksForReq.AfterReq;
        }

        //遇到模块级别钩子时;我们不为其做http函数的绑定
        if(api[name] instanceof Function){
            /*break   : 跳出整个循环
            continue : 跳出当次循环*/
            continue
        }

        httpUtil[name] = async (data={})=>{
            //所有的异常让看门狗咬住
            if(!(data instanceof Object)) //如果传入的数据不是对象 则报错
                throw new Error("请求数据必须是一个对象")

            //主体逻辑
            let transformData = null;
            if(isForm){
                transformData = new FormData();
                for(let key in data){
                    transformData.append(key,data[key])
                }
            }else {
                transformData = data;
            }


            let body = "";
            switch (method){
                case "get":
                case "delete":
                    api[name].beforeReq && api[name].beforeReq()
                    body = await axios({
                        url,
                        method,
                        params:transformData
                    })
                    api[name].AfterReq && api[name].AfterReq()
                    break;
                case "put":
                case "post":
                    api[name].beforeReq && api[name].beforeReq()
                    body = await axios({
                        url,
                        method,
                        data:transformData
                    })
                    api[name].AfterReq && api[name].AfterReq()
                    break;
            }

            return body
        }
    }

    return httpUtil;
}