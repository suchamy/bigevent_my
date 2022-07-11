$(function () {
    $('.login-to-reg').on('click', function () {
        $('.login-box').fadeOut()
        $('.reg-box').fadeIn()
    })
    $('.reg-to-login').on('click', function () {
        $('.reg-box').fadeOut()
        $('.login-box').fadeIn()
    })
})