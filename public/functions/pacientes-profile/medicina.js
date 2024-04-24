$(document).ready(function(){

    
 
    flatpickr('#i_c_fecha');
    flatpickr('#e_c_fecha');

    emptyFormsInsertCosulta()
    emptyFormsEditCosulta()

    $('#i_c_diagnosticos').select2({
        placeholder: 'Digite Diagnostico',
        minimumInputLength: 3,
        ajax: {
          url: baseUrl+'/bqdCodigosCie',
          dataType: 'json',
          type: 'POST',
          delay: 200,
          data: function (params) {
            var query = {
              search: params.term
               
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

      $('#i_c_procedimientos').select2({
        placeholder: 'Digite el Procedimiento Realiazado',
        minimumInputLength: 3,
        ajax: {
          url: baseUrl+'/bqdTratamietos',
          dataType: 'json',
          type: 'POST',
          delay: 200,
          data: function (params) {
            var query = {
              search: params.term,
              idclinica: $("#i_c_clinica").val(),              
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


    /////////////////EDITAR CONSULTA ////////////////////////
    $('#e_c_diagnosticos').select2({
        placeholder: 'Digite Diagnostico',
        minimumInputLength: 3,
        dropdownParent: $("#offcanvasEditConsulta"),
        ajax: {
          url: baseUrl+'/bqdCodigosCie',
          dataType: 'json',
          type: 'POST',
          delay: 200,
          data: function (params) {
            var query = {
              search: params.term
               
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


      $('#e_c_procedimientos').select2({
        placeholder: 'Digite el Procedimiento Realiazado',
        minimumInputLength: 3,
        dropdownParent: $("#offcanvasEditConsulta"),
        ajax: {
          url: baseUrl+'/bqdTratamietos',
          dataType: 'json',
          type: 'POST',
          delay: 200,
          data: function (params) {
            var query = {
              search: params.term,
              idclinica: $("#i_c_clinica").val(),              
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

});


function emptyFormsInsertCosulta(){

    $("#i_c_doctor").val('')
    $("#i_c_motivo").val('')
    $("#i_c_enfermedad").val('')

    $("#i_c_temperatura").val('')
    $("#i_c_pulso").val('') 
    $("#i_c_peso").val('')
    $("#i_c_oxigeno").val('')
    $("#i_c_presion").val('')
    $("#i_c_respiratoria").val('')
    $("#i_c_talla").val('')
    $("#i_c_imc").val('')

    $("#i_c_medicamentos").val('')
    $("#i_c_med_indicaciones").val('')

    $("#tb_i_diagnostico tbody").empty()
    $("#i_c_diagnosticos").empty()
    $("#i_c_coment_diag").val('')

    $("#tb_i_procedimientos tbody").empty()
    $("#i_c_procedimientos").empty()
    $("#i_c_proc_precio").val('')
    $("#i_c_coment_proce").val('')
}


function emptyFormsEditCosulta(){

    $("#e_c_doctor").val('')
    $("#e_c_motivo").val('')
    $("#e_c_enfermedad").val('')

    $("#e_c_temperatura").val('')
    $("#e_c_pulso").val('') 
    $("#e_c_peso").val('')
    $("#e_c_oxigeno").val('')
    $("#e_c_presion").val('')
    $("#e_c_respiratoria").val('')
    $("#e_c_talla").val('')
    $("#e_c_imc").val('')

    $("#e_c_medicamentos").val('')
    $("#e_c_med_indicaciones").val('')

    $("#tb_e_diagnostico tbody").empty()
    $("#e_c_diagnosticos").empty()
    $("#e_c_coment_diag").val('')

    $("#tb_e_procedimientos tbody").empty()
    $("#e_c_procedimientos").empty()
    $("#e_c_proc_precio").val('')
    $("#e_c_coment_proce").val('')
}

function getLstConsultas(){

    //$("#tb_consultas_pacientes tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadConsultasPacientes',
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
            $("#tb_consultas_pacientes tbody").empty()
            //console.log(data); // show response from the php script.
            sec = 1;
            var signos, diagnosticos, procedimientos, recetas
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                            '   <div class="dropdown-menu">\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="getInfoConsulta('+v.idconsulta+', '+v.idclinica+')">Editar</a>\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="eliminarConsulta('+v.idconsulta+', '+v.idclinica+')">Eliminar</a>\n' +
                            '   <div class="dropdown-divider"></div>\n' +
'                           </div></div>';

                if(v.signos>=1) signos = '<i class="fas fa-check fa-lg" style="color:green"></i>'
                else  signos = '<i class="fas fa-times-circle fa-lg" style="color:red"></i>'

                if(v.diagnosticos>=1) diagnosticos = '<i class="fas fa-check fa-lg" style="color:green"></i>'
                else  diagnosticos = '<i class="fas fa-times-circle fa-lg" style="color:red"></i>'

                if(v.procedimientos>=1) procedimientos = '<i class="fas fa-check fa-lg" style="color:green"></i>'
                else  procedimientos = '<i class="fas fa-times-circle fa-lg" style="color:red"></i>'

                if(v.recetas>=1) recetas = '<i class="fas fa-check fa-lg" style="color:green"></i>'
                else  recetas = '<i class="fas fa-times-circle fa-lg" style="color:red"></i>'


                $("#tb_consultas_pacientes").append("<tr style='background-color:"+v.row_color+"'><td align='center'>"+sec+"</td><td>"+v.fecha_consulta+"</td><td>"+v.clinica+"</td><td>"+(v.doctor?? "")+"</td>"
                                +"<td align='center'>"+signos+"</td><td align='center'>"+(diagnosticos ?? "")+"</td><td align='center'>"+procedimientos+"</td><td align='center'>"+recetas+"</td><td align='center'>"+v.valor+"</td><td align='left'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function eliminarConsulta(idconsulta, idclinica){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar la Consulta?',
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
                url : baseUrl+'/deleteConsultasPacientes',
                data: {     
                    idpaciente: $("#hidpaciente").val(),           
                    idconsulta: idconsulta,
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
                            'Consulta Eliminada!',
                            data.info.msg,
                            'success'
                        )
                       getLstConsultas()

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

function addCiteConsulta(){

    var cie = $("#i_c_diagnosticos").val()
    var cid_desc = $("#i_c_diagnosticos").text()
    var observacion = $("#i_c_coment_diag").val()

    $("#tb_i_diagnostico").append('<tr id="tr_'+cie+'"><td style="display:none">'+cie+'</td><td>'+cid_desc+'</td><td>'+observacion+'</td><td><button class="btn btn-sm btn-danger" onclick="deleteTr(\''+cie+'\')"><i class="fas fa-trash"></i></button></td></tr>')

    $("#i_c_diagnosticos").empty()
    $("#i_c_coment_diag").val('')

}

function deleteTr(cie){
    $('#tr_'+cie).remove(); 
}


function getPrecioProc(value, action=true){

    var idproc  = value.value;

    $.ajax({
        type: "POST",
        url : baseUrl+'/getProcedimientoPrecio',
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
            
            if(action)
                $("#i_c_proc_precio").val(data.info[0].precio)
            else
                $("#e_c_proc_precio").val(data.info[0].precio)

        },error: function(xhr) {

        }

    });
}



function addProcedimientoConsulta(){

    var idproc = $("#i_c_procedimientos").val()
    var proc_desc = $("#i_c_procedimientos").text()
    var observacion = $("#i_c_coment_proce").val()
    var valor = $("#i_c_proc_precio").val()

    $("#tb_i_procedimientos").append('<tr id="tr_proc_'+idproc+'"><td style="display:none">'+idproc+'</td><td>'+proc_desc+'</td><td>'+valor+'</td><td>'+observacion+'</td><td><button class="btn btn-sm btn-danger" onclick="deleteTrProc('+idproc+')"><i class="fas fa-trash"></i></button></td></tr>')

    $("#i_c_procedimientos").empty()
    $("#i_c_proc_precio").val('')
    $("#i_c_coment_proce").val('')

}

function deleteTrProc(idproc){
    $('#tr_proc_'+idproc).remove(); 
}


function ingresoConsulta(){

    var idclinica   = $("#i_c_clinica").val()
    var fecha       = $("#i_c_fecha").val()
    var iddoctor    = $("#i_c_doctor").val()
    var motivo      = $("#i_c_motivo").val()
    var enfermedad  = $("#i_c_enfermedad").val()

    var temp        = $("#i_c_temperatura").val()
    var pulso       = $("#i_c_pulso").val() 
    var peso        = $("#i_c_peso").val()
    var oxigeno     = $("#i_c_oxigeno").val()
    var presion     = $("#i_c_presion").val()
    var f_respir    = $("#i_c_respiratoria").val()
    var talla       = $("#i_c_talla").val()
    var imc         = $("#i_c_imc").val()

    var receta      = $("#i_c_medicamentos").val()
    var indica      = $("#i_c_med_indicaciones").val()

    //DIAGNOSTICOS
    var TableData;
    TableData = storeTblValuesDiagnosticos();
    TableData = $.toJSON(TableData);

    var TableProce;
    TableProce = storeTblValuesProcedimientos();
    TableProce = $.toJSON(TableProce);


    if(iddoctor==''){
        toast_msg('error','Por favor seleccione un doctor')
        return;
    }


    if(motivo.length<=3){
        toast_msg('error','Por favor ingrese el motivo de consulta')
        return;
    }


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea ingresar la Consulta?',
        //text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Ingresar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/insertConsultaMedica',
                data: {
                  idpaciente: $("#hidpaciente").val(),
                  idclinica: idclinica,
                  fecha: fecha,
                  iddoctor: iddoctor,
                  motivo: motivo,
                  enfermedad: enfermedad,
                  
                  temp:temp,
                  pulso: pulso,
                  peso: peso,
                  oxigeno: oxigeno,
                  presion: presion,
                  f_respir: f_respir,
                  talla: talla,
                  imc: imc,
        
                  receta: receta,
                  indicaciones: indica,
        
                  TableData: TableData,
                  TableProce: TableProce
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
                    //console.log(data); // show response from the php script.
                    if(data.info.action==1){
                        toast_msg('success', data.info.msg)
                        emptyFormsInsertCosulta()
                        getLstConsultas()
                    }                
                    else
                        toast_msg('error', data.info.msg)
                    
        
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


function storeTblValuesDiagnosticos(){
    var TableData = new Array();

    $('#tb_i_diagnostico  tr').each(function(row, tr){
        TableData[row]={
            "cie" : $(tr).find('td:eq(0)').text(),            
            "observacion" : $(tr).find('td:eq(2)').text()
        }
    });
    TableData.shift();  // first row will be empty - so remove
    return TableData;
}



function storeTblValuesProcedimientos(){
    var TableData = new Array();

    $('#tb_i_procedimientos  tr').each(function(row, tr){
        TableData[row]={
            "idproc" : $(tr).find('td:eq(0)').text(),            
            "observacion" : $(tr).find('td:eq(3)').text()
        }
    });
    TableData.shift();  // first row will be empty - so remove
    return TableData;
}


/*
    EDITAR CONSULTA
*/

function openCanvasConsulta(){
    $("#offcanvasEditConsulta").offcanvas().offcanvas("toggle");
}


function tabGetInfoConsulta(){

    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()

    getInfoConsulta(idconsulta, idclinica, false)

}


function getInfoConsulta(idconsulta, idclinica, action=true){
    //$('#e-consulta-tab a').trigger('click');
    // $("#e-consulta-tab").trigger( "click" );
    $("#hidconsulta").val(idconsulta)
    $("#hidclinica").val(idclinica)

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoCitaPaciente',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica
        },  
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".sp_loading_paciente").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".sp_loading_paciente").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){

            emptyFormsEditCosulta()
            $("#e_c_clinica").val(data.info.idclinica)
            $("#e_c_fecha").val(data.info.fecha_consulta)
            $("#e_c_doctor").val(data.info.iddoctor)
            $("#e_c_motivo").val(data.info.motivo)
            $("#e_c_enfermedad").val(data.info.enfermedad)

            if(action){
                $(".nav-e-c").removeClass("active");
                $(".tab-e-c").removeClass("active");
                $(".tab-e-c").removeClass("show");
               
                $("#e-consulta").addClass("active");
                $("#e-consulta").addClass("show");
                $("#e-consulta-tab").addClass("active");
                openCanvasConsulta()
            } 

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
   

}


function updateInfoConsulta(){

    var idconsulta  = $("#hidconsulta").val()
    var fecha       = $("#e_c_fecha").val()
    var iddoctor    = $("#e_c_doctor").val()
    var motivo      = $("#e_c_motivo").val()
    var enfermedad  = $("#e_c_enfermedad").val()
    var idclinica   = $("#e_c_clinica").val()

    $.ajax({
        type: "POST",
        url : baseUrl+'/updateInfoCitaPaciente',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica,            
            fecha: fecha,
            iddoctor: iddoctor,
            motivo: motivo,
            enfermedad: enfermedad
        },  
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".btn_loading").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".btn_loading").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){

            //console.log(data)     
            toast_msg('success', data.info.msg)

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });

}



function getInfoSignosConsulta(){

    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoSignosPacienteConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica
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
           
            $("#e_c_temperatura").val(data.info.temperatura)
            $("#e_c_pulso").val(data.info.pulso)
            $("#e_c_peso").val(data.info.peso)
            $("#e_c_oxigeno").val(data.info.saturacion_oxigeno)
            $("#e_c_presion").val(data.info.presion_arterial)

            $("#e_c_respiratoria").val(data.info.frec_respiratoria)
            $("#e_c_talla").val(data.info.talla)
            $("#e_c_imc").val(data.info.imc)           

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}



function updateRecetaConsulta(){

    var idconsulta  = $("#hidconsulta").val()
    var idclinica   = $("#hidclinica").val()
   
    var temp        = $("#e_c_temperatura").val()
    var pulso       = $("#e_c_pulso").val() 
    var peso        = $("#e_c_peso").val()
    var oxigeno     = $("#e_c_oxigeno").val()
    var presion     = $("#e_c_presion").val()
    var f_respir    = $("#e_c_respiratoria").val()
    var talla       = $("#e_c_talla").val()
    var imc         = $("#e_c_imc").val()

    $.ajax({
        type: "POST",
        url : baseUrl+'/updateSignosConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica,            
           
            temp:temp,
            pulso: pulso,
            peso: peso,
            oxigeno: oxigeno,
            presion: presion,
            f_respir: f_respir,
            talla: talla,
            imc: imc,
        },  
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".btn_loading").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".btn_loading").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){

            //console.log(data)     
            toast_msg('success', data.info.msg)

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });

}


function getDiagnosticosConsulta(){

    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()
    $("#tb_e_diagnostico tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoDiagnosticosConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica
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
            
            $.each(data.info, function(index, v) {
                
            $("#tb_e_diagnostico").append("<tr id='tr_e_diag_"+v.iddiagnostico+"'><td>"+v.codigo_cie+" - "+(v.codigo_descripcion?? "")+"<br>"+(v.codigo_sub_cie?? "")
                                +" - "+(v.sub_cie_descripcion ?? "")+"</td><td>"+(v.observaciones?? "")+"</td><td align='right'><button class='btn btn-sm btn-danger' onclick='deleteDiagnosticoConsulta("+v.iddiagnostico+")'><i class='fas fa-trash'></i></button></td></tr>")         
            })

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });

}


function addNewCieConsulta(){
    
    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()
    var cie = $("#e_c_diagnosticos").val()
    var observacion = $("#e_c_coment_diag").val()

    $.ajax({
        type: "POST",
        url : baseUrl+'/addNewCieConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica,
            cie: cie,
            observacion: observacion
            
        },  
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".btn_loading").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".btn_loading").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){
            
            toast_msg('success', data.info.msg)
            var v = data.info;    
            $("#tb_e_diagnostico").append("<tr id='tr_e_diag_"+v.iddiagnostico+"'><td>"+v.codigo_cie+" - "+(v.codigo_descripcion?? "")+"<br>"+(v.codigo_sub_cie?? "")
                                +" - "+(v.sub_cie_descripcion ?? "")+"</td><td>"+(observacion?? "")+"</td><td align='right'><button class='btn btn-sm btn-danger' onclick='deleteDiagnosticoConsulta("+v.iddiagnostico+")'><i class='fas fa-trash'></i></button></td></tr>")         

            $("#e_c_diagnosticos").empty()
            $("#e_c_coment_diag").val('')
        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}

function deleteDiagnosticoConsulta(iddiagnostico){
    
    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar al Diagnostico?',
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
                url : baseUrl+'/deleteDiagnosticoCita',
                data: {
                    iddiagnostico: iddiagnostico,
                    idconsulta: idconsulta,
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
                            'Diagnostico Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        $('#tr_e_diag_'+iddiagnostico).remove();

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



/*
    PROCEDIMIENTOS CONSULTA
*/

function getProcedimientosConsulta(){

    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()
    $("#tb_e_procedimientos tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoProcedimientosConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica
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
            
            var option;
            $.each(data.info, function(index, v) {
                
                if(v.estado_pago!='C')
                    option = "<button class='btn btn-sm btn-danger' onclick='deleteProceConsulta("+v.idtratamiento+")'><i class='fas fa-trash'></i></button>"
                else        
                    option =""

                $("#tb_e_procedimientos").append("<tr id='tr_proc_e_"+v.idtratamiento+"'><td>"+v.procedimiento+"</td><td>"+(v.diagnostico?? "")+"</td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado_desc+"</span></td><td>"+v.total+"</td><td align='right'>"+option+"</td></tr>")         
            })

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });

}


function addNewProcedimientoConsulta(){
    
    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()
    var idprocedimiento = $("#e_c_procedimientos").val()
    var proc_desc = $("#e_c_procedimientos").text()
    var valor = parseFloat($("#e_c_proc_precio").val())
    var observacion = $("#e_c_coment_proce").val()
    var iddoctor = $("#e_c_doctor").val() 

    $.ajax({
        type: "POST",
        url : baseUrl+'/addNewProcedimientoConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica,
            idprocedimiento: idprocedimiento,
            proc_descripcion: proc_desc,
            valor: valor,
            observacion: observacion,
            iddoctor: iddoctor
            
        },  
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".btn_loading").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".btn_loading").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){
            
            sweetMsg('success', data.info.msg)
            var v = data.info;    
            $("#tb_e_procedimientos").append('<tr id="tr_proc_e_'+v.idtratamiento+'"><td>'+proc_desc+'</td><td>'+observacion+'</td><td><span class="badge bg-danger">Pendiente</span></td><td>'+valor.toFixed(2)+'</td><td align="right"><button class="btn btn-sm btn-danger" onclick="deleteProceConsulta('+v.idtratamiento+')"><i class="fas fa-trash"></i></button></td></tr>')

            $("#e_c_procedimientos").empty()
            $("#e_c_proc_precio").val('')
            $("#e_c_coment_proce").val('')

            getLstConsultas()
        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}



function deleteProceConsulta(idtratamiento){

    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()

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
                url : baseUrl+'/deleteProcedimientoCita',
                data: {
                    idpaciente: $("#hidpaciente").val(),
                    idtratamiento: idtratamiento,
                    idconsulta: idconsulta,
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
                        /*
                        swalWithBootstrapButtons.fire(
                            'Procedimiento Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        */
                        sweetMsg('success',  data.info.msg)
                        $('#tr_proc_e_'+idtratamiento).remove();
                        getLstConsultas()

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


/*
    RECETAS
*/


function getRecetasConsulta(){

    var idpaciente = $("#hidpaciente").val()
    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()

    $.ajax({
        type: "POST",
        url : baseUrl+'/getRectasConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica
        },  
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".sp_loading_paciente").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".sp_loading_paciente").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){

                        
            if(data.info.length<=0){
                $("#e_c_medicamentos").val('')
                $("#e_c_med_indicaciones").val('')
            }else{
                $("#e_c_medicamentos").val(data.info.receta)
                $("#e_c_med_indicaciones").val(data.info.indicaciones)
                
            }

            $("#bt_print_receta").prop("href", "../recetaPrint/"+idpaciente+"/"+idconsulta+"/"+idclinica+"")

            
                      

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
    

}

function ingresoReceta(){

    var idconsulta = $("#hidconsulta").val()
    var idclinica = $("#hidclinica").val()
    var medicamento = $("#e_c_medicamentos").val()
    var indicaciones = $("#e_c_med_indicaciones").val()
    

    $.ajax({
        type: "POST",
        url : baseUrl+'/insertRecetaConsulta',
        data: {
            idpaciente: $("#hidpaciente").val(),
            idconsulta: idconsulta,
            idclinica: idclinica,
            medicamento: medicamento,
            indicaciones: indicaciones                        
        },  
        beforeSend: function(){
            $(".btnCloseCanvas").hide()
            $(".btn_loading").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnCloseCanvas").show()
            $(".btn_loading").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data){
            
            if(data.info.action==1)
                toast_msg('success', data.info.msg)
            else
                toast_msg('error', data.info.msg)
            
        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}


/*  
    ESTADO DE CUENTA
*/
function ltsEstadoCuenta(){

    $.ajax({
        type: "POST",
        url : baseUrl+'/ltsEstadoCuenta',
        data: {
            idpaciente: $("#hidpaciente").val()  
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

           
            $("#tb_estado_cuenta_odontologia tbody").empty()
            $("#tb_estado_cuenta_ortodoncia tbody").empty()
            $("#tb_estado_cuenta_medicina tbody").empty()
            $("#tb_estado_cuenta_resumen tbody").empty()
            
            
            if(data.odontologia.length>0){

                sec = 1;    
                $("#dv_cuenta_odontologia").show()          
                $.each(data.odontologia, function(index, v) {
    
                  
                    $("#tb_estado_cuenta_odontologia").append("<tr style='background-color:"+v.row_color+"'><td align='center'>"+sec+"</td><td>"+v.fecha+"</td><td>"+v.detalle+"</td>"
                                +"<td align='center'>"+(v.documento ?? "")+" - "+(v.num_documento ?? "")+"</td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado_desc
                                +"</span></td><td align='center'>"+(v.debe ?? "")+"</td></td><td align='center'>"+(v.cantidad ?? "")
                                +"</td></td><td align='center' style='font-size:16px; color:red; font-weight:bold'>"+(v.saldo ?? "")+"</td></tr>")
                    sec++;
                });
            }else{
                $("#dv_cuenta_odontologia").hide()    
            }

            /*
                ORTODONCIA
            */
            if(data.ortodoncia.length>0){

                sec = 1;    
                $("#dv_cuenta_ortodoncia").show()          
                $.each(data.ortodoncia, function(index, v) {
                  
                    $("#tb_estado_cuenta_ortodoncia").append("<tr style='background-color:"+v.row_color+"'><td align='center'>"+sec+"</td><td>"+v.fecha+"</td><td>"+v.detalle+"</td>"
                    +"<td align='center'>"+(v.documento ?? "")+" - "+(v.num_documento ?? "")+"</td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado_desc
                    +"</span></td><td align='center'>"+(v.debe ?? "")+"</td></td><td align='center'>"+(v.cantidad ?? "")
                    +"</td></td><td align='center' style='font-size:16px; color:red; font-weight:bold'>"+(v.saldo ?? "")+"</td></tr>")
                    sec++;
                });
            }else{
                $("#dv_cuenta_ortodoncia").hide()    
            }

            /*
                 MEDICINA
            */
             if(data.medicina.length>0){

                sec = 1;    
                $("#dv_cuenta_medicina").show()          
                $.each(data.medicina, function(index, v) {                        
                  
                    $("#tb_estado_cuenta_medicina").append("<tr style='background-color:"+v.row_color+"'><td align='center'>"+sec+"</td><td>"+v.fecha+"</td><td>"+v.detalle+"</td>"
                    +"<td align='center'>"+(v.documento ?? "")+" - "+(v.num_documento ?? "")+"</td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado_desc
                    +"</span></td><td align='center'>"+(v.debe ?? "")+"</td></td><td align='center'>"+(v.cantidad ?? "")
                    +"</td></td><td align='center' style='font-size:16px; color:red; font-weight:bold'>"+(v.saldo ?? "")+"</td></tr>")
                    sec++;
                });
            }else{
                $("#dv_cuenta_medicina").hide()    
            }

           
            /*
                TOTAL DE DEUDA
            */
           var total=0;
           if(data.medicina.length>0){
                $.each(data.deuda, function(index, v) {
                        
                    total = parseFloat(total) + parseFloat(v.total)
                    $("#tb_estado_cuenta_resumen").append("<tr><td>"+v.tipo+"</td><td align='right'>"+v.total+"</td></tr>")                  
                });

                $("#tb_estado_cuenta_resumen").append("<tr><td align='right'>TOTAL</td><td align='right'>"+total.toFixed(2)+"</td></tr>")                  
           }else{

           }
            



        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}