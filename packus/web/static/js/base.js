import $, { ajax } from "jquery";
import "../css/base.scss";
import DashboardChart from "./chart"

const dashboardChart = DashboardChart();

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
    DashboardChart.loadChartCluster();
    
    // 조회버튼 클릭
    $('#surf-btn').on('click', function() {
      Base.loadSegDashboardData();
    });
    Base.segReportDateInit();
  },

  segInfo: {
    model_nm: "",
    upjong: "",
    sales: "",
    period: "",
  },

  initCheckbox: function () {
    // $("input[type=checkbox]").prop("checked", false)
    // 체크박스 기능 초기화
    $("input[type=checkbox]").on("click", function () {
      if (!$(this).is(':checked')) {
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
          Base.selectBoxItemInit(resp[i].data, i);
        }
      },
    });
  },
  selectBoxItemInit: function(segInfo, idx) {
    const segInfoStr = segInfo.model_nm + "|" + segInfo.upjong + "|" + segInfo.sales + "|" + segInfo.period 
    $('select#segmentSelect0').append($('<option value="'+segInfoStr+'" '
      + (idx === 0 ? 'checked=true' : '') + '>'+segInfo.model_nm+'(업종:'+segInfo.upjong+', 구매액:'+segInfo.sales+', 기간:'+segInfo.period+')</option>'))
    $('select#segmentSelect1').append($('<option value="'+segInfoStr+'" '
      + (idx === 0 ? 'checked=true' : '') + '>'+segInfo.model_nm+'(업종:'+segInfo.upjong+', 구매액:'+segInfo.sales+', 기간:'+segInfo.period+')</option>'))
    $('select#segmentSelect2').append($('<option value="'+segInfoStr+'" '
      + (idx === 0 ? 'checked=true' : '') + '>'+segInfo.model_nm+'(업종:'+segInfo.upjong+', 구매액:'+segInfo.sales+', 기간:'+segInfo.period+')</option>'))
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
    const flag = Base.segInfovalidator(Base.segInfo)
    if (flag === "OK") {
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
            period: "",
          };
          $('input[type=checkbox]').prop('checked', false)
        },
        error: function () {
          alert("세그먼트가 제대로 생성되지 않았습니다.");
        },
      });
    } else {
      alert(flag);
    }
  },
  segInfovalidator: function (segInfo) {
    for (let i = 0; i < Object.values(segInfo).length; i++) {
      if (Object.values(segInfo)[i].length === 0) {
        let msg = "세그먼트 정보를 모두 입력해주십시오."
        return msg;
      }
      if (segInfo.model_nm.indexOf('|') !== -1) {
        let msg = '모델명에 특수문자" | "를 포함할 수 없습니다.'
        return msg;
      }
    }
    return "OK";
  },

  addSegListTag: function (segId, segInfo) {
    const segInfoStr = " (업종: " +segInfo.upjong+ " / 구매액: " + segInfo.sales + " / 기간: " + segInfo.period + ")"
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

  segReportDateInit: function() {
    const today = new Date();
    const [year, month, day] = today.toISOString().slice(0, 10).split('-')
    $('#termSelectFrom').val((year -1) + "-" + month +"-"+ day)
    $('#termSelectTo').val(year + "-" + month +"-"+ day)
  },
  loadSegDashboardData: function () {
    if ( $('#termSelectFrom')[0].value === "" || $('#termSelectTo')[0].value === "") {
      alert('분석기간을 입력해주세요!')
    } else {
      let selectedSeg0 = $('#segmentSelect0 option:selected')[0].value.split('|')
      let selectedSeg1 = $('#segmentSelect1 option:selected')[0].value.split('|')
      let selectedSeg2 = $('#segmentSelect2 option:selected')[0].value.split('|')
  
      const segCond = { // 조건 생성
        "search_cond_list": [
          {"datefrom": $('#termSelectFrom')[0].value, "dateto" :$('#termSelectTo')[0].value, "upjong3_nm": selectedSeg0[1], "sales_cond": selectedSeg0[2]},
          {"datefrom": $('#termSelectFrom')[0].value, "dateto" :$('#termSelectTo')[0].value, "upjong3_nm": selectedSeg1[1], "sales_cond": selectedSeg1[2]},
          {"datefrom": $('#termSelectFrom')[0].value, "dateto" :$('#termSelectTo')[0].value, "upjong3_nm": selectedSeg2[1], "sales_cond": selectedSeg2[2]}
        ]
      }
  
      $.ajax({
        type: "post",
        url: "/api/segments/dashboard-data",
        dataType: 'json', // for response
        contentType: 'application/json', // for request
        data:  JSON.stringify(segCond),
        success: function (resp) {
  
          // 테이블 데이터 입력
          const tr0 = '<th scope="row">'+ selectedSeg0[0] + '</th>'
                  + '<td> ' + resp.table[0].mem_count + '명</td>'
                  + '<td>평균 ' + resp.table[0].recency + '일 전 구매</td>'
                  + '<td>평균 ' + resp.table[0].frequency + '회 구매</td>'
                  + '<td>평균 ' + resp.table[0].monetary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원 지출</td>';
          const tr1 = '<th scope="row">'+ selectedSeg1[0] + '</th>'
                  + '<td> ' + resp.table[1].mem_count + '명</td>'
                  + '<td>평균 ' + resp.table[1].recency + '일 전 구매</td>'
                  + '<td>평균 ' + resp.table[1].frequency + '회 구매</td>'
                  + '<td>평균 ' + resp.table[1].monetary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원 지출</td>';
          const tr2 = '<th scope="row">'+ selectedSeg2[0] + '</th>'
                  + '<td> ' + resp.table[2].mem_count + '명</td>'
                  + '<td>평균 ' + resp.table[2].recency + '일 전 구매</td>'
                  + '<td>평균 ' + resp.table[2].frequency + '회 구매</td>'
                  + '<td>평균 ' + resp.table[2].monetary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원 지출</td>'; 
  
          $('#rfm-tb').find('tbody tr:nth-child(1)').html(tr0);
          $('#rfm-tb').find('tbody tr:nth-child(2)').html(tr1);
          $('#rfm-tb').find('tbody tr:nth-child(3)').html(tr2);

          if($('#chartContainer').hasClass('d-none')) {
            dashboardChart.init(resp);
          } else {
            dashboardChart.updateChart(resp);
          }
          $('#chartContainer').removeClass('d-none')
        },
        error: function () {
          alert("세그먼트 데이터를 가져오지 못했습니다.");
        },
      });
    }
  },
  // chartCluster: function() {
    
  // }
};


Base.init();


