<template>
	<div class="vue-body">
	    <Breadcrumb class="router-box">
	        <BreadcrumbItem to="index">首页</BreadcrumbItem>
	        <BreadcrumbItem to="/ModelingAnalysis?condition=3">建模分析</BreadcrumbItem>
	        <BreadcrumbItem>自定义分析</BreadcrumbItem>
	    </Breadcrumb>  	
		<Form ref="formDynamic" :model="formDynamic" :label-width="80" style="width: 100%">
		    <FormItem
		            v-for="(item, index) in formDynamic.items"
		            v-if="item.status"
		            :key="index"
		            :label="'Item ' + item.index"
		            :prop="'items.' + index + '.value'"
		            :rules="{required: true, message: 'Item ' + item.index +'填写的内容不能为空', trigger: 'blur'}">
		        <Row>
		            <Col span="18">
		                <Input type="text" v-model="item.value" placeholder="请输入..."></Input>
			<!--             <Select v-model="formValidate.city" placeholder="Select your city">
			                <Option value="beijing">New York</Option>
			                <Option value="shanghai">London</Option>
			                <Option value="shenzhen">Sydney</Option>
			            </Select>	 -->	
		            </Col>
		            <Col span="4" offset="1">
		                <Button type="ghost" @click="handleRemove(index)">Delete</Button>
		            </Col>
		        </Row>
		    </FormItem>
		    <FormItem>
		        <Row>
		            <Col span="12">
		                <Button type="dashed" long @click="handleAdd" icon="plus-round">添加查询条件</Button>
		            </Col>
		        </Row>
		    </FormItem>
		    <FormItem>
		        <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
		        <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
		    </FormItem>
		</Form>
	</div>	
</template>

<script>
    export default {
        data () {
            return {
                index: 1,
                formDynamic: {
                    items: [
                        {
                            value: '',
                            index: 1,
                            status: 1,
                            label:"条件"
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
                this.index++;
                this.formDynamic.items.push({
                    value: '',
                    index: this.index,
                    status: 1
                });
            },
            handleRemove (index) {
                this.formDynamic.items[index].status = 0;
            }
        }
    }
</script>

<style scoped>

</style>
