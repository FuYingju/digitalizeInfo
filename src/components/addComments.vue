<template>
  <div>
    <el-button type="text" @click="show()">点击留言</el-button>

    <el-dialog title="留言内容" :visible.sync="dialogVisible" width="30%">
      <el-input
        type="textarea"
        placeholder="请输入留言内容"
        v-model="content"
        maxlength="100"
        :rows="4"
        show-word-limit
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMessage()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {addComments} from '@/api/common/comments.js';

  export default {
    props:["moduleName"],
    data() {
      return {
        dialogVisible:false,
        content: '',
        requestParam:{}
      }
    },
    methods:{
      show(){
        this.dialogVisible = true
        this.content = ''
      },
      // 留言
      submitMessage(){
        this.dialogVisible = false
        this.requestParam.content = this.content
        this.requestParam.belongModule = this.moduleName
        addComments(this.requestParam).then(res => {
          alert('留言成功')
          this.$emit('reload')
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      }
    }
  }
</script>
