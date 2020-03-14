// 统一函数 负责接受api 和 axios 来生成所有模块的请求方法

/*当前函数的需求:
    1. 抹平传参的差异;不管最终在请求的使用什么样的格式发送请求;
    我们在api调用的时候;只需要传入一个对象
*/

export default (axios,api)=>{
    const httpUtil = {};

    for(let name in api){
        const {url,method,isForm} =api[name];
        //当前这些async函数 是我们最终要去发请求用的函数
        //data:就是外部在发请求时 传入的对象
        //我们希望外部传入的data 是统一的!!!  {}
        //可是不一样的请求 最终携带的数据的格式是不一样的
        //有可能是json 有可能是formdata
        httpUtil[name] = async (data={})=>{
            //准备请求的数据  而且要抹平这些数据的差异
            let transformData = null;
            let flag = data instanceof Object;
            if(data && flag && isForm){
                transformData = new FormData();
                for(let key in data){
                    transformData.append(key,data[key])
                }
            }else {
                transformData = data;
            }


            //发送请求
            let body = "";
            switch (method){
                case "get":
                case "delete":
                    body = await axios({
                        url,
                        method,
                        params:transformData
                    })
                    break;
                case "put":
                case "post":
                    body = await axios({
                        url,
                        method,
                        data:transformData
                    })
                    break;
            }

            return body
        }
    }


    return httpUtil;
    /*
    httpUtil:
        {
            getContactList:async()=>{},
            delContact:async()=>{},
            updateContact:async()=>{},
            addContactByJson:async()=>{},
            addContactByForm:async()=>{},
        }
    */
}