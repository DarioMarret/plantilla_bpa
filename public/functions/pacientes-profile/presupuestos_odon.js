
// Chocies Select plugin
var multiplePiezasPresupuesto = new Choices('#piezas_select_presupuesto',{
    removeItemButton: true,
    duplicateItemsAllowed: false,
  }
);


var multipleCaraslPresupuesto = new Choices(
    '#caras_select_presupuesto',
    {
      removeItemButton: true,
    }
  );



$(document).ready(function(){

    $('#tratamientos_busq_presupuesto').select2({
        placeholder: 'Digite el Tratamiento a Realizar',
        minimumInputLength: 3,
        dropdownParent: $("#canvasIngresoPresupuestos"),
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


function openCreatePresupuesto(){
    $("#canvasIngresoPresupuestos").offcanvas().offcanvas("toggle");
}

 function emtyFliedPresupuesto(){

    $("#tb_pres_trata_pendientes tbody").empty()
    $("#tb_odon_presupuesto tbody").empty()
    $("#tratamientos_busq_presupuesto").empty()
    $("#sp_odon_total_precio").text('00.00')
    $("#sp_odon_total_desc").text('00.00')
    $("#sp_odon_total_presupuesto").text('00.00')
 }


function getTratramientosPendientes(){
    
    $("#sp_title_presupuesto").text('Crear Presupuesto')
    $("#btn_update_presupuesto").hide()
    $("#btn_insert_presupuesto").show()

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadProcedimientosPaciente',
        data: {
          idpaciente: $("#hidpaciente").val(), 
          estado:'Pendiente'
        },
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
           
            emtyFliedPresupuesto()
            sec = 1;
            $.each(data.info, function(index, v) {

                if(v.idpresupuesto == null && v.estado_pago=='S'){
                
                    precio = v.precio
                    descuento = v.descuento
                    total = v.total

                    option = "<button class='btn btn-sm btn-info' onclick='addTratamientoExistente("+v.idtratamiento+")'><i class='fas fa-plus'></i></button>"

                    $("#tb_pres_trata_pendientes").append("<tr style='background-color:"+v.row_color+"'><td>"+v.clinica+"</td><td><div class='text-muted'><span id='trat_tipop_"+v.idtratamiento+"'>"+v.tipoprocedimiento+"</span></div><span id='trat_procedimiento_"+v.idtratamiento+"'>"+v.procedimiento+"</span></td><td><span id='trat_pieza_"+v.idtratamiento+"'>"+(v.pieza?? "")+"</span></td><td style='background-color:"+v.color+"; color:white'><span id='trat_zona_"+v.idtratamiento+"'>"+(v.zona?? "")
                                    +"</span></td><td align='center' style='color:green; font-size:15px; font-weight:bold'><span id='trat_precio_"+v.idtratamiento+"'>"+precio+"</span></td><td align='center' style='color:red; font-size:15px; font-weight:bold'><span id='trat_descuento_"+v.idtratamiento+"'>"+descuento+"</span></td><td align='center' style='color:blue; font-size:15px; font-weight:bold'><span id='trat_total_"+v.idtratamiento+"'>"+total+"</span></td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</span><br><span class='badge bg-info'>"+v.fecha_diagnostico+"</span></td><td align='left'>"+option+"</td></tr>")
                    sec++;
                }
            });

            openCreatePresupuesto()

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function getInfoProcPresupuesto(value){

    var idproc  = value.value;

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoProcedOdont',
        data: {
            idclinica: $("#p_idclinica_odont").val(),
            idprocedimiento: idproc
        },
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },success: function (data) {

            //$("#tipo_aplica").val(data.info.tipo)
            $("#valorProcPresupuesto").val(data.info.precio)

            if(data.info.activate==1) {
                
                multiplePiezasPresupuesto.disable()
                multipleCaraslPresupuesto.disable()                
                multipleCaraslPresupuesto.removeActiveItems()
                multiplePiezasPresupuesto.removeActiveItems()
                
            }
            else {
                //$('#piezas_select').prop('disabled', false);
                //$('#caras_select').prop('disabled', false);
                multiplePiezasPresupuesto.enable()
                multipleCaraslPresupuesto.enable()
            }

            if(data.info.caras==1){
                multipleCaraslPresupuesto.enable()
            }else{
                //$('#caras_select').prop('disabled', 'disabled');
                multipleCaraslPresupuesto.disable()                
                multipleCaraslPresupuesto.removeActiveItems()
            }

        },error: function(xhr) {

        }

    });


}


function addTratamientoPresupuesto(){

    var idprocedimiento = $("#tratamientos_busq_presupuesto").val()
    var tratamiento_desc = $("#tratamientos_busq_presupuesto").text()
    var valor = $("#valorProcPresupuesto").val()    
    var piezas = $("#piezas_select_presupuesto").val();
    var zona = $("#caras_select_presupuesto").val();


    var rowCount = parseInt($('#tb_odon_presupuesto >tbody >tr').length) + 1;
    var option
    zona  = (zona.length>0)?zona.toString():'';

    if(piezas.length>0){
        for (let i = 0; i < piezas.length; i++) {

            var option = "<button class='btn btn-sm btn-danger' onclick='deleteRowPresupuesto("+rowCount+")'><i class='fas fa-trash-alt'></i></button>"
            $("#tb_odon_presupuesto").append("<tr id='tr_prep_"+rowCount+"'><td>"+tratamiento_desc.trim()+"</td><td>"+piezas[i]+"</td><td>"+zona+"</td><td align='center' style='color:green; font-size:15px; font-weight:bold'>"+valor+"</td><td align='center' style='color:red; font-size:15px; font-weight:bold'>0.00</td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+valor+"</td><td style='display:none'>"+idprocedimiento+"</td><td style='display:none'>PROCEDIMIENTO</td><td class='text-end'>"+option+"</td></tr>");
            rowCount = parseInt($('#tb_odon_presupuesto >tbody >tr').length) + 1;

          }
    }else{

        var option = "<button class='btn btn-sm btn-danger' onclick='deleteRowPresupuesto("+rowCount+")'><i class='fas fa-trash-alt'></i></button>"
        $("#tb_odon_presupuesto").append("<tr id='tr_prep_"+rowCount+"'><td>"+tratamiento_desc.trim()+"</td><td></td><td>"+zona+"</td><td align='center' style='color:green; font-size:15px; font-weight:bold'>"+valor+"</td><td align='center' style='color:red; font-size:15px; font-weight:bold'>0.00</td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+valor+"</td><td style='display:none'>"+idprocedimiento+"</td><td style='display:none'>PROCEDIMIENTO</td><td class='text-end'>"+option+"</td></tr>");
    }
    

    sumTotalesFact()
}


function addTratamientoExistente(idtratamiento){

    var validation = false
    var idcomparar, tipo

    $('#tb_odon_presupuesto  tr').each(function(row, tr){
        idcomparar = $(tr).find('td:eq(6)').text()
        tipo = $(tr).find('td:eq(7)').text()
        console.log(idcomparar)        
        if(idtratamiento==idcomparar && tipo=='TRATAMIENTO') validation = true
    });

    if(validation==true){
        toast_msg('error', 'Tratamiento ya se encuentra en la lista')
        return;
    }

    var tipoprocedimiento = $("#trat_tipop_"+idtratamiento).text()
    var procedimiento = $("#trat_procedimiento_"+idtratamiento).text()
    var pieza = $("#trat_pieza_"+idtratamiento).text()
    var zona = $("#trat_zona_"+idtratamiento).text()
    var valor = $("#trat_precio_"+idtratamiento).text()
    var descuento = $("#trat_descuento_"+idtratamiento).text()
    var total =  $("#trat_total_"+idtratamiento).text()

    var rowCount = parseInt($('#tb_odon_presupuesto >tbody >tr').length) + 1;
    var option = "<button class='btn btn-sm btn-danger' onclick='deleteRowPresupuesto("+rowCount+")'><i class='fas fa-trash-alt'></i></button>"
    $("#tb_odon_presupuesto").append("<tr id='tr_prep_"+rowCount+"'><td>"+tipoprocedimiento+"-"+procedimiento+"</td><td>"+pieza+"</td><td>"+zona+"</td><td align='center' style='color:green; font-size:15px; font-weight:bold'>"+valor+"</td><td align='center' style='color:red; font-size:15px; font-weight:bold'>"+descuento+"</td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+total+"</td><td style='display:none'>"+idtratamiento+"</td><td style='display:none'>TRATAMIENTO</td><td class='text-end'>"+option+"</td></tr>");

    sumTotalesFact()
}


function deleteRowPresupuesto(idtr){
    $('#tr_prep_'+idtr).remove(); 
    sumTotalesFact()
}



function aplicarDescPresOdon(){

    var TableData = new Array();
    var valor_desc = $("#aplicar_procentaje").val();
    var item_table;
    var cant=0, valor=0, desc=0, subtotal=0, iva=0, total=0, pagar=0, pend=0
    var aplica_iva=1

    if(parseFloat(valor_desc)>100 ){
        toast_msg('error',  'No puede generar descuento')
        return
    }

    $('#tb_odon_presupuesto > tbody  > tr').each(function(row, tr){
        item_table =  $(tr).find('td:eq(0)').text();
        //console.log('Csdsdant ' +item_table)
        if(item_table!='' || item_table!='Totales:') {

            precio  = $(tr).find('td:eq(3)').text()            
            desc =  ((parseFloat(precio) * parseFloat(valor_desc))/100)
            $(tr).find('td:eq(4)').text(desc.toFixed(2))
           
            total = (parseFloat(precio)-parseFloat(desc)) 
            $(tr).find('td:eq(5)').text(total.toFixed(2))                    
            
        }
    });

    $("#haplicar_porcentaje").val(valor_desc)

    sumTotalesFact()
}




function sumTotalesFact(){

    var TableData = new Array();
    var total = 0;
    var item_table;
    var cant=0, valor=0, desc=0, subtotal=0, iva=0, total=0, pagar=0, pend=0

    $('#tb_odon_presupuesto > tbody  > tr').each(function(row, tr){
        item_table =  $(tr).find('td:eq(0)').text();        
        if(item_table!='' || item_table!='Totales:') {
            valor   = parseFloat($(tr).find('td:eq(3)').text()) + parseFloat(valor)
            desc    = parseFloat($(tr).find('td:eq(4)').text()) + parseFloat(desc)
            total   = parseFloat($(tr).find('td:eq(5)').text()) + parseFloat(total)
        }
    });

    console.log('total desc: '+desc)
    desc = (desc==null || desc=='' || desc=='NaN' || desc==NaN)?parseFloat(0.00):desc


    $("#sp_odon_total_precio").text(valor.toFixed(2))
    $("#sp_odon_total_desc").text(desc.toFixed(2))
    $("#sp_odon_total_presupuesto").text(total.toFixed(2))
    


}


function loadPresupuestosOdonto(){

    var idpaciente = $("#hidpaciente").val()

    $.ajax({
        type: "POST",
        url : baseUrl+'/ltsPresupuestosOdon',
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
            $("#tb_presupuestos_odont tbody").empty()
            //console.log(data); // show response from the php script.
            sec = 1;
            
            $.each(data.info, function(index, v) {

                if(v.estado=='Pendiente'){
                    var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                            '   <div class="dropdown-menu">\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="aprobarPresupuesto('+v.idpresupuesto+', '+v.idclinica+')">Aprobar</a>\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="getinfoPresupuesto('+v.idpresupuesto+', '+v.idclinica+')">Editar</a>\n' +                            
                            '   <a class="dropdown-item" href="javascript:;" onclick="eliminarPresupuesto('+v.idpresupuesto+', '+v.idclinica+')">Eliminar</a>\n' +
                            '   <div class="dropdown-divider"></div>\n' +
                            '   <a class="dropdown-item" href="../presupuestoPrint/'+idpaciente+'/'+v.idpresupuesto+'/'+v.idclinica+'" target="_blank">Imprimir</a>\n' +
                            '   </div></div>';
                }else{
                    var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                            '   <div class="dropdown-menu">\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="DesactivarPresupuesto('+v.idpresupuesto+', '+v.idclinica+')">Desactivar</a>\n' +                            
                            '   <a class="dropdown-item" href="javascript:;" onclick="atenderProcePresupuesto('+v.idpresupuesto+', '+v.idclinica+')">Atender</a>\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="eliminarPresupuesto('+v.idpresupuesto+', '+v.idclinica+')">Eliminar</a>\n' +
                            '   <div class="dropdown-divider"></div>\n' +
                            '   <a class="btn btn-sm btn-soft-primary waves-effect waves-light ml-2" style="margin-right:10px" href="../presupuestoPrint/'+idpaciente+'/'+v.idpresupuesto+'/'+v.idclinica+'" target="_blank" "=""><i class="fas fa-user-edit font-size-16 align-middle"></i></a>\n' +
                            '   </div></div>';
                }
                
               //option_print = '<a class="btn btn-sm btn-soft-primary waves-effect waves-light ml-2" style="margin-right:10px" href="../presupuestoPrint/'+idpaciente+'/'+v.idpresupuesto+'/'+v.idclinica+'" target="_blank" "=""><i class="fas fa-user-edit font-size-16 align-middle"></i></a>' 

               total = parseFloat(v.valor) - parseFloat(v.descuento);

                $("#tb_presupuestos_odont").append("<tr style='background-color:"+v.row_color+"'><td align='center'>"+sec+"</td><td>"+v.date_insert+"</td><td id='td_nombre_"+v.idpresupuesto+"'>"+v.numero_presupuesto+"</td><td class='text-center' style='color:green; font-size:18px; font-weight:bold'>"+v.total_tratamientos+"</td><td class='text-center' style='color:red; font-size:18px; font-weight:bold'>"+v.total_realizados+"</td><td align='center' style='color:green; font-size:18px; font-weight:bold'>"+(v.valor?? "")+"</td>"
                                +"<td align='center' style='color:red; font-size:18px; font-weight:bold'>"+v.descuento+"</td><td align='center' style='color:blue; font-size:18px; font-weight:bold'>"+(total.toFixed(2) ?? "")+"</td><td align='center'><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</td><td align='left'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function aprobarPresupuesto(idpresupuesto, idclinica){

    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Aprobar el Presupuesto?',
        //text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, aprobar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/confirmarPresupuestoOdon',
                data: {
                    idpaciente: $("#hidpaciente").val(),                                   
                    idpresupuesto: idpresupuesto,
                    idclinica: idclinica,
                    estado: 'Aprobado'
                
                },
                beforeSend: function(){
                     $(".btnSppinAjax").show()
                    $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    $(".btnSppinAjax").hide()
                    $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function(data){

                    if(data.info.action==1){
                        swalWithBootstrapButtons.fire(
                            'Presupueto Aprobado con Exito!',
                            data.info.msg,
                            'success'
                        )
                        
                        loadPresupuestosOdonto()
                        


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


function getinfoPresupuesto(idpresupuesto, idclinica){

    $("#hidpresupuesto").val(idpresupuesto)
    emtyFliedPresupuesto()

    num_presupuesto = $("#td_nombre_"+idpresupuesto).text()
    $("#sp_title_presupuesto").text('Editar Presupuesto - '+num_presupuesto)
    $("#btn_update_presupuesto").show()
    $("#btn_insert_presupuesto").hide()

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoPresupuesto',
        data: {
          idpaciente: $("#hidpaciente").val()  ,
          idpresupuesto: idpresupuesto,
          estado:'Pendiente'
        },
        beforeSend: function(){
            $(".sp_loading_paciente").show();
        },
        complete: function(){
            $(".sp_loading_paciente").hide();
        },
        success: function(data)
        {   
            
            rowCount = 1;
            
            $.each(data.info, function(index, v) {

               
               total = parseFloat(v.precio) - parseFloat(v.descuento);

               var option = "<button class='btn btn-sm btn-danger' onclick='deleteRowPresupuesto("+rowCount+")'><i class='fas fa-trash-alt'></i></button>"
               $("#tb_odon_presupuesto").append("<tr id='tr_prep_"+rowCount+"'><td>"+v.detalle.trim()+"</td><td>"+v.piezas+"</td><td>"+v.zonas+"</td><td align='center' style='color:green; font-size:15px; font-weight:bold'>"+v.precio+"</td><td align='center' style='color:red; font-size:15px; font-weight:bold'>"+v.descuento+"</td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+total.toFixed(2)+"</td><td style='display:none'>"+v.id+"</td><td style='display:none'>"+v.tipo+"</td><td class='text-end'>"+option+"</td></tr>");
                
               rowCount++;
            });

            sec = 1;
            $.each(data.trat, function(index, v) {

                precio = v.precio
                descuento = v.descuento
                total = v.total

                option = "<button class='btn btn-sm btn-info' onclick='addTratamientoExistente("+v.idtratamiento+")'><i class='fas fa-plus'></i></button>"

                $("#tb_pres_trata_pendientes").append("<tr style='background-color:"+v.row_color+"'><td>"+v.clinica+"</td><td><div class='text-muted'><span id='trat_tipop_"+v.idtratamiento+"'>"+v.tipoprocedimiento+"</span></div><span id='trat_procedimiento_"+v.idtratamiento+"'>"+v.procedimiento+"</span></td><td><span id='trat_pieza_"+v.idtratamiento+"'>"+(v.pieza?? "")+"</span></td><td style='background-color:"+v.color+"; color:white'><span id='trat_zona_"+v.idtratamiento+"'>"+(v.zona?? "")
                                +"</span></td><td align='center' style='color:green; font-size:15px; font-weight:bold'><span id='trat_precio_"+v.idtratamiento+"'>"+precio+"</span></td><td align='center' style='color:red; font-size:15px; font-weight:bold'><span id='trat_descuento_"+v.idtratamiento+"'>"+descuento+"</span></td><td align='center' style='color:blue; font-size:15px; font-weight:bold'><span id='trat_total_"+v.idtratamiento+"'>"+total+"</span></td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</span><br><span class='badge bg-info'>"+v.fecha_diagnostico+"</span></td><td align='left'>"+option+"</td></tr>")
                sec++;
            });

            

            sumTotalesFact()

            openCreatePresupuesto()

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
    

}


function openAtenderPresupuesto(){
    
    $("#canvasAtenderPresupuestos").offcanvas().offcanvas("toggle");

}


function atenderProcePresupuesto(idpresupuesto, idclinica){

    $("#hidpresupuesto").val(idpresupuesto)
    emtyFliedPresupuesto()

    num_presupuesto = $("#td_nombre_"+idpresupuesto).text()
    $("#sp_title_presupuesto_insert").text('Atender Presupuesto - '+num_presupuesto)
    $("#btn_update_presupuesto_atender").show()
    $("#btn_insert_presupuesto_atender").hide()

    $.ajax({
        type: "POST",
        url : baseUrl+'/AtenderPresupuestoOdon',
        data: {
          idpaciente: $("#hidpaciente").val()  ,
          idpresupuesto: idpresupuesto,
          estado:'Pendiente'
        },
        beforeSend: function(){
            $(".sp_loading_paciente").show();
        },
        complete: function(){
            $(".sp_loading_paciente").hide();
        },
        success: function(data)
        {   
            $("#tb_odon_presupuesto_atender tbody").empty()
            $("#tb_odon_presupuesto_realizados tbody").empty()
                        
            sec = 1;
            rowCount = 1
            $.each(data.pendientes, function(index, v) {

                
                if(v.estado=='P'){
                    total = parseFloat(v.precio) - parseFloat(v.descuento);
                
                    var info = JSON.stringify(v)
                    var option = "<button class='btn btn-sm btn-success' onclick='showProceAtenderPresupuesto("+rowCount+", "+info+")'>ATENDER <i class='fas fa-angle-double-right'></i></button>"
                    $("#tb_odon_presupuesto_atender").append("<tr id='tr_prep_"+rowCount+"'><td>"+v.detalle.trim()+"<br><span class='text-muted'>"+v.piezas+"</span><br><span class='text-muted'>"+v.zonas+"</span></td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+total.toFixed(2)+"</td><td style='display:none'>"+v.id+"</td><td style='display:none'>"+v.tipo+"</td><td class='text-end'>"+option+"</td></tr>");
                     
                   
                }else{
                    total = parseFloat(v.precio) - parseFloat(v.descuento);
                                   
                    var option =''
                    $("#tb_odon_presupuesto_realizados").append("<tr id='tr_prep_"+rowCount+"'><td>"+v.detalle.trim()+"<br><span class='text-muted'>"+v.piezas+"</span><br><span class='text-muted'>"+v.zonas+"</span></td><td align='center' style='color:blue; font-size:15px; font-weight:bold'>"+total.toFixed(2)+"</td><td style='display:none'>"+v.id+"</td><td style='display:none'>"+v.tipo+"</td><td class='text-end'>"+option+"</td></tr>");
                     
                   
                }

                rowCount++;
               
             });

                   

            openAtenderPresupuesto()

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
    

}


function showProceAtenderPresupuesto(param1, info){

    //console.log(info)
    document.getElementById("form-atender-presupuesto-presupuestos").reset();

    $("#title-atender-presupuesto").text(info.detalle)

    $("#hiddetalle_presupuesto").val(info.iddetalle)
    $("#hidtratamiento_presupuesto").val(info.idtratamiento)

}


function updateProcedimientoPresupuesto(){

    var iddetalle = $("#hiddetalle_presupuesto").val()
    var idtratamiento = $("#hidtratamiento_presupuesto").val()
    var idpresupuesto = $("#hidpresupuesto").val()

    var iddoctor = $("#aten-trata-presu-medico").val()
    var fecha = $("#aten-trata-presu-fecha-realiza").val()
    var diagnostico = $("#aten-trata-presu-diagnostico").val()

    
    $.ajax({
        type: "POST",
        url : baseUrl+'/updateProcePresupuestoOdon',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idpresupuesto:idpresupuesto,
            iddetalle: iddetalle, 
            idtratamiento: idtratamiento, 
            iddoctor: iddoctor,
            fecha: fecha, 
            diagnostico: diagnostico
             
        },
        beforeSend: function(){
             $(".btnSppinAjax").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){

            if(data.info.action==1){
                sweetMsg('success', data.info.msg)         
                atenderProcePresupuesto(idpresupuesto)
                document.getElementById("form-atender-presupuesto-presupuestos").reset();
                //openCreatePresupuesto()


            }else{
                toast_msg('error',  data.info.msg)
                return
            }


        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });

}



function actualizarPresupuestoOdont(){

    var TableDataPre;
    TableDataPre = storeTblValuesPresupuestoOdon();
    if(TableDataPre.length<=0){
        toast_msg('error', 'Por favor ingrese tratamientos en el presupuesto')                
        return;
    }

    TableDataPre = $.toJSON(TableDataPre);


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Actualizar el Presupuesto?',
        text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, actualizar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/updatePresupuestoOdon',
                data: {
                    idpaciente: $("#hidpaciente").val(),
                    //idpresupuesto: $("#haplicar_porcentaje").val(),  
                    idclinica: $("#presupuesto_idclinica").val(),                  
                    procedimientos: TableDataPre,
                    idpresupuesto: $("#hidpresupuesto").val()                
                },
                beforeSend: function(){
                     $(".btnSppinAjax").show()
                    $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    $(".btnSppinAjax").hide()
                    $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function(data){

                    if(data.info.action==1){
                        swalWithBootstrapButtons.fire(
                            'Presupueto Actualizado con Exito!',
                            data.info.msg,
                            'success'
                        )
                        
                        loadPresupuestosOdonto()
                        openCreatePresupuesto()


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



function eliminarPresupuesto(idpresupuesto, idclinica){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar el Presupuesto?',
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
                url : baseUrl+'/deletePresupuesto',
                data: {
                    idpresupuesto: idpresupuesto,
                    idpaciente: $("#hidpaciente").val(),
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
                            'Presupuesto Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        loadPresupuestosOdonto()

                    }else{
                        //toast_msg('error',  data.info.msg)
                        swalWithBootstrapButtons.fire(
                            'Error!',
                            data.info.msg,
                            'error'
                        )
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



function DesactivarPresupuesto(idpresupuesto, idclinica){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Desactivar el Presupuesto?',
        //text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, desactivar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/desactivarPresupuesto',
                data: {
                    idpresupuesto: idpresupuesto,
                    idpaciente: $("#hidpaciente").val(),
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
                            'Presupuesto Modificado!',
                            data.info.msg,
                            'success'
                        )
                        loadPresupuestosOdonto()

                    }else{
                        //toast_msg('error',  data.info.msg)
                        swalWithBootstrapButtons.fire(
                            'Error!',
                            data.info.msg,
                            'error'
                        )
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


function storeTblValuesPresupuestoOdon(){
    var TableData = new Array();
    var item_table;
   
    $('#tb_odon_presupuesto > tbody  > tr').each(function(row, tr){
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


function guardarPresupuestoOdont(){

    var TableDataPre;
    TableDataPre = storeTblValuesPresupuestoOdon();
    if(TableDataPre.length<=0){
        toast_msg('error', 'Por favor ingrese tratamientos en el presupuesto')                
        return;
    }

    TableDataPre = $.toJSON(TableDataPre);


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Guardar el Presupuesto?',
        //text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/insertPresupuestoOdon',
                data: {
                    idpaciente: $("#hidpaciente").val(),
                    idclinica: $("#presupuesto_idclinica").val(),
                    porc_desc: $("#haplicar_porcentaje").val(),                    
                    procedimientos: TableDataPre,
                    

                },
                beforeSend: function(){
                     $(".btnSppinAjax").show()
                    $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    $(".btnSppinAjax").hide()
                    $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function(data){

                    if(data.info.action==1){
                        swalWithBootstrapButtons.fire(
                            'Presupueto Creado con Exito!',
                            data.info.msg,
                            'success'
                        )
                        
                        loadPresupuestosOdonto()
                        openCreatePresupuesto()


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