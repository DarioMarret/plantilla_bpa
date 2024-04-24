var formEditProced = document.getElementById('form-procedimiento-edit');


// Chocies Select plugin
var multiplePiezasButton = new Choices('#piezas_select',{
      removeItemButton: true,
      duplicateItemsAllowed: false,
    }
  );

  var multipleCaraslButton = new Choices(
    '#caras_select',
    {
      removeItemButton: true,
    }
  );

document.addEventListener('DOMContentLoaded', function () {
    var genericExamples = document.querySelectorAll('[data-trigger]');

    multiplePiezasButton.removeActiveItems()
    multipleCaraslButton.removeActiveItems()
    createOdontogram()

    formEditProced.addEventListener('submit', editTratamientoPaciente);
    

    $('#adulto_odo').on('click',function () {
        if ($(this).is(':checked')) {
            console.log('chequeaado!')
          $('#renderodontograma .diente').show();
          $('#renderodontograma .diente-leche').hide();
        }else{
            $('#renderodontograma .diente').hide();
        }
    });
    $('#infantil_odo').on('click',function () {
        if ($(this).is(':checked')) {
            $('#renderodontograma .diente-leche').show();
            }else{
            $('#renderodontograma .diente-leche').hide();
        }
    });

    $('#renderodontograma .diente-leche').hide();

    $('#renderodontograma_exportar .diente-leche').show();
    $('#renderodontograma_exportar .diente').show();  


    flatpickr('#p_fecha_ingreso');
    flatpickr('#edit-trata-fecha');
    flatpickr('#edit-trata-fecha-realiza');
    
    

    $('#p_tratamientos_busq').select2({
        placeholder: 'Digite el Tratamiento a Realizar',
        minimumInputLength: 3,
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
    
});


function sumDescuento(){

    var precio = $("#edit-trata-precio").val()
    var desc = $("#edit-trata-desc").val()

    var total = parseFloat(precio) - parseFloat(desc);
    /*
    if (typeof value != 'number' || total<=0) {
        toast_msg('error','Ingrese un valor valido')
        return;
    }
    */
    $("#edit-trata-total").val(total.toFixed(2))

}

function addpieza(lblpieza){
    if(!$('#tipodientechk').is(':checked')){
        $('#tipodientechk').prop('checked', true).trigger('change');
    }
    piezaadd = $(lblpieza).text();
   
  
    //var selectedItems = $("#pieza").select2("val");
    //selectedItems.push(piezaadd);   // I used "WA" here to test.
    //$("#pieza").select2("val", selectedItems);
    

    var selectedItems = $("#piezas_select").val();
    if(selectedItems.find(element => element == piezaadd)){
       //remove from array
       //var filteredAry = selectedItems.filter(function(e) { return e !== piezaadd })
       //multiplePiezasButton.setValue(filteredAry);
    }else{
        multiplePiezasButton.setValue([piezaadd]);
    }

    selectedItems.push(piezaadd); 
    $("#piezas_select").val(selectedItems)

   
    
    console.log(selectedItems)
}


function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function createOdontogram() {
    var htmlLecheLeft = "",
        htmlLecheRight = "",
        htmlLecheLeft2 = "",
        htmlLecheRight2 = "",
        htmlLeft = "",
        htmlLeft2 = "",
        htmlRight = "",
        htmlRight2 = "",
        a = 1;
    for (var i = 9 - 1; i >= 1; i--) {
        //Dientes Definitivos Cuandrante Derecho (Superior/Inferior)
        htmlRight += '<div data-name="value" id="dienteindex' + i + '" class="diente">' +
            '<span onclick="addpieza(this);" style="margin-left: 5px; margin-bottom: -25px;display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-info">index' + i + '</span>' +
            '<div id="dindex' + i + '"  class="pieza"></div>' +
            '<div class="circlebox" style="margin-top: -35px; color:transparent; line-height: 10px;" id="cindex' + i + '">'+
            '</div>'+
            '</div>';
        htmlRight2 += '<div data-name="value" id="dienteindex' + i + '" class="diente">' +
            '<div class="circlebox" style="margin-bottom: -35px; color:transparent;line-height: 10px;"  id="cindex' + i + '">'+
            '</div>'+
            '<div id="dindex' + i + '"  class="pieza"></div>' +
            '<span onclick="addpieza(this);" style="margin-left: 5px; display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-info">index' + i + '</span>' +
            '</div>';
        //Dientes Definitivos Cuandrante Izquierdo (Superior/Inferior)
        htmlLeft += '<div id="dienteindex' + a + '" class="diente">' +
            '<span onclick="addpieza(this);" style="margin-left: 5px; margin-bottom:-15px; display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-info">index' + a + '</span>' +
            '<div id="dindex' + a + '"  class="pieza"></div>' +
            '<div class="circlebox" style="margin-top: -35px; color:transparent;line-height: 10px;" id="cindex' + a + '">'+
            '</div>'+
            '</div>';
        htmlLeft2 += '<div id="dienteindex' + a + '" class="diente">' +
            '<div class="circlebox" style="margin-bottom: -35px; color:transparent;line-height: 10px;"  id="cindex' + a + '">'+
            '</div>'+
            '<div id="dindex' + a + '"  class="pieza"></div>' +
            '<span onclick="addpieza(this);" style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-info">index' + a + '</span>' +
            '</div>';
        if (i <= 5) {
            //Dientes Temporales Cuandrante Derecho (Superior/Inferior)
            htmlLecheRight += '<div id="dienteLindex' + i + '" style="left: -25%;" class="diente-leche">' +
                '<span onclick="addpieza(this);" style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-primary">index' + i + '</span>' +
                '<div id="dindex' + i + '" class="pieza"></div>' +
                '<div class="circlebox" style="margin-top: -25px;color:transparent;line-height: 10px;" id="clecheindex' + i + '">'+
                '</div>'+
                '</div>';
            htmlLecheRight2 += '<div id="dienteLindex' + i + '" style="left: -25%;" class="diente-leche">' +
                '<div  class="circlebox" style="margin-bottom: -25px;color:transparent;line-height: 10px;" id="clecheindex' + i + '">'+
                '</div>'+
                '<div id="dindex' + i + '" class="pieza"></div>' +
                '<span onclick="addpieza(this);" style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-primary">index' + i + '</span>' +
                '</div>';
        }
        if (a < 6) {
            //Dientes Temporales Cuandrante Izquierdo (Superior/Inferior)
            htmlLecheLeft += '<div id="dienteLindex' + a + '" class="diente-leche">' +
                '<span onclick="addpieza(this);" style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-primary">index' + a + '</span>' +
                '<div id="dindex' + a + '" class="pieza"></div>' +

                '<div class="circlebox" style="margin-top: -25px;color:transparent;line-height: 10px;" id="clecheindex' + a + '">'+
                '</div>'+
                '</div>';
            htmlLecheLeft2 += '<div id="dienteLindex' + a + '" class="diente-leche">' +
                '<div class="circlebox" style="margin-bottom: -25px; color:transparent;line-height: 10px;" id="clecheindex' + a + '">'+
                '</div>'+
                '<div id="dindex' + a + '" class="pieza"></div>' +
                '<span onclick="addpieza(this);" style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important; cursor: pointer;" class="label label-primary">index' + a + '</span>' +
                '</div>';
        }
        a++;
    }
    $("#tr").append(replaceAll('index', '1', htmlRight));
    $("#tl").append(replaceAll('index', '2', htmlLeft));
    $("#tlr").append(replaceAll('index', '5', htmlLecheRight));
    $("#tll").append(replaceAll('index', '6', htmlLecheLeft));


    $("#bl").append(replaceAll('index', '3', htmlLeft2));
    $("#br").append(replaceAll('index', '4', htmlRight2));
    $("#bll").append(replaceAll('index', '7', htmlLecheLeft2));
    $("#blr").append(replaceAll('index', '8', htmlLecheRight2));
    load_default('');
}


function load_default(xpieza){
    //cargar dientes por defecto
    if(xpieza==''){
        clear_odonto();
        for(pieza=11; pieza<19;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=21; pieza<29;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=31; pieza<39;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=41; pieza<49;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=51; pieza<56;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=61; pieza<66;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=71; pieza<76;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=81; pieza<86;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
    }else{
        $('#d'+xpieza).css('background-image', 'url(../assets/media/'+xpieza+'.png)');
        $('#d'+xpieza).css('background-position', 'left top');
        $('#d'+xpieza).css('background-repeat', 'no-repeat');
        $('#d'+xpieza).css('width', '36px');
        $('#d'+xpieza).css('height', '112px');
    }
}


function clear_odonto(){
    //createOdontogram();
    console.log('fue activado');
        
        for(pieza=11; pieza<19;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=21; pieza<29;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=31; pieza<39;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=41; pieza<49;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=51; pieza<56;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=61; pieza<66;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=71; pieza<76;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }
        for(pieza=81; pieza<86;pieza++){
            $('#d'+pieza).css('background-image', 'url(../assets/media/'+pieza+'.png)');
            $('#d'+pieza).css('background-position', 'left top');
            $('#d'+pieza).css('background-repeat', 'no-repeat');
            $('#d'+pieza).css('width', '36px');
            $('#d'+pieza).css('height', '112px');
        }

        var getElementsNested = $('#renderodontograma').find('.circlebox');
        var adult  = [];
        var infant = [];

        for( var key in getElementsNested ){
            if (!getElementsNested.hasOwnProperty(key)) continue;
            
                let id = getElementsNested[key].id;
                let val = getElementsNested[key];

                if(id){
                    if(id.startsWith('cle')){
                        //above.id[getElementsNested[key]];
                        infant.push(id);
                    }else{
                        //below.id[getElementsNested[key]];
                        adult.push(id);
                    }
                }
        }

        var above_adult = adult.slice(0, adult.length/2);
        var below_adult = adult.slice(adult.length/2);
        var above_infant = infant.slice(0, infant.length/2);
        var below_infant = infant.slice(infant.length/2);

        for( let i = 0; i < above_adult.length; i++ ){
            let id = above_adult[i];
            $('#'+id).removeAttr('style');
            $('#'+id).attr('style', 'margin-top: -35px; color:transparent; line-height: 10px;'); 
        }

        for( let i = 0; i < below_adult.length; i++ ){
            let id = below_adult[i];
            $('#'+id).removeAttr('style');
            $('#'+id).attr('style', 'margin-bottom: -25px; color:transparent; line-height: 10px;'); 
        }

        for( let i = 0; i < above_infant.length; i++ ){
            let id = above_infant[i];
            $('#'+id).removeAttr('style');
            $('#'+id).attr('style', 'margin-top: -35px; color:transparent; line-height: 10px;'); 
        }

        for( let i = 0; i < below_infant.length; i++ ){
            let id = below_infant[i];
            $('#'+id).removeAttr('style');
            $('#'+id).attr('style', 'margin-bottom: -25px; color:transparent; line-height: 10px;');    
        }

    //console.log(above_adult,below_adult,above_infant,below_infant);

    //console.log(getElementsNested);
};



function getInfoProc(value){

    var idproc  = value.value;


    $.ajax({
        type: "POST",
        url : baseUrl+'/getInfoProcedOdont',
        data: {
            idclinica: $("#p_idclinica_odont").val(),
            idprocedimiento: idproc
        },
        beforeSend: function(){
            $(".btn_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btn_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },success: function (data) {
            
            $("#tipo_aplica").val(data.info.tipo)
            $("#valorProc").val(data.info.precio)

            if(data.info.activate==1) {
                
                multiplePiezasButton.disable()
                multipleCaraslButton.disable()                
                multipleCaraslButton.removeActiveItems()
                multiplePiezasButton.removeActiveItems()
                
            }
            else {
                //$('#piezas_select').prop('disabled', false);
                //$('#caras_select').prop('disabled', false);
                multiplePiezasButton.enable()
                multipleCaraslButton.enable()
            }

            if(data.info.caras==1){
                multipleCaraslButton.enable()
            }else{
                //$('#caras_select').prop('disabled', 'disabled');
                multipleCaraslButton.disable()                
                multipleCaraslButton.removeActiveItems()
            }

        },error: function(xhr) {

        }

    });


}


function listTratamientosEstado(){

    var estado = $("#cb_opciones_tratamientos").val()
    getProcePacienteOdon(estado);

}


function getProcePacienteOdon(estado=''){
   

    $.ajax({
        type: "POST",
        url : baseUrl+'/loadProcedimientosPaciente',
        data: {
          idpaciente: $("#hidpaciente").val(), 
          estado: estado 
        },
        beforeSend: function(){
            $(".btnSaveInfo").attr("disabled", true);
            $(".btn_loading").show();
        },
        complete: function(){
            $(".btnSaveInfo").removeAttr("disabled");
            $(".btn_loading").hide();
        },
        success: function(data)
        {
            $("#tb_procedimientos_pendientes tbody").empty()

            sec = 1;
            $.each(data.info, function(index, v) {

                if(v.estado_pago=='S' && v.estado!='Previo')
                    option_facturar = ' <a class="dropdown-item" href="javascript:;" onclick="enviarCobro('+v.idtratamiento+')">Enviar Facturar</a>\n'
                else
                    option_facturar = ''
                
                var detalle
                if(v.detalle_procedimiento!=null){
                    detalle = "<br><span style='font-size: 12px;font-weight: bold'>"+v.detalle_procedimiento+"</span>"   
                }else
                    detalle = ''

                var options = '<div class="btn-group"><button type="button" class="btn btn-link font-size-16 shadow-none py-0 text-muted dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i class="bx bx-dots-horizontal-rounded"></i></button>\n' +
                            '   <div class="dropdown-menu">\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="loadInfoTratamiento('+v.idtratamiento+')">Editar</a>\n' +
                            '   <a class="dropdown-item" href="javascript:;" onclick="eliminarProcOdonto('+v.idtratamiento+')">Eliminar</a>\n' +
                            '   <div class="dropdown-divider"></div>\n' +
                            '   '+option_facturar+' '+
'                           </div></div>';

                var total, doctor
                if(v.estado=='Previo'){
                    precio =''
                    descuento =''
                    total = ''
                    doctor = ''
                }else{
                    precio = v.precio
                    descuento = v.descuento
                    total = v.total
                    doctor = v.doctor
                }

                $("#tb_procedimientos_pendientes").append("<tr style='background-color:"+v.row_color+"'><td align='center'>"+sec+"</td><td>"+v.clinica+"</td><td><div class='text-muted'>"+v.tipoprocedimiento+"</div>"+v.procedimiento+" "+detalle+"</td><td>"+(v.pieza?? "")+"</td><td style='background-color:"+v.color+"; color:white'>"+(v.zona?? "")
                                +"</td><td align='center'  style='color:green; font-size:15px; font-weight:bold'>"+precio+"</td><td align='center'  style='color:red; font-size:15px; font-weight:bold'>"+descuento+"</td><td align='center'  style='color:blue; font-size:15px; font-weight:bold'>"+total+"</td><td>"+(doctor ?? "")+"</td><td><span class='badge bg-"+v.estado_color+"'>"+v.estado+"</span><br><span class='badge bg-info'>"+v.fecha_diagnostico+"</span></td><td><span class='badge bg-"+v.estado_pago_color+"'>"+v.estado_pago_desc+"</span></td><td align='left'>"+options+"</td></tr>")
                sec++;
            });

        },
        error: function(response) {
            console.log(response.responseJSON.errors)

        }

    });
}


function insertProcedimientoOdont(){

    var idpaciente  = $("#hidpaciente").val()
    var idclinica   = $("#p_idclinica_odont").val()
    var fecha       = $("#p_fecha_ingreso").val()
    var idproce     = $("#p_tratamientos_busq").val()
    var valor       = $("#valorProc").val()
    var piezas      = $("#piezas_select").val();
    var caras       = $("#caras_select").val()
    var estado      = $("#p_estado").val()
    var iddoctor    = $("#p_doctor_ingreso").val()

    

    if(fecha=='' || idproce=='' || idproce==null){
        toast_msg('error','Por favor, llene todos los campos')
        return;
    }

    $.ajax({
        type: "POST",
        url : baseUrl+'/insertProcedimientoPaciente',
        data: {
            idclinica: idclinica,
            idpaciente: idpaciente,
            fecha: fecha,
            idproce: idproce,
            valor: valor,
            piezas: piezas,
            caras: caras,
            estado: estado,
            iddoctor: iddoctor
        },
        beforeSend: function(){
            $(".btnSppinAjax").show()
            $(".btn_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnSppinAjax").hide()
            $(".btn_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data)
        {
           
            if(data.info.action==1){
                
                sweetMsg('success', data.info.msg)
                multiplePiezasButton.enable()
                multipleCaraslButton.enable()                
                multipleCaraslButton.removeActiveItems()
                multiplePiezasButton.removeActiveItems()
                $("#p_tratamientos_busq").empty()
                $("#p_estado").val('Aceptado')
                $("#valorProc").val('')
                getProcePacienteOdon()
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

function editarProcOdonto(){
    $("#canvasIngresoProcedOdont").offcanvas().offcanvas("toggle");
}



function loadInfoTratamiento(idtratamiento){

    $("#hidtratamiento").val(idtratamiento)
    var idpaciente  = $("#hidpaciente").val()
    
    $.ajax({
        type: "POST",
        url : baseUrl+'/loadTratamientoEdit',
        data: {
            idtratamiento: idtratamiento,
            idpaciente: idpaciente
        },
        beforeSend: function(){
            $(".btn_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".btnSppinAjax").hide()
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function(data)
        {
           
            console.log(data)
            $("#edit-trata-clinicas").val(data.info.idclinica)
            $("#edit-trata-procedimiento").val(data.info.tipoprocedimiento+' - '+data.info.procedimiento)
            
            $("#edit-trata-medico").val(data.info.iddoctor)
            $("#edit-trata-pieza").val(data.info.pieza)
            $("#edit-trata-zona").val(data.info.zona)
            $("#edit-trata-precio").val(data.info.precio)
            $("#edit-trata-desc").val(data.info.descuento)
            $("#edit-trata-fecha").val(data.info.fecha_diagnostico)
            $("#edit-trata-fecha-realiza").val(data.info.fecha_fin)
            $("#edit-trata-estado").val(data.info.estado)
            $("#edit-trata-estado-pago").val(data.info.estado_pago)

           
            
            if(data.info.aplica=='Boca') $("#dv_pieza").hide()
            else $("#dv_pieza").show()

            if(data.info.use_caras==1) $("#dv_caras").show()
            else $("#dv_caras").hide()
            
            editarProcOdonto()

        },
        error: function(response) {
            console.log(response.responseJSON.errors)
            $(".btnSaveInfo").removeAttr("disabled");

        }

    });
}


function editTratamientoPaciente(e){

    e.preventDefault();

    var form = $("#form-procedimiento-edit");

    var estado = $("#edit-trata-estado").val()
    var estado_pago = $("#edit-trata-estado-pago").val()    
    if((estado_pago=='P' ||  estado_pago=='C') && estado=='Previo'){
        toast_msg('error','No se puede cambiar a estado Previo un tratamiento enviado a Facturacion!')
        return;
    }

    $.ajax({
        type: "POST",
        url : baseUrl+'/editTratamientoPaciente',
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

            if(data.info.action==1) {
                toast_msg('success', data.info.msg)
                //document.getElementById("form-procedimiento-edit").reset();
                getProcePacienteOdon()
                
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



function eliminarProcOdonto(idproce){

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
                    idproce: idproce
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
                        getProcePacienteOdon()

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



function enviarCobro(idtratamiento){


    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Enviar a Facturar el Tratamiento?',
        //text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, enviar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            $.ajax({
                type: "POST",
                url : baseUrl+'/enviarFaturarTratamiento',
                data: {
                    idtratamiento: idtratamiento
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
   
                        toast_msg('success', data.info.msg)
                        getProcePacienteOdon()

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