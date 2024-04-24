var formCreatePlanOrtodoncia = document.getElementById('form-ortodoncia-plan-insert');
var formAtenderCitaControl = document.getElementById('form-procedimiento-ortodoncia');


var multiplePiezasPresupuestoOrt = new Choices('#ort_piezas_select_presupuesto',{
    removeItemButton: true,
    duplicateItemsAllowed: false,
  }
);


var multipleCaraslPresupuestoOrt = new Choices(
    '#ort_caras_select_presupuesto',
    {
      removeItemButton: true,
    }
  );



$(document).ready(function(){

    flatpickr('#edit-ort-trata-fecha');
    flatpickr('#edit-ort-trata-fecha-realiza');

    formCreatePlanOrtodoncia.addEventListener('submit', createPlanOrtodoncia);
    formAtenderCitaControl.addEventListener('submit', insertControlOrtodoncia);
  
    $('#i-ortod-mod-pago').on('change', function() {
        if(this.value=='Con Entrada') {
            $("#i-ortod-valor-entrada").prop( "readonly", false );
        }else {
            $("#i-ortod-valor-entrada").prop( "readonly", true );
            $("#i-ortod-valor-entrada").val('00.00')
            $("#sp_valor_tratamiento").val('00.00')
        }

        valorCuotas();
    });


    $('#ort_busq_presupuesto').select2({
        placeholder: 'Digite el Tratamiento a Realizar',
        minimumInputLength: 3,
        dropdownParent: $("#canvasControlOrtodoncia"),
        ajax: {
          url: baseUrl+'/bqdTratamietos',
          dataType: 'json',
          type: 'POST',
          delay: 200,
          data: function (params) {
            var query = {
              search: params.term,
              idclinica: $("#p_idclinica_odont").val(),              
            }                  
            return query;
          },
          processResults: function (data) {
            return {
                results: data.info
            };
        },
        cache: true
        }
      });
})



function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}


function openCanvasInsertOrtodoncia(){
    
    document.getElementById("form-ortodoncia-plan-insert").reset();
    $("#canvasIngresoPlanOrtodoncia").offcanvas().offcanvas("toggle");
}


function valorTratamientoOrt(){

    var valor_tratamiento = $("#i-ortod-valor").val();
    var valor_entrada = $("#i-ortod-valor-entrada").val();
    
    if(parseFloat(valor_entrada) > parseFloat(valor_tratamiento)){
        
        toast_msg('error', 'El valor de Entrada no puede ser mayor al Valor del tratamimento')          
        return;
    }

    var valor_total = parseFloat(valor_tratamiento) - parseFloat(valor_entrada);
    if(isNaN(valor_total)) valor_total=0;


    $("#sp_valor_tratamiento").val(valor_total);
    valorCuotas();
}


function valorCuotas(){
    var d1 = new Date($("#i-ortod-fecha-inicio").val());
    var d2 = new Date($("#i-ortod-fecha-fin").val());
    var cuotas = (monthDiff(d1, d2)==0)?1:monthDiff(d1, d2);
    console.log('Cuotas'+cuotas);
    var valor_tratamiento;
    //alert("The difference between two dates is: " +monthDiff(d1, d2));

    if($("#i-ortod-mod-pago").val()=='Sin entrada') valor_tratamiento = $("#i-ortod-valor").val();
    else valor_tratamiento = $("#sp_valor_tratamiento").val();

    var valor_couta = parseFloat(valor_tratamiento) / cuotas;
    if(isNaN(valor_couta)) valor_couta=0;

    $("#i-ortod-cuotas").val(cuotas);
    $("#i-ortod-valor-cuotas").val(valor_couta.toFixed(2));
    $("#i-ortod-cant-sesiones").val(cuotas);

}


