var formCreateClinica = document.getElementById('form-clinica-create');

var formCreateDoctor = document.getElementById('form-create-doctor');
var formEditDoctor = document.getElementById('form-doctor-update');

var formCreateAsesor = document.getElementById('form-create-asesor');
var formEditAsesor = document.getElementById('form-update-asesor');

var formCreateProdOdont = document.getElementById('form-create-procedimiento-odont');
var formCreateTipoProdOdont = document.getElementById('form-create-tipo-procedimiento-odont');

var formCreateTipoProdMed = document.getElementById('form-create-tipo-procedimiento-med');
var formCreateProdMed = document.getElementById('form-create-procedimiento-med');

var multiClinicas;

  
$(document).ready(function() {

    $('#tb_asesores').DataTable();
    $('#tb_clinicas').DataTable();
    $('#tb_doctores').DataTable();
    $('#tb_procedimientos_odont').DataTable();
   

    loadClinicas()

    formCreateClinica.addEventListener('submit', createClinica);
    
    formCreateDoctor.addEventListener('submit', createDoctor);
    formEditDoctor.addEventListener('submit', createDoctor);

    formCreateAsesor.addEventListener('submit', createAsesor);
    formEditAsesor.addEventListener('submit', createAsesor);

    formCreateProdOdont.addEventListener('submit', createProcedOdonto);
    formCreateTipoProdOdont.addEventListener('submit', createTipoProcedOdonto);

    formCreateTipoProdMed.addEventListener('submit', createTipoProcedOdontoMed);
    formCreateProdMed.addEventListener('submit', createProcedMed);

  


    multiClinicas = new Choices(
        '#ad-clinicas',
        {
            placeholder: true,
            placeholderValue: null,
            removeItemButton: true,
        }
      );


    multiClinicasDoc = new Choices(
    '#doc-clinicas',
    {
        placeholder: true,
        placeholderValue: null,
        removeItemButton: true,
    }
    );


    flatpickr('#hora_inicio', {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });

    flatpickr('#hora_fin', {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    });


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
        document.getElementById('celular-doctor'), {
            //mask: '+{7}(000)000-00-00'
            mask: '+000 000-000-000'

        });


    var dateMask = IMask(
        document.getElementById('fecha-nacimiento-asesor'),
        {
            mask: Date,
            //pattern: 'Y-`m-`d',
            min:new Date(1932,0,1),
            max:new Date(2020,0,1),
            lazy: false
        });

    var phoneMask = IMask(
        document.getElementById('celular-asesor'), {
            //mask: '+{7}(000)000-00-00'
            mask: '+000 000-000-000'

        });



    var dateMask = IMask(
        document.getElementById('fecha-nacimiento-asesor-update'),
        {
            mask: Date,
            //pattern: 'Y-`m-`d',
            min:new Date(1932,0,1),
            max:new Date(2020,0,1),
            lazy: false
        });

    var phoneMask = IMask(
        document.getElementById('celular-asesor-update'), {
            //mask: '+{7}(000)000-00-00'
            mask: '+000 000-000-000'

        });


    $('#switch1').change(function() {
               
        if ($(this).is(":checked")) {            
            $("#ad-password").prop( "disabled", false );
            $("#ad-password2").prop( "disabled", false );                             
        } else {
            $("#ad-password").prop( "disabled", true );
            $("#ad-password2").prop( "disabled", true );            
        }
    });


    $('#doc-switch1').change(function() {
               
        if ($(this).is(":checked")) {            
            $("#doc-password").prop( "disabled", false );
            $("#doc-password2").prop( "disabled", false );                             
        } else {
            $("#doc-password").prop( "disabled", true );
            $("#doc-password2").prop( "disabled", true );            
        }
    });
        
    /*
    //Buttons examples
    var table = $('#datatable-buttons').DataTable({
        lengthChange: false,
        buttons: ['copy', 'excel', 'pdf', 'colvis']
    });

    table.buttons().container()
        .appendTo('#datatable-buttons_wrapper .col-md-6:eq(0)');

    $(".dataTables_length select").addClass('form-select form-select-sm');
    */


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

    $("#imgInp").change(function(){
        readURL(this, 'img-upload');
    });

    /*  END UPLOAD LOGO CLINICA */

    $("#perfil-doctor").change(function(){
        readURL(this, 'img-upload-doctores');
    });

    $("#perfil-asesor").change(function(){
        readURL(this, 'img-upload-asesores');
    });

});

