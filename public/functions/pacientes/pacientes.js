
var formCreatePaciente = document.getElementById('form-paciente-create');
var Table;

$(document).ready(function() {

    //$('#tb_pacientes_lts').DataTable();
    //$("#tb_pacientes_lts").DataTable({responsive:!1})

    loadPacientesTable()
    //loadPacientes()

    formCreatePaciente.addEventListener('submit', createPaciente);


    var dateMask = IMask(
        document.getElementById('fecha-nacimiento'),
        {
            mask: Date,
            //pattern: 'Y-`m-`d',
            min:new Date(1932,0,1),
            max:new Date(2020,0,1),
            lazy: false
        });


        var phoneMask = IMask(
            document.getElementById('celular-paciente'), {
                //mask: '+{7}(000)000-00-00'
                mask: '+000 000-000-000'
    
            });
        
    
    /*  UPLOAD LOGO CLINICNA */
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {

        var input = $(this).parents('.input-group').find(':text'),
            log = label;

        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }

    });


    function readURL(input, target) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#'+target).attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#perfil-paciente").change(function(){
        readURL(this, 'img-upload-paciente');
    });

});


function callModalOpenPaciente(){

    document.getElementById("form-paciente-create").reset();
    $('#img-upload-paciente').removeAttr('src')
    $('#canvasPacientes').scrollTop(0);    
    $("#canvasPacientes").offcanvas().offcanvas("toggle");
}



function loadPacientesTable(){

   Table = $('#tb_pacientes_lts').DataTable({
            'processing': true,
            'serverSide': true,
            'serverMethod': 'post',
            'ajax': {
                'url':'loadPacientes'
            },
            'columns': [
                { data: 'sec' },
                { data: 'paciente', className: 'bg-soft-info' },
                { data: 'correo' },
                { data: 'telefonos' },
                { data: 'genero' },
                { data: 'options' }
            ]
        });

}

function callDatatables(){
    Table.destroy();
    loadPacientesTable()
}


function loadPacientes(){

  
    $("#tb_pacientes_lts tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadPacientes',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            
            $("#sp_cant_pacientes").text('('+data.cant+')')
            
            sec = 1;
            $.each(data.info, function(index, v) {
                console.log(v)
                var someObject = {
                    foo: "This",
                    bar: "works!"
                };
                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                    '   <div class="dropdown-menu dropdownmenu-secondary">\n' +
                    '   <a class="dropdown-item" href="pacientesProfile/'+v.idpaciente+'" target="_blank">Editar</a>\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="eliminarPaciente('+v.idpaciente+')">Eliminar</a>\n' +
                    '   <div class="dropdown-divider"></div>\n' +
                    '   </div></div>';

                $("#tb_pacientes_lts").append("<tr><td align='center'>"+sec+"</td><td>"+v.nombre+" <div class='text-muted'>"+v.num_documento+
                            "</div></td><td>"+v.email+"</td><td>"+v.telefono+"<br>"+v.celular+"</td><td>"+v.genero+"</td><td align='center'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function createPaciente(e){

    e.preventDefault();

    var form = $("#form-paciente-create");
    var formData = new FormData(form[0]);

    $.ajax({
        type: "POST",
        url : baseUrl+'/createPaciente',
        //data: form.serialize(), // serializes the form's elements.
        data:formData,
        cache:false,
        contentType: false,
        processData: false,
        
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
                document.getElementById("form-paciente-create").reset();
                callModalOpenPaciente()
                callDatatables();
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


function eliminarPaciente(idpaciente){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar al Paciente?',
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
                url : baseUrl+'/deletePaciente',
                data: {
                    idpaciente: idpaciente
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
                            'Paciente Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        loadPacientes()

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
