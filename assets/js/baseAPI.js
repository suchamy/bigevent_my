$(function () {
    //对ajax请求进行预处理的函数，在每次调用ajax请求之前都会先调用此函数
    $.ajaxPrefilter(function (options) {

        // 统一为ajax拼接根路径
        options.url = 'http://www.liulongbin.top:3007' + options.url

        // 同意为有权限的接口设置headers请求头
        if (options.url.indexOf('/my') !== -1) {
            options.headers = { Authorization: localStorage.getItem('token') }
        }

        // 控制用户访问权限
        options.complete = function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                localStorage.removeItem('token')

                location.href = '/login.html'
            }
        }
    })
})