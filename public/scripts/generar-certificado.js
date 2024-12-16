document.addEventListener('DOMContentLoaded', () => {
    console.log("Inicia")
    const generateImageButton = document.querySelector('.generate-image');

    generateImageButton.addEventListener('click', handleGenerateImageButton);
})


const handleGenerateImageButton = function (){
    console.log("Hola image")
}