/***********************
        CLINICAS
 ***********************/

function callModalOpenClinica(){

    document.getElementById("form-clinica-create").reset();
    $('#img-upload').removeAttr('src')
    $('#canvasClinicas').scrollTop(0);
    $("#hidclinica").val('')
    openModalClinica()
}

function openModalClinica() {
    $("#canvasClinicas").offcanvas().offcanvas("toggle");
}



function loadClinicas(){

    $("#liTitleConf").text('Clínicas')
    $("#titleConf").text('Listado de Clínicas')
    $("#tb_clinicas tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadClinicas',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            sec = 1;
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                            '   <div class="dropdown-menu">\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="editarClinica('+v.idclinica+')">Editar</a>\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="eliminarClinica('+v.idclinica+')">Eliminar</a>\n' +
                            '   <div class="dropdown-divider"></div>\n' +
'                           </div></div>';

                $("#tb_clinicas").append("<tr><td align='center'>"+sec+"</td><td>"+v.nombre+"</td><td>"+(v.email?? "")+"</td><td></td><td>"+(v.telefono?? "")+"</td><td>"+(v.direccion?? "") +"</td><td align='left'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function createClinica(e){

    e.preventDefault();

    var form = $("#form-clinica-create");
    var formData = new FormData(form[0]);

    $.ajax({
        type: "POST",
        url : baseUrl+'/createClinica',
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
                document.getElementById("form-clinica-create").reset();
                openModalClinica()
                loadClinicas();
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


function editarClinica(idclinica){
    document.getElementById("form-clinica-create").reset();
    $('#img-upload').removeAttr('src')

    $("#hidclinica").val(idclinica)
    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoClinica',
        data: {
            idclinica: idclinica
        },
        beforeSend: function(){
            $(".btnSppinAjax").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data)
        {
            $.each(data.info, function(index, v) {
                $("#nombre-clinica").val(v.nombre)
                $("#telefono-clinica").val(v.telefono)
                $("#web-clinica").val(v.web)
                $("#email-clinica").val(v.email)
                $("#fb-clinica").val(v.facebook)
                $("#ig-clinica").val(v.instagram)
                $("#hora_inicio").val()
                $("#hora_fin").val()
                $("#direccion-clinica").val(v.direccion)
                $("#hora_inicio").val(v.hora_inicio)
                $("#hora_fin").val(v.hora_fin)
                $("#hlogo").val(v.logo)
                if(v.logo!==null) $("#img-upload").attr("src",v.folder+'/'+v.logo);

            });
            openModalClinica()

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}


function eliminarClinica(idclinica){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar la Clinica?',
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
                url : baseUrl+'/deleteClinica',
                data: {
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
                            'Clinica Eliminada!',
                            data.info.msg,
                            'success'
                        )
                        loadClinicas()

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


/***********************************
                DOCTORES
 ***********************************/

function callModalOpenDoctoc(){

    document.getElementById("form-create-doctor").reset();
    $("#hiddoctor").val('')
    $('#img-upload-doctores').removeAttr('src')
    $("input[name=tipo-documento][value='CED']").prop('checked', true);
    $("input[name=genero-doctor][value='Masculino']").prop('checked', true);
    openModalDoctores()
}

function openModalDoctores() {

    $("#canvasDoctor").offcanvas().offcanvas("toggle");
}

function openModalDoctoresEdit(){
    $("#canvasDoctorEdit").offcanvas().offcanvas("toggle");
}


function loadDoctores(){

    $("#liTitleConf").text('Doctores')
    $("#titleConf").text('Listado de Doctores')
    $("#tb_doctores tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadDoctores',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            sec = 1;
            $.each(data.info, function(index, v) {
                console.log(v)
                var someObject = {
                    foo: "This",
                    bar: "works!"
                };
                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                    '   <div class="dropdown-menu dropdownmenu-secondary">\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="loadInfoDoctor('+v.iddoctor+') ">Editar</a>\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="eliminarDoctor('+v.iddoctor+')">Eliminar</a>\n' +
                    '   <div class="dropdown-divider"></div>\n' +
                    '   </div></div>';

                $("#tb_doctores").append("<tr><td align='center'>"+sec+"</td><td>"+v.nombre+" <div class='text-muted'>"+v.tipo_doctor_desc+
                            "</div></td><td>"+(v.email?? "")+"</td><td>"+(v.telefono?? "")+"<br>"+(v.celular?? "")+"</td><td>"+(v.genero?? "")+ "</td><td align='center'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function createDoctor(e){

    e.preventDefault();

    if($("#hiddoctor").val()!='') var form = $("#form-doctor-update");
    else  var form = $("#form-create-doctor");

    var formData = new FormData(form[0]);

    $.ajax({
        type: "POST",
        url : baseUrl+'/createDoctor',
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                document.getElementById("form-clinica-create").reset();
                //openModalDoctores()
                loadDoctores()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}


function loadInfoDoctor(iddoctor, info=null){

    console.log(info)
    document.getElementById("form-create-doctor").reset();
    document.getElementById("form-doctor-update").reset();


    $("#doc-usuario").val('')
    $("#doc-clinicas").val('')
    $("#doc-rol").val('')
    $("#doc-password").val('')
    $("#doc-password2").val('')
    $("#doc-clinicas").empty()
    
    multiClinicasDoc.clearChoices()

    $("#hiddoctor").val(iddoctor)
    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoDoctor',
        data: {
            iddoctor: iddoctor
        },
        beforeSend: function(){
            $(".btnSppinAjax").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data)
        {   

            var idclinica_select
            $.each(data.clinicas, function(index, v) {              
                idclinica_select = v.idclinica 
                multiClinicasDoc.setChoices([
                    { value: idclinica_select.toString(), label: v.nombre}                  
                  ]);
            })
            multiClinicasDoc.removeActiveItems()

            //$.each(data.info, function(index, v) {

                var v = data.info
                //$("#tipo-documento").val(v.tipo_doc)
                $("input[name=edit-tipo-documento][value=" + v.tipo_doc + "]").prop('checked', true);
                $("#edit-identificacion-doctor").val(v.cedula)
                $("#edit-nombres-doctor").val(v.nombre)
                $("#edit-telefono-doctor").val(v.telefono)
                $("#edit-celular-doctor").val(v.celular)
                $("#edit-email-doctor").val(v.email)
                $("#edit-especialidad-doctor").val(v.especialidad)
                $("input[name=edit-genero-doctor][value=" + v.genero + "]").prop('checked', true);
                //$("#genero-doctor").val(v.genero)
                $("#edit-fecha-nacimiento").val(v.fecha_nac_mod)
                $("#edit-tipo-doctor").val(v.tipo_doctor)

                if(v.foto!==null) $("#foto-perfil-medico").attr("src",v.folder+'/'+v.foto);
                else $("#foto-perfil-medico").attr("src",'assets/images/users/default-avatar.jpg');


                if(v.iduser==null){

                    $("#dv_modify_pass_doc").hide()
                    $("#btn_createDoc").show()
                    $("#btn_updateDoc").hide()
                    $("#doc-switch1").prop( "checked", true );
                    $("#doc-password").prop( "disabled", false );
                    $("#doc-password2").prop( "disabled", false );  

                }else{
                    
                    $("#hiduser-doctor").val(v.iduser)
                    $("#dv_modify_pass_doc").show()                    
                    $("#btn_updateDoc").show()
                    $("#btn_createDoc").hide()
                    $("#doc-password").prop( "disabled", true );
                    $("#doc-password2").prop( "disabled", true );
                    $("#doc-switch1").prop( "checked", false );

                    $("#doc-usuario").val(v.email_login)                    
                    console.log(v.user_clinica.split(','))              
                    multiClinicasDoc.setChoiceByValue(v.user_clinica.split(','))
                    
                }

            //});
            //openModalDoctores()


            

            $("#canvasDoctorEdit").offcanvas().offcanvas("toggle");

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}


function eliminarDoctor(iddoctor){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar al Doctor?',
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
                url : baseUrl+'/deleteDoctor',
                data: {
                    iddoctor: iddoctor
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
                            'Doctor Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        loadDoctores()

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
    ADMINISTRATIVO
 */
function callModalOpenAdministrativo(){

    document.getElementById("form-create-asesor").reset();
    $("#hidasesor").val('')
    $('#img-upload-asesores').removeAttr('src')
    $("input[name=tipo-documento][value='CED']").prop('checked', true);
    $("input[name=genero-doctor][value='Masculino']").prop('checked', true);
    openModalAdministrativo()
}

function openModalAdministrativo() {
    $("#canvasAdministrativo").offcanvas().offcanvas("toggle");
}

function openModalAdministrativoEdit() {
    $("#canvasAsesorEdit").offcanvas().offcanvas("toggle");
}


function loadAsesores(){

    $("#liTitleConf").text('Administrativo')
    $("#titleConf").text('Listado Personal Administrativo')
    $("#tb_asesores tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadAsesor',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            sec = 1;
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                    '   <div class="dropdown-menu dropdownmenu-secondary">\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="loadInfoAsesor('+v.idasistente+')">Editar</a>\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="eliminarAsesor('+v.idasistente+')">Eliminar</a>\n' +                    
                    '   <div class="dropdown-divider"></div>\n' +                    
                    '   </div></div>';

                $("#tb_asesores").append("<tr><td align='center'>"+sec+"</td><td>"+v.nombre+
                    "</td><td>"+(v.email?? "")+"</td><td>"+(v.telefono?? "")+"<br>"+(v.celular?? "")+"</td><td>"+(v.genero?? "")+"</td><td align='center'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}

function createAsesor(e){

    e.preventDefault();

    if($("#hidasesor").val()!='') var form = $("#form-update-asesor");
    else  var form = $("#form-create-asesor");
    
    var formData = new FormData(form[0]);

    $.ajax({
        type: "POST",
        url : baseUrl+'/createAsesor',
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                document.getElementById("form-clinica-create").reset();
                openModalAdministrativo()
                loadAsesores()

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


function loadInfoAsesor(idasistente){

    document.getElementById("form-create-asesor").reset();

    $("#ad-usuario").val('')
    $("#ad-clinicas").val('')
    $("#ad-rol").val('')
    $("#ad-password").val('')
    $("#ad-password2").val('')
    $("#ad-clinicas").empty()
    
    multiClinicas.clearChoices()
    

    $("#hidasesor").val(idasistente)
    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoAsesor',
        data: {
            idasistente: idasistente
        },
        beforeSend: function(){
            $(".btnSppinAjax").show()
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data)
        {
           
            var idclinica_select
            $.each(data.clinicas, function(index, v) {              
                idclinica_select = v.idclinica 
                multiClinicas.setChoices([
                    { value: idclinica_select.toString(), label: v.nombre}                  
                  ]);
            })
            multiClinicas.removeActiveItems()

            //$.each(data.info, function(index, v) {

                var v = data.info
                $("input[name=tipo-documento-asesor-update][value=" + v.tipo_doc + "]").prop('checked', true);
                $("#identificacion-asesor-update").val(v.cedula)
                $("#nombres-asesor-update").val(v.nombre)
                $("#telefono-asesor-update").val(v.telefono)
                $("#celular-asesor-update").val(v.celular)
                $("#email-asesor-update-update").val(v.email)
                $("input[name=genero-asesor-update][value=" + v.genero + "]").prop('checked', true);
                $("#fecha-nacimiento-asesor-update").val(v.fecha_nac_mod)


                if(v.iduser==null){

                    $("#dv_modify_pass_doc").hide()
                    $("#btn_createUserAdmin").show()
                    $("#btn_updateUserAdmin").hide()
                    $("#switch1").prop( "checked", true );
                    $("#ad-password").prop( "disabled", false );
                    $("#ad-password2").prop( "disabled", false );  

                }else{
                    
                    $("#hiduser-admin").val(v.iduser)
                    $("#dv_modify_pass").show()                    
                    $("#btn_updateUserAdmin").show()
                    $("#btn_createUserAdmin").hide()
                    $("#ad-password").prop( "disabled", true );
                    $("#ad-password2").prop( "disabled", true );
                    $("#switch1").prop( "checked", false );

                    $("#ad-usuario").val(v.email_login)
                    $("#ad-rol").val(v.user_rol)    
                    console.log(v.user_clinica.split(','))              
                    multiClinicas.setChoiceByValue(v.user_clinica.split(','))
                    
                }

               
            //});

            $("#canvasAsesorEdit").offcanvas().offcanvas("toggle");

           

        },
        error: function(response) {

            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
            console.log(response.responseJSON.errors)

        }

    });
}


function eliminarAsesor(idasistente){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar al Asesor?',
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
                url : baseUrl+'/deleteAsesor',
                data: {
                    idasistente: idasistente
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
                            'Asesor Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        loadAsesores()

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
    PROCEDIMIENTOS ODONTOLOGICOS
*/

function openModalProcOdonto() {

    document.getElementById("form-create-procedimiento-odont").reset();  
    $("#hidprocedimiento").val('')
    getTiposProcedimientos()
}


function getTiposProcedimientos(){

    $("#tipo-procedimiento").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/getTiposProcedimientos',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
           
            $.each(data.info, function(index, v) {

                $("#tipo-procedimiento").append("<option value='"+v.idtipoprocedimiento+"'>"+v.tipoprocedimiento+"</option>")              
            });

            $("#canvasProcedimientosOdon").offcanvas().offcanvas("toggle");
        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function loadProcedimientosOdon(tipo){
    
    $("#liTitleConf").text('Procedimientos Odontologicos')
    $("#titleConf").text('Listado Procedimientos Odontologicos')
    $("#tb_procedimientos_odont tbody").empty()


    $.ajax({
        type: "POST",
        url : baseUrl+'/loadProcedimientos',
        data:{
            tipo: tipo
        },
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            sec = 1;
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                    '   <div class="dropdown-menu dropdownmenu-secondary">\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="loadInfoProcedimiento('+v.idprocedimiento+')">Editar</a>\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="eliminarProcedimiento('+v.idprocedimiento+')">Eliminar</a>\n' +                    
                    '   <div class="dropdown-divider"></div>\n' +                    
                    '   </div></div>';

                $("#tb_procedimientos_odont").append("<tr><td align='center'>"+sec+"</td><td>"+v.procedimiento+
                    "</td><td>"+v.aplica+" - "+v.tipoprocedimiento+"</td><td>"+v.precio+"</td><td>"+v.estado_desc+"</td><td align='center'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
 
}


function createProcedOdonto(e){
    
    e.preventDefault();

    var form = $("#form-create-procedimiento-odont");
    var formData = new FormData(form[0]);


    $.ajax({
        type: "POST",
        url : baseUrl+'/createProcedOdontologia',
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                if($("#hidprocedimiento").val()=='') document.getElementById("form-create-procedimiento-odont").reset();                
                loadProcedimientosOdon()            

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}


function loadInfoProcedimiento(idprocedimiento){

    document.getElementById("form-create-procedimiento-odont").reset();
    $("#tipo-procedimiento").empty()
    $("#hidprocedimiento").val(idprocedimiento)

    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoProcedOdontologia',
        data: {
            idprocedimiento: idprocedimiento
        },
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            
            $.each(data.tipos_proc, function(index, v) {

                $("#tipo-procedimiento").append("<option value='"+v.idtipoprocedimiento+"'>"+v.tipoprocedimiento+"</option>")              
            });

            

            $.each(data.info, function(index, v) {
                $("#procedimiento-nombre").val(v.procedimiento)   
                $("#tipo-procedimiento").val(v.idtipoprocedimiento)   
                $("#duracion-proced").val(v.duracion)   
                $("#precio-proced").val(v.precio)   
                $("#estado_proced").val(v.nombre)   
                
                if(v.is_activo==1) $("#estado_proced").prop('checked', true);
                else $("#estado_proced").prop('checked', false);

            });

            $("#canvasProcedimientosOdon").offcanvas().offcanvas("toggle");

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function eliminarProcedimiento(idprocedimiento){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar el Procedimiento?',
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
                url : baseUrl+'/deleteProcedOdontologia',
                data: {
                    idprocedimiento: idprocedimiento
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
                            'Procedimiento Eliminado!',
                            data.info.msg,
                            'success'
                        )
                        loadProcedimientosOdon()

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



function openModalTipoProcOdonto() {

    document.getElementById("form-create-tipo-procedimiento-odont").reset();  
    $("#hidprocedimiento").val('')    
    listTipoProcedimientos()
}


function listTipoProcedimientos(){

    $("#tb_tipo_procedimientos_odont tbody").empty()
    
    $.ajax({
        type: "POST",
        url : baseUrl+'/LtsTiposProcedimientos',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            sec=1
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                    '   <div class="dropdown-menu dropdownmenu-secondary">\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="loadInfoAsesor('+v.idasistente+')">Editar</a>\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="eliminarAsesor('+v.idasistente+')">Eliminar</a>\n' +                    
                    '   <div class="dropdown-divider"></div>\n' +                    
                    '   </div></div>';

                $("#tb_tipo_procedimientos_odont").append("<tr><td align='center'>"+sec+"</td><td>"+v.tipoprocedimiento+
                    "</td><td>"+v.aplica+"</td><td>"+v.use_caras+"</td><td>"+v.is_activo+"</td><td align='center'>"+options+"</td></tr>")
                sec++;
            });

            $("#canvasTipoProcedimientosOdon").offcanvas().offcanvas("toggle");
        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });

}


function createTipoProcedOdonto(e){
    
    e.preventDefault();
    var form = $("#form-create-tipo-procedimiento-odont");

    
    $.ajax({
        type: "POST",
        url : baseUrl+'/createTipoProce',
        data: form.serialize(), // serializes the form's elements.        
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                document.getElementById("form-create-tipo-procedimiento-odont").reset();
                //openModalDoctores()
                listTipoProcedimientos()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}



/*
    PROCEDIMIENTOS DE MEDICINA
*/
function loadProcedimientosMed(tipo){
    
    $("#liTitleConf").text('Procedimientos Medicos')
    $("#titleConf").text('Listado Procedimientos Medicos')
    $("#tb_procedimientos_med tbody").empty()


    $.ajax({
        type: "POST",
        url : baseUrl+'/loadProcedimientosMed',
        data:{
            tipo: tipo
        },
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            sec = 1;
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                    '   <div class="dropdown-menu dropdownmenu-secondary">\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="loadInfoProcedimientoMed('+v.idprocedimiento+')">Editar</a>\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="eliminarProcedimientoMed('+v.idprocedimiento+')">Eliminar</a>\n' +                    
                    '   <div class="dropdown-divider"></div>\n' +                    
                    '   </div></div>';

                $("#tb_procedimientos_med").append("<tr><td align='center'>"+sec+"</td><td>"+v.procedimiento+
                    "</td><td>"+v.tipoprocedimiento+"</td><td>"+v.precio+"</td><td>"+v.estado_desc+"</td><td align='center'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
 
}


function openModalTipoProcMed() {

    document.getElementById("form-create-tipo-procedimiento-odont").reset();  
    $("#hidprocedimiento_med").val('')    
    listTipoProcedimientosMed()
}


function listTipoProcedimientosMed(){

    $("#tb_tipo_procedimientos_med tbody").empty()
    
    $.ajax({
        type: "POST",
        url : baseUrl+'/LtsTiposProcedimientosMed',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
            sec=1
            $.each(data.info, function(index, v) {

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                    '   <div class="dropdown-menu dropdownmenu-secondary">\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="loadInfoAsesor('+v.idasistente+')">Editar</a>\n' +
                    '   <a class="dropdown-item" href="javascript:;" onclick="eliminarAsesor('+v.idasistente+')">Eliminar</a>\n' +                    
                    '   <div class="dropdown-divider"></div>\n' +                    
                    '   </div></div>';

                $("#tb_tipo_procedimientos_med").append("<tr><td align='center'>"+sec+"</td><td>"+v.tipoprocedimiento+
                    "</td><td>"+v.aplica+"</td><td>"+v.use_caras+"</td><td>"+v.is_activo+"</td><td align='center'>"+options+"</td></tr>")
                sec++;
            });

            $("#canvasTipoProcedimientosMed").offcanvas().offcanvas("toggle");
        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });

}


function createTipoProcedOdontoMed(e){
    
    e.preventDefault();
    var form = $("#form-create-tipo-procedimiento-med");

    
    $.ajax({
        type: "POST",
        url : baseUrl+'/createTipoProceMed',
        data: form.serialize(), // serializes the form's elements.        
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                document.getElementById("form-create-tipo-procedimiento-med").reset();
                //openModalDoctores()
                listTipoProcedimientosMed()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}



function openModalProcMed() {

    document.getElementById("form-create-procedimiento-med").reset();  
    $("#hidprocedimiento-med").val('')
    getTiposProcedimientosMed()
}



function getTiposProcedimientosMed(){

    $("#tipo-procedimiento-med").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/getTiposProcedimientosMed',
        //data: form.serialize(), // serializes the form's elements.
        beforeSend: function(){
            $(".spin_loading").show();
        },
        complete: function(){
            $(".spin_loading").hide();
        },
        success: function(data)
        {
            //console.log(data); // show response from the php script.
           
            $.each(data.info, function(index, v) {

                $("#tipo-procedimiento-med").append("<option value='"+v.idtipoprocedimiento+"'>"+v.tipoprocedimiento+"</option>")              
            });

            $("#canvasProcedimientosMed").offcanvas().offcanvas("toggle");
        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function createProcedMed(e){
    
    e.preventDefault();

    var form = $("#form-create-procedimiento-med");
    var formData = new FormData(form[0]);


    $.ajax({
        type: "POST",
        url : baseUrl+'/createProcedMedicina',
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                if($("#hidprocedimiento-med").val()=='') document.getElementById("form-create-procedimiento-med").reset();                
                loadProcedimientosMed()            

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}

/*
    FIN DE PROCEDIMIENTOS
*/

function createUserAdministracion(){
    var idasesor    = $("#hidasesor").val()
    var name        = $("#nombres-asesor-update").val()
    var email       = $("#ad-usuario").val()
    var clinicas    = $("#ad-clinicas").val()
    var rol         = $("#ad-rol").val()
    var pass        = $("#ad-password").val()
    var pass2       = $("#ad-password2").val()

    /*
    if(pass !== pass2){
        sweetMsg('error', 'Contraseñas no son iguales')   
        return        
    }
    */

    $.ajax({
        type: "POST",
        url : baseUrl+'/crearUsuarioClinica',
        //data: form.serialize(), // serializes the form's elements.      
        data:{
            idasesor: idasesor,
            name: name,
            email: email,
            clinicas: clinicas,
            rol: rol,
            password: pass
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                document.getElementById("form-create-tipo-procedimiento-odont").reset();
                //openModalDoctores()
                listTipoProcedimientos()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}



function updateUserAdministracion(){


    var idasesor    = $("#hidasesor").val()
    var name        = $("#nombres-asesor-update").val()
    var email       = $("#ad-usuario").val()
    var clinicas    = $("#ad-clinicas").val()
    var rol         = $("#ad-rol").val()
    var pass        = $("#ad-password").val()
    var pass2       = $("#ad-password2").val()

    var changePass  = ($('#switch1').is(":checked"))?1:0
    
    if(changePass==1){
     
        if(pass !== pass2){
            sweetMsg('error', 'Contraseñas no son iguales')   
            return        
        }
    }
    

    $.ajax({
        type: "POST",
        url : baseUrl+'/updateUsuarioClinica',
        //data: form.serialize(), // serializes the form's elements.      
        data:{
            iduser:  $("#hiduser-admin").val(),
            name: name,
            email: email,
            clinicas: clinicas,
            rol: rol,
            password: pass,
            changePass: changePass
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                document.getElementById("form-create-tipo-procedimiento-odont").reset();
                //openModalDoctores()
                //listTipoProcedimientos()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}


function createUserDoctor(){


    var iddoctor    = $("#hiddoctor").val()
    var name        = $("#nombres-asesor-update").val()
    var email       = $("#doc-usuario").val()
    var clinicas    = $("#doc-clinicas").val()
    var rol         = $("#doc-rol").val()
    var pass        = $("#doc-password").val()
    var pass2       = $("#doc-password2").val()

    /*
    if(pass !== pass2){
        sweetMsg('error', 'Contraseñas no son iguales')   
        return        
    }
    */

    $.ajax({
        type: "POST",
        url : baseUrl+'/crearUsuarioDoctorClinica',
        data:{
            iddoctor: iddoctor,
            name: name,
            email: email,
            clinicas: clinicas,
            //rol: rol,
            password: pass
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)
                document.getElementById("form-create-tipo-procedimiento-odont").reset();
                //openModalDoctores()
                listTipoProcedimientos()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}


function updateUserDoctor(){
    
    var name        = $("#nombres-asesor-update").val()
    var email       = $("#doc-usuario").val()
    var clinicas    = $("#doc-clinicas").val()
    //var rol         = $("#doc-rol").val()
    var pass        = $("#doc-password").val()
    var pass2       = $("#doc-password2").val()

    var changePass  = ($('#doc-switch1').is(":checked"))?1:0
    
    if(changePass==1){
     
        if(pass !== pass2){
            sweetMsg('error', 'Contraseñas no son iguales')   
            return        
        }
    }
    

    $.ajax({
        type: "POST",
        url : baseUrl+'/updateUsuarioClinica',
        //data: form.serialize(), // serializes the form's elements.      
        data:{
            iduser:  $("#hiduser-doctor").val(),
            name: name,
            email: email,
            clinicas: clinicas,
            rol: 'Doctor',
            password: pass,
            changePass: changePass
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

            if(data.info.action==1){
                toast_msg('success', data.info.msg)                
                //openModalDoctores()
                //listTipoProcedimientos()

            }else if(data.info.action==2){
                toast_msg('error',data.info.msg)
                return
            }else{
                toast_msg('error',  data.info.msg)
                return
            }

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}