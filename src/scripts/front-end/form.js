export function isFormValid() {
  const fullNameInput = document.getElementById('fullName').value;
  const addressInput = document.getElementById('address').value;
  const restaurantNameSelect = document.getElementById('restaurantName').value;
  const selectedMenuSelect = document.getElementById('selectedMenu').value;
  const orderDateInput = document.getElementById('orderDate').value;
  const bankTransferSelect = document.getElementById('bankTransfer').value;
  const agreementCheckbox = document.getElementById('agreement').checked;

  // Validasi bahwa semua input dan select telah terisi
  return (
    fullNameInput !== ''
      && addressInput !== ''
      && restaurantNameSelect !== ''
      && selectedMenuSelect !== ''
      && orderDateInput !== ''
      && bankTransferSelect !== ''
      && agreementCheckbox
  );
}

export function initializeForm() {
  const inputElements = document.querySelectorAll('#fullName, #address, #restaurantName, #selectedMenu, #orderDate, #bankTransfer, #agreement');
  const checkoutButton = document.getElementById('checkoutButton');

  inputElements.forEach((element) => {
    element.addEventListener('input', () => {
      // Cek apakah form valid
      if (isFormValid()) {
        checkoutButton.removeAttribute('disabled');
      } else {
        checkoutButton.setAttribute('disabled', 'disabled');
      }
    });
  });

  checkoutButton.addEventListener('click', () => {
    if (isFormValid()) {
      alert('PESANAN ANDA SEDANG KAMI PROSES, SILAHKAN MENUNGGU. Terimakasih sudah menggunakan jasa Pawon Wong Jowo Apss');
    } else {
      alert('Harap Isi seluruh form pemesanan dengan lengkap');
    }
  });
}
