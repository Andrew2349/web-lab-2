const coal = document.getElementById('DonCoal');
const gas = document.getElementById('Gas');
const mazut = document.getElementById('Maz');
const res_div = document.getElementById('result');
const calculatorForm = document.getElementById('calculatorForm');

const EmissionIndicatorCoal = 0.8;
const EmissionIndicatorMazut = 1;
const QrCoal = 20.47; // МДж/кг
const QrMazut = 40.40; // МДж/кг
const QrGas = 33.08; // МДж/м³
const etaZol = 0.985; // ефективність золовловлення

const ArCoal = 25.20;
const GwCoal = 1.5;
const ArMazut = 0.15;

calculatorForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const Mazut = parseFloat(mazut.value);
    const Gas = parseFloat(gas.value);
    const Coal = parseFloat(coal.value);

    // Розрахунок показника емісії для вугілля
    let kTvCoal = (1e6 / QrCoal) * (EmissionIndicatorCoal * (ArCoal / (100 - GwCoal)) * (1 - etaZol));
    let ECoal = 1e-6 * kTvCoal * QrCoal * Coal;

    // Розрахунок показника емісії для мазуту
    let kTvMazut = (1e6 / QrMazut) * (EmissionIndicatorMazut * (ArMazut / 100) * (1 - etaZol));
    let EMazut = 1e-6 * kTvMazut * QrMazut * Mazut;

    // Природний газ не містить твердих частинок
    let kTvGas = 0;
    let EGas = 0;

    let totalEmission = ECoal+EMazut+EGas
    res_div.innerHTML = `
        <div class="alert alert-info">
            <h5>Результати розрахунку:</h5>
            <p><strong>Показник емісії твердих частинок при спалюванні вугілля:</strong> ${kTvCoal.toFixed(2)} г/ГДж</p>
            <p><strong>Валовий викид твердих частинок при спалюванні вугілля:</strong> ${ECoal.toFixed(2)} т</p>
            <p><strong>Показник емісії твердих частинок при спалюванні мазуту:</strong> ${kTvMazut.toFixed(2)} г/ГДж</p>
            <p><strong>Валовий викид твердих частинок при спалюванні мазуту:</strong> ${EMazut.toFixed(2)} т</p>
            <p><strong>Показник емісії твердих частинок при спалюванні природного газу:</strong> ${kTvGas.toFixed(2)} г/ГДж</p>
            <p><strong>Валовий викид твердих частинок при спалюванні природного газу:</strong> ${EGas.toFixed(2)} т</p>
            <p><strong>Загальний викид:</strong> ${totalEmission.toFixed(2)} т</p>
        </div>
    `;
});
