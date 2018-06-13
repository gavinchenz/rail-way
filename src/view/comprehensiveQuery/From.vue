<template>
    <Form :model="formItem" :label-width="80" class="header-from">
        <FormItem class="form-item">
            <Row>
                <Col span="2">姓名</Col>
                <Col span="4">
                    <Input v-model="formItem.inputName" placeholder="请输入姓名" clearable></Input>
                </Col>
                <Col span="2">身份证号</Col>
                <Col span="4">
                    <Input v-model="formItem.inputId" placeholder="请输入身份证号" clearable></Input>
                </Col>
                <Col span="2">车牌号</Col>
                <Col span="4">
                    <Input v-model="formItem.plateNumber" placeholder="请输入车牌号" clearable></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem class="form-item" label="表单标题">
            <Row>
                <Col span="2">籍贯</Col>
                <Col span="4">
                    <Input v-model="formItem.nativePlace" placeholder="请输入籍贯" clearable></Input>
                </Col>
                <Col span="2">住址</Col>
                <Col span="4">
                    <Input v-model="formItem.address" placeholder="请输入住址" clearable></Input>
                </Col>
            </Row>
        </FormItem>
        <FormItem class="form-item" label="选择框">
            <Select v-model="formItem.select">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
        <FormItem class="form-item" label="日期控件">
            <Row>
                <Col span="6">
                    <DatePicker type="date" placeholder="选择日期" v-model="formItem.date"></DatePicker>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="16">
                    <TimePicker type="time" placeholder="选择时间" v-model="formItem.time"></TimePicker>
                </Col>
            </Row>
        </FormItem>
        <FormItem class="form-item" label="单选">
            <RadioGroup v-model="formItem.radio">
                <Radio label="male">Male</Radio>
                <Radio label="female">Female</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem class="form-item" label="多选">
            <CheckboxGroup v-model="formItem.checkbox">
                <Checkbox label="Eat"></Checkbox>
                <Checkbox label="Sleep"></Checkbox>
                <Checkbox label="Run"></Checkbox>
                <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
        </FormItem>
        <FormItem class="form-item" label="开关">
            <i-switch v-model="formItem.switch" size="large">
                <span slot="open">开</span>
                <span slot="close">关</span>
            </i-switch>
        </FormItem>
        <FormItem class="form-item" label="滑块">
            <Slider v-model="formItem.slider" range></Slider>
        </FormItem>
        <FormItem class="form-item" label="文本域">
            <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem class="form-item">
            <Button type="primary">Submit</Button>
            <Button type="ghost" style="margin-left: 8px">Cancel</Button>
        </FormItem>
    </Form>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    inputName: '',
                    inputId: '',
                    plateNumber:"",
                    nativePlace:"",
                    address:"",
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [10, 80],
                    textarea: ''
                }
            }
        }
    };
</script>
<style>
.header-from{
    border:1px solid #000;
    border-radius: 5px;
    margin:50px auto;
}
.form-item{
    margin:10px 0;
}
</style>
