$(function () {
    //对ajax请求进行预处理的函数，在每次调用ajax请求之前都会先调用此函数
    $.ajaxPrefilter(function (options) {
        options.url = 'http://www.liulongbin.top:3007' + options.url
    })
})