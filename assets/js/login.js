$(function () {
    // 登录和注册模块互相切换
    $('.login-to-reg').on('click', function () {
        $('.login-box').fadeOut()
        $('.reg-box').fadeIn()
    })
    $('.reg-to-login').on('click', function () {
        $('.reg-box').fadeOut()
        $('.login-box').fadeIn()
    })

    // 从layui 获取form对象
    let form = layui.form
    form.verify({
        // 自定义表单验证规则
        psw: [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'],
        uname: [/^[\S]+$/, '请输入正确的用户名！'],
        psw_confirm: function (pswc) {
            let psw = $('.reg-psw').val()
            if (psw !== pswc) {
                return '两次密码不一致！'
            }
        }
    })

    let layer = layui.layer
    // 用ajax发起注册用户 POST请求
    $('.reg-form').on('submit', function (e) {
        e.preventDefault()
        let data = $('.reg-form').serialize()
        $.ajax({
            type: "POST",
            url: '/api/reguser',
            data: data,
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！请登录！')
                $('.reg-to-login').click()
            }
        })
    })
    // 用ajax 发起登录POST请求
    $('.login-form').on('submit', function (e) {
        e.preventDefault()
        let data = $('.login-form').serialize()
        $.ajax({
            type: "POST",
            url: '/api/login',
            data: data,
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功!', function () {
                    // 将登录成功得到的 token 字符串，保存到 localStorage 中 
                    localStorage.setItem('token', res.token)
                    // 跳转到后台主页 
                    location.href = './index.html'
                })

            }
        })
    })
})