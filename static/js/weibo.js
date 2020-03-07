//当页面加载完成时执行的内容
$(function () {
    // 动画一: 统计微博文本框输入信息的字数
    // 1. 监听键盘输入的事件;
    $('#content').keyup(function () {
        // 获取文本长度
        var content_len = $('#content').text().length;
        //  添加提示信息
        $('.tips').text("已经输入" + content_len + '个字');
        // 判断文本信息是否长度等于0， 如果等于0， 不显示提示， 并且不能发布weibo
        if (content_len === 0) {
            $('.tips').text();
            $('#send').addClass('disabled');
        } else {


            $('#send').removeClass('disabled');
        }
    });


    // 动画二: 上传图片的优化
    $('.pic').click(function () {
        //当点击pic标签时， 执行点击.select_Img对应标签;
        $('.select_Img').click();
    });

    // 动画三: 实现weibo信息的提交与显示
    $('#send').click(function () {
        // 获取用户提交的图片名称 hello.jpg
        // var imgPath = '';
        imgPath = $('.select_Img').val();
        // alert(imgPath);
        // console.log(imgPath);  // 代码调试日志信息
        //
        // console.log(postfix);
        //    如果图片格式正确, 添加指定的html到页面中;
        var content = $('#content').html();  //获取微波正文信息

        if (imgPath !== "") {
            // 获取用户上传图片的后缀名. 以通过 split() 将字符串转换为数组：
            var postfix = imgPath.split('.')[1].toUpperCase();
            //如果图片格式不正确时， 直接报错;
            if (postfix !== 'JPG' && postfix !== 'PNG' && postfix !== 'GIF') {
                alert("图片格式需要png, jpg,gif格式");
            } else {
                var random = Math.random();

                var uploadImgHtml = '<img class="mypic" src="img/' + imgPath + '?t=' + random + '">'; //生成图片对应的html


                $('.item_msg').append(
                    '<div class="col-sm-12 col-xs-12 message">\n' +
                    '                    <img src="img/icon.png" class="col-sm-2 col-xs-2" style="border-radius: 50%">\n' +
                    '                    <div class="col-sm-10 col-xs-10">\n' +
                    '                        <span style="font-weight: bold;">Jack.C</span>\n' +
                    '                        <br>\n' +
                    '                        <small class="date" style="color:#999">1分钟前</small>\n' +
                    '                        <div class="msg_content">' + content + uploadImgHtml +
                    '                        </div>\n' +
                    '\n' +
                    '                    </div>\n' +
                    '\n' +
                    '                </div>'
                );


            }
        } else {
            console.log('no image');
            $('.item_msg').append(
                '<div class="col-sm-12 col-xs-12 message">\n' +
                '                    <img src="img/icon.png" class="col-sm-2 col-xs-2" style="border-radius: 50%">\n' +
                '                    <div class="col-sm-10 col-xs-10">\n' +
                '                        <span style="font-weight: bold;">Jack.C</span>\n' +
                '                        <br>\n' +
                '                        <small class="date" style="color:#999">1分钟前</small>\n' +
                '                        <div class="msg_content">' + content +
                '                        </div>\n' +
                '\n' +
                '                    </div>\n' +
                '\n' +
                '                </div>'
            );
        }
    });


    // 动图四: 显示表情
    $('.emoji').click(function () {
        $('.myEmoji').show();

        // 当用户点击空白处时, 隐藏弹出的标签;
        $(document).click(function (event) {
            //is: 判断点击的位置(event.target)是否为('.emoji')标签的位置;如果不在, 返回false;否则返回true;
            //has: 同来判断点击的位置(event.target)是否在('.emoji')标签的子标签里面, 如果不在, 则隐藏.
            if (!$('.emoji').is(event.target) && $('.emoji').has(event.target).length == 0) {
                $('.myEmoji').hide();
            }


        });


    });

    // 动图五: 添加所有的表情
    for (var i = 1; i < 50; i++) {
        $('.emoji_1').append('<img src="img/f' + i + '.png" style="height: 35px; width: 35px">');
    }

    for (var j = 1; j < 50; j++) {
        $('.emoji_2').append('<img src="img/h' + j + '.png" style="height: 35px; width: 35px">');
    }


    //  动图6: 当点击表情时, 将选择的表情添加到文本框;
    $('.myEmoji img').each(function () {
            $(this).click(function () {
                //获取表情的url: http://localhost:63342/day25/weibo/img/f3.png
                var url = $(this)[0].src;
                // 往文本框添加表情
                $('#content').append('<img src="' + url + '" style="height: 35px; width: 35px">');
                $('#send').removeClass('disabled');

            });
        }
    );

    //动图7： 放大图片
    $('.mypic').click(function () {
        // 1. 获取图片原先的大小;
        var w = $(this).width();
        var h = $(this).height();
        if (w >= 200) {
            w = 200
        }

        $(this).width(w);
        $(this).height(h);
    })


});