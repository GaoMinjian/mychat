<template>
  <div>
    <div>
      <h2>账号注册</h2>
    </div>
    <div id="register-input">
      <mt-field label="昵称" placeholder="请输入昵称" v-model="username"></mt-field>
      <mt-field label="账号" placeholder="请输入账号" v-model="account"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
      <mt-field label="确定密码" placeholder="再次输入密码" type="password" v-model="password_verify"></mt-field>
      <!--<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>

      <mt-field label="验证码" v-model="captcha">
        &lt;!&ndash;<img src="" height="45px" width="100px">&ndash;&gt;
      </mt-field>-->
    </div>
    <div class="agree">
      <div class="agree-icon" @click = "isAgree =! isAgree">
        <img src="../assets/images/agree.png" class="img" v-if="isAgree">
      </div>
      <div class="agree-word">
        <span>已阅读并同意</span>
        <a href="/">《注册服务协议》</a>
      </div>
    </div>
    <mt-button id="register-btn" size="normal" type="primary" :disabled="!isAgree" @click.native="clickRegister">注册</mt-button>
    <div id="option">
      <p>已有账号?</p>
      <router-link to="login">
        <p>登录</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  name: 'register',
  data () {
    return {
      isAgree: false,
      username: '',
      account: '',
      password: '',
      password_verify: ''
    }
  },
  sockets: {
    registerRes (res) {
      if (res == 'exist') {
        Toast('账号已经存在')
      } else if (res == 'error') {
        Toast('注册账号失败')
      } else if (this.password != this.password_verify) {
        Toast('确认密码与密码不一致')
      } else {
        Toast({
          message: '注册成功',
          iconClass: 'icon icon-success'
        })
        this.$router.push({
          path: 'login'
        })
      }
    }
  },
  methods: {
    clickRegister: function () {
      var re = /^[0-9a-zA-Z]*$/g // 验证3-16位字符串只由数字或字母组成
      if (this.username == '') {
        Toast('昵称不能为空')
      } else if (this.account == '') {
        Toast('账号不能为空')
      } else if (this.account.length < 3) {
        Toast('账号长度不能小于三位字符')
      } else if (!re.test(this.account)) {
        Toast('账号只能由字母与数字组成')
      } else if (this.password == '') {
        Toast('密码不能为空')
      } else if (this.password.length < 3) {
        Toast('密码长度不能小于三位字符')
      } else if (this.password_verify == '') {
        Toast('确认密码不能为空')
      } else {
        this.$socket.emit('register', {
          headshow: 0,
          username: this.username,
          account: this.account,
          password: this.password
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
#register-btn{
  margin-top: 5vh;
  width:70vw;
}
.agree{
  margin-top: 20px;
  margin-bottom: 20px;
  height: 40px;
  min-width: 300px;
  .agree-icon{
    background-color: white;
    border-radius: 10px;
    position: relative;
    height: 20px;
    width: 20px;
    top: 5px;
    display: inline-block;
    .img{
      position: relative;
      height: 100%;
    }
  }
  .agree-word{
    display: inline-block;
    height: 40px;
    font-size: 14px;
    span{
      margin-top: 0px;
      display: inline-block;
      line-height: 40px;
      height: 40px;
    }
    a{
      color: #26a2ff;
      display: inline-block;
      line-height: 40px;
      height: 40px;
      text-decoration: none;
    }
  }
}

#option{
  margin-top: 2vh;
  p{
    display: inline-block;
    font-size: .8em;
  }
  a {
    display: inline-block;
    text-decoration: none;
    /*border-left: 1px solid;*/
    font-size: .8em;
  }
}
</style>
