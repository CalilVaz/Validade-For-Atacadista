const btnGenerate = document.querySelector('#generate-pdf')
let inputDate = document.querySelector("#input-date")
const namelecturer = document.querySelector("#input-text")
const contentPDF = document.querySelector("#content")
let maturity = document.querySelector("#maturity")
const Prohibited = new Date();
let conferentes = document.querySelector('#conferentes')

function App() {
    let val = inputDate.value
    let arrayDate = val.split('')

    if (conferentes.value == "") {
        alert('Selecione um conferente')
    } else {
        // Extrair os valores de dia, mês e ano da string fornecida
        const dia = arrayDate[0] + arrayDate[1] + '-';
        const mes = arrayDate[2] + arrayDate[3] + '-';
        const ano = arrayDate[4] + arrayDate[5] + arrayDate[6] + arrayDate[7];

        formattedDate = dia + mes + ano

        console.log(formattedDate);

        let anoInicial = '01-01-' + ano;
        console.log(anoInicial);
        formattedAnoInicial = new Date(anoInicial)

        anoFinal = formattedDate.split('-').reverse().join().replace(/,/g, '-')

        let deffInTime = Math.abs(new Date(anoFinal) - formattedAnoInicial)
        let timeInOneDay = 1000 * 60 * 60 * 24
        let diffInDays = Math.ceil(deffInTime / timeInOneDay)

        if (diffInDays == 1) {
            diffInDays = 0
        }

        contentPDF.innerHTML = `
        <p id="title">VENCIMENTO</p>
        <div id="maturity">${formattedDate.replace(/-/g, '/')}</div>
        <p id="due-date">${diffInDays + 1}</p>
        <P id="name-lecturer">CONF.:  ${'   ' + conferentes.value.toUpperCase()}</P>
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
    }    
}


$(document).ready(function (params) {
    $("#input-date").keypress(function () {
        if (this.value.length == 8) {
            return false
        }
    })
})
