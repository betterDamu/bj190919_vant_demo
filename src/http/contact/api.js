export default {
    getContactList:{
        url:"/contactList",
        method:"get"
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
    }
}