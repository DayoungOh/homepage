import $, { ajax } from "jquery";
import "../css/base.scss";
import DashboardChart from "./chart"

const dashboardChart = DashboardChart();
let dashboard;

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
    dashboardChart.loadChartCluster();
    

    // $('#cluster-report').on('click', function() {
    //   Base.loadChartCluster();
    // }); 
    
    // 조회버튼 클릭
    $('#surf-btn').on('click', function() {
      Base.loadSegDashboardData();
      $('#segmentMemberList').empty();
      Base.selectBoxMemberList();
      //Base.segmentMemberListInit();
    });
    $('#seg-memlist').on('click', function() {
      $('#segmentMemberList').empty();
      Base.segmentMemberListInit();
    });
    Base.segReportDateInit();

    $('.content').parent().removeClass('h-100');
  },

  segInfo: {
    model_nm: "",
    upjong: "",
    //sales: "",
    salesfrom: "",
    salesto: "",
    datefrom: "",
    dateto: "",
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
    const segInfoStr = segInfo.model_nm + "|" + segInfo.upjong + "|" + segInfo.salesfrom + "~" + segInfo.salesto + "|" + segInfo.datefrom + "~" + segInfo.dateto
    $('select#segmentSelect0').append($('<option value="'+segInfoStr+'" '
      + (idx === 0 ? 'checked=true' : '') + '>'+segInfo.model_nm+'(업종:'+segInfo.upjong+', 구매액:'+segInfo.salesfrom+'~'+segInfo.salesto+', 기간:'+segInfo.datefrom+'~'+segInfo.dateto+')</option>'))
    $('select#segmentSelect1').append($('<option value="'+segInfoStr+'" '
      + (idx === 0 ? 'checked=true' : '') + '>'+segInfo.model_nm+'(업종:'+segInfo.upjong+', 구매액:'+segInfo.salesfrom+'~'+segInfo.salesto+', 기간:'+segInfo.datefrom+'~'+segInfo.dateto+')</option>'))
    $('select#segmentSelect2').append($('<option value="'+segInfoStr+'" '
      + (idx === 0 ? 'checked=true' : '') + '>'+segInfo.model_nm+'(업종:'+segInfo.upjong+', 구매액:'+segInfo.salesfrom+'~'+segInfo.salesto+', 기간:'+segInfo.datefrom+'~'+segInfo.dateto+')</option>'))
    
    },
  selectBoxMemberList: function() {
    $('select#segmentSelectML option').remove();
    $('select#segmentSelectML').append($('<option value="' + $('select#segmentSelect0').val() + '">' + $('select#segmentSelect0').val() + ')</option>'))
                              .append($('<option value="' + $('select#segmentSelect1').val() + '">' + $('select#segmentSelect1').val() + ')</option>'))
                              .append($('<option value="' + $('select#segmentSelect2').val() + '">' + $('select#segmentSelect2').val() + ')</option>'))
  },
  segmentMemberListInit: function() {
    let upjong = $('select#segmentSelectML option:selected').val().split("|")[1];
    let salesFrom = $('select#segmentSelectML option:selected').val().split("|")[2].split("~")[0];
    let salesTo = $('select#segmentSelectML option:selected').val().split("|")[2].split("~")[1];
    // let salesFrom = $('select#segmentSelectML option:selected').val().split("|")[2].split("~")[0].replace("원", "");
    // let salesTo = "";
    // if(salesFrom == '1000000') {
    //   salesTo = '5000000';
    // } else {
    //   salesTo = $('select#segmentSelectML option:selected').val().split("|")[2].split("~")[1].replace("원", "");
    // }
    let periodFrom = $('select#segmentSelectML option:selected').val().split("|")[3].substring(0, 10);
    let periodTo = $('select#segmentSelectML option:selected').val().split("|")[3].substring(11, 21);
debugger;
    let upjongArray = new Array();
    upjongArray = upjong.split(",");
    let selectedUpjong = new Array();
    for(var i = 0; i < upjongArray.length; i++) {
      //debugger;
      selectedUpjong.push("(match_phrase:(upjong3_nm:" + upjongArray[i] + "))");
    }
    //const iframeSrc = "https://52.78.186.240/s/packus/app/kibana#/dashboard/c6846cb0-f62d-11ea-b4c2-dd534a99a192?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:regdt,negate:!f,params:(gte:'" + periodFrom + "',lt:'" + periodTo + "'),type:range),range:(regdt:(gte:'" + periodFrom + "',lt:'" + periodTo + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:upjong3_nm,negate:!f,params:!(" + upjong + "),type:phrases,value:%EC%A4%91%EA%B5%AD%EC%9D%8C%EC%8B%9D),query:(bool:(minimum_should_match:1,should:!((match_phrase:(upjong3_nm:" + upjong + ")))))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:totalgoodsprice,negate:!f,params:(gte:" + salesFrom + ",lt:" + salesTo + "),type:range),range:(totalgoodsprice:(gte:" + salesFrom + ",lt:" + salesTo + ")))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:%5B%EC%84%B8%EA%B7%B8%EB%A8%BC%ED%8A%B8%5D%EA%B3%A0%EA%B0%9D%EB%A6%AC%EC%8A%A4%ED%8A%B8,viewMode:view)"
    const iframeSrc = "https://52.78.186.240/s/packus/app/kibana#/dashboard/c6846cb0-f62d-11ea-b4c2-dd534a99a192?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:regdt,negate:!f,params:(gte:'" + periodFrom + "',lt:'" + periodTo + "'),type:range),range:(regdt:(gte:'" + periodFrom + "',lt:'" + periodTo + "'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:upjong3_nm,negate:!f,params:!(" + upjong + "),type:phrases,value:'" + upjong + "'),query:(bool:(minimum_should_match:1,should:!(" + selectedUpjong + ")))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:totalgoodsprice,negate:!f,params:(gte:" + salesFrom + ",lt:" + salesTo + "),type:range),range:(totalgoodsprice:(gte:" + salesFrom + ",lt:" + salesTo + ")))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:%5B%EC%84%B8%EA%B7%B8%EB%A8%BC%ED%8A%B8%5D%EA%B3%A0%EA%B0%9D%EB%A6%AC%EC%8A%A4%ED%8A%B8,viewMode:view)"
    //"https://52.78.186.240/s/packus/app/kibana#/dashboard/c6846cb0-f62d-11ea-b4c2-dd534a99a192?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:regdt,negate:!f,params:(gte:'2019-01-31',lt:'2019-12-31'),type:range),range:(regdt:(gte:'2019-01-31',lt:'2019-12-31'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:upjong3_nm,negate:!f,params:!(%EB%8B%AD%EA%B0%88%EB%B9%84%EC%A0%84%EB%AC%B8,%EC%9B%A8%EB%94%A9%EB%B6%80%ED%8E%98,%EC%B4%88%EB%B0%A5%EC%A0%84%EB%AC%B8,%ED%95%B4%EC%9E%A5%EA%B5%AD%2F%EA%B0%90%EC%9E%90%ED%83%95,%EC%8B%9D%EB%A3%8C%ED%92%88,%EC%A4%91%EA%B5%AD%EC%9D%8C%EC%8B%9D,%EC%9D%BC%EB%B0%98%ED%95%9C%EC%8B%9D%2F%EB%B0%B1%EB%B0%98,%EA%B5%AD%EC%88%98%2F%EB%A7%8C%EB%91%90%2F%EC%B9%BC%EA%B5%AD%EC%88%98,%EC%88%9C%EB%8C%80%EC%A0%84%EB%AC%B8%EC%A0%90),type:phrases,value:'%EB%8B%AD%EA%B0%88%EB%B9%84%EC%A0%84%EB%AC%B8,%20%EC%9B%A8%EB%94%A9%EB%B6%80%ED%8E%98,%20%EC%B4%88%EB%B0%A5%EC%A0%84%EB%AC%B8,%20%ED%95%B4%EC%9E%A5%EA%B5%AD%2F%EA%B0%90%EC%9E%90%ED%83%95,%20%EC%8B%9D%EB%A3%8C%ED%92%88,%20%EC%A4%91%EA%B5%AD%EC%9D%8C%EC%8B%9D,%20%EC%9D%BC%EB%B0%98%ED%95%9C%EC%8B%9D%2F%EB%B0%B1%EB%B0%98,%20%EA%B5%AD%EC%88%98%2F%EB%A7%8C%EB%91%90%2F%EC%B9%BC%EA%B5%AD%EC%88%98,%20%EC%88%9C%EB%8C%80%EC%A0%84%EB%AC%B8%EC%A0%90'),query:(bool:(minimum_should_match:1,should:!((match_phrase:(upjong3_nm:%EB%8B%AD%EA%B0%88%EB%B9%84%EC%A0%84%EB%AC%B8)),(match_phrase:(upjong3_nm:%EC%9B%A8%EB%94%A9%EB%B6%80%ED%8E%98)),(match_phrase:(upjong3_nm:%EC%B4%88%EB%B0%A5%EC%A0%84%EB%AC%B8)),(match_phrase:(upjong3_nm:%ED%95%B4%EC%9E%A5%EA%B5%AD%2F%EA%B0%90%EC%9E%90%ED%83%95)),(match_phrase:(upjong3_nm:%EC%8B%9D%EB%A3%8C%ED%92%88)),(match_phrase:(upjong3_nm:%EC%A4%91%EA%B5%AD%EC%9D%8C%EC%8B%9D)),(match_phrase:(upjong3_nm:%EC%9D%BC%EB%B0%98%ED%95%9C%EC%8B%9D%2F%EB%B0%B1%EB%B0%98)),(match_phrase:(upjong3_nm:%EA%B5%AD%EC%88%98%2F%EB%A7%8C%EB%91%90%2F%EC%B9%BC%EA%B5%AD%EC%88%98)),(match_phrase:(upjong3_nm:%EC%88%9C%EB%8C%80%EC%A0%84%EB%AC%B8%EC%A0%90)))))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:totalgoodsprice,negate:!f,params:(gte:0,lt:100000),type:range),range:(totalgoodsprice:(gte:0,lt:100000)))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:%5B%EC%84%B8%EA%B7%B8%EB%A8%BC%ED%8A%B8%5D%EA%B3%A0%EA%B0%9D%EB%A6%AC%EC%8A%A4%ED%8A%B8,viewMode:view)"
    //"https://52.78.186.240/s/packus/app/kibana#/dashboard/c6846cb0-f62d-11ea-b4c2-dd534a99a192?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'',filters:!(('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:regdt,negate:!f,params:(gte:'2019-01-31',lt:'2019-12-31'),type:range),range:(regdt:(gte:'2019-01-31',lt:'2019-12-31'))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:upjong3_nm,negate:!f,params:!(%EB%8B%AD%EA%B0%88%EB%B9%84%EC%A0%84%EB%AC%B8),type:phrases,value:%EB%8B%AD%EA%B0%88%EB%B9%84%EC%A0%84%EB%AC%B8),query:(bool:(minimum_should_match:1,should:!((match_phrase:(upjong3_nm:%EB%8B%AD%EA%B0%88%EB%B9%84%EC%A0%84%EB%AC%B8)))))),('$state':(store:appState),meta:(alias:!n,disabled:!f,index:ffee50a0-d2c5-11ea-83ec-578bbedbe7b6,key:totalgoodsprice,negate:!f,params:(gte:0,lt:100000),type:range),range:(totalgoodsprice:(gte:0,lt:100000)))),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!f,title:%5B%EC%84%B8%EA%B7%B8%EB%A8%BC%ED%8A%B8%5D%EA%B3%A0%EA%B0%9D%EB%A6%AC%EC%8A%A4%ED%8A%B8,viewMode:view)"
    $('#segmentMemberList').append($('<iframe src="'+iframeSrc+'" height="100%" width="100%" frameborder="0" style="border-radius: .8rem;"></iframe>'))
    debugger;
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
    Base.segInfo.datefrom = $('#periodFrom').val();
    Base.segInfo.dateto = $('#periodTo').val();
    Base.segInfo.salesfrom = $('#salesFrom').val();
    Base.segInfo.salesto = $('#salesTo').val();
  
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
            salesfrom: "",
            salesto: "",
            datefrom: "",
            dateto: "",
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
    const segInfoStr = " (업종: " + segInfo.upjong + " / 구매액: " + segInfo.salesfrom + "~" + segInfo.salesto + " / 기간: " + segInfo.datefrom + "~" + segInfo.dateto + ")"
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
    // $('#termSelectFrom').val((year -1) + "-" + month +"-"+ day)
    // $('#termSelectTo').val(year + "-" + month +"-"+ day)
  },
  loadSegDashboardData: function (segInfo) {
      let selectedSeg0 = $('#segmentSelect0 option:selected')[0].value.split('|')
      let selectedSeg1 = $('#segmentSelect1 option:selected')[0].value.split('|')
      let selectedSeg2 = $('#segmentSelect2 option:selected')[0].value.split('|')
  
      const segCond = { // 조건 생성
        "search_cond_list": [
          {"datefrom": selectedSeg0[3].split('~')[0], "dateto" : selectedSeg0[3].split('~')[1], "upjong3_nm": selectedSeg0[1], "salesfrom": selectedSeg0[2].split('~')[0], "saleto" : selectedSeg0[2].split('~')[1]},
          {"datefrom": selectedSeg1[3].split('~')[0], "dateto" : selectedSeg1[3].split('~')[1], "upjong3_nm": selectedSeg1[1], "salesfrom": selectedSeg1[2].split('~')[0], "saleto" : selectedSeg1[2].split('~')[1]},
          {"datefrom": selectedSeg2[3].split('~')[0], "dateto" : selectedSeg2[3].split('~')[1], "upjong3_nm": selectedSeg2[1], "salesfrom": selectedSeg2[2].split('~')[0], "saleto" : selectedSeg2[2].split('~')[1]}
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
    debugger;
        },
        error: function () {
          alert("세그먼트 데이터를 가져오지 못했습니다.");
        },
      });
    // }
  },
  
  onDashboardLoad: function(payload) {
      console.log("Do something when the dashboard is fully loaded.");
  },

  onError: function(payload) {
      console.log("Do something when the dashboard fails loading");
  },

  embedDashboard: function() {
      var containerDiv = document.getElementById("dashboardContainer");
      var options = {
          url: "https://ap-northeast-2.quicksight.aws.amazon.com/sn/dashboards/179b05c0-2279-4a0f-8136-25d724d904e3/sheets/179b05c0-2279-4a0f-8136-25d724d904e3_d01af2c5-e31e-44a0-b0d3-ec48aed586ef?isauthcode=true&identityprovider=quicksight&code=authcode",
          container: containerDiv,
          parameters: {
              country: "United States"
          },
          scrolling: "no",
          height: "700px",
          width: "1000px"
      };
      dashboard = QuickSightEmbedding.embedDashboard(options);
      dashboard.on("error", onError);
      dashboard.on("load", onDashboardLoad);
  },

  onCountryChange: function(obj) {
      dashboard.setParameters({country: obj.value});
  }
};


Base.init();

