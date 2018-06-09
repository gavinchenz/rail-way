<template>
  <Row type="flex" justify="center" style="text-align: left">
    <Col span="10">
      <Card :bordered="false" dis-hover>
        <p slot="title" style="font-size: 16px;color: #2d8cf0"><Icon type="person"></Icon>&nbsp;用户资料</p>
        <Row>
          <Col span="24">
             <table style="width: 100%;">
               <tr>
                 <th colspan="4" style="padding-left: 20px">基本信息</th>
               </tr>
               <tr>
                 <td width="100" class="text-right">账号：</td>
                 <td width="150"><span>{{$store.state.userInfo.username}}</span></td>
                 <td class="text-right">真实姓名：</td>
                 <td><span>{{$store.state.userInfo.fullname}}</span></td>
               </tr>
               <tr>
                 <td class="text-right">性别：</td>
                 <td><span>{{$store.state.userInfo.sexName}}</span></td>
                 <td class="text-right">身份证号：</td>
                 <td><span>{{$store.state.userInfo.cardId}}</span></td>
               </tr>
               <tr>
                 <td class="text-right">警号：</td>
                 <td><span>{{$store.state.userInfo.policeNum}}</span></td>
                 <td class="text-right">入职日期：</td>
                 <td><span>{{$store.state.userInfo.hiredate}}</span></td>
               </tr>
               <tr>
                 <td class="text-right">部门：</td>
                 <td><span>{{$store.state.userInfo.departName}}</span></td>
                 <td class="text-right">出生日期：</td>
                 <td><span>{{$store.state.userInfo.birthday}}</span></td>
               </tr>
               <tr>
                 <td class="text-right">级别：</td>
                 <td><span>{{$store.state.userInfo.ulevelName}}</span></td>
                 <td width="100" class="text-right">创建时间：</td>
                 <td width="150"><span>{{$store.state.userInfo.createTime}}</span></td>

               </tr>
               <tr>
                 <td class="text-right">职位：</td>
                 <td><span>{{$store.state.userInfo.dutyName}}</span></td>
                 <td class="text-right">操作时间：</td>
                 <td><span>{{$store.state.userInfo.lastModifyTime}}</span></td>
               </tr>
               <tr>
                 <td class="text-right">备注：</td>
                 <td colspan="3"><span>{{$store.state.userInfo.remark}}</span></td>
               </tr>
             </table>
          </Col>
        </Row>
        <Row>
          <Col span="24" >
            <p style="text-align: right"><Button type="primary" @click="setModal = !setModal">修改密码</Button></p>
          </Col>
        </Row>
      </Card>
      <Modal v-model="setModal" :closable="false">
        <p slot="header" style="color: #2d8cf0">
          <Icon type="key" ></Icon>
          <span>修改密码</span>
        </p>
        <Row  type="flex" justify="center">
          <Col span="16">
            <Form ref="updatePwdData" :model="updatePwdData" :rules="ruleValidate" :label-width="90">
              <FormItem label="当前密码" prop="oldPwd">
                <Input v-model="updatePwdData.oldPwd" placeholder="请输入当前密码"></Input>
              </FormItem>
              <FormItem label="新密码" prop="newPwd">
                <Input v-model="updatePwdData.newPwd" placeholder="请输入新密码"></Input>
              </FormItem>
              <FormItem label="确认新密码" prop="confirmPwd">
                <Input v-model="updatePwdData.confirmPwd" placeholder="请再次输入新密码"></Input>
              </FormItem>
            </Form>
          </Col>
        </Row>
        <div slot="footer">
          <Button @click="closeModalFn('updatePwdData')">取消</Button>
          <Button type="primary" :loading="modal_loading" @click="updatePwdFn('updatePwdData')">确定</Button>
        </div>
      </Modal>
    </Col>
  </Row>
</template>
<script>
    import {updatePwd} from '@/service/getData'
    import {process_error} from '@/config/process_request_conf'
    export default {
      name: "",
      data(){
        const valideRePassword = (rule, value, callback) => {
          if (value !== this.updatePwdData.newPwd) {
            callback(new Error('两次输入密码不一致'));
          } else {
            callback();
          }
        };
        const newPassword = (rule, value, callback) => {
          if (value === this.updatePwdData.oldPwd) {
            callback(new Error('新密码不能和当前密码重复'));
          } else {
            callback();
          }
        };
        return {
          setModal: false,
          modal_loading:false,
          updatePwdData:{
            oldPwd:'',
            newPwd: '',
            confirmPwd:''
          },
          ruleValidate:{
            oldPwd:[
              { required: true,  message: '当前密码不能为空', trigger: 'blur' }
            ],
            newPwd:[
              { required: true, message: '新密码不能为空', trigger: 'blur' },
              { validator: newPassword, trigger: 'blur' }
            ],
            confirmPwd:[
              { required: true, message: '请再次输入新密码', trigger: 'blur' },
              { validator: valideRePassword, trigger: 'blur' }
            ],
          }
        }
      },
      methods:{
        //修改密码请求
        async savePassWord(sendData){
          this.modal_loading = true;
          await updatePwd(sendData)
            .then(res=>{
              this.modal_loading = false;
              if(res.statusCode !== 200){
                return process_error(res)
              }else {
                this.$Message.success(res.message);
                this.updatePwdData['oldPwd'] = '';
                this.updatePwdData['newPwd'] = '';
                this.updatePwdData['confirmPwd'] = '';
                this.setModal = false;
              }
            })
        },
        //关闭弹窗
        closeModalFn(name){
          this.$refs[name].resetFields();
          this.setModal = false;
        },
        //确认修改密码
       updatePwdFn(name){
          this.$refs[name].validate((valid) => {
            if (valid) {
              this.savePassWord(this.updatePwdData);
            }
          })
        }
      }
    }
</script>

<style scoped>
  .text-right{
    text-align: right;
  }
  table tr th{color: #9ea3b1}
  table tr td span{font-weight: bolder}
</style>
