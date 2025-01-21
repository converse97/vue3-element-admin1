// 修改后的代码
import axios from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { useUserStore } from '../store/modules/user';
import { ElMessage, ElMessageBox } from 'element-plus';

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore();
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, msg } = response.data;
    // 登录成功
    if (code === '00000') {
      return response.data;
    }
    ElMessage.error(msg || '系统错误');
    return Promise.reject(new Error(msg || '系统错误'));
  },
  (error: any) => {
    if (error.response?.data) {
      const { code, msg } = error.response.data;
      // token过期
      if (code === '00001') {
        ElMessageBox.confirm('登录状态已过期，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        })
          .then(() => {
            localStorage.clear();
            useUserStore().logout();
            window.location.href = '/';
          })
          .catch(() => {
            ElMessage({
              type: 'info',
              message: '已取消',
            });
          });
      } else {
        ElMessage.error(msg || '系统错误');
      }
    }
    return Promise.reject(error.message);
  },
);

// 导出axios实例
export default service;
