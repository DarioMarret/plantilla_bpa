var formCreatePaciente = document.getElementById('form-paciente-edit');

$(document).ready(function(){

    formCreatePaciente.addEventListener('submit', editarPaciente);

    var dateMask = IMask(
        document.getElementById('e-fecha-nacimiento'),
        {
            mask: Date,
            //pattern: 'Y-`m-`d',
            min:new Date(1932,0,1),
            max:new Date(2020,0,1),
            lazy: false
        });

    var phoneMask = IMask(
        document.getElementById('e-celular-paciente'), {
            //mask: '+{7}(000)000-00-00'
            mask: '+000 000-000-000'

        });
    

})

function openCanvasEditInfo(){

    $("#offcanvasEditInformacion").offcanvas().offcanvas("toggle");
}


function getInfoPaciente(){

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoPaciente',
        data:{
            idpaciente: $("#hidpaciente").val(),
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

            $("input[name=e-tipo-documento][value=" + data.info.tipo_doc + "]").prop('checked', true);
            $("#e-identificacion-paciente").val(data.info.num_documento)
            $("#e-nombres-paciente").val(data.info.nombre)
            
            $("input[name=e-genero-paciente][value=" + data.info.genero + "]").prop('checked', true);
            $("#e-estado-civil").val(data.info.estado_civil)
            $("#e-fecha-nacimiento").val(data.info.fecha_nac_mod)

            $("#e-telefono-paciente").val(data.info.telefono_casa)
            $("#e-celular-paciente").val(data.info.celular)
            $("#e-email-paciente").val(data.info.email)
            $("#e-direccion-paciente").val(data.info.direccion)
                                              
            openCanvasEditInfo()

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}


function editarPaciente(e){

    e.preventDefault();

    var idpaciente = $("#hidpaciente").val()
    
    var form = $("#form-paciente-edit");

    $.ajax({
        type: "POST",
        url : baseUrl+'/editPaciente',
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
                //document.getElementById("form-paciente-create").reset();
                //callModalOpenPaciente()
                //loadPacientes();
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