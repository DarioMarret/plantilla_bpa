$(document).ready(function(){

    getPacienteCreacion()    
    
})

function loadInfoHistorial(){

    getPacienteCreacion()
    getHistorialAtenciones()
}

function getPacienteCreacion(){
    
    $.ajax({
        type: "POST",
        url : baseUrl+'/FechaCreacionPaciente',
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
            
           $("#sp_creacion_paciente").text(data.info.fecha_creacion)

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function getHistorialAtenciones(){

    $.ajax({
        type: "POST",
        url : baseUrl+'/HistorialAtenciones',
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
            
           
            $('#dv_historial_paciente').empty()
            var fecha =''
            $.each(data.info, function(index, v) {              
                               
                html =''
                
                console.log(v.fecha)
                if( fecha != v.fecha){
                    html = '<div class="text-star mb-2 mt-5">'+
                                '<span class="badge badge-soft-success" style="font-size: 22px">'+
                                    '<h2 class="fw-medium">'+v.fecha_string+'</h2>'+
                                '</span>'+
                            '</div>'
                } 
                //html = '<h2 class="fw-medium">'+v.fecha_string+'</h2><br>'
                
                    
                var citas = v.citas                      
                html += (citas.length>0)? citasHtml(citas):"";
                
                var tratamientos = v.tratamientos
                html += (tratamientos.length>0)? tratamientosHtml(tratamientos):"";

                var medicina = v.medicina               
                html += (medicina.length!=0)? medicinaHtml(medicina):"";

                $('#dv_historial_paciente').last().append(html);

                fecha = v.fecha

            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function citasHtml(citas){

   var html = '<div class="card border border-primary" style="width:50%">'+
                '<h5 class="card-header bg-transparent border-primary text-uppercase">CITAS AGENDA</h5>'+ 
                '<div class="card-body">'+
                '<h5 class="card-title mb-3">Listado de Citas</h5>';
        html += '<table id="tb_resumen_tratamientos" class="table table-sm" style="font-size: 13px">'+
                '<thead>'+
                    '<tr>'+                       
                        '<td>Fecha</td>'+     
                        '<td>Hora</td>'+                            
                        '<td>Doctor</td>'+
                        '<td>Estado</td>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>';
                
                $.each(citas, function(index, v) {              

                    html+= "<tr><td>"+v.fecha_inicio+"</td><td>"+v.hora_inicio+"</td><td>"+(v.doctor?? "")+"</td>"
                                    +"<td><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</span></td></tr>"                    
                });      
            
        html+='</tbody>'+
            '</table>'          
                
       html+="</div></div>"
       
       return html;

}


function tratamientosHtml(tratamientos){

    var html =' <div class="card border border-success">'+
                '<h5 class="card-header bg-transparent border-bottom border-success text-uppercase">CITA ODONTOLOGIA</h5>'+
                '<div class="card-body">'+
                    '<h5 class="card-title mb-3">Listado de Tratamientos Realizados</h5>'+
                    '<div>'+
                        '<table class="table table-sm" style="font-size: 13px">'+
                            '<thead>'+
                                '<tr>'+
                                    '<td style="width: 25%">Tratamiento</td>'+ 
                                    '<td>Fecha</td>'+ 
                                    '<td>Doctor</td>'+
                                    '<td>Estado</td>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';

                            $.each(tratamientos, function(index, v) {              

                                html += "<tr><td>"+v.procedimiento+"<br><div class='text-muted'>"+v.tipoprocedimiento+"</div></td><td>"+v.fecha_realizado+"</td><td>"+(v.doctor?? "")+"</td>"
                                        +"<td><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</span></td></tr>"                   
                            });


        html+='</tbody>'+
            '</table>';  
                        
        html +='</div></div></div>';

        return html;
}


function medicinaHtml(medicina){

    html = ''
    $.each(medicina, function(index, v) {  

        var consulta = v.informacion
        var signos = v.signos
        var diagnosticos = v.diagnosticos
        var receta = v.receta
        var procedimientos = v.procedimientos
        //console.log('receta '+ Object.keys(receta).length)
        
        html +=
                '<div class="card border border-info">'+   
                //'<h5 class="card-header bg-transparent border-bottom border-info text-uppercase">CITA MEDICINA</h5>'+ 
                '<div class="card-header">'+
                '<div class="col-sm order-2 order-sm-1">'+
                    '<div class="d-flex align-items-start mt-3 mt-sm-0">'+
                        '<div class="flex-shrink-0">'+
                            '<div class="avatar-md me-3">'+
                                '<img src="'+consulta.folder+'/'+consulta.foto+'" alt="" class="img-fluid rounded-circle d-block">'+
                            '</div>'+
                        '</div>'+
                        '<div class="flex-grow-1">'+
                            '<div>'+
                                '<h5 class="font-size-16 mt-2">'+consulta.doctor+'</h5>'+
                                '<p class="text-muted font-size-13">'+consulta.especialidad+'</p>'+                             
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                
                
                '<div class="card-body">'+                
                    '<div class="row">'+
                        '<div class="col-4">'+
                            '<label>MOTIVO DE CONSULTA</label><br>'+
                            '<span>'+consulta.motivo+'</span>'+
                        '</div>'+
                        '<div class="col-4">'+
                            '<label>ENFERMEDAD</label><br>'+
                            '<span>'+(consulta.enfermedad?? "")+'</span>'+
                        '</div>'+
                        '<div class="col-4">'+
                            '<label>SIGNOS VITALES</label><br>'+
                            '<table class="table table-sm" style="font-size: 13px">'+
                                '<tr>'+
                                    '<td>Temperatura C°</td>'+ 
                                    '<td>'+(signos.temperatura?? "")+'</td>'+
                                    '<td>Presión Arterial <td>'+
                                    '<td>'+(signos.presion_arterial?? "")+'</td>'+
                                '</tr>'+
                                '<tr>'+
                                    '<td>Pulso/min: </td> '+
                                    '<td>'+(signos.pulso?? "")+'</td>'+
                                    '<td>Fr. Respiratoria  <td>'+
                                    '<td>'+(signos.frec_respiratoria?? "")+'</td>'+
                                '</tr>'+

                                '<tr>'+
                                    '<td>Peso/kg:</td>'+ 
                                    '<td>'+(signos.peso?? "")+'</td>'+
                                    '<td>Talla/cm:<td>'+
                                    '<td>'+(signos.talla?? "")+'</td>'+
                                '</tr>'+

                                '<tr>'+
                                    '<td>Sat. Oxigeno: </td> '+
                                    '<td>'+(signos.saturacion_oxigeno?? "")+'</td>'+
                                    '<td>IMC:<td>'+
                                    '<td>'+(signos.imc?? "")+'</td>'+
                                '</tr>'+

                            '</table>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';

            if(diagnosticos.length>0){
                html +=' <div class="card border border-info">'+
                '<div class="card-body">'+
                    '<h5 class="card-title mb-3">Listado de Diagnosticos</h5>'+
                    '<div>'+
                        '<table class="table table-sm" style="font-size: 13px">'+
                            '<thead>'+
                                '<tr>'+
                                    '<td style="width: 50%">Codigo Cie</td>'+ 
                                    '<td>Observaciones</td>'+                                 
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';

                            $.each(diagnosticos, function(index, v) {              

                                html += "<tr id='tr_e_diag_"+v.iddiagnostico+"'><td>"+v.codigo_cie+" - "+(v.codigo_descripcion?? "")+"<br>"+(v.codigo_sub_cie?? "")
                                +" - "+(v.sub_cie_descripcion ?? "")+"</td><td>"+(v.observaciones?? "")+"</td></tr>"                   
                            });


                    html+='</tbody>'+
                        '</table>';  
                                    
                    html +='</div></div></div>';


            }


            if(procedimientos.length>0){
                html +=' <div class="card border border-info">'+
                '<div class="card-body">'+
                    '<h5 class="card-title mb-3">Listado de Tratamientos Realizados</h5>'+
                    '<div>'+
                        '<table class="table table-sm" style="font-size: 13px">'+
                            '<thead>'+
                                '<tr>'+
                                    '<td style="width: 25%">Procedimiento</td>'+ 
                                    '<td>Observaciones</td>'+ 
                                    '<td>Cobro</td>'+
                                    '<td>Precio</td>'+
                                '</tr>'+
                            '</thead>'+
                            '<tbody>';

                            $.each(procedimientos, function(index, v) {              

                                html += "<tr id='tr_proc_e_"+v.idtratamiento+"'><td>"+v.procedimiento+"</td><td>"+(v.diagnostico?? "")+"</td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado_desc+"</span></td><td>"+v.total+"</td></tr>";
                            });


                            html+='</tbody>'+
                                '</table>';  
                                            
                            html +='</div></div></div>';
            }

            if(Object.keys(receta).length>0){          
                    html +='<div class="card border border-info">'+                
                    '<div class="card-body">'+
                        '<h5 class="card-title mb-3">Receta Enviada</h5>'+
                        '<div class="row">'+
                            '<div class="col-4">'+
                                '<label>MEDICAMENTOS</label><br>'+
                                '<textarea class="form-control" cols="4" style="height: 140px" readonly>'+receta.receta+'</textarea>'+
                            '</div>'+
                            '<div class="col-4">'+
                                '<label>PRESCRIPCION</label><br>'+
                                '<textarea class="form-control" cols="4" style="height: 140px" readonly>'+receta.indicaciones+'</textarea>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
            }

    });


    return html;    
} 