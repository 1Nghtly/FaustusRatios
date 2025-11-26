// Clear inputs when page loads
window.addEventListener('load', function() {
  document.getElementById('amount').value = '';
  document.getElementById('ratio'). value = '';
  document.getElementById('result').innerHTML = '';
});

function calculate() {
  const maxAmount = parseInt(document.getElementById('amount').value);
  const ratio = parseFloat(document.getElementById('ratio').value);
  const method = document.querySelector('input[name="method"]:checked').value;

  if (isNaN(maxAmount) || isNaN(ratio) || maxAmount <= 0 || ratio <= 0) {
    document. getElementById('result').textContent = "Please enter valid numbers.";
    return;
  }

  let bestAmount = 0;
  let bestValue = 0;

  const resultDiv = document.getElementById('result');

  if (method === 'multiply') {
    for (let i = maxAmount; i >= 1; i--) {
      const value = i * ratio;
      if (Math.abs(value - Math.round(value)) < 0.001) {
        bestAmount = i;
        bestValue = Math.round(value);
        break;
      }
    }
  } else {
    for (let i = maxAmount; i >= 1; i--) {
      const value = i / ratio;
      if (Math.abs(value - Math.round(value)) < 0.001) {
        bestAmount = i;
        bestValue = Math.round(value);
        break;
      }
    }
  }

  if (bestAmount === 0) {
    resultDiv.innerHTML = `
      <div>No exact match found</div>
      <div>Try adjusting the ratio</div>
    `;
  } else {
    const leftover = maxAmount - bestAmount;
    resultDiv.innerHTML = `
      <div>Give: ${bestAmount}</div>
      <div>Value: ${bestValue}</div>
      <div>Leftover: ${leftover}</div>
    `;
  }
}