function loadPlanesOrtodoncia(){

    
    $.ajax({
        type: "POST",
        url : baseUrl+'/loadPlanesOrtodoncia',
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
            $("#tb_planes_ortodoncia tbody").empty()
            //console.log(data); // show response from the php script.
            sec = 1;
            var signos, diagnosticos, procedimientos, recetas
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                            '   <div class="dropdown-menu">\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="editarPlanTratamiento('+v.idortodoncia+', '+v.idclinica+')">Cuotas</a>\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="eliminarPlanOrtodoncia('+v.idortodoncia+', '+v.idclinica+')">Eliminar</a>\n' +
                            '   <div class="dropdown-divider"></div>\n' +
'                           </div></div>';

                var total = parseFloat(v.cuotas) * parseFloat(v.valor_cuotas);
                $("#tb_planes_ortodoncia").append("<tr id='tr_ortodoncia_"+v.idortodoncia+"'><td>"+v.fecha_inicio+"</td><td>"+(v.fecha_fin?? "")+"</td>"
                                +"<td align='center'>"+v.tipo_ortodoncia+"</td><td align='center'>"+(v.pago_modalidad ?? "")+"</td><td align='center'>"+v.valor_tratamiento+"</td><td align='center'>"+v.valor_entrada+"</td><td align='center'>"+v.cuotas+"</td><td align='center'>"+v.valor_cuotas+"</td><td align='center'>"+total.toFixed(2)+"</td><td>"+v.estado+"</td><td align='left'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });

}


function createPlanOrtodoncia(e){

    e.preventDefault();

    var idpaciente = $("#hidpaciente").val()    
    var form = $("#form-ortodoncia-plan-insert");

    $.ajax({
        type: "POST",
        url : baseUrl+'/insertPlanTratamiento',
        data: form.serialize()+ "&idpaciente="+idpaciente, // serializes the form's elements.
        
        
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".btnSppinAjax").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){

            if(data.info.action==1) {
                toast_msg('success', data.info.msg)
                openCanvasInsertOrtodoncia()
                loadPlanesOrtodoncia()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
               return
            }else{

                $.each(data.error, function(index, v) {
                    toast_msg('error', v)
                });

                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });

}



function editarPlanTratamiento(idortodoncia, idclinica){

    $("#hidortodoncia").val(idortodoncia)
    $("#hort-idclinica").val(idclinica)
       
    $.ajax({
        type: "POST",
        url : baseUrl+'/cuotasOrtodoncia',
        data: {
          idpaciente: $("#hidpaciente").val(),
          idortodoncia: idortodoncia  
        },
        beforeSend: function(){
            $(".sp_loading_paciente").show();
        },
        complete: function(){
            $(".sp_loading_paciente").hide();
        },
        success: function(data)
        {   
            $("#tb_cuotas_ortodoncia tbody").empty()
            //console.log(data); // show response from the php script.
            sec = 1;
            var options, estado_update, cita_control
            $.each(data.info, function(index, v) {

                if(v.idfactura<=0){
                    if(v.estado=='C') estado_update='P'
                    else estado_update='C'
                    options ='<a href="javascript:;" class="btn btn-sm btn-outline-warning" onclick="editCuotaOrtodoncia('+v.idpcuenta+', \''+estado_update+'\',)"><i class="fas fa-money-bill"></i>Edita</a>'
                }else 
                    options =''                    

                cita_control='<a href="javascript:;" class="btn btn-sm btn-outline-info" onclick="openModalCita('+v.idpcuenta+', '+v.idortodoncia+', '+(v.idcita??0)+', \''+v.estado_cita+'\')"><i class="fas fa-calendar-day"></i>Cita</a>';

                /*
                if(v.idtratamiento!=null)
                    atender=''
                else
                    atender='<a href="javascript:;" class="btn btn-sm btn-outline-info" onclick="openCanvasInsertControlOrt('+v.idpcuenta+', '+v.idortodoncia+', '+(v.iddoctor??0)+', '+(v.idcita??0)+')">Atender</a>'; 
                */
                    atender='<a href="javascript:;" class="btn btn-sm btn-outline-info" onclick="openCanvasInsertControlOrt('+v.idpcuenta+', '+v.idortodoncia+', '+(v.iddoctor??0)+', '+(v.idcita??0)+')">Atender</a>'; 

                //var total = parseFloat(v.cuotas) * parseFloat(v.valor_cuotas);
                $("#tb_cuotas_ortodoncia").append("<tr><td>"+sec+"</td><td>"+v.fecha+"</td><td id='td_or_detalle_"+v.idpcuenta+"'>"+v.detalle+"</td><td>"+(v.doctor?? "")+"</td><td class='text-center'>"+(v.fecha_inicio?? "")+"</td><td class='text-center'>"+(v.hora_inicio?? "")+"</td><td style='color:blue; font-weight:bold'>"+(v.debe?? "")+"</td>"
                                +"<td align='center'><span class='badge bg-"+v.estado_color+"'>"+v.estado_desc+"</span></td><td class='text-center'><span class='badge bg-"+v.estado_tratamiento_color+"'>"+(v.estado_tratamiento?? "")+"</span></td><td align='left'>"+options+" "+cita_control+" "+atender+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });


}


function editCuotaOrtodoncia(idpcuenta, estado){


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Modificar el estado de la Cuota?',
        //text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, modificar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/editCuotasOrtodoncia',
                data: {     
                    idpaciente: $("#hidpaciente").val(),           
                    idpcuenta: idpcuenta,  
                    estado: estado                

                },
                beforeSend: function(){
                    // $(".btnSppinAjax").show()
                    // $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    // $(".btnSppinAjax").hide()
                    // $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function(data){

                    if(data.info.action==1){
                        swalWithBootstrapButtons.fire(
                            'Cuota Modificada!',
                            data.info.msg,
                            'success'
                        )
                       
                        var idortodoncia =  $("#hidortodoncia").val()
                        editarPlanTratamiento(idortodoncia, null)
                      

                    }else{
                        toast_msg('error',  data.info.msg)
                        return
                    }


                },
                error: function(response) {
                    console.log(response.responseJSON.errors)

                }

            });


        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Usted cancelo la accion',
                'error'
            )
        }
    })

}





function eliminarPlanOrtodoncia(idortodoncia, idclinica){


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar el Plan?',
        text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/deletePlanTratamiento',
                data: {     
                    idpaciente: $("#hidpaciente").val(),           
                    idortodoncia: idortodoncia,
                    idclinica: idclinica

                },
                beforeSend: function(){
                    // $(".btnSppinAjax").show()
                    // $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    // $(".btnSppinAjax").hide()
                    // $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function(data){

                    if(data.info.action==1){
                        swalWithBootstrapButtons.fire(
                            'Plan Eliminado!',
                            data.info.msg,
                            'success'
                        )
                       //getLstConsultas()
                       $('#tr_ortodoncia_'+idortodoncia).remove(); 

                    }else{
                        toast_msg('error',  data.info.msg)
                        return
                    }


                },
                error: function(response) {
                    console.log(response.responseJSON.errors)

                }

            });


        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelado',
                'Usted cancelo la accion',
                'error'
            )
        }
    })

    
}

