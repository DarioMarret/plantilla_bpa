var c;
var calendar;
var mypickrDate

!(function (v) {

    mypickrDate= flatpickr('#date-calendar',{
        inline: true
    });
    $(".flatpickr-calendar").css({"width":"266px"});

    var multipleCancelButton = new Choices(
        '#agenda-doctores-show',
        {
            placeholder: true,
            placeholderValue: null,
            removeItemButton: true,
        }
      );

    loadCalendario()

    "use strict";
    function e() {}

    var a = v("#event-modal"),
    t = v("#modal-title"),
    n = v("#form-event"),
    l = null,
    i = null,
    r = document.getElementsByClassName("needs-validation"),
    l = null,
    i = null,
    e = new Date(),
    s = e.getDate(),
    d = e.getMonth(),
    e = e.getFullYear();
    /*
    (e.prototype.init = function () {
        var a = v("#event-modal"),
            t = v("#modal-title"),
            n = v("#form-event"),
            l = null,
            i = null,
            r = document.getElementsByClassName("needs-validation"),
            l = null,
            i = null,
            e = new Date(),
            s = e.getDate(),
            d = e.getMonth(),
            e = e.getFullYear();
       
        new FullCalendarInteraction.Draggable(
            document.getElementById("external-events"),
            {
                itemSelector: ".external-event",
                eventData: function (e) {
                    return {
                        title: e.innerText,
                        className: v(e).data("class"),
                    };
                },
            }
        );
        
        (e = [
            { title: "All Day Event", start: new Date(e, d, 1) },
            {
                title: "Long Event",
                start: new Date(e, d, s - 5),
                end: new Date(e, d, s - 2),
                className: "bg-warning",
            },
            {
                id: 999,
                title: "Repeating Event",
                start: new Date(e, d, s - 3, 16, 0),
                allDay: !1,
                className: "bg-info",
            },

        ]),
            document.getElementById("external-events"),
            (d = document.getElementById("calendar"));
        function o(e) {
            a.modal("show"),
                n.removeClass("was-validated"),
                n[0].reset(),
                v("#event-title").val(),
                v("#event-category").val(),
                t.text("Ingresar Cita"),
                (i = e);

                $("#ag-paciente").empty()
                $('#ag-paciente').prop('disabled', false);

                console.log('evento click')                
                createCitaEventModal(e.date)
        }
        
         c = new FullCalendar.Calendar(d, {
            //plugins: ["bootstrap", "interaction", "dayGrid", "timeGrid", "resourceTimeGrid"],
            plugins: ["bootstrap"],
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            editable: !0,
            droppable: !0,
            selectable: !0,
            defaultView: "resourceTimeGridDay",
            themeSystem: "bootstrap",
            header: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            },
            eventClick: function (e) {
                a.modal("show"),
                    n[0].reset(),
                    (l = e.event),
                    v("#event-title").val(l.title),
                    v("#event-category").val(l.classNames[0]),
                    (i = null),
                    t.text("Edit Event"),
                    (i = null);
                    console.log('evento click 2')
                    var event = (e.event._def.extendedProps)
                    editCitaModal(event)
            },
            dateClick: function (e) {
                o(e);
            },
            resourceAreaHeaderContent: 'Rooms',
            resources: 'https://fullcalendar.io/demo-resources.json?with-nesting',
            events: e,            
        });
        c.render(),
            v(n).on("submit", function (e) {
                e.preventDefault();
                v("#form-event :input");
                var t = v("#event-title").val(),
                    e = v("#event-category").val();
                !1 === r[0].checkValidity()
                    ? (event.preventDefault(),
                      event.stopPropagation(),
                      r[0].classList.add("was-validated"))
                    : (l
                          ? (l.setProp("title", t),
                            l.setProp("classNames", [e]))
                          : ((e = {
                                title: t,
                                start: i.date,
                                allDay: i.allDay,
                                className: e,
                            }),
                            c.addEvent(e)),
                      a.modal("hide"));
            }),
            v("#btn-delete-event").on("click", function (e) {
                l && (l.remove(), (l = null), a.modal("hide"));
            }),
            v("#btn-new-event").on("click", function (e) {
                o({ date: new Date(), allDay: !0 });
            });
    }),
        (v.CalendarPage = new e()),
        (v.CalendarPage.Constructor = e);
    
    */



    var calendarEl = document.getElementById('calendar');

    calendar = new FullCalendar.Calendar(calendarEl, {
        
        initialView: 'resourceTimeGridDay',
       
        schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
        initialDate: $("#date-calendar").val(),
        editable: true,
        selectable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        dayMinWidth: 200,
        slotMinTime: "10:00:00",
        slotMaxTime: "20:00:00",
        slotDuration: "00:15:00",
        slotLabelInterval: "01:00",
        eventOverlap: false,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'resourceTimeGridDay,resourceTimeGridWeek,dayGridMonth'
        },
        views: {
            resourceTimeGridTwoDay: {
            type: 'resourceTimeGrid',
            duration: { days: 2 },
            buttonText: '2 days',
            }
        },

      //// uncomment this line to hide the all-day slot
      allDaySlot: false,
     
     

      select: function(arg) {
        console.log(
          'select',
          arg.startStr,
          arg.endStr,
          arg.resource ? arg.resource.id : '(no resource)'
        );
      },
      dateClick: function(arg) {
            console.log(
                'dateClick',
                arg.date,
                arg.resource ? arg.resource.id : '(no resource)'
            );                        
            n[0].reset()
            $("#ag-doctor").val(arg.resource.id)
            $("#hidcita").val('')
            $("#hidpaciente").val('')
            createCitaEventModal(arg.date)
            a.modal("show")
           
      },

      eventClick: function (e) {
        a.modal("show"),
            n[0].reset(),
            (l = e.event),
            v("#event-title").val(l.title),
            v("#event-category").val(l.classNames[0]),
            (i = null),
            t.text("Editar Cita"),
            (i = null);
            console.log('evento click 2')
            var event = (e.event._def.extendedProps)
            $("#hidcita").val(e.event._def.publicId)
            console.log(e)
            editCitaModal(event)
    },

    eventDrop: function(event) {

        //alert(event.title + " was dropped on " + event.start.format());
        console.log(event.event)
        /*
        console.log(event.event._def.publicId)
        console.log(event.event._def.resourceIds[0])
        console.log(event.event._def.extendedProps)
        console.log(event.event.start)
        console.log(event.event.end)
        */
 
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

                var date = event.event.start;
                var date_end = event.event.end

                var fecha = date.getFullYear()+'-'+zeroPad((parseInt(date.getMonth()) + parseInt(1)),2) +'-'+zeroPad(date.getDate(),2);
                var hora_inicio = zeroPad(date.getHours(),2)+':'+zeroPad(date.getMinutes(),2)
                var hora_fin = zeroPad(date_end.getHours(),2)+':'+zeroPad(date_end.getMinutes(),2)
              
                $.ajax({
                    type: "POST",
                    url: baseUrl+'/updateCitaDrop',
                    dataType:'json',
                    data: {     
                        idcita:event.event._def.publicId,
                        iddoctor: event.event._def.resourceIds[0],
                        idpaciente: event.event._def.extendedProps.idpaciente,  
                        fecha: fecha,
                        hora_inicio: hora_inicio,
                        hora_fin: hora_fin
                    },
                    beforeSend: function(){
                        $("#dv_spinners-load").show()
                        // $(".btnSaveInfo").attr("disabled", true);
                    },
                    complete: function(){
                        $("#dv_spinners-load").hide()
                        // $(".btnSaveInfo").removeAttr("disabled");
                    },
                    success: function(data){
    
                        if(data.info.action==1){                                                      
                            sweetMsg('success', data.info.msg)                        
                        }else{
                            sweetMsg('error', data.info.msg)
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
                event.revert();
            }
        })
        
    },

    eventResize: function(event, delta, revertFunc) {

        
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

                var date = event.event.start;
                var date_end = event.event.end

                var fecha = date.getFullYear()+'-'+zeroPad((parseInt(date.getMonth()) + parseInt(1)),2) +'-'+zeroPad(date.getDate(),2);
                var hora_inicio = zeroPad(date.getHours(),2)+':'+zeroPad(date.getMinutes(),2)
                var hora_fin = zeroPad(date_end.getHours(),2)+':'+zeroPad(date_end.getMinutes(),2)
              
                $.ajax({
                    type: "POST",
                    url: baseUrl+'/updateCitaDrop',
                    dataType:'json',
                    data: {     
                        idcita:event.event._def.publicId,
                        iddoctor: event.event._def.resourceIds[0],
                        idpaciente: event.event._def.extendedProps.idpaciente,  
                        fecha: fecha,
                        hora_inicio: hora_inicio,
                        hora_fin: hora_fin
                    },
                    beforeSend: function(){
                        $("#dv_spinners-load").show()
                        // $(".btnSaveInfo").attr("disabled", true);
                    },
                    complete: function(){
                        $("#dv_spinners-load").hide()
                        // $(".btnSaveInfo").removeAttr("disabled");
                    },
                    success: function(data){
    
                        if(data.info.action==1){                                                      
                            sweetMsg('success', data.info.msg)                        
                        }else{
                            sweetMsg('error', data.info.msg)
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
                event.revert();
            }
        })
    },

    });

    calendar.render();
    


    $("#btn-new-event").on("click", function (e) {
        $("#modal-title").text('Crear Nueva Cita')
        $('#ag-paciente').attr('disabled', false);
        $('#ag-paciente').empty()
        n[0].reset()       
        $("#btn-update-event").hide()
        $("#btn-delete-event").hide()
        $("#dv_info_paciente").hide()
        $("#dv_search_paciente").show()
        $("#btn-save-event").show() 
        
        a.modal("show")
    })


    $('body').on('click', 'button.fc-prev-button', function() {

        getDatesCalendar(-1)
        loadCalendario()

    });


    $('body').on('click', 'button.fc-next-button', function() {
        getDatesCalendar(1)
        loadCalendario();        
    });

    $(".fc-today-button").click(function() {
        //alert('Clicked Today!');
        $("#date-calendar").val($("#fecha_actual").val())
        
        loadCalendario();
    });

    /*
        FUNCIONES PROPIAS
    */

    $('#ag-medico').select2()
    $('#ag-paciente').select2({
        placeholder: 'Digite el nombre del Paciente',
        minimumInputLength: 3,
        dropdownParent: $("#event-modal"),
        ajax: {
            url: baseUrl+'/searchPacientes',
            dataType: 'json',
            type: 'POST',
            delay: 200,
            data: function (params) {
            var query = {
                search: params.term,
                //idclinica: $("#i_c_clinica").val(),              
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



})(window.jQuery),
    (function () {
        "use strict";
        //window.jQuery.CalendarPage.init();
    })();

/*
    FUNCIONES DE AGENDA
*/


function getDatesCalendar(days){
    var tt = $("#date-calendar").val()

    var str = tt
    str = str.split('-'); // split into an array [2014,06,24]
    str[1]--;   // month (second array item) adjusted for zero-based index
    var dateTime = Date.UTC.apply(null, str);

    var new_day = new Date(dateTime);
    new_day.setDate(new_day.getDate() + days);

    //var date_string = new_day.getUTCFullYear()+"-"+addZero(new_day.getUTCMonth()+1)+"-"+(new_day.getUTCDate());
    var date_string = new_day.getUTCFullYear()+"-"+zeroPad((new_day.getUTCMonth()+ parseInt(1)),2)+"-"+zeroPad(new_day.getUTCDate(),2);    

    $("#date-calendar").val(date_string)
}



function loadCalendario(){

    var iddoctor = $("#agenda-doctores-show").val()
    iddoctor = iddoctor.toString()

    mypickrDate.setDate($("#date-calendar").val(), undefined, undefined, true);

    $.ajax({
        type:'POST',
        url: baseUrl+'/calendario',
        dataType:'json',
        data: {
            fecha: $("#date-calendar").val(),
            idclinica : $("#agenda-clinica").val(),
            iddoctor: iddoctor
           
        },
        beforeSend: function(){
            $("#dv_spinners-load").show()
        },
        complete: function(){
            $("#dv_spinners-load").hide()
        },
        success:function(data){
            
            var tt = $("#date-calendar").val()
            var str = tt
            str = str.split('-'); // split into an array [2014,06,24]
            str[1]--;   // month (second array item) adjusted for zero-based index
            var dateTime = Date.UTC.apply(null, str);
            var new_day = new Date(dateTime);
            new_day = new_day.setDate(new_day.getDate() + 1);
            
            calendar.gotoDate(new_day)



            var resources = calendar.getResources()  
            resources.forEach(function (x) {                
                //console.log(x._resource.id)
                calendar.getResourceById(x._resource.id).remove();
                //resourceA.remove();
            })


            calendar.refetchResources()
            data.doctores.forEach(function (x) {                
                calendar.addResource(x)
            })    

            calendar.removeAllEvents();
            data.citas.forEach(function (x) {                
                calendar.addEvent(x)
            });        

            //sweetMsg('success', 'Cargado con Exito!')

            /*  RESUMEN DE ATENCIONES */
            var html='';
            $("#dv_resumen").empty();
            $("#dv_resumen").html('')            
            $( "div" ).remove( ".resumen-atencion" );
            if(data.resumen.length>0){
                $.each(data.resumen, function(index, v) {
                    html += '<div class="resumen-atencion external-event  text-'+v.color_text+' bg-soft-'+v.color_text+'" data-class="'+v.color+'">'
                            +'<i class="mdi mdi-checkbox-blank-circle font-size-11 me-2"></i>'
                            +' '+v.estado +' <span class="text-end" style="font-size: 18px; font-weight:bold">'+v.total+'</span>'
                        +'</div>'
                    
                })

                $("#dv_resumen").html(html)
            }

        }

    });

}


function saveCita(){

    var idpaciente  = $("#ag-paciente").val()
    var paciente    = $("#ag-paciente").text()
    var iddoctor    = $("#ag-doctor").val()
    var fecha       = $("#ag-fecha-cita").val()
    var hora_inicio = $("#ag-hora-inicio").val()
    var hora_fin    = $("#ag-hora-fin").val()
    var tipo_cita   = $("#ag-tipo-cosulta").val()
    var motivo      = $("#ag-motivo-consulta").val()
    var estado      = $("#ag-estado-cita").val()


    $.ajax({
        type: "POST",
        url : baseUrl+'/insertCita',
        data: {
            idclinica : $("#agenda-clinica").val(),
            idpaciente: idpaciente,
            iddoctor: iddoctor,
            fecha: fecha,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            tipo_cita: tipo_cita,
            motivo: motivo,
            estado: estado
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



function updateCita(){

    var idcita      = $("#hidcita").val()
    var idpaciente  = $("#ag-paciente").val()
    var paciente    = $("#ag-paciente").text()
    var iddoctor    = $("#ag-doctor").val()
    var fecha       = $("#ag-fecha-cita").val()
    var hora_inicio = $("#ag-hora-inicio").val()
    var hora_fin    = $("#ag-hora-fin").val()
    var tipo_cita   = $("#ag-tipo-cosulta").val()
    var motivo      = $("#ag-motivo-consulta").val()
    var estado      = $("#ag-estado-cita").val()

    if(estado==''){
        toast_msg('error', 'Indique el estado')
        return
    }


    $.ajax({
        type: "POST",
        url : baseUrl+'/updateCita',
        data: {
            idcita: idcita,
            idclinica: 178,
            idpaciente: idpaciente,
            iddoctor: iddoctor,
            fecha: fecha,
            hora_inicio: hora_inicio,
            hora_fin: hora_fin,
            tipo_cita: tipo_cita,
            motivo: motivo,
            estado: estado
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
                loadCalendario()
            }                
                
            else                
                sweetMsg('error', data.info.msg)         

        },error: function(xhr) {
            console.log(response.responseJSON.errors)
        }

    });
}


function deleteCita(){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })


    swalWithBootstrapButtons.fire({
        title: 'Desea Eliminar la Cita?',
        text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            var idcita = $("#hidcita").val()
            $.ajax({
                type: "POST",
                url : baseUrl+'/deleteCita',
                data: {                             
                    idcita: idcita,                                      
                },
                beforeSend: function(){
                    // $(".btnSppinAjax").show()
                    $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    // $(".btnSppinAjax").hide()
                    $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function(data){

                    if(data.info.action==1){
                        sweetMsg('success', data.info.msg)     
                        var event = calendar.getEventById(idcita)
                        event.remove()
                        $("#event-modal").modal('hide')
                      

                    }else{                        
                        sweetMsg('error', data.info.msg)     
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
            console.log('Cancelado!')
        }
    })

}

function zeroPad(num, numZeros) {
    var n = Math.abs(num);
    var zeros = Math.max(0, numZeros - Math.floor(n).toString().length );
    var zeroString = Math.pow(10,zeros).toString().substr(1);
    if( num < 0 ) {
        zeroString = '-' + zeroString;
    }

    return zeroString+n;
}


function GetEndDate(date){ 
    
    //var start_date = date;
    var date1 = date
    var lahorainicio = moment(date1.setMinutes(date1.getMinutes()+15)).format('HH:mm');
    
   return lahorainicio;
    
}


function createCitaEventModal(date){

    //console.log(date)
    $("#modal-title").text('Crear Nueva Cita')

    $("#btn-update-event").hide()
    $("#btn-delete-event").hide()    
    $("#dv_info_paciente").hide()
    $("#dv_search_paciente").show()
    $("#btn-save-event").show()
    $('#ag-paciente').attr('disabled', false);

    $("#ag-paciente").empty()

    fecha = date.getFullYear()+'-'+zeroPad((parseInt(date.getMonth()) + parseInt(1)),2) +'-'+zeroPad(date.getDate(),2);
    hora_inicio = zeroPad(date.getHours(),2)+':'+zeroPad(date.getMinutes(),2)
    hora_fin = GetEndDate(date)
    
    $("#ag-fecha-cita").val(fecha)
    $("#ag-hora-inicio").val(hora_inicio)
    $("#ag-hora-fin").val(hora_fin)

}


function editCitaModal(event){

    $("#modal-title").text(event.paciente+' - Editar Cita')
    $("#ag-paciente").empty()    
    $("#hidpaciente").val(event.idpaciente)
    $("#ag-paciente").append("<option value='"+event.idpaciente+"'>"+event.paciente+"</option>")
    $('#ag-paciente').attr('disabled', 'disabled');

    $("#btn-update-event").show()
    $("#btn-delete-event").show()
    $("#dv_info_paciente").show()
    $("#dv_search_paciente").hide()
    $("#btn-save-event").hide()

    $("#ag-doctor").val(event.iddoctor)
    $("#ag-fecha-cita").val(event.fecha)
    $("#ag-hora-inicio").val(event.hora_inicio)
    $("#ag-hora-fin").val(event.hora_fin)
    $("#ag-tipo-cosulta").val(event.tipocita)
    $("#ag-motivo-consulta").val(event.description)
    $("#ag-estado-cita").val(event.estado)

    $("#sp_celular").text(event.celular)
    $("#sp_correo").text(event.correo)
}


function openHistoriaClinica(){

    var idpaciente = $("#hidpaciente").val()
    url = baseUrl+'/pacientesProfile/'+idpaciente
    $("#event-modal").modal('hide')

    window.open(url, '_blank').focus();

}