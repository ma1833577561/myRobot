$(function () {
    // 生成时间戳
    function formatterDateTime() {
        var date = new Date()
        var month = date.getMonth() + 1
        var datetime = date.getFullYear() +
            "" // "年"
            +
            (month >= 10 ? month : "0" + month) +
            "" // "月"
            +
            (date.getDate() < 10 ? "0" + date.getDate() : date
                .getDate()) +
            "" +
            (date.getHours() < 10 ? "0" + date.getHours() : date
                .getHours()) +
            "" +
            (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                .getMinutes()) +
            "" +
            (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                .getSeconds());
        return datetime;
    }
    //发送消息
    function send() {
        var message = $("#text").val();
        domEl(message);
        ajaxSend(message);
    }

    //创建dom元素结构
    function domEl(message) {
        $(".content").append("<div class='my'><span></span><p>" + message + "</p></div>");
        var $message = $("#text").val("");
        $("#text").focus();
        $(".content").scrollTop(999999);
    }
    //发送ajax请求
    function ajaxSend(message) {
        $.ajax({
            type: 'post',
            url: 'http://route.showapi.com/60-27',
            dataType: 'json',
            data: {
                "showapi_timestamp": formatterDateTime(),
                "showapi_appid": '84946', //这里需要改成自己的appid
                "showapi_sign": '6d9bfd8babb4440da0b6bbb80e18443a', //这里需要改成自己的应用的密钥secret
                "info": message,
                "userid": "userid"
            },

            error: function (XmlHttpRequest, textStatus, errorThrown) {
                alert("操作失败!");
            },
            //发送成功后接受的返回信息
            success: function (result) {
                ajaxSucc(result);
            },
        });
    }
    //数据请求成功处理
    function ajaxSucc(result) {
        $("audio").remove();
        var str = result.showapi_res_body.text;
        $(".content").append("<div class='robot'><span></span><p><a>" + str + "</a></p></div>");
        var path = "http://fanyi.baidu.com/gettts?lan=zh&text=" + str + "&spd=5&source=web";
        var obj = "<audio src='" + path + "' autoplay></audio>";
        $("body").append(obj);
        $(".content").scrollTop(999999);
    }
    // 点击发送消息
    $("#btn").click(function () {
        send();
    });
    //回撤发送消息
    $(document).keydown(function (event) {
        //是否为回车
        if (event.keyCode == 13) {
            send();
        }
    });
})