function openModalCita(idpcuenta, idortodoncia, idcita, estado_cita){


    $("#hidpcuenta_ortondoncia").val(idpcuenta)
    $("#hidcita_ortondoncia").val(idcita)
        
   

    if(idcita>0){

        $.ajax({
            type: "POST",
            url : baseUrl+'/loadInfoCitaOrt',
            data: {
              idpaciente: $("#hidpaciente").val(),
              idcita: idcita  
            },
            beforeSend: function(){
                $(".sp_loading_paciente").show();
            },
            complete: function(){
                $(".sp_loading_paciente").hide();
            },
            success: function(data)
            {   
                $("#ag-doctor").val(data.info.iddoctor)
                $("#ag-fecha-cita").val(data.info.fecha_inicio)
                $("#ag-hora-inicio").val(data.info.hora_inicio)
                $("#ag-hora-fin").val(data.info.hora_fin)
                //$("#ag-tipo-cosulta").val(data.info.)
                $("#ag-motivo-consulta").val(data.info.motivo)
                $("#ag-estado-cita").val(data.info.estado)               
                $("#event-modal-ortodoncia").modal('show')
            },
            error: function(response) {
                console.log(response.responseJSON.errors)
    
            }
    
        });
    
    }else{

        var detalle = $("#td_or_detalle_"+idpcuenta).text()
        $("#ag-motivo-consulta").val(detalle)
        $("#event-modal-ortodoncia").modal('show')
    }

   

}

