$(document).ready(function () {

    $.ajaxSetup({ cache: false });
    $("html").niceScroll({
        cursorcolor:"#fab347"
    });
    $(".table-right").niceScroll({
        cursorcolor:"#fab347"
    });
    $(".table-resrv").niceScroll({
        cursorcolor:"#fab347"
    });
    $(".notes").niceScroll({
        cursorcolor:"#fab347"
    });



    var orderitems=[];
    var order=[];
    var appendclass = 0;
    var count=0;
    var flag = false;

    $('.btn-coffe').click(function(){
        count ++;
        if(!flag && jQuery.inArray($(this).attr('name'), orderitems) == -1 ){
            count =0;
            appendclass++;
            var tag1 = "<div class='choose-meal ' id = '"+$(this).attr('name')+"'>" +
                 "<span class='getname'>"+ $(this).attr('name')+"</span>" +
                 "<input  class='getNumer' type=\"text\" value='1'>" +
                 "<span class='plus' >+ <script>    $('.plus').click(function () {\n" +
                 "        var plusspan  = $(this).next().next().attr('price');\n" +
                 "        var plusitem  = parseInt( $(this).prev().val());\n" +
                 "        plusitem++;\n" +
                 "        $(this).prev().val(plusitem);\n" +
                 "        var total = plusitem * plusspan;\n" +
                 "        $(this).next().next().text(total+' ');\n" +
                 "    });</script></span>" +
                 "<span class='mins' >-<script> $('.mins').click(function () {\n" +
                 "\n" +
                 "        var minsspan = $(this).next().attr('price');\n" +
                 "      var minsitem = parseInt($(this).prev().prev().val());\n" +
                 "      minsitem--;\n" +
                 "      if (minsitem <= 0) {\n" +
                 "\n" +
                 "      minsitem =1;    \n" +
                 "      } else {\n" +
                 "          $(this).prev().prev().val(minsitem);\n" +
                 "          var total = minsitem * minsspan;\n" +
                 "          $(this).next().text(total+' ');\n" +
                 "\n" +
                 "      }\n" +
                 "\n" +
                 "  });</script></span>" +
                 "<span class='getprice "+$(this).attr('name')+"' price='"+$(this).attr('price')+"'style=\" margin-left:5px;\">"+$(this).attr('price').trim()+" </span><span>EGP</span>" +
                 "</div>"   ;

            orderitems.push($(this).attr('name'));
            $(".table-resrv").append(tag1);
                flag = true;
        }else{

            var itemcont =  $("#"+$(this).attr('name')+ " input").val();
            var itemspan = parseInt($('.'+$(this).attr('name')).attr('price'));
            var item2 = parseInt(itemcont);
            item2++;
            $("#"+$(this).attr('name')+ " input").val(item2);

            var total = item2 * itemspan;
            $('.'+$(this).attr('name')).text(total+' ');
            flag =false;
        }
    });

    var price=[];
    var total;
    function getSum(total, num) {
        return total + Math.round(num);
    }
    $('.getprice').on('DOMSubtreeModified',function(){
        price.push(parseInt( $('.getprice').text()));
         total=numbers.reduce(getSum, 0);
    })



    $(".plus").on('click',function(){

        var cellar = 0;
        var cell = $('.choose-meal .getprice').text();
        cellar =cell.match(/\S+/g);
        var c = 0;
        for(i=0;i<cellar.length;i++){
            c += parseInt(cellar[i]);
        }
        $(".gettotal").text(c)
    });
    /*
    $('#plus').click(function () {
        var plusspan  = $(this).next().next().attr('price');
        var plusitem  = parseInt( $(this).prev().val());
        plusitem++;
        $(this).prev().val(plusitem);
        var total = plusitem * plusspan;
        $(this).next().next().text(total);
        var cellar = 0;
        var cell = $('.choose-meal .getprice').text();
        cellar =cell.match(/\S+/g);
        var c = 0;
        for(i=0;i<cellar.length;i++){
            c += parseInt(cellar[i]);
        }
        $(".gettotal").text(c)
    });
*/
    $('#mins').click(function () {

        var minsspan = $(this).next().attr('price');
      var minsitem = parseInt($(this).prev().prev().val());
      minsitem--;
      if (minsitem <= 0) {

          $(".choose-meal").hide();
      } else {
          $(this).prev().prev().val(minsitem);
          var total = minsitem * minsspan;
          $(this).next().text(total);

      }

  });


    var Totalarray=[];
    var subTotal=[];

    $('.btn-confirm').click(function(){
        var spanArray=document.getElementsByClassName("getname");
        var numberArray=document.getElementsByClassName("getNumer");
        var priceArray=document.getElementsByClassName("getprice");
        var notes = $(".notes").val();
        var TotalPrice = $(".gettotal").text();

        var room = $(".Rooms").prop("value");
        var total=parseFloat($(".gettotal").text());
        for(var i=0;i<spanArray.length;i++){
            Totalarray[i]=[spanArray[i].innerText,numberArray[i].value,priceArray[i].innerText];

        }
        var dateOrder=new Date().toLocaleString();
        console.log(dateOrder);
        subTotal.push(Totalarray);
        subTotal.push({Notes:notes});
        subTotal.push({Room:room});
        subTotal.push({Total:TotalPrice});
        subTotal.push([dateOrder]);

        console.log(Totalarray);
        alert(Totalarray)
        console.log(subTotal);
        $.ajax({
            url:"http://localhost:9090/user/lists",
            type:"GET",
            data:{
                Msg:subTotal
    }});

        // .done(function (res) {
    //         $("#div2").append(res);
    //
    //         $("#name").val("");
    //         fl
    //     }).fail(function () {
    //         alert("Error");
    //     });

    });



    setInterval(function(){

        var cellar = [];
        var cell = $('.choose-meal .getprice').text();
        cellar =cell.match(/\S+/g);

        var c = 0;
        if(cellar == null){

        }else {

            for(var i=0;i<cellar.length;i++){
                c += parseInt(cellar[i]);
            }
            $(".gettotal").text(c);

        }
    }, 100);





    });



