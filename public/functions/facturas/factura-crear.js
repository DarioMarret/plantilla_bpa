var formCreateCliente = document.getElementById('form-cliente-create');


$(document).ready(function(){

    flatpickr('#fc_fecha_ingreso');
    formCreateCliente.addEventListener('submit', guardarCliente);

    $('#fc-paciente').select2({
        placeholder: 'Digite el nombre del Paciente',
        minimumInputLength: 3,
        //dropdownParent: $("#event-modal"),
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


    $('#fc-cliente').select2({
        placeholder: 'Digite el nombre del Cliente',
        minimumInputLength: 3,
        //dropdownParent: $("#event-modal"),
        ajax: {
            url: baseUrl+'/searchCliente',
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


    $('#metodopago').on('change', function() {
		
		$("#num_transferencia").val('');
		  
		
		if(this.value=='Transferencia Bancaria' || this.value=='Débito Bancario' || this.value=='Cheque' || this.value=='Deposito Bancario'){
			$("#dv_transferencia").show();
			$("#dv_num_fp").show();
			
			$("#dv_tarjetas").hide();
			$("#dv_abono").hide();
		}
		else if(this.value=='Tarjeta Crédito' || this.value=='Tarjeta Débito'){
			$("#dv_transferencia").show();
			$("#dv_tarjetas").show();
            $("#dv_num_fp").show();
			
			//$("#dv_num_fp").hide();
			$("#dv_abono").hide();
		}
		else{
			$("#dv_transferencia").hide();
			$("#dv_tarjetas").hide();
			$("#dv_num_fp").hide();
			$("#dv_abono").hide();
		}
		
	})

})


function changeValorPagar(idtable){

     /*Formas de Pago*/
     var TableData;
     TableData = storeTblValues_fp();
     TableData = $.toJSON(TableData);

    console.log(TableData)
    console.log(TableData.length)

    if(TableData.length>2){        
        //sweetMsg('error', 'No puede guardar una Factura con valor Cero.') 
        //return  
    }

    var ivaClinica = 12
    var pagar =  $("#valor_pagar_"+idtable).val()
    var total = $("#h_valor_pagar_"+idtable).text()
    var aplica_iva = $("#td_iva_"+idtable).text()
    
    iva_valor_trat = (aplica_iva==1)?((parseFloat(pagar) * parseFloat(ivaClinica))/100):parseFloat(0);
    total_tratamiento = parseFloat(pagar) + parseFloat(iva_valor_trat);
    

    if(parseFloat(pagar)>parseFloat(total)){       
        sweetMsg('error', 'El valor a Pagar no puede ser mayor al Valor a Total')  
        $("#valor_pagar_"+idtable).val(total)
        
        iva_valor_trat = (aplica_iva==1)?((parseFloat(total) * parseFloat(ivaClinica))/100):parseFloat(0);
        $("#td_iva_valor_"+idtable).text(parseFloat(iva_valor_trat).toFixed(2))
        
        $("#td_total_pagar_"+idtable).text(total)
        //$("#pendiente_"+tipo+'_'+idtable).text(0.00)
        $("#fac_td_valor_"+idtable).html('')
        $("#fac_td_valor_"+idtable).html('<span style="color: green;font-size:21px"><strong>'+total+'</strong></span>')


        sumTotalesFact()
        return
    }
    var total_pagar = parseFloat(total) - parseFloat(pagar);
    $("#td_iva_valor_"+idtable).text(parseFloat(iva_valor_trat).toFixed(2))
    $("#td_total_pagar_"+idtable).text(parseFloat(total_tratamiento).toFixed(2))
    //$("#fac_td_valor_"+idtable).html('')
    $("#fac_td_valor_"+idtable).html('<span style="color: green;font-size:21px"><strong><del>'+total+'</del></strong></span>'
                                    +'<br><span style="font-size:16px; color:red"><strong>'+total_pagar+'</strong></span>')

    sumTotalesFact()

    setTimeout(function() {
        console.log('Valor'+$("#valor_pagar_"+idtable).val())
        if($("#valor_pagar_"+idtable).val()=='' || $("#valor_pagar_"+idtable).val()==null || $("#valor_pagar_"+idtable).val()==0){            
            $("#valor_pagar_"+idtable).val(total)
            sweetMsg('error', 'Valor ingresado es incorrecto')  
            changeValorPagar(idtable)
            
        }
        
    }, 2000);

}


function sumTotalesFact(){

    var subTotalFact = $("#sp_subtotal_factura").text();
    var totalFactura = $("#sp_total_factura").text();
    var totalIva = $("#sp_iva_fact").text();
    /*
    subTotalFact = parseFloat(subTotalFact) + parseFloat(valor_pagar);
    $("#sp_subtotal_factura").text(subTotalFact.toFixed(2));

    totalIva = parseFloat(totalIva) + parseFloat(iva_valor_trat);
    $("#sp_iva_fact").text(totalIva.toFixed(2));

    totalFactura = parseFloat(subTotalFact) + parseFloat(totalIva);
    $("#sp_total_factura").text(totalFactura.toFixed(2));

    var valor_pendiente_pago = parseFloat(totalFactura) - parseFloat($("#valor_pagado").text())
    $("#valor_pendiente").text(valor_pendiente_pago.toFixed(2));
    $("#cant_pagar").val(valor_pendiente_pago.toFixed(2));
    */
    var TableData = new Array();
    var total = 0;
    var item_table;
    var cant=0, valor=0, desc=0, subtotal=0, iva=0, total=0, pagar=0, pend=0

    $('#tb_factura > tbody  > tr').each(function(row, tr){
        item_table =  $(tr).find('td:eq(9)').text();        
        if(item_table!='' || item_table!='Totales:') {
            cant    = parseInt($(tr).find('td:eq(3)').text()) + parseFloat(cant)
            valor   = parseFloat($(tr).find('td:eq(4)').text()) + parseFloat(valor)
            //desc    = parseFloat($("#descuento_"+item_table).val()) + parseFloat(desc)
            subtotal= parseFloat($("#valor_pagar_"+item_table).val()) + parseFloat(subtotal)
            iva     = parseFloat($(tr).find('td:eq(6)').text()) + parseFloat(iva)
            total   = parseFloat($(tr).find('td:eq(7)').text()) + parseFloat(total)
            //pagar   = parseFloat($("#pagar_"+item_table).val()) + parseFloat(pagar)
            //pend    = parseFloat($(tr).find('td:eq(9)').text()) + parseFloat(pend)
        }
    });

    console.log('total desc: '+desc)
    //desc = (desc==null || desc=='' || desc=='NaN' || desc==NaN)?parseFloat(0.00):desc

    //$("#sp_t_valor").text(valor.toFixed(2))
    //$("#sp_t_desc").text(desc.toFixed(2))
    $("#sp_subtotal_factura").text(subtotal.toFixed(2))
    $("#sp_iva_fact").text(iva.toFixed(2))
    $("#sp_total_factura").text(total.toFixed(2))
    //$("#sp_t_pagar").text(pagar.toFixed(2))
    //$("#sp_t_pendiente").text(pend.toFixed(2))

    var valor_pendiente_pago = parseFloat(total) - parseFloat($("#valor_pagado").text())
    $("#valor_pendiente").text(valor_pendiente_pago.toFixed(2))

    //var cant_pagar = parseFloat(pagar) - parseFloat($("#valor_pagado").text())
    var cant_pagar = parseFloat( $("#sp_total_factura").text()) - parseFloat($("#valor_pagado").text())
    $("#cant_pagar").val(cant_pagar.toFixed(2))

}

function clienteInfo(){

    var idcliente = $("#fc-cliente").val()
    var nombre_completo = $("#fc-cliente option:selected").text();

    $("#sp_cl_nombre").text('')
    $("#sp_cl_doc").text('')
    $("#sp_cl_correo").text('')
    $("#sp_cl_telefono").text('')
    $("#sp_cl_dir").text('')

    $.ajax({
        type:'POST',
        url: baseUrl+'/getInfoCliente',
        dataType:'json',
        data:{
            idcliente:  idcliente,
        },
        beforeSend: function(){
            $(".spin_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled")
        },
        success:function(data){

            $("#sp_cl_nombre").text(nombre_completo)
            $("#sp_cl_doc").text(data.info.tipo_documento +" - "+data.info.numero_documento)
            $("#sp_cl_correo").text(data.info.correo)
            $("#sp_cl_telefono").text(data.info.celular)
            //$("#sp_c_dir").text(v.direccion)

            //$('#tb_factura tbody > tr').remove();
            //$('#tb_formapago tbody > tr').remove();
            //sumTotalesFact();
            $("#bn_emptyCliente").show()
            $("#card-cliente-info").show(150)
            
        }

    });
}


function pacienteInfo(){

    var idcliente = $("#fc-paciente").val()
    var nombre_completo = $("#fc-paciente option:selected").text();
    $("#fc-paciente").prop( "disabled", true );

    $("#sp_c_nombre").text('')
    $("#sp_c_doc").text('')
    $("#sp_c_correo").text('')
    $("#sp_c_telefono").text('')
    $("#sp_c_dir").text('')

    $.ajax({
        type:'POST',
        url: baseUrl+'/getInfoPaciente',
        dataType:'json',
        data:{
            idpaciente:  idcliente,
        },
        beforeSend: function(){
            $(".spin_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success:function(data){

            $("#sp_c_nombre").text(nombre_completo)
            $("#sp_c_doc").text(data.info.num_documento)
            $("#sp_c_correo").text(data.info.email)
            $("#sp_c_telefono").text(data.info.celular)
            //$("#sp_c_dir").text(v.direccion)

            $('#tb_factura tbody > tr').remove();
            $('#tb_formapago tbody > tr').remove();
            //sumTotalesFact();            
            $("#card-paciente-info").show(150)
            $("#btn_emptyPaciente").show()
            
        }

    });
}



function openModalCreateCliente(){

    //$("#cl-tipo-documento").val()
    $("#cl-identificacion-cliente").val('')
    $("#cl-nombres-cliente").val('')
    $("#cl-telefono-cliente").val('')
    $("#cl-celular-cliente").val('')
    $("#cl-email-cliente").val('')
    $("#cl-direccion-cliente").val('')

    $("#modalAddCliente").modal('show')
}


function validateEmptyInfoPaciente(){

    var TableDataTrat;
    TableDataTrat = storeTblValuesTratamientos();
    TableDataTrat = $.toJSON(TableDataTrat);

    console.log(TableDataTrat.length)

    if(TableDataTrat.length>2){

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })


        swalWithBootstrapButtons.fire({
            title: 'Posee tratamientos ingresados, desea continuar?',
            //text: "No podra reversar el cambio",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
        }).then((result) => {
    
            if (result.isConfirmed) {
                               
                emptyInfoPaciente()
    
            } 
        })
    }else{

        emptyInfoPaciente()
    }



}


function emptyInfoPaciente(){

    $("#fc-paciente").prop( "disabled", false );
    $("#sp_c_nombre").text('')
    $("#sp_c_doc").text('')
    $("#sp_c_correo").text('')
    $("#sp_c_telefono").text('')
    $("#sp_c_dir").text('')

    $('#tb_factura tbody > tr').remove();
    $('#tb_formapago tbody > tr').remove();
    $("#fc-paciente").empty()
    sumTotalesFact();   
    
    $("#valor_pagado").text('0.00')
    $("#cant_pagar").val('0.00')
    
    $("#sp_subtotal_factura").text('0.00')
    $("#sp_iva_fact").text('0.00')
    $("#sp_total_factura").text('0.00')
    $("#valor_pendiente").text('0.00')
        
    $("#btn_emptyPaciente").hide()
    $("#card-paciente-info").hide(150)
}

function emptyClienteOption(){

    $("#fc-cliente").empty()
    $("#sp_cl_nombre").text('')
    $("#sp_cl_doc").text('')
    $("#sp_cl_correo").text('')
    $("#sp_cl_telefono").text('')
    $("#sp_cl_dir").text('')
    $("#bn_emptyCliente").hide()
    $("#card-cliente-info").hide(150)
}



function getTratamientos(){

    var idpaciente = $("#fc-paciente").val()
    console.log(idpaciente)
	if(idpaciente=='' || idpaciente==null){
		//zebra_error('Favor llenar todos los campos');
        sweetMsg('error', 'Favor seleccione a un paciente')  
		return;
	}


    $("#tb_tratamientos_pendientes tbody").empty()

    $.ajax({
        type: "POST",
        url : baseUrl+'/tratamientosPendientes',
        data: {
           idpaciente: idpaciente
        },
        beforeSend: function(){
            $(".spin_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },success: function (data) {
            
            var sec=1
            $.each(data.info, function(index, v) {
                
                var info = JSON.stringify(v)
                $("#tb_tratamientos_pendientes").append("<tr id='tr_"+v.idpcuenta+"'><td>"+sec+"</td><td>"+v.fecha+"</td><td>"+v.tipo+"</td><td>"+(v.detalle?? "")+"</td><td class='text-center' style='font-size:18px; color:red'><strong>"+v.valor+"</strong></td><td align='right'><button class='btn btn-sm btn-success' onclick='addTratamiento("+v.idpcuenta+", "+info+")'><i class='far fa-check-circle'></i></button></td></tr>")         
                sec++;
            })

            $("#modalTratamientosPendientes").modal('show')

        },error: function(xhr) {
            console.log(response.responseJSON.errors)
        }

    });
}


function addTratamiento(idpCuenta, info){
    
    var ivaClinica = 12;
    var detalle = info.detalle
    var tipo = info.tipo
    var valor = info.valor
    var estado = info.estado
    var valor_pagar = info.valor
    var saldo_pendiente = 0;
    var aplica_iva = info.aplica_iva    
    var iva_valor_trat = 0;
    var cant = 1


	if(findDuplicateValues(idpCuenta)){
        //alert('Tratamiento ya ha sido agregado');
        sweetMsg('error', 'Tratamiento ya ha sido agregado')  
        return;
	}
        
    if(parseFloat(valor_pagar)>parseFloat(valor)){
        //alert('Valor a Pagar no puede ser Mayor al Adeudado');
        sweetMsg('error', 'Valor a Pagar no puede ser Mayor al Adeudado')  
        return;
    }
        
    saldo_pendiente = parseFloat(valor) - parseFloat(valor_pagar);
	
	var rowCount = $('#tb_factura >tbody >tr').length;
	rowCount++;
	
	//if(valor<=0) return;
    if(valor_pagar<=0) return;

    //Obtengo el valor del iva del producto
    iva_valor_trat = (aplica_iva==1)?((parseFloat(valor_pagar) * parseFloat(ivaClinica))/100):parseFloat(0);
    total_tratamiento = parseFloat(valor_pagar) + parseFloat(iva_valor_trat);

    var opciones = "<button class='btn btn-sm btn-danger' onclick='deleteRow("+idpCuenta+")'><i class='far fa-trash-alt'></i></button>"
	$('#tb_factura').append("<tr id='tr_"+idpCuenta+"'><td align='center'>"+rowCount+"</td><td id='td_fp_"+idpCuenta+"'>"+detalle+" </td><td>"+info.tipo
                +"</td><td align='center'><strong>"+cant+"</strong></td><td id='fac_td_valor_"+idpCuenta+"' align='center'><span style='color: green;font-size:21px'><strong>"+parseFloat(valor_pagar).toFixed(2)
                +"</strong></span></td><td align='center'><input type='text' id='valor_pagar_"+idpCuenta+"' class='form-control valor-pagar' value='"+parseFloat(valor_pagar).toFixed(2)+"' style='width:100px' onkeyup='changeValorPagar("+idpCuenta+")'/>"
                +"</td><td id='td_iva_valor_"+idpCuenta+"' align='center' style='color: blue;font-size:17px'><strong>"+iva_valor_trat.toFixed(2)+"</strong></td><td id='td_total_pagar_"+idpCuenta+"' align='center' style='color: red;font-size:17px'><strong>"+total_tratamiento.toFixed(2)+"</strong></td><td align='center'>"+opciones
                +"</td><td style='display:none'>"+idpCuenta+"</td><td style='display:none'>"+tipo+"</td><td id='td_iva_"+idpCuenta+"' style='display:none'>"+aplica_iva
                +"</td><td id='h_valor_pagar_"+idpCuenta+"' style='display:none'>"+parseFloat(valor_pagar).toFixed(2)+"</td></tr>");
	


    sumTotalesFact()
   
}



function findDuplicateValues(idItem){
    var TableData = new Array();
	var validate = false;
	var sec;
        var idpcuenta;
	
    $('#tb_factura tr').each(function(row, tr){
        idpcuenta =  $(tr).find('td:eq(9)').text();
        if(idItem==idpcuenta) validate = true;
    }); 
    // first row will be empty - so remove
    return validate;
}


function deleteRow(idTr){
	
    var idfactura=0;    
	var cant = $("#valor_pagar_"+idTr).val();
	var iva_cant_trat = $("#td_iva_"+idTr).text()

	var totalSubTotal = $("#sp_subtotal_factura").text();
	var totalIva = $("#sp_iva_fact").text();
    var totalDespacho = $("#sp_total_factura").text();

    var valor_pagado = $("#valor_pagado").text();

        
    if(parseFloat(cant)>parseFloat($("#valor_pendiente").text())){
        //zebra_error("Tratamiento ya se encuentra en Metodo de Pago");
        sweetMsg('error', 'Tratamiento ya se encuentra en Metodo de Pago')  
        return;
    }
        
        if(idfactura>0){
              
            $.Zebra_Dialog('<strong>Eliminar...</strong>Se eliminara el pago del procedimiento, Desea Continuar? ', {
                'type':     'question',
                'title':    'Eliminar Tratamiento',
                'buttons':  [
                    {caption: 'Yes', callback: function() {

                        totalSubTotal = parseFloat(totalSubTotal) - parseFloat(cant);
                        $("#sp_subtotal_factura").text(totalSubTotal.toFixed(2));

                        totalIva = parseFloat(totalIva) - parseFloat(iva_cant_trat);
                        $("#sp_iva_fact").text(totalIva.toFixed(2));

                        totalDespacho = parseFloat(totalSubTotal) + parseFloat(totalIva);
                        $("#sp_total_factura").text(totalDespacho.toFixed(2));


                        var valor_pendiente = parseFloat(totalDespacho) - parseFloat(valor_pagado);
                        var cant_pagar = parseFloat(totalDespacho) - parseFloat(valor_pagado);
                        $("#valor_pendiente").text(valor_pendiente.toFixed(2));
                        $("#cant_pagar").val(cant_pagar.toFixed(2));


                        deleteProcFac(idTr);
                        $('#tr_'+idTr).remove();

                        var sec=0;
                        $('#tb_factura tr').each(function(row, tr){
                            $(tr).find('td:eq(0)').text(sec);
                            sec++;
                        }); 

                    

                    }},
                    {caption: 'No', callback: function() {
                           return;
                    }}
                ]
            });
        
        }else{   
                
            $('#tr_'+idTr).remove();
            
            var sec=0;
            $('#tb_factura tr').each(function(row, tr){
                $(tr).find('td:eq(0)').text(sec);
                sec++;
            });

            totalSubTotal = parseFloat(totalSubTotal) - parseFloat(cant);
            $("#sp_subtotal_factura").text(totalSubTotal.toFixed(2));

            totalIva = parseFloat(totalIva) - parseFloat(iva_cant_trat);
            $("#sp_iva_fact").text(totalIva.toFixed(2));

            totalDespacho = parseFloat(totalSubTotal) + parseFloat(totalIva);
            $("#sp_total_factura").text(totalDespacho.toFixed(2));
                
                
            var valor_pendiente = parseFloat(totalDespacho) - parseFloat(valor_pagado);
            var cant_pagar = parseFloat(totalDespacho) - parseFloat(valor_pagado);
            $("#valor_pendiente").text(valor_pendiente.toFixed(2));
            $("#cant_pagar").val(cant_pagar.toFixed(2));
        
    }

    sumTotalesFact()

}



function IngresarFormaPago(){
	
	var forma_pago = $("#metodopago").val();
	var cant_pagar = $("#cant_pagar").val();
	var banco = $("#bancos").val();
	var tarjeta = $("#tipo_tarjeta").val();
	var num_transfer = $("#num_transferencia").val();
	var lotel = $("#num_lote").val();
        
    var valor_pagado = $("#valor_pagado").text()
	
	var cant_abono = $("#cant_abono").val();
	
	if(cant_pagar<=0) return;
	
	
	if(forma_pago=='' || cant_pagar==''){
		//zebra_error('Favor llenar todos los campos');
        sweetMsg('error', 'Favor llenar todos los campos')  
		return;
	}
	
	var rowCount = $('#tb_formapago >tbody >tr').length;
	rowCount++;
	
	var valor_pendiente = $("#valor_pendiente").text();
	var total_pendiente = valor_pendiente-cant_pagar;
	
	if(total_pendiente<0){
		//zebra_error('No Puede Cancelar mayor a lo adeudado.')
        sweetMsg('error', 'No Puede Cancelar mayor a lo adeudado')  
		return;
	}
	$("#valor_pendiente").text(total_pendiente.toFixed(2));
	$("#cant_pagar").val(total_pendiente.toFixed(2));
	
	$('#tb_formapago').append("<tr id='tr_fp_"+rowCount+"'><td>"+rowCount+"</td><td id='td_fp_"+rowCount+"'>"+forma_pago+"</td><td>"+banco+"</td><td>"+tarjeta+"</td><td>"+num_transfer+"</td><td id='td_p_"+rowCount+"' align='center'>"+cant_pagar+"</td><td style='display: none;'>"+lotel+"</td><td align='center'><button class='btn btn-sm btn-danger' onclick='deleteRow_fp("+rowCount+")'><i class='far fa-trash-alt'></i></button></td></tr>");
	
	//$('#metodopago').select2('val', '');
    $('#metodopago').val('');
    $('#bancos').val('');
    $('#num_transferencia').val('');
	$('#metodopago').trigger("change");
    $("#num_lote").val('');
        
        
    valor_pagado = parseFloat(valor_pagado)+ parseFloat(cant_pagar);
    $("#valor_pagado").text(valor_pagado.toFixed(2));

    //disable los campos de texto de valor de tratamientos
    $('.valor-pagar').prop('disabled', true);
        
}


function deleteRow_fp(idTr){
	
	var cant_restar = $("#td_p_"+idTr).text();
	var valor_pendiente = $("#valor_pendiente").text();
    var valor_pagado = $("#valor_pagado").text()
	var total_pendiente = parseFloat(valor_pendiente)+parseFloat(cant_restar);
	
	$("#valor_pendiente").text(total_pendiente.toFixed(2));
	$("#cant_pagar").val(total_pendiente.toFixed(2));
	
	
    valor_pagado = parseFloat(valor_pagado)- parseFloat(cant_restar);
    $("#valor_pagado").text(valor_pagado.toFixed(2));
    
	$('#tr_fp_'+idTr).remove();

    var TableData;
    TableData = storeTblValues_fp();
    TableData = $.toJSON(TableData);

    //console.log(TableData.length)
    if(TableData.length<=2){        
        $('.valor-pagar').prop('disabled', false);
    }

}





function insertFactura(idpresupuesto, idclinica){

    var valor_pendiente = $("#valor_pendiente").text();
    var total_pagado = $("#valor_pagado").text();
    var valor_factura = $("#sp_total_factura").text();

     /*Formas de Pago*/
     var TableData;
     TableData = storeTblValues_fp();
     TableData = $.toJSON(TableData);
     
     
     /*Tratamientos a Pagar*/
     var TableDataTrat;
     TableDataTrat = storeTblValuesTratamientos();
     TableDataTrat = $.toJSON(TableDataTrat);


    if(parseFloat(valor_factura) <= parseFloat(0)){                
        sweetMsg('error', 'No puede guardar una Factura con valor Cero.')                                  
        return false;
    }

    
    if(TableDataTrat.length<=2 || TableData.length<=2){                
        sweetMsg('error', 'Revise los Tratamientos o Formas de Pago')                                  
        return false;
    }
    
    if(parseFloat(valor_pendiente) > parseFloat(0)){                
        sweetMsg('error', 'Posee un valor '+valor_pendiente+' Pendiente de Cancelar .')                  
        return false;
    }
   
    
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Desea Guardar la Faactura?',
        //text: "No podra reversar el cambio",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, Guardar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
    }).then((result) => {

        if (result.isConfirmed) {

            var fecha = $("#fc_fecha_ingreso").val()
            var clinica = $("#fc_idclinica").val();
            var idpaciente = $("#fc-paciente").val();
            var idcliente = $("#fc-cliente").val();       
            var observaciones = '';
            
           
            $.ajax({
                url : baseUrl+'/insertFactura',
                type: 'POST', 
                dataType: 'json', 
                data:{                    
                    idclinica: clinica,
                    idpaciente: idpaciente,
                    //empresa: empresa,
                    //estado_factura: estadoFac,       
                    fecha: fecha,
                    idcliente: idcliente,
                    totalpago: total_pagado,
                    formas_pago: TableData, 
                    tratamientos: TableDataTrat,
                
                    observaciones: observaciones
                },
                beforeSend: function(){
                    $(".spin_loading").show();
                    $(".btnSaveInfo").attr("disabled", true);
                },
                complete: function(){
                    $(".spin_loading").hide();
                    $(".btnSaveInfo").removeAttr("disabled");
                },
                success: function (data) {           
                    
                    if(data.info.action==1){
                         //window.location.href = "factura_crear?factura="+data;
                         sweetMsg('success', data.info.msg)
                         emptyInfoPaciente()
                         emptyClienteOption()

                    }else{
                        sweetMsg('error', data.info.msg)
                        return
                    }

                },
                error: function(xhr) {
                    $(".spin_loading").hide();
                    $(".btnSaveInfo").removeAttr("disabled");
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



function storeTblValues_fp(){
    var TableData = new Array();

    $('#tb_formapago tr').each(function(row, tr){
        if($(tr).find('td:eq(0)').text()!=''){
            TableData[row]={
                "num" : $(tr).find('td:eq(0)').text()
                , "FormaPago" :$(tr).find('td:eq(1)').text()
                , "Banco" : $(tr).find('td:eq(2)').text()
                , "Tarjeta" : $(tr).find('td:eq(3)').text()
                , "numMovim" : $(tr).find('td:eq(4)').text()
                , "valor" : $(tr).find('td:eq(5)').text()
                , "lotel" : $(tr).find('td:eq(6)').text()
            }    
        }
        
    }); 
    TableData.shift();  // first row will be empty - so remove
    return TableData;
}



function storeTblValuesTratamientos(){
    var TableData = new Array();
    var iditem;
    var valor;
    var valor_proc
    var tipo;
    var valor_trat;

   $('#tb_factura tr').each(function(row, tr){
    
    iditem = $(tr).find('td:eq(9)').text();   
    valor_pagar = $("#valor_pagar_"+iditem).val();
    valor_imp = $(tr).find('td:eq(6)').text();
    tipo = $(tr).find('td:eq(10)').text();
    valor_trat = $("#h_valor_pagar_"+iditem).text(); 
    //valor_proc = $(tr).find('td:eq(2)').text();
    //alert($(tr).find('td:eq(6)').text());
    //return;

   TableData[row]={
        "idtrat_facturar": iditem,
        "valor_pagar":valor_pagar,
        "valor_imp": valor_imp,
        "valor_trat": valor_trat,        
        "tipo": tipo,
        //"valor_proc" :valor_proc,
        //"valor" : $(tr).find('td:eq(5)').text()
    }
       
   }); 
   TableData.shift();  
   return TableData;
} 



function guardarCliente(){

   
    var tipo_doc    = $("#cl-tipo-documento").val()
    var num_doc     = $("#cl-identificacion-cliente").val()
    var nombres     = $("#cl-nombres-cliente").val()
    var telefono    = $("#cl-telefono-cliente").val()
    var celular     = $("#cl-celular-cliente").val()
    var email       = $("#cl-email-cliente").val()
    var direccion   = $("#cl-direccion-cliente").val()

    
    $.ajax({
        url : baseUrl+'/insertCliente',
        type: 'POST', 
        dataType: 'json', 
        data: {
            tipo_doc: tipo_doc,
            num_doc: num_doc,
            nombres: nombres, 
            telefono: telefono,
            celular: celular,
            email: email,
            direccion: direccion
        }, 
        beforeSend: function(){
            $(".spin_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },
        success: function (data) {           
            
            if(data.info.action==1){
                 //window.location.href = "factura_crear?factura="+data;
                 sweetMsg('success', data.info.msg)
                 $("#modalAddCliente").modal('hide')

            }else{
                sweetMsg('error', data.info.msg)
                return
            }

        }
    });

}