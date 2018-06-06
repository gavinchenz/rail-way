    //校验身份证
    export const idCard = (rule, val, cb) => {
        if (!!val) {
            if (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(val)) {
                return cb();
            } else {
                return cb(new Error('身份证号码格式不正确'));
            }
        } else {
            return cb(new Error('身份证号码不能为空'));
        }
    };

//校验操作编码
    export  const Ocode = (rule, val, cb) => {
       if(!!val) {
         if(/^(\d[-])+\d+$/.test(val)){
           return cb();
         }else {
           return cb(new Error('操作编码格式不正确'))
         }
       }else {
         return cb(new Error('操作编码不能为空'));
       }
    };
