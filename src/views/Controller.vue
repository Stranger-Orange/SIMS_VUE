<template>
    <div class="controller">
        <el-header>
            <span style="margin-left: 115px">{{projectName}}</span>
            <el-dropdown style="float: right">
                <el-button>管理</el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="studentAdd">添加学生信息</el-dropdown-item>
                    <el-dropdown-item @click.native="studentSeek">查询学生信息</el-dropdown-item>
                </el-dropdown-menu>
                <el-button @click="quitLogin">退出</el-button>
            </el-dropdown>
        </el-header>
        <el-table class="el-table" :data="student.list" stripe style="width: 100%" v-model="student.list">
            <el-table-column
                    type="index"
                    width="160">
            </el-table-column>

            <el-table-column label="学号" width="220">
                <template slot-scope="scope">
                    <span>{{scope.row.studentId}}</span>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.studentName}}</span>
                </template>
            </el-table-column>

            <el-table-column label="性别" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.studentGender}}</span>
                </template>
            </el-table-column>

            <el-table-column label="年龄" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.studentAge}}</span>
                </template>
            </el-table-column>

            <el-table-column label="联系方式" width="220">
                <template slot-scope="scope">
                    <span>{{scope.row.studentPhone}}</span>
                </template>
            </el-table-column>

            <el-table-column label="寝室号" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.studentDorm}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200">
                <!--scope.row 是本行数据-->
                <template slot-scope="scope" class="active">
                    <el-button @click="studentUpdate(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button @click="studentDelete(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                layout="total, prev, pager, next"
                :total=total
                :page-size=page.pageSize
                :current-page=page.pageNum
                @current-change="handleCurrentChange"
                >
        </el-pagination>

        <el-dialog title="编辑学生信息" :visible="studentForm1" size="tiny" width="25%" @close='closeDialog'>
            <el-form ref="editsForm" :model="editsForm" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="editsForm.studentId" max-length="12"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editsForm.studentName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="editsForm.studentGender"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editsForm.studentAge"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editsForm.studentPhone"></el-input>
                </el-form-item>
                <el-form-item label="寝室号">
                    <el-input v-model="editsForm.studentDorm"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="updateStudent(editsForm)">确定</el-button>
                    <el-button @click="studentForm1 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="是否删除以下学生信息" :visible="studentForm2" size="tiny" width="25%" @close='closeDialog'>
            <el-form ref="editsForm" :model="editsForm" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="editsForm.studentId" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editsForm.studentName" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="editsForm.studentGender" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editsForm.studentAge" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editsForm.studentPhone" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="寝室号">
                    <el-input v-model="editsForm.studentDorm" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="deleteStudent(editsForm.id)">确定</el-button>
                    <el-button @click="studentForm2 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="编辑学生信息" :visible="studentForm3" size="tiny" width="25%" @close='closeDialog'>
            <el-form ref="editsForm" :model="editsForm" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="editsForm.studentId" max-length="12"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editsForm.studentName"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="editsForm.studentGender"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editsForm.studentAge"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editsForm.studentPhone"></el-input>
                </el-form-item>
                <el-form-item label="寝室号">
                    <el-input v-model="editsForm.studentDorm"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addStudent(editsForm)">确定</el-button>
                    <el-button @click="studentForm3 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="请输入要查询学生的学号" :visible="studentForm4" size="tiny" width="25%" @close='closeDialog'>
            <el-form ref="editsForm" :model="editsForm" label-width="80px">
                <el-form-item label="学生学号">
                    <el-input v-model="editsForm.studentId" maxlength="12"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="seekStudent(editsForm.studentId)">确定</el-button>
                    <el-button @click="studentForm4 = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog title="所查询学生的信息" :visible="studentForm5" size="tiny" width="25%" @close='closeDialog'>
            <el-form ref="editsForm" :model="editsForm" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="editsForm.studentId" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editsForm.studentName" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="editsForm.studentGender" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editsForm.studentAge" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="editsForm.studentPhone" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item label="寝室号">
                    <el-input v-model="editsForm.studentDorm" disabled="disabled"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="studentForm5 = false">确定</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Controller",
        data() {
            return {
                student: [],
                page: {
                        pageSize: 10,
                        pageNum: 1,
                        name: ''
                },
                editsForm: {
                        id: '',
                        studentId: '',
                        studentName:'',
                        studentGender:'',
                        studentAge:null,
                        studentPhone:'',
                        studentDorm:''
                },
                total: 10,
                projectName : " 学  生  信  息  管  理  系  统 ",
                studentForm1: false, //增加弹出框的状态
                studentForm2: false,
                studentForm3: false,
                studentForm4: false,
                studentForm5: false
            }
        },
        methods: {
            /*数据初始化*/
            initData() {
                this.$https.get('http://localhost:8080/SIMS/student/allStudent',{params: this.page}).then(res => {
                    console.log(res)
                    this.student = res.data
                    this.total = res.data.total
                })
            },
            studentSeek(){
                this.editsForm = this.$options.data().editsForm
                this.studentForm4 = true
            },
            seekStudent(val){
                console.log(val)
                let obj = {
                    pageNum : 1,
                    studentId : val
                }
                this.$https.get('http://localhost:8080/SIMS/student/allStudent', {params: obj}).then(res => {
                    console.log(res)
                    this.editsForm = res.data.list[0]
                })
                this.$message.success("查询成功！")
                this.studentForm5 = true
            },
            studentUpdate(val){
                this.studentForm1 = true
                this.editsForm = val
            },
            updateStudent(val){
                console.log(val)
                let student = this.editsForm
                this.$https.put('http://localhost:8080/SIMS/student/updateStudent', student).then(res => {
                    console.log(res)
                })
                this.studentForm1 = false
                this.$message.success("更新成功！")
                this.initData()
            },
            studentDelete(val){
                this.studentForm2 = true
                this.editsForm = val
            },
            deleteStudent(val) {
                console.log(val)
                let obj = {
                    id: val
                }
                this.$https.delete('http://localhost:8080/SIMS/student/deleteStudent', {params: obj}).then(res => {
                    console.log(res)
                })
                this.studentForm2 = false
                this.$message.success("删除成功！")
                this.initData()
            },
            studentAdd(){
                this.editsForm = this.$options.data().editsForm
                this.studentForm3 = true
            },
            addStudent(val) {
                console.log(val)
                let student = this.editsForm
                this.$https.post('http://localhost:8080/SIMS/student/addStudent', student).then(res => {
                    console.log(res)
                })
                this.studentForm3 = false
                this.$message.success("添加成功！")
                this.initData()
            },
            handleCurrentChange(value){
                console.log(value)
                console.log(this.page.pageNum)
                this.page.pageNum = value
                this.initData()
            },
            quitLogin(){
                this.$router.push('/login')
            },
            closeDialog(){
                this.studentForm1 = false
                this.studentForm2 = false
                this.studentForm3 = false
                this.studentForm4 = false
                this.studentForm5 = false
            }
        },
        /*进入页面加载*/
        mounted() {
            this.initData()
        }
    }
</script>

<style>
    .controller{
        height: 80%;
        width: 80%;
        margin: auto auto;
    }

    .el-header {
        font-size: 28px;
        margin: 0 auto;
        background-color: #409EFF;
        color: #ffffff;
        line-height: 60px;
        font-family: "PingFang SC";
        font-weight: bold;
    }

    .el-pagination{
        margin-top: 12px;
    }

</style>

