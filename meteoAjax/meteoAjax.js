

function myAjax(nomVille) {
 var obj;  
    $.ajax({
        url: 'meteoAjax.php',
        type: 'POST',
        dataType: 'json',
        async: true,
        data: nomVille,
        success: function (result) {
            // 			ajaxSuccess(result);	
            console.log(result.city_info.name);
            obj = result;
            afficher(obj);
        },
        error: function (result) {
            console.log('error');

        },
        complete: function (result) {
            // faire qq chose quand c'est fini 
            console.log('fini');
        }

    });
}

function afficher(o){
$("#madiv").html("<h1>"+o.city_info.name+"</h1><h2>"+o.current_condition.date+"</h2>");
$("#madiv").append('<table id="prev_jours"><tr><th>Jour</th><th>Icône</th><th>Condition</th><th>Tmin</th><th>Tmax</th></tr></table>');

for (let i = 0; i <5; i++) {
    str=''
    jour= "fcst_day_"+i;
    str+="<tr><td>"+o[jour]['day_long']+"</td>";
    str+="<td><img src="+o[jour]['icon']+"></td>";
    str+="<td>"+o[jour]['condition']+"</td>";
    str+="<td>"+o[jour]['tmin']+"°C</td>";
    str+="<td>"+o[jour]['tmax']+"°C</td></tr>";
    $("#prev_jours").append(str);
    
}



}