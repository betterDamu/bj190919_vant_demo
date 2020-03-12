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
      />
    </van-popup>
  </div>
</template>

<script>
  import { ContactCard, ContactList, ContactEdit ,Popup} from 'vant';
  export default {
      data() {
          return {
              chosenContactId: null,
              editingContact: {},
              showList: false, //默认情况下列表弹出层不显示
              showEdit: false, //默认情况下编辑弹出层不显示
              isEdit: false,
              list: []
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
          // 添加联系人
          onAdd() {
              this.editingContact = { id: this.list.length };//在点击新建按钮的时候;给编辑也传入的数据
              this.isEdit = false;  //  代表是去新增 不会出现删除按钮
              this.showEdit = true; // 会让编辑层显示
          },

          // 编辑联系人
          onEdit(item) {
              this.isEdit = true;
              this.showEdit = true;
              this.editingContact = item;
          },

          // 选中联系人
          onSelect() {
              this.showList = false;
          },

          // 保存联系人
          onSave(info) {
              // info中已经存在id了 这个id是在点击新建按钮的时候传入的
              //{id(新增是传入的),name(自己录入的),tel(自己录入的)}
              // console.log(info);

              this.showEdit = false;
              this.showList = false;

              if (this.isEdit) {
                  this.list = this.list.map(item => item.id === info.id ? info : item);
              } else {
                  this.list.push(info);
              }
              this.chosenContactId = info.id;
          },

          // 删除联系人
          onDelete(info) {
              this.showEdit = false;
              this.list = this.list.filter(item => item.id !== info.id);
              if (this.chosenContactId === info.id) {
                  this.chosenContactId = null;
              }
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
