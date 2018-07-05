<template>
    <Row class="vm-table vm-panel">
        <section v-if="1 > -1">
            <div class="panel-heading">
                <Breadcrumb separator=">">
                    <BreadcrumbItem href="#">字典管理</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Row style="height:75px;" class="DictlistStyle">
                <Form>
                    <Row style="margin-bottom: -15px">
                        <FormItem :label-width="1">
                            <Button type="info" icon="plus-round" @click="openaddAndEditWin">新增字典</Button>
                        </FormItem>
                    </Row>
                    <Row type="flex" justify="start" align="top">
                        <Col span="4" order="1" class="gridHeight">
                        <FormItem :label-width="70" label="字典编码">
                            <Input v-model="searchData.code" placeholder="字典编码" size="small"></Input>
                        </FormItem>
                        </Col>
                        <Col span="4" order="2" class="gridHeight">
                        <FormItem :label-width="70" label="字典名称">
                            <Input v-model="searchData.name" placeholder="字典名称" size="small"></Input>
                        </FormItem>
                        </Col>
                        <Col span="8" order="3" class="gridHeight">
                        <FormItem>
                            <Button type="info" @click="search" icon="search">搜索</Button>
                            <Button type="ghost" @click="resat" icon="refresh">重置</Button>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </Row>
            <Row class="DictlistStyle">
                <Tabs :value="tabName" type="card" @on-click="tabClick" @on-tab-remove="tabClose">
                    <TabPane label="父级字典列表" name="parentName">
                        <Table border title="字典列表" @on-row-click="clickRowFun" :row-class-name="rowClassName" :loading="showLoading" :columns="columns" :data="childDataJsonArr['parentName'].data" size="small" @on-sort-change="sortColumnFn"></Table>
                    </TabPane>
                    <TabPane v-for="(item ,index) in items" :key="item" :label="item" :closable=true :name="item">
                        <Table border :title="item" :row-class-name="rowClassName" :loading="showLoading" :columns="columns" :data="childDataJsonArr[item].data" size="small" @on-sort-change="sortColumnFn"></Table>
                    </TabPane>
                </Tabs>

                <!--<Paging :pages="childDataJsonArr[tabName].search.page" @pageChange="pageChangeFn"></Paging>-->
                <Paging :pages="pageSize" @pageChange="pageChangeFn"></Paging>
            </Row>

            <Modal v-model="addAndEditWin" :title="titleText" @on-visible-change="winChange">
                <div>
                    <Form :model="addAndEditData" label-position="right" :label-width="150" :rules="addAndEditDataRult" ref="formCustom">
                        <FormItem :v-if="true===disabledFlag.code" label="字典编号" prop="code">
                            <Input type="text" v-model="addAndEditData.code" :placeholder="addAndEditData.code" :disabled="disabledFlag.code" style="width:70%"> </Input>
                        </FormItem>
                        </br>
                        <FormItem label="字典名称" prop="name">
                            <Input type="text" v-model="addAndEditData.name" :placeholder="addAndEditData.name" style="width:70%"></Input>
                        </FormItem>
                        </br>
                        <FormItem label="字典描述" prop="describe">
                            <Input type="textarea" v-model="addAndEditData.describe" :placeholder="addAndEditData.describe" style="width:70%"></Input>
                        </FormItem>
                        </br>
                        <FormItem v-show="disabledFlag.parentShow&&disabledFlag.parentCode" label="父级编码" prop="describe">
                            <Input type="text" v-model="addAndEditData.parentCode" :disabled="disabledFlag.parentCode" :placeholder="addAndEditData.parentCode" style="width:70%"></Input>
                        </FormItem>
                        <FormItem label="字典顺序" prop="sort">
                            <Input type="text" v-model="addAndEditData.sort" style="width:70%"></Input>
                        </FormItem>
                    </Form>
                </div>
                <div slot="footer" style="text-align:center">
                    <Button type="success" @click="submitCaseDiction(addAndEditData,'formCustom')">提交</Button>
                    <Button type="success" @click="closeCaseDiction(addAndEditData,'formCustom')">取消</Button>
                </div>
            </Modal>
        </section>
        <NoPermission v-else></NoPermission>
    </Row>
</template>


<script>
import { getDictGroups } from '../../service/getData'
import { saveDictGroups } from '../../service/getData'
import { deleteDictGroups } from '../../service/getData'
import Paging from '../../components/common/tools/paging'
import NoPermission from '../../components/common/tools/noPermission.vue' //无权限查看的模板
import { process_error } from '../../config/process_request_conf'

