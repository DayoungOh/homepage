import $, { ajax } from "jquery";
import "../css/base.scss";

const Base = {
  init: function () {
    $("ul.nav")
      .children()
      .on("click", function () {
        $(".sidebar-wrapper").find("ul").children().removeClass("active");
        $(this).addClass("active");
      });

    // 버튼에 세그먼트 저장기능 추가
    $("#seg-save-bnt").on("click", Base.createSeg);

    // 세그먼트 리스트 불러오기
    Base.loadUpjongList();
    Base.loadSegList();
    Base.initCheckbox();
  },

  segInfo: {
    model_nm: "",
    upjong: "",
    sales: "",
  },

  initCheckbox: function () {
    // 체크박스 기능 초기화
    $("input[type=checkbox]").on("click", function () {
      if ($(this).attr("checked")) {
        // 비활성화
        $(this).prop("checked", false);
      } else {
        // 활성화
        const name = $(this).attr("name");
        const value = $(this).attr("value");
        $(this).prop("checked", true);
        let $checkedTags = $("[name='" + name + "']:checked");
        let checkedValues = [];
        for (let i=0; i < $checkedTags.length; i++) {
          checkedValues.push($($checkedTags[i]).attr('value'))
        }
        Base.segInfo[name] = checkedValues.join(",");
        console.log(Base.segInfo);
      }
    });
  },

  loadSegList: function () {
    $.ajax({
      type: "get",
      url: "/api/segments/list",
      dataType: "json",
      success: function (resp) {
        for (let i = 0; i < resp.length; i++) {
          Base.addSegListTag(resp[i].id, resp[i].data);
        }
      },
    });
  },
  loadUpjongList: function () {
    $.ajax({
      type: "get",
      async: false,
      url: "/api/upjong/list",
      dataType: "json",
      success: function (resp) {
        const $upjongList = $('#upjong-list')
        for (let i=0;i<resp.length; i++) {
          const $upjongTag = $('<div class="col-4"><input class="form-check-input" type="checkbox" name="upjong" value="' 
          + resp[i].data.UPJONG3_NM+'"><label class="form-check-label" for="upjong1">'+resp[i].data.UPJONG3_NM+'</label></div>')
          $upjongList.append($upjongTag)
        }
      },
    });
  },

  createSeg: function () {
    Base.segInfo.model_nm = $("#seg-name").val();
    if (Base.segInfovalidator(Base.segInfo)) {
      $.ajax({
        type: "post",
        url: "/api/segments/put",
        dataType: "json",
        data: Base.segInfo,
        success: function (resp) {
          // segInfo 초기화
          Base.addSegListTag(resp["id"], Base.segInfo);
          Base.segInfo = {
            model_nm: "",
            upjong: "",
            sales: "",
          };
          $('input[type=checkbox]').prop('checked', false)
        },
        error: function () {
          alert("세그먼트가 제대로 생성되지 않았습니다.");
        },
      });
    } else {
      alert("세그먼트 정보를 모두 입력해주십시오.");
    }
  },
  segInfovalidator: function (segInfo) {
    for (let i = 0; i < Object.values(segInfo).length; i++) {
      if (Object.values(segInfo)[i].length === 0) {
        return false;
      }
    }
    return true;
  },

  addSegListTag: function (segId, segInfo) {
    const segInfoStr = " (업종: " +segInfo.upjong+ " / 매출액: " + segInfo.sales + ")"
    let $list = $('<div class="list-group-item list-group-item-action d-flex"><div style="width: 90%; margin-right: auto;">' + segInfo.model_nm + segInfoStr +'</div></div>');
    const $btnTag =$( '<button type="button" class="btn btn-sm btn-danger float-right m-0 removeSeg" value="' 
    + segId+'">삭제</button>').on("click", function () {
      let removeConfirm = confirm("해당 모델을 삭제하시겠습니까?");
      if (removeConfirm) {
        const id = $(this).attr('value')
        Base.deleteSeg(id)
        $(this).parent().remove();
      } else return;
    });
    $list.append($btnTag)
    // 세그먼트 리스트에 추가
    $("#segList").find(".list-group").append($list);
  },

  deleteSeg: function (segId) {
    // 세그먼트 삭제 api 호출
    $.ajax({
      type: "post",
      url: "/api/segments/delete",
      dataType: "json",
      data: { id: segId },
      success: function (resp) {
      },
      error: function () {
        alert("세그먼트가 삭제되지 않았습니다.");
      },
    });
  },
  loadSegDashboard: function () {
    const segCond = { // 조건 예시 데이터
      "search_cond_list": [
        {"datefrom": "2017-01-01", "dateto" :"2020-05-01", "upjong3_nm": "일반한식/백반", "sales_cond": "30 - 50만원"},
        {"datefrom": "2017-01-01", "dateto" :"2020-05-01", "upjong3_nm": "갈비/삼겹살", "sales_cond": "5 - 15만원"},
        {"datefrom": "2017-01-01", "dateto" :"2020-05-01", "upjong3_nm": "게장전문", "sales_cond": "30 - 50만원"}
      ]
    }
    $.ajax({
      type: "post",
      url: "/api/segments/dashboard-data",
      dataType: 'json', // for response
      contentType: 'application/json', // for request
      data:  JSON.stringify(segCond),
      success: function (resp) {
        // 받은 response를 이용해 작업
        console.log(resp)
      },
      error: function () {
        alert("세그먼트 데이터를 가져오지 못했습니다.");
      },
    });
  }
};

Base.init();
