$(document).ready(function(){

    createOdontogram();
   
})


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
            '<span style="margin-left: 5px; margin-bottom: -25px;display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + i + '</span>' +
            '<div id="dindex' + i + '"  class="pieza"><img src="../../../assets/media/index' + i +'.png" title="Pieza index' + i +'" alt="Pieza index' + i +'" id="index' + i +'"></div>' +
            '<div class="circlebox" style="margin-top: -35px; color:transparent; line-height: 10px;" id="cindex' + i + '">s'+
            '</div>'+
            '</div>';
        htmlRight2 += '<div data-name="value" id="dienteindex' + i + '" class="diente">' +
            '<div class="circlebox" style="margin-bottom: -35px; color:transparent;line-height: 10px;"  id="cindex' + i + '">s'+
            '</div>'+
            '<div id="dindex' + i + '"  class="pieza"><img src="../../../assets/media/index' + i +'.png" title="Pieza index' + i +'" alt="Pieza index' + i +'" id="index' + i +'"></div>' +
            '<span style="margin-left: 5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + i + '</span>' +
            '</div>';
        //Dientes Definitivos Cuandrante Izquierdo (Superior/Inferior)
        htmlLeft += '<div id="dienteindex' + a + '" class="diente">' +
            '<span style="margin-left: 5px; margin-bottom:-15px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + a + '</span>' +
            '<div id="dindex' + a + '"  class="pieza"><img src="../../../assets/media/index' + a +'.png" title="Pieza index' + a +'" alt="Pieza index' + a +'" id="index' + a +'"></div>' +
            '<div class="circlebox" style="margin-top: -35px; color:transparent;line-height: 10px;" id="cindex' + a + '">s'+
            '</div>'+
            '</div>';
        htmlLeft2 += '<div id="dienteindex' + a + '" class="diente">' +
            '<div class="circlebox" style="margin-bottom: -35px; color:transparent;line-height: 10px;"  id="cindex' + a + '">s'+
            '</div>'+
            '<div id="dindex' + a + '"  class="pieza"><img src="../../../assets/media/index' + a +'.png" title="Pieza index' + a +'" alt="Pieza index' + a +'" id="index' + a +'"></div>' +
            '<span style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-info">index' + a + '</span>' +
            '</div>';
        if (i <= 5) {
            //Dientes Temporales Cuandrante Derecho (Superior/Inferior)
            htmlLecheRight += '<div id="dienteLindex' + i + '" style="left: -25%;" class="diente-leche">' +
                '<span style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + i + '</span>' +
                '<div id="dindex' + i + '" class="pieza"><img src="../../../assets/media/index' + i +'.png" title="Pieza index' + i +'" alt="Pieza index' + i +'" id="index' + i +'"></div>' +
                '<div class="circlebox" style="margin-top: -25px;color:transparent;line-height: 10px;" id="clecheindex' + i + '">s'+
                '</div>'+
                '</div>';
            htmlLecheRight2 += '<div id="dienteLindex' + i + '" style="left: -25%;" class="diente-leche">' +
                '<div class="circlebox" style="margin-bottom: -25px;color:transparent;line-height: 10px;" id="clecheindex' + i + '">s'+
                '</div>'+
                '<div id="dindex' + i + '" class="pieza"><img src="../../../assets/media/index' + i +'.png" title="Pieza index' + i +'" alt="Pieza index' + i +'" id="index' + i +'"></div>' +
                '<span style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + i + '</span>' +
                '</div>';
        }
        if (a < 6) {
            //Dientes Temporales Cuandrante Izquierdo (Superior/Inferior)
            htmlLecheLeft += '<div id="dienteLindex' + a + '" class="diente-leche">' +
                '<span style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + a + '</span>' +
                '<div id="dindex' + a + '" class="pieza"><img src="../../../assets/media/index' + a +'.png" title="Pieza index' + a +'" alt="Pieza index' + a +'" id="index' + a +'"></div>' +

                '<div class="circlebox" style="margin-top: -25px;color:transparent;line-height: 10px;" id="clecheindex' + a + '">s'+
                '</div>'+
                '</div>';
            htmlLecheLeft2 += '<div id="dienteLindex' + a + '" class="diente-leche">' +
                '<div class="circlebox" style="margin-bottom: -25px; color:transparent;line-height: 10px;" id="clecheindex' + a + '">s'+
                '</div>'+
                '<div id="dindex' + a + '" class="pieza"><img src="../../../assets/media/index' + a +'.png" title="Pieza index' + a +'" alt="Pieza index' + a +'" id="index' + a +'"></div>' +
                '<span style="margin-left: 5px; margin-bottom:5px; display: inline-block !important; border-radius: 10px !important;" class="label label-primary">index' + a + '</span>' +
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
}