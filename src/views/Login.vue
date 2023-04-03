<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h3 class="login-header">后台管理系统</h3>
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="submitForm()"
          >登录</el-button
        >
        <el-button class="login-btn" @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { LoginData } from '../type/login'
import type { FormRules } from 'element-plus'
// const ruleFormRef = ref<FormInstance>()

export default defineComponent({
  setup() {
    const data = reactive(new LoginData())
    const rules = reactive<FormRules>({
      username: [{ required: true, message: '填入用户名', trigger: 'blur' }],
      password: [
        { required: true, message: '填入密码', trigger: ['blur', 'change'] },
        { min: 3, max: 6, message: '长度为3-6', trigger: ['blur', 'change'] },
      ],
    })
    const resetForm = () => {
      data.ruleForm.username = ''
      data.ruleForm.password = ''
    }
    const submitForm = () => {
      console.log('提交表单')
    }
    return {
      ...toRefs(data),
      rules,
      resetForm,
      submitForm,
    }
  },
})
</script>

<style scoped lang="scss">
.login-box {
  height: 100%;
  width: 100%;
  background: url(../assets/login-bg.jpeg);
  padding: 1px;
}
.demo-ruleForm {
  width: 500px;
  margin: 200px auto;
  padding: 40px;
  border-radius: 20px;
  background-color: #fff;
  .login-header {
    text-align: center;
    margin-bottom: 20px;
  }
  .login-btn {
    width: 48%;
  }
}
</style>
