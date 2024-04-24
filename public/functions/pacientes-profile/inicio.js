$(document).ready(function(){

    loadResumen()
    
})


function loadResumen(){

    $.ajax({
        type: "POST",
        url : baseUrl+'/getResumenPaciente',
        data: {
          idpaciente: $("#hidpaciente").val()  
        },
        beforeSend: function(){
            $(".sp_loading_paciente").show();
        },
        complete: function(){
            $(".sp_loading_paciente").hide();
        },
        success: function(data)
        {   
            $("#tb_resumen_citas tbody").empty()
            $("#tb_resumen_tratamientos tbody").empty()
            sec = 1;
            
            $.each(data.citas, function(index, v) {              

                $("#tb_resumen_citas").append("<tr><td>"+v.fecha_inicio+"</td><td>"+v.hora_inicio+"</td><td>"+(v.doctor?? "")+"</td>"
                                +"<td><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</span></td></tr>")
                sec++;
            });

            $.each(data.tratamientos, function(index, v) {              

                $("#tb_resumen_tratamientos").append("<tr><td>"+v.procedimiento+"<br><div class='text-muted'>"+v.tipoprocedimiento+"</div></td><td>"+v.fecha_diagnostico+"</td><td>"+(v.doctor?? "")+"</td>"
                                +"<td><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</span></td></tr>")
                sec++;
            });

            $("#resumen-deuda").text(data.deuda)
           

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}