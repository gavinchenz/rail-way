<template>
	<div class="vue-body">
	    <Breadcrumb class="router-box">
	        <BreadcrumbItem to="/index">首页</BreadcrumbItem>
	        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
	        <BreadcrumbItem>自定义分析</BreadcrumbItem>
	    </Breadcrumb>  	
		<Form ref="searchData" :model="searchData" :label-width="80" style="width: 100%;color:#000" class="header-from">
            <h3>数据地图</h3>
		    <FormItem
                    class="form-item"
		            v-for="(item, index) in searchData.items"
		            v-if="item.status"
		            :key="index"
		            :label="'乘车时间 ' + item.index"
		            :prop="'items.' + index + '.value'"
		            :rules="{required: true, message: '乘车时间 ' + item.index +'填写的内容不能为空', trigger: 'blur'}">
		        <Row>
                    <Col span="2" class="col-label">开始时间</Col>
                    <Col span="3">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  @on-change="item.startDate=$event" placeholder="选择日期" v-model="item.startDate"></DatePicker>
                    </Col>
                    <Col span="2" class="col-label">结束时间</Col>
                    <Col span="3">
                        <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss"  @on-change="item.endDate=$event" placeholder="选择日期" v-model="item.endDate"></DatePicker>
                    </Col>
                    <Col span="2" class="col-label">发站</Col>
                    <Col span="4">
                        <Input v-model="item.startStation" placeholder="请输入起始站" clearable></Input>
                    </Col>
                    <Col span="2" class="col-label">到站</Col>
                    <Col span="4">
                        <Input v-model="item.endStation" placeholder="请输入结束站" clearable></Input>
                    </Col>
		            <Col span="2" offset="1">
		                <Button type="ghost" @click="handleRemove(index)">删除</Button>
		            </Col>
		        </Row>
		    </FormItem>
		    <FormItem>
		        <Row>
		            <Col span="3">
		                <Button type="dashed" long @click="handleAdd" icon="plus-round">添加查询条件</Button>
		            </Col>
		        </Row>
		    </FormItem>
		    <FormItem>
		        <Button type="primary" @click="handleSubmit('searchData')">提交</Button>
		        <Button type="ghost" @click="handleReset('searchData')" style="margin-left: 8px">重置</Button>
		    </FormItem>
		</Form>
	</div>	
</template>

<script>
    export default {
        data () {
            return {
                index: 1,
                searchData: {
                    items: [
                        {
                            startDate: '',
                            endDate: '',
                            startStation: '',
                            endStation: '',
                            index: 1,
                            status: 1
                        }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('提交失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleAdd () {
                if(this.index<=2){
                   this.index++; 
                   this.searchData.items.push({
                        startDate: '',
                        endDate: '',
                        startStation: '',
                        endStation: '',
                        index: this.index,
                        status: 1
                    });
                }     
            },
            handleRemove (index) {
                this.searchData.items[index].status = 0;
            }
        }
    };
</script>

<style scoped>
.col-label{
    color:#000;
    width:80px;
    text-align: center;
}
</style>
