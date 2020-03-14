import { Toast } from 'vant'
export default {
    getContactList:{
        url:"/contactList",
        method:"get",
        hooksForReq:{
            //每个请求个性化的一些逻辑
            beforeReq(){console.log("请求级别的钩子 beforeReq")}, //请求前触发的钩子
            AfterReq(){console.log("请求级别的钩子 AfterReq")},  //请求后触发的钩子
        }
    },
    delContact:{
        url:"/contact",
        method:"delete"
    },
    updateContact:{
        url:"/contact/edit",
        method:"put"
    },
    addContactByJson:{
        url:"/contact/new/json",
        method:"post"
    },
    addContactByForm:{
        url:"/contact/new/form",
        method:"post",
        isForm:true //代表请求时的数据 以formData的形式进行传输
    },
    //相当于是模块级别的钩子
    beforeReq(){console.log("模块级别的钩子 beforeReq")},
    AfterReq(){console.log("模块级别的钩子 AfterReq")}
}