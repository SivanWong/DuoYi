<template>
    <div class="unused">
        <el-container>
            <div class="indexheader">
            	<span style="color:#E56F42;" class="el-icon-arrow-left" @click="backTo()"></span>
				<p>{{title}}</p >
			</div>
            <el-main class="unusedMain">
                <el-card 
                    :body-style="{ padding: '0px' }" 
                    shadow="never" 
                    class="unusedCard"
                    v-for="(item,index) in unusedData" 
                    :key="index">
                    <div>
                        <img src="../../assets/login/Profile.png" class="unusedImg">
                        <div class="unusedInfo">
                            <div class="unusedGoods">{{item.name}}</div>
                            <div class="unusedMoney">￥{{item.price}}</div>
                        </div>
                        <div class="unusedBrowse">
                            <span style="color:#F0AD94;"> 浏览：{{item.Ubrowse}}</span>
                            <span class="unusedComment">评论：{{item.Ucomment}}</span>
                        </div>
                    </div>
                    <div style="float:right;">
                        <el-button class="unusedBtn">查看</el-button>
                        <el-button class="unusedBtn">编辑</el-button>
                        <el-button class="unusedBtn" @click="openDelete(index)">删除</el-button>
                    </div>
                    <confirm v-model="DeleteVisible"
				      title="确定删除吗？"
				      @on-confirm="deleteUnused">
				        <p style="text-align:center;color:#F9BE82;">删除操作无法撤销，该消息将被永久删除</p>
				    </confirm>
                </el-card>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { Confirm } from 'vux'
import api from '../../services/main.js'

export default {
    name: 'unused',
    components: {
        Confirm
    },
    data () {
        return {
           title: "我发布的闲置",
            unusedData: [],
            deleteIndex:0,
            DeleteVisible: false
        }
    },
    methods:{
    	init() {
    		api.getAllByUserid((err, res) => {
                if (err || res.status != 200) {
               	 	this.$message.error("出错了，刷新一下吧");
                 	return;
                 }
                if (res.data.status == 1) {
                	this.unusedData = res.data.result;
                    //console.log(res);
                } else{
                    this.$message.error(res.data.message);
                }
            });
    	},
    	backTo() {
            this.$router.push({
                path: "/about"
            });
        },
        openDelete(index) {
        	this.deleteIndex = index;
        	this.DeleteVisible = true;
        },
        deleteUnused() {
        	let goodsid = this.unusedData[this.deleteIndex].id;
        	api.deleteUnused((err, res) => {
                if (err || res.status != 200) {
               	 	this.$message.error("出错了，刷新一下吧");
                 	return;
                 }
                if (res.data.status == 1) {
                	this.$message({
			          message: '删除成功',
			          type: 'success'
			        });
                	this.DeleteVisible = false;
                	this.init();
                    //console.log(res);
                } else{
                    this.$message.error(res.data.message);
                }
            }, goodsid);
        	console.log(this.unusedData[this.deleteIndex].id);
        }
    },
    created(){
    
    },
    mounted(){
    	this.init();
    }
}
</script>

<style scoped>
body {
    padding: 0;
    margin: 0;
}
.unused .el-container {
    width:100%;
    clear:both;
    position:absolute;
    top:0px;
    bottom:0px;
    background-color: #EFEFF4;
}
.indexheader{
		width: 100%;
		height: 45px;
		position: fixed;
		top: 0;
		z-index: 9;
		background-color: #f9f9f9;
		display: flex;
		align-items: center;
	}
.indexheader>p{
	font-size: 18px;
	position: absolute;
	left: 50%;
	margin-left: -25px;
	color:#E56F42
}
.indexheader /deep/ .el-icon-arrow-left {
	font-size: 25px;
	margin-left:20px;
	font-weight: bold;
}
.unusedMain {
	padding-left: 0;
	padding-right: 0;
	margin-top: 28px;
}
.unusedCard{
	margin-top: 15px;
}
.unusedImg {
    width: 60px;
    height: 60px;
    float: left;
    margin: 12px;
}
.unusedInfo { 
	padding-top: 15px;
	margin-right: 29px;
}
.unusedGoods {
	color: #E56F42;
	font-size: 16px;
	float: left;
}
.unusedMoney {
	color: #FF3840;
	font-size: 19px;
	float: right;
}
.unusedBrowse {
	padding-top: 48px;
	padding-bottom: 12px;
}
.unusedComment {
	color: #F0AD94;
	margin-left: 19px;
} 
.unusedBtn {
	width: 60px;
	height: 20px;
	margin: 15px;
	padding: 0;
	border-radius: 0;
	color: #B8B8BB;
}
.unused /deep/ .weui-mask {
	opacity: 0.2;
}
.unused /deep/ .weui-dialog strong {
	color: #E56F42;
}
.unused /deep/ .weui-dialog__ft a {
	color: #E56F42;
}
</style>