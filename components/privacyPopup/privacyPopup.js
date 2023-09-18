 Component({
   data: {
     title: "用户隐私保护提示",
     desc1: "感谢您信任并使用Vivino唯唯诺小程序",
     urlTitle: "",
     desc2: "您使用本小程序前应当阅读并同意,当您点击同意并开始使用产品服务时，即表示您已理解并同意该条款内容，该条款将对您产生法律约束力。如您拒绝，将无法正常使用小程序。",
     innerShow: false,
     height: 0,
   },
   lifetimes: {
     attached: function () {

     },
   },
   methods: {
     openPrivacyPopup() {
       if (wx.getPrivacySetting) {
         wx.getPrivacySetting({
           success: res => {
             this.setData({
               urlTitle: res.privacyContractName
             })
            //  console.log("是否需要授权：", res.needAuthorization, "隐私协议的名称为：", res.privacyContractName)
             if (res.needAuthorization) {
               this.popUp()
             } else {
               this.triggerEvent("agree")
             }
           },
           fail: () => {},
           complete: () => {},
         })
       } else {
         // 低版本基础库不支持 wx.getPrivacySetting 接口，隐私接口可以直接调用
         this.triggerEvent("agree")
       }
     },
     handleDisagree(e) {
       this.triggerEvent("disagree")
       this.disPopUp()
     },
     handleAgree(e) {
       this.triggerEvent("agree")
       this.disPopUp()
     },
     popUp() {
       this.setData({
         innerShow: true
       })
     },
     disPopUp() {
       this.setData({
         innerShow: false
       })
     },
     openPrivacyContract() {
       wx.openPrivacyContract({
         success: res => {
           console.log('openPrivacyContract success')
         },
         fail: res => {
           console.error('openPrivacyContract fail', res)
         }
       })
     }
   }
 })