<template>
  <div>
    <div class="flex_l">
      姓名：{{person.name}}
    </div>
    <div class="flex_l">
      年龄：{{person.age}}
    </div>
    <div class="flex_l" >
      爱好：<span v-for="(item,index) in person.hobby" :key="index">{{item}},</span>
    </div>
    <el-form label-width="140px" style="width:400px">
      <el-form-item label="姓名：">
        <el-input v-model="person.name" ></el-input>
      </el-form-item>
      <el-form-item label="年龄：">
        <el-input v-model="person.age" ></el-input>
      </el-form-item>
    </el-form>
    
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
const num = ref(0);
const person = reactive({name:'zhang',age:25,hobby:['code','learn','run']});

</script>

