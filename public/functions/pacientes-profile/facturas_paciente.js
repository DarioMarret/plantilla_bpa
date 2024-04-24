function consultarFacturas(){

    
   

    $.ajax({
        type: "POST",
        url : baseUrl+'/facturasPaciente',
        data: {
           idpaciente: $("#hidpaciente").val(),
          
        },
        beforeSend: function(){
            $(".spin_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },success: function (data) {
            
            $("#tb_facturas_lts tbody").empty()

            var sec=1
            $.each(data.info, function(index, v) {
                
                var info = JSON.stringify(v)

                option = "<button type='button' class='btn btn-sm btn-soft-primary waves-effect waves-light' onclick='showDetalleFact("+info+")'><i class='fas fa-align-justify font-size-16 align-middle'></i></button>";
              
                if(v.estado!='Anulada')
                    option_del = '<button type="button" class="btn btn-sm btn-soft-danger waves-effect waves-light" onclick="anularFactura('+v.idfactura+', '+v.idpaciente+')"><i class="far fa-trash-alt font-size-16 align-middle"></i></button>'
                else
                    option_del = ''

                option_del =''
                
                $("#tb_facturas_lts").append("<tr><td>"+sec+"</td><td>"+v.fecha+"</td><td>"+v.clinica+"</td>"
                +"<td>"+(v.cliente ?? "")+"</td><td class='text-center'><span class='badge bg-primary' style='font-size:13px'>"+v.documento+"</span></td><td class='text-center'><span class='badge bg-light text-dark' style='font-size:13px'>"+v.num_documento+"</span></td>"
                +"<td class='bg-soft-light text-center'><strong>"+v.subtotal+"</strong></td><td class='bg-soft-light text-center'><strong>"+v.impuesto+"</strong></td><td class='bg-soft-light text-center' style='font-size:18px; color:blue; font-weight:bold'>"+v.total+"</td>"
                +"<td class='text-center'><span class='badge badge-soft-"+v.estado_color+"'>"+v.estado+"</span></td><td><div class='d-flex flex-wrap gap-1'>"+option+""+option_del+"</div></td></tr>")         
                sec++;
            })

            

        },error: function(xhr) {
            console.log(response.responseJSON.errors)
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });

}


function showDetalleFact(info){


    $.ajax({
        type: "POST",
        url : baseUrl+'/detalleFactura',
        data: {
           idpaciente: info.idpaciente,
           idfactura: info.idfactura,
        
        },
        beforeSend: function(){
            $(".spin_loading").show();
            $(".btnSaveInfo").attr("disabled", true);
        },
        complete: function(){
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        },success: function (data) {


            $('#sp_clinica_nombre').text(info.clinica)
            $('#clinica_direccion').text(info.direccion_clinica)
            $('#clinica_correo').text(info.email_clinica)
            $('#clinica_celular').text(info.celular_clinica)
            $('#num_factura').text(info.num_documento)
        
            $('#paciente_nombre').text(info.paciente)
            $('#paciente_direccion').text(info.paciente_direccion)
            $('#paciente_correo').text(info.paciente_email)
            $('#paciente_celular').text(info.paciente_celular)

            if(info.logo_clinica!==null) $("#img-logo").attr("src",info.folder+'/'+info.logo_clinica);
            
            if(info.cliente!=null) $("#dv_cliente_info").show()
            else $("#dv_cliente_info").hide()
        
            $('#cliente_nombre').text(info.cliente)
            $('#cliente_direccion').text(info.cliente_direccion)
            $('#cliente_correo').text(info.cliente_celular)
            $('#cliente_celular').text(info.cliente_correo)
        
            $('#fecha_factura').text(info.fecha)
               
            
            $("#tb_detalle_factura tbody").empty()
            $("#tb_detalle_pagos_factura tbody").empty()
            
            var sec=1
            var tsubtotal=0, timpuesto=0, total=0;
            $.each(data.detalle, function(index, v) {
               
                tsubtotal = parseFloat(tsubtotal) + parseFloat(v.valor)
                timpuesto = parseFloat(timpuesto) + parseFloat(v.imp_valor)
                total = parseFloat(total) + parseFloat(v.total)
                
                $("#tb_detalle_factura").append("<tr><td scope='row'>"+sec+"</td><td>"+v.procedimiento+"</td><td class='text-center'>"+v.cant+"</td><td class='text-center'>"+v.valor+"</td>"
                +"<td class='text-center'>"+(v.imp_valor ?? "")+"</td><td class='text-center'>"+v.total+"</td></tr>")         
                sec++;
            })

            $("#tb_detalle_factura").append("<tr><td colspan='3' class='text-end' style='font-size:18px;'><strong>TOTAL</strong></td><td class='text-center'><span style='font-size:18px; font-weight:bold'>"+tsubtotal.toFixed(2)+"</span></td>"
            +"<td class='text-center'><span style='font-size:18px; font-weight:bold'>"+(timpuesto.toFixed(2) ?? "")+"</span></td><td class='text-center'><span style='font-size:18px; font-weight:bold'>"+total.toFixed(2)+"</span></td></tr>")         


            var sec=1
            var total_pagos=0;
            $.each(data.pagos, function(index, v) {
               
                total_pagos = parseFloat(total_pagos) + parseFloat(v.valor)                
                
                $("#tb_detalle_pagos_factura").append("<tr><td scope='row'>"+sec+"</td><td>"+v.forma_pago+"</td><td class='text-center'>"+v.valor+"</td></tr>")         
                sec++;
            })

            $("#tb_detalle_pagos_factura").append("<tr><td colspan='2' class='text-end' style='font-size:18px;'><strong>TOTAL</strong></td><td class='text-center'><span style='font-size:18px; font-weight:bold'>"+total_pagos.toFixed(2)+"</span></td></tr>")         



            $("#modalFacturaDetalle").modal('show')


        },error: function(xhr) {
            console.log(response.responseJSON.errors)
            $(".spin_loading").hide();
            $(".btnSaveInfo").removeAttr("disabled");
        }

    });
}
