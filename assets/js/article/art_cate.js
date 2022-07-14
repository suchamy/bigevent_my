let table = layui.table
let layer = layui.layer
$(function () {
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
            data: $(this).serialize(),
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