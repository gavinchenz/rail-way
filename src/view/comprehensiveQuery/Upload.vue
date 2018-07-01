<template>
    <div class="vue-body">
        <!-- 面包屑 -->
        <Breadcrumb class="router-box">
          <BreadcrumbItem to="/ComprehensiveQuery">返回</BreadcrumbItem>
          <BreadcrumbItem>上传</BreadcrumbItem>
        </Breadcrumb>
        <!-- 查询条件 -->
        <Form :model="searchData" class="header-from">
            <FormItem class="form-item">
                <Row :gutter="12">
                    <Col span="6" class="col-checkbox" style="margin-left:30px">
                        <RadioGroup v-model="searchData.ms">
                            <Radio label="1">浏览模式</Radio>
                            <Radio label="2">自动模式</Radio>
                        </RadioGroup>                
                    </Col>
                </Row>
            </FormItem> 
            <FormItem class="form-item">
                <Row :gutter="16">
                    <Col span="6" class="col-label" style="width:150px">请选择分隔符：</Col>
                    <Col span="4" class="col-checkbox">
                        <RadioGroup v-model="searchData.fgf">
                            <Radio label="1">，(逗号)</Radio>
                            <Radio label="2">tab(制表符)</Radio>
                            <Radio label="3">自定义：</Radio>             
                        </RadioGroup>                
                    </Col>
                    <Col span="4">
                        <Input v-model="searchData.zdy" placeholder="请输入自定义符号" clearable></Input>
                    </Col>
                </Row>
            </FormItem> 
        </Form>
        <!-- 树结构 -->
        <Tree class="tree-box" :data="data" :render="renderContent"></Tree>
        <!-- 上传控件 -->
<!--         <div class="header-from"> -->
<!--           <Upload multiple type="drag" action="//jsonplaceholder.typicode.com/posts/">
            <div style="padding:20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color:#3399ff"></Icon>
              <p>点击或拖动文件在这里上传</p>
            </div>
          </Upload>   -->
<!--         </div> -->
    </div>
</template>

<script>

  export default {
    name: 'Upload',
    components:{
    },
    data () {
      return {
        searchData: {//查询条件                  
            ms: '',
            fgf: '',
            zdy: ''
        },
        data: [
            {
                title: '请选择数据源类型',//标题
                expand: true,//boolean类型，是否展开直子节点
                render: (h, { root, node, data }) => {
                    return h('span', {//根节点span
                        style: {
                            display: 'inline-block',
                            width: '30%',
                            fontSize:14+"px"
                        }
                    }, [
                        h('span', [//图标和标题
                            h('Icon', {//根节点图标
                                props: {
                                    type: 'ios-folder-outline'
                                },
                                style: {
                                    marginRight: '10px'
                                }
                            }),
                            h('span', data.title)//根节点标题
                        ]),
                        h('span', {//添加span
                            style: {
                                display: 'inline-block',
                                margin: 'auto 20px'                           
                            }
                        }, [
                            h('Button', {//添加span中的按钮button
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-plus-empty',
                                    type: 'info'
                                }),
                                style: {
                                    width: '30px'
                                },
                                on: {
                                    click: () => { this.append(data) }
                                }
                            })
                        ])
                    ]);
                },
                children: [
                    {
                        title: '社会管理数据',
                        expand: true,
                        children: [
                            {
                                title: '税务',
                                expand: true
                            },
                            {
                                title: '社保',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: '各用户单位自采数据',
                        expand: true,
                        children: [
                            {
                                title: '机主资料',
                                expand: true
                            },
                            {
                                title: '户籍资料',
                                expand: true
                            }
                        ]
                    }
                ]
            }
        ],
        buttonProps: {//按钮样式
            type: 'ghost',
            size: 'small',
        }
      }
    },
    methods: {
      renderContent (h, { root, node, data }) {
          return h('span', {//直子节点node
              style: {
                  display: 'inline-block',
                  width: '30%',
                  fontSize:"14px"      
              }
          }, [
              h('span', [//图标和标题
                  h('Icon', {//子图标
                      props: {
                          type: 'document'
                      },
                      style: {
                          marginRight: '10px'
                      }
                  }),
                  // h('Input',{
                  //     class:{
                  //       inputLI:true
                  //     },
                  //     style: {
                  //       display: 'inline-block',
                  //       width:'60px'
                  //     },
                  //     props:{
                  //       size:'small',
                  //       placeholder:'请改名',
                  //       VModel:"111"
                  //     },
                  //     nativeOn:{
                  //         change: () =>{this.renameAddFn}
                  //     }
                  // }),
                  h('span', data.title)//子标题,children中的title
              ]),
              h('span', {//子节点添加span
                  style: {
                      display: 'inline-block'
                  }
              }, [
                  h('Button', {//子节点添加span +
                      props: Object.assign({}, this.buttonProps, {
                          icon: 'ios-plus-empty'
                      }),
                      style: {
                          marginLeft: '20px',
                          marginRight: '10px',
                      },
                      on: {
                          click: () => { this.append(data) }
                      }
                  }),
                  h('Button', {//子节点添加span -
                      props: Object.assign({}, this.buttonProps, {
                          icon: 'ios-minus-empty'
                      }),
                      on: {
                          click: () => { this.remove(root, node, data) }
                      }
                  })
              ])
          ]);
      },
      append (data) {
          const children = data.children || [];
          children.push({
              title: '新增',
              expand: true
          });
          this.$set(data, 'children', children);
      },
      remove (root, node, data) {
          const parentKey = root.find(el => el === node).parent;
          const parent = root.find(el => el.nodeKey === parentKey).node;
          const index = parent.children.indexOf(data);
          parent.children.splice(index, 1);
      },
      renameAddFn(){
          document.querySelect("inputLI").value==1
      }
    }
  };
</script>

<style scoped>
.tree-box{
  color:#000;
  height:auto;
  border:1px solid #eeeff1;
  border-radius:5px;
  margin:15px 10px 0;
  padding:10px 0 0 50px;
}
</style>
