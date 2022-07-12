$(function () {
    let layer = layui.layer
    getUserinfo()

    // 给退出按钮绑定事件
    $('.btn-logout').on('click', function () {
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function (index) {
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 跳转回登录页面
            location.href = '/login.html'

            //关闭confirm 询问框
            layer.close(index);
        });
    })


    function getUserinfo() {
        $.ajax({
            type: "GET",
            url: '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                renderAvatar(res.data)
            }
        })
    }

    function renderAvatar(info) {
        //获取用户名称
        let uname = info.nickname || info.username
        // 渲染欢迎信息
        $('.welcome').html(uname)
        // 渲染头像
        if (info.user_pic) {
            $('.layui-nav-img').src(info.user_pic).show()
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            $('.text-avatar').html(uname[0].toUpperCase()).show()
        }
    }
})