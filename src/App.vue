<template>
  <div id="app">
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
  /*联系人的CRUD:
      C
       card --click--> (showList = true)
          因为showList是data中注册的响应式数据 showList产生改变 界面要得到更新
       list显示 (显示的时候没有列表 只有一个新增按钮;点击新增按钮)
          onAdd
           this.editingContact = { id: this.list.length };
           this.isEdit = false;
           this.showEdit = true;
              因为showEdit是data中注册的响应式数据 showEdit产生改变 界面要得到更新
              因为editingContact中已经存有id了
       edit显示(是以新增模式进行显示 没有删除按钮 有保存按钮 点击保存按钮)
          因为 this.editingContact = { id: this.list.length }; 导致onsave时
          info中已经有id了!!!!  用户在界面上输入数据 info有得到了name 和 tel

          this.list.push(info);  list得到新增
          this.chosenContactId = info.id;  chosenContactId得到一个id值

       因为list和chosenContactId得到了更新
          cardType  currentContact 依赖于list和chosenContactId
          所以cardType 和 currentContact 会重新计算 计算完界面得到更新

  */


  import { ContactCard, ContactList, ContactEdit ,Popup} from 'vant';
  export default {
      name:"App",
      data() {
          return {
              chosenContactId: null,//选中的id
              editingContact: {},//当前处理的联系人
              showList: false, //默认情况下列表弹出层不显示
              showEdit: false, //默认情况下编辑弹出层不显示
              isEdit: false,   //决定了编辑页出现的时候 是为了新增(只有新增按钮)还是编辑(有新增按钮 也有删除按钮)
              list: [
                  {id:0,name:"damu1",tel:"1"},
                  {id:1,name:"damu2",tel:"2"},
                  {id:2,name:"damu3",tel:"3"},
                  {id:3,name:"damu4",tel:"4"},
                  {id:4,name:"damu5",tel:"5"}
              ]//存放联系人的数组
          };
      },
      computed: {
          cardType() {
              return this.chosenContactId !== null ? 'edit' : 'add';
          },

          currentContact() {
              const id = this.chosenContactId;
              return id !== null ? this.list.filter(item => item.id === id)[0] : {};
          }
      },
      methods: {
          // 控制新增
          onAdd() {
              this.editingContact = { id: this.list.length };
              this.isEdit = false;
              this.showEdit = true;
          },

          // 控制修改 和 删除
          onEdit(item) {
              this.isEdit = true; // 让编辑页处于编辑状态(有删除按钮)
              this.showEdit = true;//让编辑也显示
              this.editingContact = item;//让表单进行回显
          },

          onSelect() {
              this.showList = false; // 关闭列表页
          },

          //执行了联系人的新增 & 联系人的修改
          //通过this.isEdit来区分这两个逻辑
          onSave(info) {
              this.showEdit = false; // 关闭编辑页
              this.showList = false; // 关闭列表页

              if (this.isEdit) {
                  // [
                  // {id:0,name:"damu1",tel:"1"},
                  // {id:1,name:"damu2",tel:"2"},
                  // {id:2,name:"damu3",tel:"3"},   tel:33333
                  // {id:3,name:"damu4",tel:"4"},
                  // {id:4,name:"damu5",tel:"5"}
                  // ]

                  this.list = this.list.map(item => item.id === info.id ? info : item);
              } else {
                  this.list.push(info);
              }
              this.chosenContactId = info.id;
          },

          //执行删除逻辑
          onDelete(info) {
              this.showEdit = false; //将编辑页关闭 列表页没有关闭

              // [
              // {id:0,name:"damu1",tel:"1"},
              // {id:1,name:"damu2",tel:"2"},
              // {id:2,name:"damu3",tel:"3"},   删除
              // {id:3,name:"damu4",tel:"4"},
              // {id:4,name:"damu5",tel:"5"}
              // ]

              this.list = this.list.filter(item => item.id !== info.id);
              if (this.chosenContactId === info.id) {
                  this.chosenContactId = null;
              }
          },

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
