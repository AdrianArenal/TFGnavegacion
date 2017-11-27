$( function() {
    $( "#respuestaBusqueda" ).dialog({
        autoOpen: false,
        width: 'auto', // overcomes width:'auto' and maxWidth bug
        maxWidth: 800,
        height: 'auto',
        modal: true,
        fluid: true, //new option
        resizable: false
    });
  } );
function buscar(){
    $("#respuestaBusqueda").children().remove();
    var domain = "https://arenal94.github.io/TFG/";
    var paginas = ["index.html",
                    "videodemostraciones/videodemostraciones.html",
                    "bebop2/bebop2.html",
                    "softwaredrones/softwaredrones.html",
                    "contacto/contacto.html"
                    ];
    var peticiones = [];
    var results = [];  
    for(var j = 0; j<paginas.length;j++)
    {
        peticiones.push(
            $.get( domain+paginas[j], function(data) {
            var texto = $(data).text();
            var result = texto.split($("#busqueda").val()).length-1;
            if(result>0){
                results.push(`${result} coincidencias en <a href=${this.url}>${this.url}</a>`);
            }
        })
        );
    }
    $.when(peticiones[peticiones.length-1]).done(function() {
        var list = document.createElement("dl");
        for(var i=0; i< results.length;i++){
           let item = document.createElement("dt");
           item.innerHTML=results[i];
           list.appendChild(item);
        }
        $("#respuestaBusqueda").append(list); 
        $("#respuestaBusqueda").dialog("open"); 
    });
}
// on window resize run function
$(window).resize(function () {
    fluidDialog();
});

// catch dialog if opened within a viewport smaller than the dialog width
$(document).on("dialogopen", ".ui-dialog", function (event, ui) {
    fluidDialog();
});

function fluidDialog() {
    var $visible = $(".ui-dialog:visible");
    // each open dialog
    $visible.each(function () {
        var $this = $(this);
        var dialog = $this.find(".ui-dialog-content").data("ui-dialog");
        // if fluid option == true
        if (dialog.options.fluid) {
            var wWidth = $(window).width();
            // check window width against dialog width
            if (wWidth < (parseInt(dialog.options.maxWidth) + 50))  {
                // keep dialog from filling entire screen
                $this.css("max-width", "90%");
            } else {
                // fix maxWidth bug
                $this.css("max-width", dialog.options.maxWidth + "px");
            }
            //reposition dialog
            dialog.option("position", dialog.options.position);
        }
    });

}