function saveCitaOrtodoncia(){
    
    var iddoctor    = $("#ag-doctor").val()
    var fecha       = $("#ag-fecha-cita").val()
    var hora_inicio = $("#ag-hora-inicio").val()
    var hora_fin    = $("#ag-hora-fin").val()
    var tipo_cita   = $("#ag-tipo-cosulta").val()
    var motivo      = $("#ag-motivo-consulta").val()
    var estado      = $("#ag-estado-cita").val()
    var idpcuenta   = $("#hidpcuenta_ortondoncia").val()
    var idortodoncia= $("#hidortodoncia").val()
    var idcita      = $("#hidcita_ortondoncia").val()

    $.ajax({
        type: "POST",
        url : baseUrl+'/insertCitaOrtodoncia',
        data: {
            idclinica:177,
            idpaciente: $("#hidpaciente").val(),
            iddoctor: iddoctor,
            fecha: fecha,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            tipo_cita: tipo_cita,
            motivo: motivo,
            estado: estado,
            idpcuenta: idpcuenta,
            idortodoncia: idortodoncia,
            idcita: idcita
        },
        beforeSend: function(){
            $(".spin_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },success: function (data) {
            
            if(data.info.action==1){
                sweetMsg('success', data.info.msg)         
                $("#event-modal").modal('hide')
            }                
                
            else                
                sweetMsg('error', data.info.msg)         

        },error: function(xhr) {
            console.log(response.responseJSON.errors)
        }

    });
}


function closeCanvasInsertControlOrt(){
    $("#canvasControlOrtodoncia").offcanvas().offcanvas("toggle");
}


function openCanvasInsertControlOrt(idpcuenta, idortodoncia, iddoctor, idcita, action=true){

    $("#hort-idpcuenta").val(idpcuenta)
    $("#hort-idortodoncia").val(idortodoncia)
    $("#hort-idcita").val(idcita)
    $("#edit-ort-trata-medico").val(iddoctor)

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadProcedControlOrtodoncia',
        data: {
          idpaciente: $("#hidpaciente").val(),
          idpcuenta: idpcuenta,
          idortodoncia: idortodoncia

        },
        beforeSend: function(){
            $(".sp_loading_paciente").show();
        },
        complete: function(){
            $(".sp_loading_paciente").hide();
        },
        success: function(data)
        {   
            $("#tb_ort_procedimientos_control tbody").empty()
            $("#edit-ort-trata-medico").val('')              
            $("#edit-ort-trata-clinica").val('')              
            $("#edit-ort-trata-fecha-realiza").val('')
            $("#edit-ort-trata-diagnostico").val('')
            
           
            if(data.trata.idtratamiento>0){
                
                $("#edit-ort-trata-medico").val(data.trata.iddoctor)              
                $("#edit-ort-trata-clinica").val(data.trata.idclinica)              
                $("#edit-ort-trata-fecha-realiza").val(data.trata.fecha)
                $("#edit-ort-trata-diagnostico").val(data.trata.diagnostico)
            }

            sec = 1;            
            $.each(data.info, function(index, v) {

                if(v.estado_pago=='C')
                    var options = ""
                else
                    var options = "<a href='javascript:;' class='btn btn-sm btn-danger btnSaveInfo' onclick='eliminarProcOrtControl("+v.idtratamiento+")'><i class='fas fa-trash-alt'></i></button>"
                
                
                $("#tb_ort_procedimientos_control").append("<tr id='tr_ort_proc_"+v.idtratamiento+"'><td>"+v.tipoprocedimiento+" - "+v.procedimiento+"</td><td>"+(v.pieza?? "")+"</td>"
                                +"<td align='center'>"+(v.zona?? "")+"</td><td align='center'>"+(v.precio ?? "")+"</td><td align='center'><span class='badge bg-"+v.estado_pago_color+"'>"+(v.estado_pago_desc ?? "")+"</span></td><td align='right'>"+options+"</td></tr>")
                sec++;
            });

            if(action==true)
                $("#canvasControlOrtodoncia").offcanvas().offcanvas("toggle");

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}



function eliminarProcOrtControl(idtratamiento){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar al Procedimiento?',
        text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/deleteProcOdonto',
                data: {
                    idproce: idtratamiento
                },
                beforeSend: function(){
                    $(".spin_loading").show();
                    $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    $(".spin_loading").hide();
                    $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function(data){

                    if(data.info.action==1){
                        swalWithBootstrapButtons.fire(
                            'Procedimiento Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        
                        var idpcuenta = $("#hort-idpcuenta").val()
                        var idortodoncia = $("#hort-idortodoncia").val()
                        var idcita = $("#hort-idcita").val()
                        var iddoctor = $("#edit-ort-trata-medico").val()
                        openCanvasInsertControlOrt(idpcuenta, idortodoncia, iddoctor, idcita, false)
                        

                    }else{
                        toast_msg('error',  data.info.msg)
                        return
                    }


                },
                error: function(response) {
                    console.log(response.responseJSON.errors)

                }

            });


        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
           
        }
    })
}



