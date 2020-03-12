<template>
  <div id="app">
    <van-contact-card
            @click="clickFn"
            type="add"
            name="damu"
            tel="15851802777"
            add-text="add"></van-contact-card>

    <van-contact-list
            @add="addFn"
            @edit="editFn"
            @select="selectFn"
            default-tag-text="尚硅谷彭于晏"
            v-model="id"
            :list="list"></van-contact-list>

    <!--<van-contact-edit></van-contact-edit>-->
  </div>
</template>

<script>
  import { ContactCard, ContactList, ContactEdit } from 'vant';
  export default {
    name: 'App',
    data(){
       return {
           id:3,
           list:[
               {id:1,name:"damu",tel:"15851802777",isDefault:true},
               {id:2,name:"xfz",tel:"15851802778"},
               {id:3,name:"qhf",tel:"15851802779"}
           ]
       }
    } ,
    components:{
        [ContactCard.name]:ContactCard,
        [ContactList.name]:ContactList,
        [ContactEdit.name]:ContactEdit
    },
    methods:{
        clickFn(){
            console.log("---")
        },
        addFn(){console.log("addFn")},
        editFn(item,index){console.log("editFn",item,index)},

        // selectFn:点击后面的小圆点选中的时候 当前函数会被处罚两次
        selectFn(item,index){console.log("selectFn",item,index)}
    }
  }
</script>

<style scoped>

</style>
