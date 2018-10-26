// Service Worker
if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('./Savia-sw.js')
        .then(res => console.log('Services Worker Cargado Correctamente', res))
        .catch(err => console.log('Error DB', err));

} else {
    console.log('no puedes usar los services worker')
}








// Scroll suavizado
$(document).ready(function() {
    $('#menu a').click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
});