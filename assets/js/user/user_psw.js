$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        psw: [/^[\S]{6,16}$/, "密码必须在6~16位，且不能包含空格！"],
        psw_same: function (psw_new) {
            if (psw_new === $('.psw_old').val()) {
                return layer.msg('新旧密码不能相同！')
            }
        },
        psw_confirm: function (pswc) {
            if (pswc !== $('.psw_new').val()) {
                return layer.msg('两次输入的密码不一致！')
            }
        }
    })

    $('.user-psw-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                layer.msg("更新密码成功~")
                $('.btn-reset').click()
            }
        })
    })
})