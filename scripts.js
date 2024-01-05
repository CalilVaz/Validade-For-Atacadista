const btnGenerate = document.querySelector('#generate-pdf')
let inputDate = document.querySelector("#input-date")
const namelecturer = document.querySelector("#input-text")
const contentPDF = document.querySelector("#content")
let maturity = document.querySelector("#maturity")
const Prohibited = new Date();
btnGenerate.addEventListener("click", () => {

    const validade = new Date(inputDate.value);


    let anoInicial = '01-01-' + new Intl.DateTimeFormat('pt-br', {year: 'numeric'}).format(validade)

    formattedAnoInicial = new Date(anoInicial)
    anoFinal = new Date(inputDate.value)
    
        let deffInTime = Math.abs(anoFinal - formattedAnoInicial)
        let timeInOneDay = 1000 * 60 * 60 * 24
        let diffInDays = Math.ceil(deffInTime / timeInOneDay)

    contentPDF.innerHTML = `
    <p id="title">VENCIMENTO</p>
    <div id="maturity">${new Intl.DateTimeFormat('pt-br', {timeZone: 'Asia/Tokyo'}).format(validade)}</div>
    <p id="due-date">${diffInDays + 1}</p>
    <P id="name-lecturer">CONF.:  ${'   ' + namelecturer.value.toUpperCase()}</P>
    <p id="Prohibited">Entrada: <strong> ${new Intl.DateTimeFormat('pt-br').format(Prohibited)}</strong><img id="img-pdf" src="./img/logo-fort.png" alt="Logo do Fort"></p>
    `
    
    // Conteúdo do PDF
    const content = document.querySelector("#content")

    // Configuração do arquivo final do PDF
    const options = {
        margin: [0, 10, 10, 10],
        filename: "validade.pdf",
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: "mm", 
            format: "a4", 
            orientation: "landscape"
        }
    }

    // Gerar e baixar o PDF
    html2pdf().set(options).from(content).save()

    setTimeout(function () {
        contentPDF.innerHTML = ``
    }, 1)
})