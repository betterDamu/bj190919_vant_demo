<template>
  <div id="app">
    <!--
      目前手机号、邮政编码都必须为 string 格式
      如果不是字符串格式 会报一个错:
        trim is not a function  (因为字符串是有trim方法的 而数字没有)

      在edit中
        点击保存按钮
          save  -> save(content){
              //content 代表的是表单的内容!!! 如果给id
              //id虽然没有显示在界面上 但也是可以传入到content中
         }
        点击删除按钮
          delete -> delete(content){
              //content 代表的是表单的内容!!! 如果给id
              //id虽然没有显示在界面上 但也是可以传入到content中
         }
    -->

    <!-- 联系人卡片 -->
    <van-contact-card
            :type="cardType"
            :name="currentContact.name"
            :tel="currentContact.tel"
            @click="showList = true"
    />

    <!-- 联系人列表 -->
    <van-popup v-model="showList" position="bottom">
      <van-contact-list
              v-model="chosenContactId"
              :list="list"
              @add="onAdd"
              @edit="onEdit"
              @select="onSelect"
      />
    </van-popup>

    <!-- 联系人编辑 -->
    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
              :contact-info="editingContact"
              :is-edit="isEdit"
              @save="onSave"
              @delete="onDelete"
              :tel-validator="validator"
      />
    </van-popup>
  </div>
</template>

<script>
  import { ContactCard, ContactList, ContactEdit ,Popup} from 'vant';
  export default {
      data() {
          return {
              chosenContactId: null,//选中的id
              editingContact: {},//当前处理的联系人
              showList: false, //默认情况下列表弹出层不显示
              showEdit: false, //默认情况下编辑弹出层不显示
              isEdit: false,   //决定了编辑页出现的时候 是为了新增(只有新增按钮)还是编辑(有新增按钮 也有删除按钮)
              list: []//存放联系人的数组
          };
      },
      computed: {
          //这是一个计算属性  依赖了chosenContactId
          cardType() {
              return this.chosenContactId !== null ? 'edit' : 'add';
          },

          //这是一个计算属性  依赖了list 依赖了chosenContactId
          //因为在save的时候 list产生了改变 所以currentContact会被重新计算
          //因为在save的时候 chosenContactId产生了改变 所以currentContact会被重新计算
          currentContact() {
              //拿到的是我们新增info的id
              const id = this.chosenContactId;

              //filter方法第一个参数(回调函数) 会被执行list.length次
              //filter方法第一个参数(回调函数) 这个回调函数的第一个参数 是数组中每一项
              //filter方法返回一个数组 [item]
              //得看filter方法第一个参数(回调函数) 什么时候返回true 一旦返回true 将对应的item扔进要返回的数组的


              // this.list: [{id:0,name:"damu",tel:"15851802713"}]
              // this.list.filter(item => item.id === id)  : [{id:0,name:"damu",tel:"15851802713"}]
              // currentContact : {id:0,name:"damu",tel:"15851802713"}
              return id !== null ? this.list.filter(item => item.id === id)[0] : {};
          }
      },
      methods: {
          // 添加联系人
          onAdd() {
              this.editingContact = { id: this.list.length };//在点击新建按钮的时候;给编辑页传入的数据
              this.isEdit = false;  //  代表是去新增 不会出现删除按钮 ; 数据驱动 在新增的时候 isEdit一定得是false
              this.showEdit = true; // 会让编辑层显示
          },

          // 编辑联系人
          onEdit(item) {
              this.isEdit = true; // 让编辑页处于编辑状态(有删除按钮)
              this.showEdit = true;//让编辑也显示
              this.editingContact = item;//让表单进行回显
          },

          // 选中联系人
          onSelect() {
              this.showList = false; // 关闭列表页
          },

          // 保存联系人
          onSave(info) {
              // info中已经存在id了 这个id是在点击新建按钮的时候传入的
              //{id(新增是传入的),name(自己录入的),tel(自己录入的)}

              this.showEdit = false; // 关闭编辑页
              this.showList = false; // 关闭列表页


              //如果是从onadd流程过来的; 那么isEdit为false
              if (this.isEdit) {
                  //map 方法返回一个新的数组  新数组中的每一项都是map第一个参数(回调函数)返回的值
                  //map 方法的第一个回调函数 会被执行list.length
                  //map 方法的第一个回调函数的第一个参数 代表数组中每一项

                  //编辑的流程
                  this.list = this.list.map(item => item.id === info.id ? info : item);
              } else {

                  //新增的流程
                  //info:{id(新增是传入的),name(自己录入的),tel(自己录入的)}
                  //因为push方法是vue中数组的变异方法  调用这个方法 list所对应的界面要重新更新
                  this.list.push(info);
              }

              //将info的id 给 chosenContactId
              this.chosenContactId = info.id;
          },

          // 删除联系人
          onDelete(info) {
              this.showEdit = false; //将编辑页关闭 列表页没有关闭

              //点击删除按钮时;vant帮我们传入的表单数据  {id:0,name:"damu",tel:"1"}
              //[{id:0,name:"damu",tel:"1"}]
              // this.list.filter : []
              //this.list = []
              this.list = this.list.filter(item => item.id !== info.id);
              //如果说你删除是选中的这一条 就会进入当前这个逻辑
              if (this.chosenContactId === info.id) {
                  this.chosenContactId = null;
              }
          },

          //使手机号的校验 默认就是通过的
          validator(){
              return true
          }
      },
      components:{
          [ContactCard.name]:ContactCard,
          [ContactList.name]:ContactList,
          [ContactEdit.name]:ContactEdit,
          [Popup.name]:Popup
      }
  };
</script>

<style scoped>

</style>
