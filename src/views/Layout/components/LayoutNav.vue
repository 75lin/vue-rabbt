<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useRouter,useRoute } from 'vue-router';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const Logout = ()=>{
  userStore.cleanUserInfo();
  router.replace({path: '/'})
}
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul >
                <template v-if="userStore.userInfo.token">
                    <li>
                        <a href='#'>
                            <i class='iconfont icon-user'></i>{{ userStore.userInfo.account }}
                            <img :src="userStore.userInfo.avatar" />
                        </a>
                    </li>
                    <li>
                        <el-popconfirm 
                            title="确认要退出码？" 
                            @confirm="Logout"
                            confirm-button-text="确认" 
                            confirm-button-type="primary"
                            placement="bottom-start" 
                            cancel-button-text="取消">
                            <template #reference>
                                <a href="javascript:;">退出登录</a>
                            </template>
                        </el-popconfirm>
                    </li>
                    <li><a href="javascript:;">我的订单</a></li>
                    <li><a href="javascript:;" @click="()=>$router.push('/member')">会员中心</a></li>
                </template>

                <template v-else>
                    <li><a href="javascript:;"><router-link to="/login">请先登录</router-link></a></li>
                    <li><a href="javascript:;">帮助中心</a></li>
                    <li><a href="javascript:;">关于我们</a></li>
                </template>
            </ul>
        </div>
    </nav>
</template>
<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        img{
          width: 35px;
          height: 35px;
          border-radius: 50%;
          border: #333 solid 1px;
          background-color: #333;
          overflow: hidden;
        }

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>