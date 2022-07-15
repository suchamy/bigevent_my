$(function () {
    let layer = layui.layer
    let form = layui.form

    initCateSelect()
    function initCateSelect() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg("获取文章分类失败！")
                }
                let cateSelectStr = template('art-cate', res)
                $('#cate_id').html(cateSelectStr)
                form.render()
            }
        })
    }
    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    let $image = $('#image')

    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 更换裁剪区域图片
    $('.btn-changeImg').on('click', function () {
        $('#ipt-changeImg').click()
    })

    $('#ipt-changeImg').on('change', function (e) {
        // console.log(e)
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

    let art_state = '已发布'
    $('#btn-draft').on('click', function (e) {
        art_state = '草稿'
    })
    $('#form-publish').on('submit', function (e) {
        e.preventDefault()
        let data = new FormData($('#form-publish')[0])
        data.append('state', art_state)

        //获得用户裁剪区域的图像
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                data.append('cover_img', blob)
                $.ajax({
                    method: "POST",
                    url: "/my/article/add",
                    data: data,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status === 1) {
                            return layer.msg("发布失败！")
                        }
                        layer.msg("发布成功")
                        location.href = '/article/art_list.html'
                    }
                })
            })



    })
})