let tools = {}

tools.convertNumberUpperCase = function (money) {
  //汉字的数字
  let cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖')
  //基本单位
  let cnIntRadice = new Array('', '拾', '佰', '仟')
  //对应整数部分扩展单位
  let cnIntUnits = new Array('', '万', '亿', '兆')
  //对应小数部分单位
  let cnDecUnits = new Array('角', '分', '毫', '厘')
  //整数金额时后面跟的字符 （整）
  let cnInteger = ''
  //整型完以后的单位 (元)
  let cnIntLast = ''
  //最大处理的数字
  let maxNum = 999999999999999.9999
  //金额整数部分
  let integerNum
  //金额小数部分
  let decimalNum
  //输出的中文金额字符串
  let chineseStr = ''
  //分离金额后用的数组，预定义
  let parts
  if (money === '') { return '' }
  money = parseFloat(money)
  if (money >= maxNum) {
    //超出最大处理数字
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  //转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    let IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        //归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  //小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr

}

//将 unix 时间戳转换为 2033-12-02
tools.unix_change = function (value) {
      if (value != 0 && !!value) {
          let d = new Date(parseInt(value) * 1000);
          return (d.getFullYear()) + '-'
           + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1))
           + '-' +  (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())
           + ' ' + (d.getHours() > 9 ? d.getHours() : '0' + d.getHours())
           + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
           + ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds());
      } else {
          return '';
      }
  }

// currentTime_change(new Date)----> 2017-10-24
tools.currentTime_change = function (item) {
    if (!!item) {
        const a = new Date(item);
        const time = (a.getFullYear())
         + '-' + (a.getMonth() + 1 > 9 ? a.getMonth() + 1 : '0' + (a.getMonth() + 1))
         + '-' + (a.getDate() > 9 ? a.getDate() : '0' + a.getDate())
         + ' ' + (d.getHours() > 9 ? d.getHours() : '0' + d.getHours())
         + ':' + (d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())
         + ':' + (d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds());
        return time;
    } else {
        return '';
    }
}

//  create by lijiahao 2018/01/09
const { toString } = Object.prototype;

let exportsObj = Object.create(null);
if (Array.hasOwnProperty('isArray')) {
    exportsObj.isArray = Array.isArray;
} else {
    exportsObj.isArray = function(o) {
        return toString.call(o) === '[object Array]';
    }
}

exportsObj.clearSimpleObj = function(o) {
    const ks = Object.keys(o);
    ks.forEach((k) => {
        switch (typeof o[k]) {
            case 'string':
                o[k] = '';
                break;
            case 'boolean':
                o[k] = false;
                break;
            case 'number':
                o[k] = 0;
                break;
        }
    });
}

exportsObj.pad2 = function(d) {
    return d < 10 ? `0${d}` : `${b}`;
}

let caseRegExp = {
    serviceNum: {
        reg: /^(^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-)|(\+86))?(1[34578]\d{9})$)|(^(400|800)\-?(\d{3})\-?(\d{4})$)$/,
        name: "服务号码",
    },
    DFNum: {
        reg: /^(^(0[0-9]{2,3}\-?)?([2-9][0-9]{6,7})(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-)|(\+86))?(1[34578]\d{9})$)|(^(400|800)\-?(\d{3})\-?(\d{4})$)$/,
        name: "对方号码",
    },
    deviceNum: { // 设备号
        reg: "/^\\d{14,15}$/",
        name: "IMEI",
    },
    cardNum: { // 卡号
        reg: "/^\\d{15,16}$/",
        name: "IMSI",
    },
    callTransferNum: {
        reg: "/^\\d*$/",
        name: "呼叫转移号码",
    }
}


let preventEvent = Object.create(null);
// 阻止事件冒泡通用函数
preventEvent.stopBubble = function(e){           
    if(e && e.stopPropagation){
        e.stopPropagation();                
    }else{
        window.event.cancelBubble = true;                             
    }
},
// 阻止浏览器默认行为
preventEvent.stopDefault = function(e){
    if(e && e.preventDefault){
        e.preventDefault();
    }else{
        window.event.returnValue = false;                
    }
    return false;
}        

export {
  tools,
  exportsObj,
  caseRegExp,
  preventEvent
}