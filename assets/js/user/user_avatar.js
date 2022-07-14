$(function () {

    let layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    $('.btn-upload').on('click', function () {
        $('#uploadFile').click()
    })

    $('#uploadFile').on('change', function (e) {
        console.log(e)
        let file_list = e.target.files
        if (file_list.length === 0) {
            return layer.msg('请选择图片!')
        }
        let file = e.target.files[0]
        // 创建选择文件的url地址
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('.btn-sure').on('click', function () {
        //获得用户裁剪区域的图像
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //发起更换头像的ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                layer.msg('更换头像成功！')
                window.parent.getUserinfo()
            }
        })
    })
})