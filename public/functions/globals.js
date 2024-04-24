
    var toastPosition = {
        TopLeft: "top-left",
        TopCenter: "top-center",
        TopRight: "top-right",
        BottomLeft: "bottom-left",
        BottomCenter: "bottom-center",
        BottomRight: "bottom-right"
    }

    function toast_msg(type, msg){
        console.log(type)
        var type_vt
        switch (type) {
            case 'success':
                type_vt = vt.success;
              break;
            case 'error':
                type_vt = vt.error
                break;
        }

        type_vt(msg,{
            title: undefined,
            position: toastPosition.TopCenter,
            //position: toastPosition.TopRight,
            duration: 2000,
            closable: true,
            focusable: true,
            //callback: undefined
        })



  }


  function sweetMsg(action, msg){
    Swal.fire({
        position:"top-end",
        icon: action,
        text: msg,
        showConfirmButton:!1,
        timer:1200,
        width:'250px',
        height:'350px'
    })
  }


    $(document).ready(function() {


    });