const th_Class = 'demo-table-info-column';
export default {
    name: 'CaseManageList',
    components: { Paging,NoPermission },
    data() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('序号不能为空'));
            } else {
                if (!Number.isInteger(+value)) {
                    callback(new Error('只能为数字'));
                } else {
                    callback();
                }
            }
        };
        return {
            tab_chlidName: "child",
            tabName: "parentName",
            items: [],
            columns: [
                { title: '序号', type: 'index', width: 100, align: 'center' },
                { title: '编码', key: 'code', sortable: false },
                { title: '名称', key: 'name', sortable: true },
                { title: '描述', key: 'describe', sortable: true },
                { title: '排列序号', key: 'sort', sortable: true, width: 125 },
                {
                    title: '操作', key: 'action', sortable: true,
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.openaddAndEditWin(params);
                                    }
                                }
                            }, '修改'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.deleteDiction(params)
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            showLoading: true,
            showStripe: true,
            childDataJsonArr: {
                "parentName": {
                    data: [],
                    search: {
                        code: '',
                        name: '',
                        describe: '',
                        parentCode: '',
                        sort: '',
                        page: {
                            totalElements: 1,
                            size: 10,
                            pageNumber: 1,
                            sort: ''
                        }
                    }
                }
            },//子级查询列表数据
            addAndEditWin: false,//弹窗的开关
            addAndEditData: {},//数据
            addAndEditDataRult: {
                code: [
                    { required: true, message: '编号不能为空', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' }
                    //唯一性校验
                ],
                sort: [
                    { required: true, trigger: 'blur', validator: validatePass }
                ]
            },

            disabledFlag: {
                code: false,
                parentCode: false,
                parentShow: false,
            },
            titleText: '',
            rowFunFlag: true,
            pageSize: {
                totalElements: 1,
                size: 10,
                pageNumber: 1,
                sort: ''
            },
            searchData: {
                code: '',
                name: ''
            }
        }
    },
    computed:{
      authList(){
        return JSON.parse(sessionStorage.getItem('auth'));
      }
    },
    methods: {
        //异步请求数据
        async getTableList(sendData) {
            await getDictGroups(sendData).then(
                res => {
                    if (res.statusCode !== 200) return process_error(res);
                    this.showLoading = false;
                    this.childDataJsonArr["parentName"].data = res.data.content;
                    this.childDataJsonArr["parentName"].search.page.totalElements = res.data.totalElements;
                    this.pageSize.totalElements = res.data.totalElements;
                }).catch(err => console.log(err));

        },
        //异步获取子级的数据表格
        async getChlidTableList(sendData, key) {
            this.showLoading = true;
            let res = await getDictGroups(sendData).then(res => {
                if (res.statusCode !== 200) return process_error(res);
                this.showLoading = false;
                if (0 > this.items.indexOf(key)) {
                    this.childDataJsonArr[key] = {
                        data: [],
                        search: {
                            code: '',
                            name: '',
                            describe: '',
                            parentCode: sendData.parentCode,
                            sort: '',
                            page: {
                                totalElements: 1,
                                size: 10,
                                pageNumber: 1,
                                sort: ''
                            }
                        }
                    };
                    this.tabName = key;
                    this.items.push(key);
                } else {
                    this.tabName = key;
                }
                this.childDataJsonArr[key].data = res.data.content;//给数组中添加数据
                this.childDataJsonArr[key].search.page.totalElements = res.data.totalElements;//给查询中添加对应的属性
                this.pageSize = this.childDataJsonArr[key].search.page;
            }).catch(err => console.log(err));
        },
        //新增或者修改
        async saveDicttion(sendData) {
            await saveDictGroups(sendData).then(
                res => {
                    if (res.statusCode !== 200) return process_error(res);
                    this.addAndEditWin = false;
                }).catch(err => console.log(err));
        },
        async deleteDict(sendData) {
            await deleteDictGroups(sendData).then(
                res => {
                    if (res.statusCode !== 200) return process_error(res);
                    if ('parentName' === this.tabName) {
                        this.getTableList(this.childDataJsonArr["parentName"].search);
                        this.tabClose(sendData.code)
                    } else {
                        this.getChlidTableList(this.childDataJsonArr[this.tabName].search, this.tabName);
                    }
                }).catch(err => console.log(err));
        }
        ,
        //点击行事件
        clickRowFun(row, index) {
            if (this.rowFunFlag) {//阻止了行在事件在发生
                let chlidData = {
                    code: '',
                    name: '',
                    describe: '',
                    parentCode: row.code,
                    sort: '',
                    index: index,
                    page: {
                        totalElements: 1,
                        size: 10,
                        pageNumber: 1,
                        sort: ''
                    }
                }
                this.getChlidTableList(chlidData, row.name);
            }
            this.rowFunFlag = true;//恢复成默认
        },
        //tab页的点击事件
        tabClick(name) {
            this.tabName = name;
            console.log("this.tabName", this.tabName)
            console.log(this.childDataJsonArr)
            this.pageSize = this.childDataJsonArr[this.tabName].search.page;
        },
        //tab 关闭的方法
        tabClose(name) {
            let nameIndex = this.items.indexOf(name);
            if (0 !== this.items.length) {
                this.tabName = nameIndex === this.items.length - 1 ? 0 === nameIndex ? "parentName" : this.items[nameIndex - 1] : this.items[nameIndex + 1];
            }
            this.items.splice(nameIndex, 1);
            this.pageSize = this.childDataJsonArr[this.tabName].search.page;
            // delete childDataJsonArr[name];
        },
        //新建or 修改 案件字典表
        openaddAndEditWin(param) {
            //判断是新增还是修改
            if (undefined !== param.row) {//修改
                this.addAndEditData = param.row;
                this.disabledFlag.code = true;
                this.disabledFlag.parentShow = null === this.addAndEditData.parentCode ? false : true;//判断是子页面新增还是父页面新增来是否显示
                this.titleText = '对编码[' + this.addAndEditData.code + ']的修改';
            } else {//新增
                let rowNew = {
                    code: "",
                    name: "",
                    describe: "",
                    parentCode: "parentName" === this.tabName ? "" : this.childDataJsonArr[this.tabName].search.parentCode,//获取parentCode
                    sort: ""
                }
                this.addAndEditData = rowNew;
                this.disabledFlag.code = false;
                this.titleText = "字典表新增";
                this.disabledFlag.parentShow = true;
            }
            this.disabledFlag.parentCode = '' === this.addAndEditData.parentCode ? false : true;//判断是子页面新增还是父页面新增来禁用文本框
            this.addAndEditWin = true;
            this.rowFunFlag = false;//阻止行事件在状态
        },
        //删除事件
        deleteDiction(param) {
            this.$Modal.confirm({
                title: '删除',
                content: '确认删除？',
                okText: '确认',
                cancelText: '取消',
                onOk: () => {
                    this.deleteDict(param.row);
                },
            });
            this.rowFunFlag = false;//阻止单机行事件
        },

        //提交事件
        submitCaseDiction(data, name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                    this.saveDicttion(data);

                } else {
                    this.$Message.error('Fail!');
                }
            })

        },
        //关闭页面的事件
        closeCaseDiction(name) {
            //清空校验的问题
            this.addAndEditWin = false;
        },
        //弹窗变换的事件
        winChange(status) {
            if ('parentName' === this.tabName) {
                this.getTableList(this.childDataJsonArr["parentName"].search);
            } else {
                this.getChlidTableList(this.childDataJsonArr[this.tabName].search, this.tabName);
            }
            if (false === status)//清空校验
                this.$refs['formCustom'].resetFields();
        },
        // 分页及复合搜索处理
        pageChangeFn(page) {
            this.childDataJsonArr[this.tabName]['search']['page']['size'] = page.size;
            this.childDataJsonArr[this.tabName].search.page = this.pageSize;
            if ('parentName' === this.tabName) {
                this.getTableList(this.childDataJsonArr[this.tabName].search);
            } else {
                this.getChlidTableList(this.childDataJsonArr[this.tabName].search, this.tabName);
            }

        },
        //查询的方法
        search() {
            this.childDataJsonArr[this.tabName].search.code = this.searchData.code;
            this.childDataJsonArr[this.tabName].search.name = this.searchData.name;
            this.childDataJsonArr[this.tabName].search.page.pageNumber = 1;
            console.log(this.childDataJsonArr[this.tabName].search)
            if ("parentName" === this.tabName) {
                this.getTableList(this.childDataJsonArr[this.tabName].search);
            } else {
                this.getChlidTableList(this.childDataJsonArr[this.tabName].search, this.tabName);
            }
        },
        //重置的方法
        resat() {
            this.searchData.code = "";
            this.searchData.name = "";
            this.childDataJsonArr[this.tabName].search.code = "";
            this.childDataJsonArr[this.tabName].search.name = "";
            this.childDataJsonArr[this.tabName].search.page.pageNumber = 1
            if ("parentName" === this.tabName) {
                this.getTableList(this.childDataJsonArr[this.tabName].search);
            } else {
                this.getChlidTableList(this.childDataJsonArr[this.tabName].search, this.tabName);
            }
        },
        // sort column
        sortColumnFn(data) {
            data.order = "normal" === data.order ? "desc" : data.order;
            let $search_data = {};
            if (0 <= this.items.indexOf(this.tabName)) {//判断这个是不是子标签
                this.childDataJsonArr[this.tabName].search["page"]["sort"] = `${data.key},${data.order}`;
                $search_data = this.childDataJsonArr[this.tabName].search;
            }
            this.getTableList($search_data);
        },
        //提交
        tableSubmit(index) {
            this.$Modal.info({
                title: '提交' + this.dictData[index].id,
            })
        },
        //案件管理
        setCase(index) {
            this.$Modal.info({
                title: '案件管理' + this.dictData[index].id,
            })
        },
        rowClassName(row) {
            return 'demo-table-info-row';
        },
        radioData(res) {
            // alert(this.filter)
        },
        addCaseFn() {
            this.$router.push({ path: '/addCase' });
        },
        loopCaseFn() {
            //
        },
        radioSelectFn() {
            //
        },


    },
    mounted() {
        this.getTableList(this.childDataJsonArr["parentName"].search);

    }
}
</script>

<style lang="less">
.DictlistStyle{
	th.demo-table-info-column {
		background-color: rgba(71, 118, 200, 0.3);
	}

	gridHeight {
		height: 10px;
		padding-bottom: 0px;
	}
}

</style>
