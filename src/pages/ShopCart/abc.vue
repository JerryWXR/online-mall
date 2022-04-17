<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  data() {
    return {
      payInfo: {},
      timer: null,
      //支付状态码
      code: "",
    };
  },
  computed: {
    orderId() {
      return this.$route.query.orderId;
    },
  },
  //工作的时候：尽量别再生命周期函数中async|await
  mounted() {
    this.getPayInfo();
  },
  methods: {
    //获取支付信息
    async getPayInfo() {
      let result = await this.$API.reqPayInfo(this.orderId);
      //如果成功：组件当中存储支付信息
      if (result.code == 200) {
        this.payInfo = result.data;
      }
    },
    //弹出框
    async open() {
      //生成二维(地址)
      let url = await QRCode.toDataURL(this.payInfo.codeUrl);
      this.$alert(`<img src=${url} />`, "请你微信支付", {
        dangerouslyUseHTMLString: true,
        //中间布局
        center: true,
        //是否显示取消按钮
        showCancelButton: true,
        //取消按钮的文本内容
        cancelButtonText: "支付遇见问题",
        //确定按钮的文本
        confirmButtonText: "已支付成功",
        //右上角的叉子没了
        showClose: false,
        //关闭弹出框的配置值
        beforeClose: (type, instance, done) => {
          //type:区分取消|确定按钮
          //instance：当前组件实例
          //done:关闭弹出框的方法
          if (type == "cancel") {
            alert("请联系管理员豪哥");
            //清除定时器
            clearInterval(this.timer);
            this.timer = null;
            //关闭弹出框
            done();
          } else {
            //判断是否真的支付了
            //开发人员：为了自己方便，这里判断先不要了
            // if (this.code == 200) {
              clearInterval(this.timer);
              this.timer = null;
              done();
              this.$router.push("/paysuccess");
            // }
          }
        },
      });
      //你需要知道支付成功|失败
      //支付成功，路由的跳转，如果支付失败，提示信息
      //定时器没有，开启一个新的定时器
      if (!this.timer) {
        this.timer = setInterval(async () => {
          //发请求获取用户支付状态
          let result = await this.$API.reqPayStatus(this.orderId);
          //如果code==200
          if (result.code == 200) {
            //第一步：清除定时器
            clearInterval(this.timer);
            this.timer = null;
            //保存支付成功返回的code
            this.code = result.code;
            //关闭弹出框
            this.$msgbox.close();
            //跳转到下一路由
            this.$router.push("/paysuccess");
          }
        }, 1000);
      }
    },
  },
};
</script>