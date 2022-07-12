$(function () {
    // 自定义昵称的验证规则
    let form = layui.form
    let layer = layui.layer
    form.verify({
        // 自定义表单验证规则
        nickname: [/^[\S]{1,6}$/, '请输入正确的用户名称！'],
    })

    //初始化页面内容
    initUserInfo()

    // 点击重置按钮后，重新初始化页面
    $('.btn-reset').on('click', function () {
        initUserInfo()
    })
    // 点击提交按钮后，发起更新用户信息的请求
    $('.btn-update').on('click', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: '/my/userinfo',
            // $(this).serialize()
            data: form.val('user-info-form'),
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                layer.msg('更新数据成功')
                // 转到父级调用函数时,要确认父级函数在全局作用域，不能写到jquery的入口函数中
                window.parent.getUserinfo()
            }
        })
    })

    // 定义初始化函数
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res === 1) {
                    return layer.msg(res.message)
                }
                form.val('user-info-form', res.data)
            }
        })
    }
})