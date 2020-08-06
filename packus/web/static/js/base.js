import $, { ajax } from "jquery";
import "../css/base.scss";
import chartOptions from "./chart"

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
    Base.loadSegDashboardData();
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
  loadSegDashboardData: function () {
    const segCond = { // 조건 예시 데이터
      "search_cond_list": [
        {"datefrom": "2017-01-01", "dateto" :"2020-05-01", "upjong3_nm": "일반한식/백반", "sales_cond": "30 - 50만원"},
        {"datefrom": "2017-01-01", "dateto" :"2020-05-01", "upjong3_nm": "갈비/삼겹살", "sales_cond": "5 - 15만원"},
        {"datefrom": "2017-01-01", "dateto" :"2020-05-01", "upjong3_nm": "게장전문", "sales_cond": "30 - 50만원"}
      ]
    }

    let selectedSeg0 = $('#segmentSelect0 option:selected').text();
    let selectedSeg1 = $('#segmentSelect1 option:selected').text();
    let selectedSeg2 = $('#segmentSelect2 option:selected').text();

    $('#rfm-tb').find('tbody tr:nth-child(1) th').text(selectedSeg0);
    $('#rfm-tb').find('tbody tr:nth-child(2) th').text(selectedSeg1);
    $('#rfm-tb').find('tbody tr:nth-child(3) th').text(selectedSeg2);

    $.ajax({
      type: "post",
      url: "/api/segments/dashboard-data",
      dataType: 'json', // for response
      contentType: 'application/json', // for request
      data:  JSON.stringify(segCond),
      success: function (resp) {
        // 받은 response를 이용해 작업
        console.log(resp)

        const tr0 = '<th scope="row">'+ selectedSeg0 + '</th>'
                + '<td> ' + resp.table[0].mem_count + '명</td>'
                + '<td>평균 ' + resp.table[0].recency + '일 전 구매</td>'
                + '<td>평균 ' + resp.table[0].frequency + '회 구매</td>'
                + '<td>평균 ' + resp.table[0].monetary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원 지출</td>';
        const tr1 = '<th scope="row">'+ selectedSeg1 + '</th>'
                + '<td> ' + resp.table[1].mem_count + '명</td>'
                + '<td>평균 ' + resp.table[1].recency + '일 전 구매</td>'
                + '<td>평균 ' + resp.table[1].frequency + '회 구매</td>'
                + '<td>평균 ' + resp.table[1].monetary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원 지출</td>';
        const tr2 = '<th scope="row">'+ selectedSeg2 + '</th>'
                + '<td> ' + resp.table[2].mem_count + '명</td>'
                + '<td>평균 ' + resp.table[2].recency + '일 전 구매</td>'
                + '<td>평균 ' + resp.table[2].frequency + '회 구매</td>'
                + '<td>평균 ' + resp.table[2].monetary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원 지출</td>'; 

        $('#rfm-tb').find('tbody tr:nth-child(1)').html(tr0);
        $('#rfm-tb').find('tbody tr:nth-child(2)').html(tr1);
        $('#rfm-tb').find('tbody tr:nth-child(3)').html(tr2);

        var myChart1 = new Chart('myChart1', {
          type: 'bar',
          data: {
              labels: [selectedSeg0, selectedSeg1, selectedSeg2],
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#82ccdd',
                  borderColor: '#82ccdd',
                  data: [resp.chart1[0], resp.chart1[1], resp.chart1[2]]
              }]
          },
          options: chartOptions.segBarChartOption1
        });

        var myChart2 = new Chart('myChart2', {
            type: 'horizontalBar',
            data: {
                labels: [selectedSeg0, selectedSeg1, selectedSeg2],
                datasets: [{
                    label: '전체회원 대비 비율',
                    backgroundColor: '#82ccdd',
                    borderColor: '#82ccdd',
                    data: [resp.chart2[0], resp.chart2[1], resp.chart2[2]]
                }]
            },
            options: chartOptions.segBarChartOption2
        });

        var myChart3 = new Chart('myChart3', {
            type: 'bar',
            data: {
                labels: resp.chart3[0].recency.label,
                datasets: [{
                    label: '회원 수',
                    backgroundColor: '#6a89cc',
                    borderColor: '#6a89cc',
                    data: resp.chart3[0].recency.data
                }]
            },
            options: chartOptions.segBarChartOption1
        });

        var myChart4 = new Chart('myChart4', {
          type: 'bar',
          data: {
              labels: resp.chart3[0].frequency.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[0].frequency.data
              }]
          },
          options: chartOptions.segBarChartOption1
        });

        var myChart5 = new Chart('myChart5', {
          type: 'bar',
          data: {
              labels: resp.chart3[0].monetary.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[0].monetary.data
              }]
          },
          options: chartOptions.segBarChartOption1
        });

        var myChart6 = new Chart('myChart6', {
          type: 'bar',
          data: {
              labels: resp.chart3[1].recency.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[1].recency.data
              }]
          },
          options: chartOptions.segBarChartOption1
        });

        var myChart7 = new Chart('myChart7', {
          type: 'bar',
          data: {
              labels: resp.chart3[1].frequency.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[1].frequency.data
              }]
          },
          options: chartOptions.segBarChartOption1
        });

        var myChart8 = new Chart('myChart8', {
          type: 'bar',
          data: {
              labels: resp.chart3[1].monetary.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[1].monetary.data
              }]
          },
          options: chartOptions.segBarChartOption1
        });

        var myChart9 = new Chart('myChart9', {
          type: 'bar',
          data: {
              labels: resp.chart3[2].recency.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[2].recency.data
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                    ticks: {
                      baseAtZero: true
                    }
                  }]
              }
          }
        });

        var myChart10 = new Chart('myChart10', {
          type: 'bar',
          data: {
              labels: resp.chart3[2].frequency.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[2].frequency.data
              }]
          },
          options: chartOptions.segBarChartOption1
        });

        var myChart11 = new Chart('myChart11', {
          type: 'bar',
          data: {
              labels: resp.chart3[2].monetary.label,
              datasets: [{
                  label: '회원 수',
                  backgroundColor: '#6a89cc',
                  borderColor: '#6a89cc',
                  data: resp.chart3[2].monetary.data
              }]
          },
          options: chartOptions.segBarChartOption1
        });

      },
      error: function () {
        alert("세그먼트 데이터를 가져오지 못했습니다.");
      },
    });
  },



};


Base.init();

$('#surf-btn').on('click', function() {
  debugger;
  Base.loadSegDashboardData();
});



