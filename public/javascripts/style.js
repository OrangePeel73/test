
$(function () {
    // ----------------- 特效事件 登录后才可以显示子页面---------------------------------
    // 左边的导航 手风琴效果  
   /* $(".navul li.navli a").on('click', function () {
        // 左导航点击事件
        $(this).next().slideToggle();
        // 第二層ul的li点击事件
        $(this).next().children('li').click(function () {
            var page = $(this).attr('page');
            console.log(page);
            $(".contentright").load(page);
        });
    });*/
    var df = $(".default>li").eq(0).attr('page');//获取全部题目的页面
    $(".contentright").load(df);
    //--------获取后台数据----------------------------------------------------------------
    var Arr = [];//存放数据库注册表的数据
    var arr = [];
    $.getJSON('exam/findReg', function (data) {//获取后台数据
        // console.log(data);//数组返回 打印后台数据
        arr = data;
        console.log(arr);
        data.forEach(function (item) {
            // console.log(item);//Object { id: 1, name: "wys", psw: "wyswys" }
            var obj = item;
            Arr.push(obj)
        });
    });
    // -----------获取后台数据库信息 end--------------------------------------------------
    // ---------------------- / 登录页面 start-------------------------------------
    var form = document.getElementsByTagName("form")[0];
    var login = document.getElementsByClassName("login")[0];
    var inputs = document.getElementsByTagName("input");
    console.log($("#tap").children('span').text());
    var lgid1 = $("#loginName");//login
    var lgid2 = $("#loginPsw");
    var lgid3 = $("#againPsw");
    var regid1 = $("#regName");//reg
    var regid2 = $("#regPsw");
    var regid3 = $("#regaPsw");
    login.onclick = function () {
        if (noKong()) {//用户名 密码不为空
            if (Arr) {//数据库数据判断
                var k = 0;
                for (e in Arr) {//遍历数据库中的注册信息
                    if ($("#loginName").val() == Arr[e].name) {
                        if ($("#loginPsw").val() == Arr[e].psw) {
                            if ($("#againPsw").val() == Arr[e].psw) {
                                clear(lgid1, lgid2, lgid3);
                                k = 0;
                                // 登录成功后页面加载题目页面

                                $("#myModal").fadeOut();//登陆成功收起注册页面
                                $("#login").fadeOut();//隐藏登录界面
                                $("#tap").fadeIn(100);//显示欢迎语
                                $("#tap").children('span').text('你好' + Arr[e].name);
                                $("#exit").click(function () {//退出点击事件
                                    window.location.href = 'index.html';
                                });
                                //  ----------------- 特效事件 登录后才可以显示子页面---------------------------------
                                //  左边的导航 手风琴效果  
                                $(".navul li.navli a").on('click', function () {
                                    // 左导航点击事件
                                    $(this).next().slideToggle();
                                    // 第二層ul的li点击事件
                                    $(this).next().children('li').click(function () {
                                        var page = $(this).attr('page');
                                        console.log(page);
                                        $(".contentright").load(page);
                                    });
                                });
                                var df = $(".default>li").eq(0).attr('page');//获取全部题目的页面
                                $(".contentright").load(df);
                                // ----------------- 特效事件 end--------------------------------
                                return;
                            }
                            else { alert("密码不一致，请重新输入"); }
                        }
                        else {
                            alert("密码错误");
                            clear(lgid1, lgid2, lgid3);
                            k = 0;
                            return;
                        }
                    }
                    else {
                        k = 1;
                    }
                }
                if (k == 1) {
                    alert("用户不存在");
                    clear(lgid1, lgid2, lgid3);
                }
            }
            else {
                alert("用户不存在");
                clear(lgid1, lgid2, lgid3);
            }
        }
    }
    // 每次清空input内容
    function clear(id1, id2, id3) {
        id1.val('');
        id2.val('');
        id3.val('');
    }
    function noKong() {//判断用户 密码不为空
        if ($("#loginName").val() == "") {
            inputs[0].style.borderColor = 'red';
            // alert("用户名不能为空");
            return false;
        }
        else if ($("#loginPsw").val() == "") {
            // alert("密码不能为空");
            inputs[1].style.borderColor = 'red';
            return false;
        }
        else if ($("#againPsw").val() != $("#loginPsw").val()) {
            // alert("密码不能为空");
            inputs[2].style.borderColor = 'red';
            return false;
        }

        return true;
    }
    // ----------------------  登录页面 end--------------------------------------
    // ----------------------  注册页面 start--------------------------------------

    var pattern1 = /^[a-zA-Z]\w{1,9}$/;//以字母开头，长度在2~8之间，只能包含字符、数字和下划线。
    var pattern2 = /^[a-zA-Z]\w{5,17}$/;
    var regInputs = document.getElementsByClassName("regInput");
    var arr = Array.prototype.slice.call(regInputs, 0);
    var zc = document.getElementsByClassName("zc")[0];
    console.log(regInputs);
    zc.onclick = function () {
        if (notKong()) {//5 用户名 密码不为空
            if (Arr) {// 6当数据库有数据时存在时 提示已被注册                                    
                for (e in Arr) {//遍历json获取数据库的注册用户名name 存在时提示已被注册，不能注册
                    if ($("#regName").val() == Arr[e].name) {
                        alert("已被注册");
                        clear(regid1, regid2, regid3);
                        return;
                    }
                }
            }
            // 当数据库数据的name与当前要注册的用户名不相同时 进行成功注册 并吧当前数据插入数据库 
            var users = { 'name': $("#regName").val(), 'psw': $("#regPsw").val()};
            var obj = JSON.stringify(users);
            // console.log(obj);//{"name":"qaz","psw":"qazqaz"}
            alert("注册成功");
            clear(regid1, regid2, regid3);
            $("#regModal").fadeOut();
            window.location.reload();//注册成功后刷新页面
            // 7 把当前注的数据插入数据库
            $.ajax({
                type: "POST",
                url: "exam/addUser",
                data: obj,
                contentType: "application/json",//http协议
                success: function (data) {
                    console.log(data);
                },
                error: function (err) {
                    console.log(err)
                }
            });
        }
    }
    function notKong() {//4判断用户 1 2 3 所有的都正确 返回true
        if (lgName() && lgPsw() & againPsw()) {
            return true;
        }
        return false;
    }
    //1 验证用户名cons
    var lgName = function user() {
        // alert();
        regInputs[0].style.borderColor = '';
        if (pattern1.test($("#regName").val())) {
            regInputs[0].style.border = '2px solid green';
            return true;
        }
        else {
            regInputs[0].style.borderColor = 'red';
            return false;
        }
    };
    $("#regName").on("blur", lgName)

    //2 验证密码
    var lgPsw = function Psw() {
        if (pattern2.test($("#regPsw").val())) {
            regInputs[1].style.border = '2px solid green';
            return true;
        }
        else {
            regInputs[1].style.borderColor = 'red';
            return false;
        }
    }
    $("#regPsw").on("blur", lgPsw)
    // 3确认密码
    var againPsw = function againPsw() {
        if ($("#regaPsw").val() == $("#regPsw").val()) {
            regInputs[2].style.border = '2px solid green';
            return true;
        }
        else {
            regInputs[2].style.borderColor = 'red';
            return false;
        }
    }
    $("#regaPsw").on("blur", againPsw);
    // ----------------------reg页面 end--------------------------------------
   
    
    



});

