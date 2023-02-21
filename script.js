
document.getElementById("expForm").addEventListener("submit", addExpense);

document.getElementById("nameSearchInput").addEventListener("keyup", searchByName);


// initial array of expenses and read from Local storage

const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense(event) {
  event.preventDefault();

  // get type, name, friend, date and the amount

  let type = document.getElementById("type").value;
  let name = document.getElementById("name").value;
  let addFriend = document.getElementById("addFriend").value;
  let date = document.getElementById("date").value;
  let amount = document.getElementById("amount").value;

  const typeError = document.getElementById("typeError");
  const nameError = document.getElementById("nameError");
  const friendError = document.getElementById("friendError");
  const dateError = document.getElementById("dateError");
  const amountError = document.getElementById("amountError");

  if (type === "Payment Method") {
    typeError.innerHTML = "* Please select a payment method";
  } else {
    typeError.innerHTML = "";
  }

  if (name.length === 0) {
    nameError.innerHTML = "* Please enter a name";
  } else {
    nameError.innerHTML = "";
  }

  if (addFriend === "Add Friend") {
    friendError.innerHTML = "* Please select a friend";
  } else {
    friendError.innerHTML = "";
  }

  if (date.length === 0) {
    dateError.innerHTML = "* Please enter a date";
  } else {
    dateError.innerHTML = "";
  }

  if (amount.length === 0 || amount <= 0) {
    amountError.innerHTML = "* Please enter a valid amount";
  } else {
    amountError.innerHTML = "";
  }

  if (
    type != "Payment Method" &&
    name.length > 0 &&
    addFriend != "Add Friend" &&
    date.length > 0 &&
    currency != "select currency" &&
    amount > 0
  ) {
    const expense = {
      type,
      name,
      addFriend,
      date,
      amount,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    };

    expenses.push(expense);

    // Local Storage
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  document.getElementById("expForm").reset();
  showExpenses();
}

const showExpenses = () => {
  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";

 
  // loop through expenses array and add rows to table
  expenses.forEach((expense) => {
    expenseTable.innerHTML += `
      <tr>
        <td>${expense.type}</td>
        <td>${expense.name}</td>
        <td>${expense.addFriend}</td>
        <td>${expense.date}</td>
        <td>$${expense.amount}</td>
        <td class ="option_button"onclick="deleteExpense(${expense.id})">❌</td>
      </tr>
    `;
  });
};

showExpenses();


function deleteExpense(id) {
  const index = expenses.findIndex((expense) => expense.id === id);
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  showExpenses();
}

function searchByName() {
  // Get the value of the search input
  const searchValue = document.getElementById("nameSearchInput").value.toLowerCase();

  // Get the expense table and its rows
  const expenseTable = document.getElementById("expenseTable");
  const rows = expenseTable.getElementsByTagName("tr");

  // Loop through each row of the table, starting at the second row (index 1)
  for (let i = 1; i < rows.length; i++) {
    // Get the name cell of the current row and its text content
    const nameCell = rows[i].getElementsByTagName("td")[1];
    const nameText = nameCell.textContent.toLowerCase();

    // If the name text content includes the search value, display the row
    if (nameText.includes(searchValue)) {
      rows[i].style.display = "";
    } else {
      // Otherwise, hide the row
      rows[i].style.display = "none";
    }
  }
}


