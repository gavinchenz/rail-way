<template>
  <Table :loading="showLoading" :stripe="showStripe" size="small" :data="data" :columns="columns"
         :row-class-name="rowClassName" @on-sort-change="sortColumn"></Table> 

  <!--<Table :loading="showLoading" :stripe="showStripe" size="small" :data="data" :columns="showColumns"
         :row-class-name="rowClassName" @on-sort-change="sortColumn"></Table>-->

</template>
<script>
    export default {
        name: 'SearchCenterList',
        props: {
            title: {
                type: String,
                default: '查询列表'
            },
            columns: Array,
            data: Array,
            showLoading: Boolean
        },
        data() {
            return {
                showNum: 20,
                showStripe: true,
                tableSize: 'default',
                keyword: '',
                fixedHeader: true,
            }
        },
        computed: {
            showColumns() {
                let showColumn = this.columns.slice();
                showColumn.forEach(function(elem) {
                    elem.align = 'left'
                    if (elem.key == 'action') {
                        elem.render = (h, params) => {
                            if (params.row.action == null) {
                                return
                            } else {
                                return h('div', [
                                    h('Poptip', {
                                        props: {
                                            trigger: 'hover',
                                            'content': params.row.stateStr,
                                            'title': '文书详情',
                                            'placement': 'left'
                                        }
                                    }, [
                                        h('Tag', {
                                            props: {
                                                color: 'blue',
                                            }
                                        }, params.row.docStatus[0]),
                                        h('Tag', {
                                            props: {
                                                color: 'yellow',
                                            }
                                        }, params.row.docStatus[1]),
                                        h('Tag', {
                                            props: {
                                                color: 'green',
                                            }
                                        }, params.row.docStatus[2])
                                    ])
                                ])
                            }
                        }
                    }
                })
                return showColumn
            },
        },
        methods: {
            rowClassName(row) {
                return 'demo-table-info-row';
            },
            sortColumn(params) {
                let sortData = `${params['key']}.${params['order']}`;
                this.$emit('sortColumn', {
                    order: sortData
                });
            }
        }
    }
</script>
<style scoped>
    .ivu-table .demo-table-info-row:hover td {
        background: rgba(213, 232, 252, 0.5) !important;
        color: #333;
    }
</style>