function insertControlOrtodoncia(e){

    e.preventDefault();

    var idpaciente = $("#hidpaciente").val()    
    var idpcuenta = $("#hort-idpcuenta").val()
    var idortodoncia = $("#hort-idortodoncia").val()
    var idcita = $("#hort-idcita").val()
    var iddoctor = $("#edit-ort-trata-medico").val()
    var estado = $("#edit-ort-trata-estado").val()
    var diagnostico = $("#edit-ort-trata-diagnostico").val()
    var fecha_inicio = $("#edit-ort-trata-fecha").val()
    var fecha_fin =$("#edit-ort-trata-fecha-realiza").val()

    var TableDataPre;
    TableDataPre = storeTblValuesProceControl();
    TableDataPre = $.toJSON(TableDataPre);


    var form = $("#form-procedimiento-ortodoncia");

    $.ajax({
        type: "POST",
        url : baseUrl+'/realizarControlOrtodoncia',
        data:{
            idpaciente: idpaciente,
            idpcuenta: idpcuenta,
            idortodoncia: idortodoncia,
            idcita: idcita,
            iddoctor: iddoctor,            
            fecha_fin: fecha_fin,            
            diagnostico: diagnostico,
            procedimientos: TableDataPre,

        },
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".btnSppinAjax").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){

            if(data.info.action==1) {
                sweetMsg('success', data.info.msg)
               
                var idortodoncia = $("#hidortodoncia").val()
                loadPlanesOrtodoncia(idortodoncia, 0)
                //openCanvasInsertControlOrt()

            }else if(data.info.action==2){
                sweetMsg('error',data.info.msg)
               return
            }else{

                $.each(data.error, function(index, v) {
                    toast_msg('error', v)
                });

                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnCloseCanvas").show()
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });

}



function getInfoProcPresupuestoOrt(value){

    var idproc  = value.value;

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoProcedOdont',
        data: {
            idclinica: $("#hort-idclinica").val(),
            idprocedimiento: idproc
        },
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },success: function (data) {

            //$("#tipo_aplica").val(data.info.tipo)
            $("#ort_valorProcPresupuesto").val(data.info.precio)

            if(data.info.activate==1) {
                
                multiplePiezasPresupuestoOrt.disable()
                multipleCaraslPresupuestoOrt.disable()                
                multipleCaraslPresupuestoOrt.removeActiveItems()
                multiplePiezasPresupuestoOrt.removeActiveItems()
                
            }
            else {
                //$('#piezas_select').prop('disabled', false);
                //$('#caras_select').prop('disabled', false);
                multiplePiezasPresupuestoOrt.enable()
                multipleCaraslPresupuestoOrt.enable()
            }

            if(data.info.caras==1){
                multipleCaraslPresupuestoOrt.enable()
            }else{
                //$('#caras_select').prop('disabled', 'disabled');
                multipleCaraslPresupuestoOrt.disable()                
                multipleCaraslPresupuestoOrt.removeActiveItems()
            }

        },error: function(xhr) {

        }

    });


}

