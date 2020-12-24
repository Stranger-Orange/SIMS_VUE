<template>
    <div id="login">
        <div class="loginToHome">
            <el-form ref="form" :model="form" :rules="ruleForm" status-icon label-width="80px" class="loginForm">
                <h3 class="projectName">学生信息管理系统</h3>
                <el-form-item
                        label="用户名"
                        prop="username"
                >
                    <el-input
                            type="text"
                            v-model="form.username"
                            auto-complete="off"
                            placeholder="请输入用户名"
                    ></el-input>
                </el-form-item>
                <el-form-item
                        label="密码"
                        prop="password"
                >
                    <el-input
                            type="password"
                            v-model="form.password"
                            auto-complete="off"
                            placeholder="请输入密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                            class="homeBut"
                            type="primary"
                            plain
                            @click="submit()"
                            :loading="logining"
                    >登录</el-button>
                    <el-button
                            class="loginBut"
                            type="primary"
                            plain
                            @click="resetForm()"
                    >重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logining: false,
                form: {
                    username: '',
                    password: ''
                },
                ruleForm: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]
                }
            }
        },
        methods: {
            // 登录判断
            submit() {
                // console.log("点击登陆按钮")
                this.$https.post('http://localhost:8080/SIMS/user/login',this.$qs.stringify(this.form)).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success("登陆成功！")
                        this.$router.push('/controller')
                    } else {
                        this.$message.error("登陆失败！")
                    }
                })
            },
            resetForm() {
                this.$refs.form.resetFields();
            }
        }
    }
</script>

<style>
    #login{
        background: url("../assets/img/IMG_15.jpg") center center;
        background-size: cover;
        height: 100%;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        position: fixed;
    }
    .projectName{
        margin-left: 35px;
    }
    .loginToHome {
        position: absolute;
        left: 0px;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 400px;
        height: 260px;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        background: #fff;
        border: 1px solid #dcdfe6;
    }
    .loginForm {
        text-align: center;
        padding-top: 15px;
        padding-right: 30px;
        top: 10px;
    }
    .homeBut {
        position: absolute;
        left: 0px;
    }
    .loginBut {
        position: absolute;
        right: 0px;
    }
</style>