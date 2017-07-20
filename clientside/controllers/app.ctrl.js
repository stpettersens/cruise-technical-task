/* global Vue */
'use strict'
function _ (v) {}
let v = null
// ********************************************************************
// AppController
// Generated at 2017-07-10T11:38:28.759Z by Vue component compiler.
// ********************************************************************
var app = null
window.onload = function () {
  app = v = new Vue({
    el: '#app',
    data: {
    },
    ready: function () {
      console.log('Loading cruises...')
    },
    methods: {
      getApiHost: function () {
        return $('meta[name="apihost"]').attr('content')
      },
      showAllCruises: function () {
        $('tbody').empty()
        $.getJSON(this.getApiHost() + '/cruises', function (data) {
          $.each(data, function (i, cruise) {
            $('tbody').append('<tr>'
              + '<td>' + cruise.cid + '</td>'
              + '<td>' + cruise.from + '</td>'
              + '<td>' + cruise.dest + '</td>'
              + '<td>' + parseDate(cruise.date) + '</td></tr>')
          })
        })
      },
      showCruiseRange: function (first, last) {
        $('tbody').empty()
        $.getJSON(this.getApiHost() + `/cruises/range/${first}/to/${last}`, function (data) {
          $.each(data, function (i, cruise) {
            $('tbody').append('<tr>'
              + '<td>' + cruise.cid + '</td>'
              + '<td>' + cruise.from + '</td>'
              + '<td>' + cruise.dest + '</td>'
              + '<td>' + parseDate(cruise.date) + '</td></tr>')
          })
        })
      },
      selectCruiseId: function (id) {
        $('tbody').empty()
        $.getJSON(this.getApiHost() + `/cruises/${id}`, function (cruise) {
          $('tbody').append('<tr>'
            + '<td>' + cruise.cid + '</td>'
            + '<td>' + cruise.from + '</td>'
            + '<td>' + cruise.dest + '</td>'
            + '<td>' + parseDate(cruise.date) + '</td></tr>')
        })
      },
      selectCruiseFrom: function (from) {
        $('tbody').empty()
        $.getJSON(this.getApiHost() + `/cruises/from/${from}`, function (data) {
          $.each(data, function (i, cruise) {
            $('tbody').append('<tr>'
              + '<td>' + cruise.cid + '</td>'
              + '<td>' + cruise.from + '</td>'
              + '<td>' + cruise.dest + '</td>'
              + '<td>' + parseDate(cruise.date) + '</td></tr>')
          })
        })
      },
      selectCruiseTo: function (dest) {
        $('tbody').empty()
        $.getJSON(this.getApiHost() + `/cruises/to/${dest}`, function (data) {
          $.each(data, function (i, cruise) {
            $('tbody').append('<tr>'
              + '<td>' + cruise.cid + '</td>'
              + '<td>' + cruise.from + '</td>'
              + '<td>' + cruise.dest + '</td>'
              + '<td>' + parseDate(cruise.date) + '</td></tr>')
          })
        })
      }
    }
  })
}
_(v)
