$(function () {
    let table = layui.table
    let layer = layui.layer
    let form = layui.form
    let index
    getArtCate()

    $('.btn-add').on('click', function () {
        index = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加类别',
            content: $('#dialog-add').html()
        })
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $('#form-add').serialize(),
            success: function (res) {
                console.log(res)
                if (res.status === 1) {
                    return layer.msg("添加失败！")
                }
                layer.msg("添加成功~")
                layer.close(index)
                getArtCate()
            }
        })
    })
    let indexEdit
    // 通过代理的形式给edit按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        $.ajax({
            method: "GET",
            url: "/my/article/cates/" + $(this).attr('data-Id'),
            success: function (res) {
                if (res.status === 1) {
                    return layer.msg("获取文章分类数据失败")
                }
                form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $('#form-edit').serialize(),
            success: function (res) {
                console.log(res)
                if (res.status === 1) {
                    return layer.msg("修改文章类别失败！")
                }
                layer.msg("更新成功！")
                // layer.close(indexEdit)
                getArtCate()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function () {
        layer.confirm("确认删除？", { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/deletecate/" + $(this).attr('data-id'),
                success: function (res) {
                    if (res.status === 1) {
                        return layer.msg(res.message)
                    }
                    layer.msg("删除成功！")
                    layer.close(index)
                    getArtCate()
                }
            })
        })
    })
    // 获取文章分类列表并渲染
    function getArtCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                if (res === 1) {
                    return layer.msg(res.message)
                }
                let artListStr = template('artCateList', res)
                $('tbody').html(artListStr)
            }
        })
    }
})
