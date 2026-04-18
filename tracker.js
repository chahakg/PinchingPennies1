function addExpense() {
    let item = document.getElementById("item").value;
    let amount = document.getElementById("amount").value;
  
    if (!item || !amount) return;
  
    let table = document.getElementById("expenseTable");
  
    table.innerHTML += "<tr><td>" + item + "</td><td>" + amount + "</td></tr>";
  
    document.getElementById("item").value = "";
    document.getElementById("amount").value = "";
  }