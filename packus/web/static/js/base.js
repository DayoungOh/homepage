import $ from 'jquery';
import '../css/base.scss'

$(function() {
    $('ul.nav').children().on('click', function() {
        $('ul.nav').children().removeClass('active');
        $(this).addClass('active');
    });

    $("input[type=checkbox]").on('click', function() {
        if($(this).attr('checked')) {
            $(this).removeAttr('checked');
        } else {
            $(this).attr('checked', 'checked');
        }
    });

    // 추가된 세그먼트 모델 삭제
    var removeSeg = function() {
        $('.removeSeg').on('click', function() {
            var removeConfirm = confirm("해당 모델을 삭제하시겠습니까?");
            if(removeConfirm) {
                $(this).parent().remove();
            } else return;
        });
    }

    // 저장 클릭 시 세그먼트 모델 리스트에 추가
//    $('.content').find("form").submit(function() {
    $('.content').find('.saveSeg').on('click', function() {
        var checkedVal = new Array();
        var inputSegModalName = "";

        inputSegModalName = $('#inputSegModalName').val();    // 모델명
        $("input:checked").each(function(){
            checkedVal.push($(this).val());
        });

        let $list = "";
        $list = '<div class="list-group-item list-group-item-action">'
            + inputSegModalName + '(' + checkedVal + ')'
            + '<button type="button" class="btn btn-sm btn-danger float-right m-0 removeSeg">삭제</button></div>';
        $('#segList').find('.list-group').append($list);

        removeSeg();
    });
})
