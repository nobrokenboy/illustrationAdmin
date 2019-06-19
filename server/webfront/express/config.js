module.exports={
    apiCtx:"/illustration",
    passwordKey:"神探伽利略",//密码加密解密的秘钥
    setResponse:function (code,data,msg,error) {
        return {
            code:code,
            msg:msg,
            data:data||null,
            error:error||null
        }
    },
    setCode:{
        Success_Code:0,
        Error_Code:-1,

    }
}


