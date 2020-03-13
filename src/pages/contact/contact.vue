<template>
    <div class="contact">
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
    import axios from "axios";

    const OK = 200;
    export default {
        name:"contact",
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
            cardType() {
                return this.chosenContactId !== null ? 'edit' : 'add';
            },

            currentContact() {
                const id = this.chosenContactId;
                return id !== null ? this.list.filter(item => item.id === id)[0] : {};
            }
        },
        methods: {
            onAdd() {
                this.editingContact = {}; //不管怎么样新增的时候 editingContact肯定是空的
                this.isEdit = false;
                this.showEdit = true;
            },

            onEdit(item) {
                this.isEdit = true; // 让编辑页处于编辑状态(有删除按钮)
                this.showEdit = true;//让编辑也显示
                this.editingContact = item;//让表单进行回显
            },

            onSelect() {
                this.showList = false; // 关闭列表页
            },

            async onSave(info) {
                this.showEdit = false; // 关闭编辑页
                this.showList = false; // 关闭列表页

                let body="";
                if (this.isEdit) {
                    this.list = this.list.map(item => item.id === info.id ? info : item);
                } else {
                    //this.list.push(info);
                    //我们在这边同步了数据库  可以忘记操作list了!!!!!!!
                    body = await axios({
                        url:"http://localhost:9000/api/contact/new/json",
                        method:"post",
                        data:{
                            name:info.name,
                            tel:info.tel
                        }
                    })
                }
                //这个await 很关键!!!!!
                await this.updateList(); //这是一次异步的更新!!!!
                this.chosenContactId = body.data.data.id;
            },

            onDelete(info) {
                this.showEdit = false; //将编辑页关闭 列表页没有关闭

                this.list = this.list.filter(item => item.id !== info.id);
                if (this.chosenContactId === info.id) {
                    this.chosenContactId = null;
                }
            },

            validator(){
                return true
            } ,

            async updateList(){
                const body = await axios({
                    url:"http://localhost:9000/api/contactList",
                    method:"get"
                })
                if(body.data.code === OK)
                    this.list = body.data.data
            }
        },
        components:{
            [ContactCard.name]:ContactCard,
            [ContactList.name]:ContactList,
            [ContactEdit.name]:ContactEdit,
            [Popup.name]:Popup
        },
        async mounted(){
            this.updateList()
        }
    };
</script>

<style scoped>

</style>