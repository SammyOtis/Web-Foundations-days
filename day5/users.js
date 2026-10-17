// DOM Element Selectors
const loadUsersBtn = document.querySelector("#load-users");
const filterInput = document.querySelector("#filter-input");
const statusP = document.querySelector("#status");
const usersList = document.querySelector("#users-list");

// Global State to store fetched users
let loadedUsers = [];

// Render Function to draw any array of users safely using DOM methods
function renderUsers(list) {
  usersList.textContent = ""; // Clear existing list

  if (list.length === 0) {
    const emptyLi = document.createElement("li");
    emptyLi.textContent = "No users match your filter.";
    usersList.appendChild(emptyLi);
    return;
  }

  list.forEach((user) => {
    const li = document.createElement("li");
    
    // User Name
    const nameHeading = document.createElement("h3");
    nameHeading.textContent = user.name;
    
    // Email
    const emailP = document.createElement("p");
    emailP.textContent = `Email: ${user.email}`;
    
    // City
    const cityP = document.createElement("p");
    cityP.textContent = `City: ${user.address ? user.address.city : "N/A"}`;
    
    // Company Name
    const companyP = document.createElement("p");
    companyP.textContent = `Company: ${user.company ? user.company.name : "N/A"}`;

    li.appendChild(nameHeading);
    li.appendChild(emailP);
    li.appendChild(cityP);
    li.appendChild(companyP);

    usersList.appendChild(li);
  });
}

// Fetch Users Function
async function loadUsers() {
  loadUsersBtn.disabled = true;
  statusP.textContent = "Loading users...";
  usersList.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    loadedUsers = data; // Store users in memory
    
    statusP.textContent = `Successfully loaded ${loadedUsers.length} users.`;
    filterInput.value = ""; // Reset filter input
    renderUsers(loadedUsers);
  } catch (error) {
    console.error("Fetch error:", error);
    statusP.textContent = "Failed to load users. Please check your connection or URL and try again.";
  } finally {
    loadUsersBtn.disabled = false;
  }
}

// Filter Event Listener (filters local array without making a new network request)
filterInput.addEventListener("input", () => {
  const query = filterInput.value.toLowerCase().trim();
  const filtered = loadedUsers.filter((user) =>
    user.name.toLowerCase().includes(query)
  );
  renderUsers(filtered);
});

// Load Users Event Listener
loadUsersBtn.addEventListener("click", loadUsers);