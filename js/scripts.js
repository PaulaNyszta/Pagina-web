document.addEventListener("DOMContentLoaded", () => {
    
    var form = document.querySelector("form");
    var nameInput = form.querySelector("input[name='name']");
    var emailInput = form.querySelector("input[name='email']");

    
    function verificarFormulario(event) {
        event.preventDefault(); 

        
        var nombre = nameInput.value.trim();
        var email = emailInput.value.trim();

        if (!nombre || !email) {
            console.error("Por favor, completa tu nombre y tu email en el formulario.");
        }
        else {
            form.submit();
        }
    
    }
    
    form.addEventListener("submit", verificarFormulario);
});

