// import {getUserInfo, login, logout} from "@/api/auth/auth";
import {login, logout} from "@/api/auth/auth";
import {getToken, setToken, removeToken} from "@/utils/auth";

// 定义全局数据（ 一个 json 对象，有两个属性，token 和 用户信息
const state = {
    token: getToken(), // 从 cookie 里获取 token
    user: "", // 用户对象
};

// state 的状态的改变，必须通过 mutations 来进行
const mutations = {
    // 匿名函数，是字符串
    SET_TOKEN_STATE: (state, token) => {
        state.token = token;
    },
    SET_USER_STATE: (state, user) => {
        state.user = user;
    },
};

// 异步请求数据
const actions = {
    // 用户登录
    login({commit}, userInfo) {
        console.log(userInfo);
        const {name, pass, rememberMe} = userInfo;
        return new Promise((resolve, reject) => {
            login({username: name.trim(), password: pass, rememberMe: rememberMe})
                .then((response) => {
                    const {data} = response;
                    commit("SET_TOKEN_STATE", data.token);
                    setToken(data.token);
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    // // 获取用户信息
    // getInfo({commit, state}) {
    //     return new Promise((resolve, reject) => {
    //         getUserInfo()
    //             .then((response) => {
    //                 const {data} = response;
    //                 if (!data) {
    //                     commit("SET_TOKEN_STATE", "");
    //                     commit("SET_USER_STATE", "");
    //                     removeToken();
    //                     resolve();
    //                     reject("Verification failed, please Login again.");
    //                 }
    //                 commit("SET_USER_STATE", data);
    //                 resolve(data);
    //             })
    //             .catch((error) => {
    //                 reject(error);
    //             });
    //     });
    // },
    // 注销
    logout({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then((response) => {
                    console.log(response);
                    commit("SET_TOKEN_STATE", "");
                    commit("SET_USER_STATE", "");
                    removeToken();
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
