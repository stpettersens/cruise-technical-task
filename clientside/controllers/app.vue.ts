/// <reference path="vue-instance.ts" />

class AppController extends VueInstance {

    constructor() {
        super();
        this.el = '#app';
        this.name = 'app';
    }

    public ready(): void {
        console.log('Loading cruises...')
    };

    public getApiHost(): String {
        return $('meta[name="apihost"]').attr('content')
    };

    public showAllCruises(): void {
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
    };

    public showCruiseRange(first, last): void {
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
    };

    public selectCruiseId(id): void {
        $('tbody').empty()
        $.getJSON(this.getApiHost() + `/cruises/${id}`, function (cruise) {
            $('tbody').append('<tr>'
            + '<td>' + cruise.cid + '</td>'
            + '<td>' + cruise.from + '</td>'
            + '<td>' + cruise.dest + '</td>'
            + '<td>' + parseDate(cruise.date) + '</td></tr>')
        })
    };

    public selectCruiseFrom(from): void {
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
    };

    public selectCruiseTo(dest): void {
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
    };
}