function addTratamientoControlOrtodoncia(){

    var idprocedimiento = $("#ort_busq_presupuesto").val()
    var tratamiento_desc = $("#ort_busq_presupuesto").text()
    var valor = $("#ort_valorProcPresupuesto").val()    
    var piezas = $("#ort_piezas_select_presupuesto").val();
    var zona = $("#ort_caras_select_presupuesto").val();


    var rowCount = parseInt($('#tb_ort_procedimientos_control >tbody >tr').length) + 1;
    var option
    zona  = (zona.length>0)?zona.toString():'';

    if(piezas.length>0){
        for (let i = 0; i < piezas.length; i++) {

            var option = "<button class='btn btn-sm btn-danger' onclick='deleteRowControlOrt("+rowCount+")'><i class='fas fa-trash-alt'></i></button>"
            $("#tb_ort_procedimientos_control").append("<tr id='tr_ort_adicional_"+rowCount+"'><td>"+tratamiento_desc.trim()+"</td><td>"+piezas[i]+"</td><td>"+zona+"</td><td align='center' style='color:green; font-size:15px; font-weight:bold'>"+valor+"</td><td align='center' style='color:red; font-size:15px; font-weight:bold'>0.00</td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+valor+"</td><td style='display:none'>"+idprocedimiento+"</td><td style='display:none'>PROCEDIMIENTO</td><td class='text-end'>"+option+"</td></tr>");
            rowCount = parseInt($('#tb_ort_procedimientos_control >tbody >tr').length) + 1;

          }
    }else{

        var option = "<button class='btn btn-sm btn-danger' onclick='deleteRowControlOrt("+rowCount+")'><i class='fas fa-trash-alt'></i></button>"
        $("#tb_ort_procedimientos_control").append("<tr id='tr_ort_adicional_"+rowCount+"'><td>"+tratamiento_desc.trim()+"</td><td></td><td>"+zona+"</td><td align='center' style='color:green; font-size:15px; font-weight:bold'>"+valor+"</td><td align='center' style='color:red; font-size:15px; font-weight:bold'>0.00</td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+valor+"</td><td style='display:none'>"+idprocedimiento+"</td><td style='display:none'>PROCEDIMIENTO</td><td class='text-end'>"+option+"</td></tr>");
    }
    

    //sumTotalesFact()
}


function deleteRowControlOrt(idtr){
    $('#tr_ort_adicional_'+idtr).remove(); 
    sumTotalesFact()
}


/*  INSERT PROCEDIMIENTO REALIZADO EN CONTROL ORTODONCIA */
function insertProcedimientoControlOrt(){

    var idpaciente  = $("#hidpaciente").val()
    var iddoctor    = $("#edit-ort-trata-medico").val()
    var idortodoncia = $("#hidortodoncia").val()
    var idclinica   = $("#edit-ort-trata-clinica").val()
    var idpcuenta = $("#hort-idpcuenta").val()
    var fecha       = $("#edit-ort-trata-fecha-realiza").val()
    
    var idprocedimiento = $("#ort_busq_presupuesto").val()
    var tratamiento_desc = $("#ort_busq_presupuesto").text()
    var valor = $("#ort_valorProcPresupuesto").val()    
    var piezas = $("#ort_piezas_select_presupuesto").val();
    var caras = $("#ort_caras_select_presupuesto").val();
   


    if(fecha=='' || idprocedimiento=='' || idprocedimiento==null){
        toast_msg('error','Por favor, llene todos los campos')
        return;
    }

    if(idclinica==''){
        toast_msg('error','Por favor, seleccione una Clinica')
        return;
    }

    if(iddoctor==''){
        toast_msg('error','Por favor, seleccione un Doctor')
        return;
    }

    $.ajax({
        type: "POST",
        url : baseUrl+'/insertProcedControlOrtodoncia',
        data: {
            idclinica: idclinica,
            idpaciente: idpaciente,
            idortodoncia: idortodoncia,
            idpcuenta: idpcuenta,
            fecha: fecha,
            idproce: idprocedimiento,
            tratamiento_desc: tratamiento_desc.trim(),
            valor: valor,
            piezas: piezas,
            caras: caras,
            iddoctor: iddoctor
        },
        beforeSend: function(){
           
            $(".btn_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            
            $(".btn_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data)
        {
           
            if(data.info.action==1){
                
                sweetMsg('success', data.info.msg)
                multiplePiezasPresupuestoOrt.enable()
                multipleCaraslPresupuestoOrt.enable()                
                multipleCaraslPresupuestoOrt.removeActiveItems()
                multiplePiezasPresupuestoOrt.removeActiveItems()
                $("#ort_busq_presupuesto").empty()               
                $("#ort_valorProcPresupuesto").val('')

                var idpcuenta = $("#hort-idpcuenta").val()
                var idortodoncia = $("#hort-idortodoncia").val()
                var idcita = $("#hort-idcita").val()
                var iddoctor = $("#edit-ort-trata-medico").val()
                openCanvasInsertControlOrt(idpcuenta, idortodoncia, iddoctor, idcita, false)

            }else
                sweetMsg('error', data.info.msg)
            
            
            console.log(data)
        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });

}


function storeTblValuesProceControl(){
    var TableData = new Array();
    var item_table;
   
    $('#tb_ort_procedimientos_control > tbody  > tr').each(function(row, tr){
        item_table =  $(tr).find('td:eq(0)').text();       
        if(item_table!='' || item_table!='Totales:') {

            TableData[row] = {
                "procedimiento": $(tr).find('td:eq(0)').text(),
                "piezas": $(tr).find('td:eq(1)').text(),
                "zonas": $(tr).find('td:eq(2)').text(),
                "precio": $(tr).find('td:eq(3)').text(),
                "desc": $(tr).find('td:eq(4)').text(),
                "total": $(tr).find('td:eq(5)').text(),
                
                "id": $(tr).find('td:eq(6)').text(),
                "tipo": $(tr).find('td:eq(7)').text(),
              
            }
            //console.log(TableData[row]);
        }

    });

    //TableData.shift();
    //console.log(TableData);
    return TableData;
}