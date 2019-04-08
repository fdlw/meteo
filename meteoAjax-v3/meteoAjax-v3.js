var obj ;

$(document).ready(function () {
	
	$("button#meteo2").after('<button id="meteo3">graphique</button>');
	$("button#meteo3").attr({ disabled: true });

	$("button#meteo").click(function () {
		var ville = $("select#ville option:selected").val();
		console.log(ville);
		myAjax({
			'ville': ville
		});
	});
	$("button#meteo2").click(function () {
		var ville = $("input#ville2").val();
		// console.log(ville);
		myAjax({
			'ville': ville
		});
	});
	$("button#meteo3").click(function () {
		console.log(obj.city_info.name);
		graphe(obj);
	});

})
function myAjax(lieu) {
	$.ajax({
		url: 'meteoAjax-v3.php',
		type: 'POST',
		dataType: 'json',
		async: true,
		data: {
			ville: lieu.ville
		},
		success: function (result) {
			console.log(result)
			if (result.errors) {

				$("#madiv").html(
					"<h1>" + result.errors[0].text + "</h1>");
				$("#madiv").append(
					"<h2><span>" + lieu.ville
					+ " </span>n'existe pas</h2>");
				$("#madiv h2 span").css({
					"color": "red"
				})
			} else {
				afficher(result);
				$("button#meteo3").attr({ disabled: false });
				obj = result;

			}

		},
		error: function (result) {
			$("#madiv").html("<h1>Erreur serveur</h1>");
		},
		complete: function (result) {
			// faire qq chose quand c'est fini
			console.log('fini');
		}

	});
}

function afficher(result) {
	$("#madiv").html(
		"<h1>" + result.city_info.name + "</h1>")
	// result.city_info.name
	$("#madiv").append(
		"<h2>" + result.current_condition.date
		+ "</h2>")
	$("#madiv")
		.append(
			"<table id='prev_jours'><tr><th>Jour</th><th>Icone</th><th>Cond.</th><th>Tmin</th><th>Tmax</th></tr></table>");

	for (var i = 0; i < 5; i++) {
		var tr = "";
		tr += "<tr>";
		tr += "<td>" + result["fcst_day_" + i].day_long
			+ "</td>";
		tr += "<td><img src='"
			+ result["fcst_day_" + i].icon + "'></td>";
		tr += "<td>" + result["fcst_day_" + i].condition
			+ "</td>";
		tr += "<td>" + result["fcst_day_" + i].tmin
			+ "°C</td>";
		tr += "<td>" + result["fcst_day_" + i].tmax
			+ "°C</td>";
		tr += "</tr>";
		$("#madiv table").append(tr);
	}





}
function graphe(obj) {
	$("body").append('<div id="container"</div>');
	var tabtmin =[];
	var tabtmax =[] ;
	var tabjour =[];
	for (var i = 0; i < 5; i++){
		tabtmin.push(obj["fcst_day_" + i].tmin);
		tabtmax.push(obj["fcst_day_" + i].tmax);
		tabjour.push(obj["fcst_day_" + i].day_long);

	}
	console.log(tabtmin, tabtmax, tabjour);


Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Temperature sur 5 jours'
    },
    subtitle: {
        text: 'un exo qui utilise HighCharts'
    },
    xAxis: {
        categories: tabjour,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'temperature (°C)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Tmin',
        data: tabtmin
    }, {
        name: 'Tmax',
        data: tabtmax

    }]
	
});

$("button#meteo3").attr({ disabled: true });

}