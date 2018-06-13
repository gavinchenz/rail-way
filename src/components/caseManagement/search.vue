<style lang="less" scoped>

</style>
<template>
  <Row justify="space-between" class="control" style="margin-bottom: 0">
    <div class="search-bar">
      <Form ref="searchInfo" :model="searchInfo" inline>
        <Row style="margin-bottom: -15px">
          <FormItem :label-width="1">
            <Button type="info" icon="plus-round" @click="addCase">新增案件</Button>
            <Button type="success" icon="loop" v-if="radioFilter ==='0'" @click="synchronizeNewCase(1)">同步新增案件</Button>
            <!--<Button type="success" icon="loop" @click="synchronizeNewCase(0)">同步所有案件</Button>-->
          </FormItem>
        </Row>
        <Row style="margin-bottom: -15px">
          <FormItem :label-width="1">
            <RadioGroup v-model="radioFilter" @on-change="radioSelect" size="small" type="button">
                <Radio label="2">全部</Radio>
                <Radio label="1">手动录入案件</Radio>
                <Radio label="0">同步案件</Radio>
            </RadioGroup>
          </FormItem>
        </Row>
        
        <Row style="margin-bottom: -15px">
          <FormItem :label-width="60" label="案件名称">
            <Input v-model="searchInfo.caseName" placeholder="案件名称" style="width: 120px" size="small"></Input>
          </FormItem>
          <FormItem :label-width="70" label="对象名称">
            <Input v-model="searchInfo.objName" placeholder="对象名称" style="width: 120px" size="small"></Input>
          </FormItem>
          <FormItem :label-width="70" label="标识号">
            <Input v-model="searchInfo.identify" placeholder="标识号" style="width: 120px" size="small"></Input>
          </FormItem>
          <FormItem :label-width="70" label="案件类型">
            <Select v-model="searchInfo.ctypecode" placeholder="案件类型" style="width: 120px" size="small">
              <Option :value="item.code" v-for="(item,index) in ccategoryList" :key="`${index}`">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="70" label="案件状态">
            <Select v-model="searchInfo.cstatuscode" placeholder="案件状态" style="width: 120px" size="small">
              <Option :value="item.code" v-for="(item,index) in cstatusList" :key="`${index}`">{{item.name}}</Option>
            </Select>            
          </FormItem>
        </Row>

        <Row style="margin-bottom: -15px">
          <FormItem :label-width="60" label="案件级别">
            <Select v-model="searchInfo.caseLevelcode" placeholder="案件级别" style="width: 120px" size="small">
              <Option :value="item.code" v-for="(item,index) in caseLevelcodeList" :key="`${index}`">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="70" label="案件类别">
            <Select v-model="searchInfo.ccategorycode" placeholder="案件类别" style="width: 120px" size="small">
              <Option :value="item.code" v-for="(item,index) in ccategorycodeList" :key="`${index}`">{{item.name}}</Option>
            </Select>            
          </FormItem>
          <FormItem :label-width="70" label="交案类别">
            <Select v-model="searchInfo.cturncasecategorycode" placeholder="交案类别" style="width: 120px" size="small">
              <Option :value="item.code" v-for="(item,index) in cturncasecategorycodeList" :key="`${index}`">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem :label-width="70" label="协助类别">
            <Select v-model="searchInfo.cassistcategorycode" placeholder="协助类别" style="width: 120px" size="small">
              <Option :value="item.code" v-for="(item,index) in cassistcategorycodeList" :key="`${index}`">{{item.name}}</Option>
            </Select>            
          </FormItem>
          <FormItem>
            <Button type="info" @click="search" icon="search">搜索</Button>
            <Button type="ghost" @click="resat" icon="refresh">重置</Button>
          </FormItem>          
        </Row>        
      </Form>
    </div>
  </Row>
</template>
<script>
  import {findCaseDictionByParent} from '@/service/getData'
  export default {
    name: 'CaseSearch',
    props: {
      searchInfo: Object,
      filter:String
    },
    watch:{
      filter(){return this.radioFilter=this.filter;}
    },
    data () {
      return {
        ccategoryList:[],
        cstatusList:[
          {name:"在办",code:"0"},
          {name:"结案",code:"1"}
        ],
        radioFilter:'2',
        caseLevelcodeList:[], // 案件级别
        ccategorycodeList:[], // 案件类别
        cturncasecategorycodeList:[], // 交案类别
        cassistcategorycodeList:[] // 协助类别        
      }
    },
    methods: {
      async getSelectOption(){
            let [
                ccategory,
                caseLevelcode,
                ccategorycode,
                cturncasecategorycode,
                cassistcategorycode
            ] = await Promise.all([
                findCaseDictionByParent('caseType'),
                findCaseDictionByParent('caseLevel'),
                findCaseDictionByParent('caseCategories'),
                findCaseDictionByParent('handCaseCategory'),
                findCaseDictionByParent('assistCategory')
            ]);
            this.ccategoryList = ccategory.data;
            this.caseLevelcodeList = caseLevelcode.data;
            this.ccategorycodeList = ccategorycode.data;
            this.cturncasecategorycodeList = cturncasecategorycode.data;
            this.cassistcategorycodeList = cassistcategorycode.data;
      },     
      addCase(){
          this.$emit('addCase');
      },
      synchronizeNewCase(sign){
          this.$emit('synchronizeNewCase',sign);
      },
      radioSelect(){
          this.$refs.searchInfo.resetFields();
          this.$emit('filter',this.radioFilter);
      },
      search(){
        this.$emit('search');
      },
      resat(){
        this.$emit('resat');
      }
    },
    created(){
      this.getSelectOption();
    }
  }
</script>
