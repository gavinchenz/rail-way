<template>
  <div class="vue-body">
    <Breadcrumb class="router-box">
      <BreadcrumbItem to="index">首页</BreadcrumbItem>
      <BreadcrumbItem>综合预警</BreadcrumbItem>
      <BreadcrumbItem>综合预警</BreadcrumbItem>
    </Breadcrumb>
    <div class='panel-body'>
      <Row :gutter="10">
        <Col span="5">
        <Card dis-hover style="overflow: hidden">
          <p slot="title">
            <Icon type="disc" size="14"></Icon>
            <span>预警任务</span>
          </p>
          <div class="treeBox" style="max-height: 700px;overflow-y: auto;overflow-x: hidden">
            <Tree :data="treeList" :render="renderContent"></Tree>
          </div>
        </Card>
        </Col>
        <Col span="19">
        <Card dis-hover>
          <p slot="title">
            <Icon type="document-text" size="16"></Icon>
            <span>预警信息列表</span>
          </p>
          <div style="margin-bottom: 5px">
            <Button type="primary" size="small" @click="addWarning"><Icon type="plus-round"></Icon>&nbsp;添加新预警</Button>
            <Button size="small"><Icon type="share"></Icon>&nbsp;抽取到详单库</Button>
          </div>
          <Table  stripe :columns="columns" :data="tableList" height="600"></Table>
        </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ComprehensiveEarlyWarning',
    data() {
      return {
        msg: "综合预警 ComprehensiveEarlyWarning",
        treeList: [
          {
            title: '西安铁路公安局',
            expand: true,
            selected: true,
            children: [
              {
                title: '西安处',
                expand: true,
                children: [
                  {
                    title: '单位一',
                    disabled: false,
                    expand: true,
                    children: [
                      {
                        title: '大队一',
                        disabled: false,
                        children: [
                          {
                            title: '人员一',
                            disabled: false,
                            children: [
                              {title: '3.25从西安到昆明', type: 1,}
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  {title: '单位二'},
                  {title: '单位三'}
                ]
              },
              {
                title: '安康处'
              },
              {
                title: '延安处1'
              }
            ]
          }
        ],
        columns:[
          {type: 'selection',width: 60,align: 'center'},
          {type: 'index',title:'序号',width: 60,align: 'center'},
          {title:'姓名',key:'name',width: 150,align: 'left'},
          {title:'身份证号',key:'carId',width: 200,align: 'left'},
          {title:'出生年月',key:'birth',width: 200,align: 'left'},
          {title:'籍贯',key:'jiguan',minWidth:200,align: 'left'},
          {title:'操作',key:'action',width: 300,align: 'center',
            render: (h, params) => {
              return h('div', 
                [h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.markers(params.index)
                    }
                  }
                }, '标记人员'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.viewTableInfo(params.index)
                    }
                  }
                }, '查看目标分析')
              ]);
            }
          },
        ],
        tableList:[
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'},
          {name:'张三',carId:61232419880506,jiguan:'陕西省西安市碑林区某某街道',birth:'1988年11月11日'}
        ]
      }
    },
    methods: {
      renderContent(h, {root, node, data}) {
        return h('span', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: node.node.type === 1 ? 'document' : 'folder',
                size: '18',
                color: node.node.type === 1 ? '' : '#db9f5e',
              },
              style: {
                marginRight: '5px',
                verticalAlign: 'text-bottom'
              }
            }),
            h('span', {
                class:{
                  selectNode:false,
                },
                style: {
                  cursor: 'pointer',
                  //color: node.node.type === 1 ? '#1e56b0' : '',
                  fontWeight: node.node.type === 1 ? 'bold' : '',
                },
                on: {
                  click: (e) => {
                    this.viewList(root, node, data,e)
                  }
                }
              },
              [
                h('span', data.title)
              ]
            )
          ]),
          h('span', {
            style: {
              display: node.node.type === 1 ? 'inline-block' : 'none',
              float: 'right',
              marginRight: '32px',
              paddingTop: '2px'
            }
          }, [
            h('Icon', {
              props: Object.assign({},{
                type: 'compose',
                size: 18
              }),
              style: {
                marginRight: '8px',
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.editNode(data)
                }
              }
            }),
            h('Icon', {
              props: Object.assign({}, {
                type: 'trash-a',
                size: 18
              }),
              style: {
                cursor: 'pointer'
              },
              on: {
                click: () => {
                  this.removeNode(root, node, data)
                }
              }
            })
          ])
        ])
      },
      //tree查看表格
      viewList(root, node, data,e) {
        console.log(data)
      },
      //修改节点
      editNode(data) {
        console.log(data);
        data.title = '111111'
      },
      //删除节点
      removeNode(root, node, data) {
        console.log(data)
      },
      //查看目标分析
      viewTableInfo(){},
      //新增预警
      addWarning(){
        this.$router.push({path: '/addWarning'});
      }
    }
  }
</script>

<style>
  .comprehensive-early-warning {
    flex: 1;
    color: #2db7f5;
    vertical-align: text-bottom;
  }

  .treeBox .ivu-tree-children span:nth-child(2):hover {
    background: #f3f1f7;
  }
  .selectNode{
    color: #000;
  }
</style>
