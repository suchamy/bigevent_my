$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage;

    // 定义一个请求对象，将来发ajax请求时会提交到服务器
    let q = {
        pagenum: 1, // 页码数
        pagesize: 2, // 每页显示多少条数据
        cate_id: '', // 文章分类id
        statu: '' // 文章状态
    }

    initTable()
    initCate()

    $('.btn-choose').on('click', function (e) {
        e.preventDefault()
        q.cate_id = $('#select-cate').val()
        q.state = $('#select-state').val()
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'page-box', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            // 1. 只要调用了laypage.render方法，就会触发 jump 回调
            // 2. 点击页码也会触发 jump 回调
            jump: function (obj, first) {
                // obj.curr 最新的页码值
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }

    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除？', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: "GET",
                url: "/my/article/delete/" + id,
                success: function (res) {
                    if (res.status === 1) {
                        return layer.msg("删除失败！")
                    }
                    layer.msg("删除成功！")
                    // 当数据删除完成后，需要判断当前页是否还有剩余的数据，若没有则页码值减-1，再重新渲染列表表格
                    let length = $('.btn-delete').length
                    if (length !== 1) {
                        initTable()
                    } else {
                        q.pagenum = q.pagenum - 1 || 1 //最小不能小于1
                        initTable()
                    }
                }
            })

            layer.close(index);
        });
    })

    function initTable() {
        $.ajax({
            method: "GET",
            url: "/my/article/list",
            data: q,
            success: function (res) {
                console.log(res)
                if (res.status === 1) {
                    return layer.msg(res.message)
                }
                // res.data 渲染到页面表格中
                let tableStr = template('art-list', res)
                $('tbody').html(tableStr)
                renderPage(res.total)
            }
        })
    }
    function initCate() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                console.log(res)
                if (res.status === 1) {
                    return layer.msg("获取分类失败！")
                }
                //渲染到select标签中
                let cateStr = template('cate-list', res)
                $('#select-cate').html(cateStr)
                form.render()
            }
        })
    }
    // 定义模板中美化时间的函数
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
})