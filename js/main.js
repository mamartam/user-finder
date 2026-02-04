const search = document.getElementById("user-id");
const listOfUserNames = document.querySelector(".list-of-user-names");

let arrayOfRecivedData = [];
async function gettingInfo() {
  try {
    const endPoint = await fetch("https://jsonplaceholder.typicode.com/users/");
    const infoAboutUsers = await endPoint.json();
    arrayOfRecivedData = infoAboutUsers.map((element) => {
      return element;
    });
    displayingInfoOnThePage(arrayOfRecivedData);
  } catch (error) {
    console.log(error);
  }
}
gettingInfo();

function displayingInfoOnThePage(array) {
  listOfUserNames.innerHTML = "";
  array.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("list-item");
    li.textContent = element.name;
    listOfUserNames.appendChild(li);
    li.addEventListener("click", () => {
      alert(`Більше інформації про ${element.name}: 
  Місто: ${element.address.city}
  Компанія: ${element.company.name}`);
    });
  });
}
search.addEventListener("input", () => {
  let inpetedText = search.value.toLowerCase();
  let filteredArray = arrayOfRecivedData.filter((item) => {
    return item.name.toLowerCase().startsWith(inpetedText);
  });
  displayingInfoOnThePage(filteredArray);
});

const inputWrapper = document.querySelector(".input-img");
inputWrapper.addEventListener("click", () => {
  search.classList.toggle("active");
  if (inputWrapper.src.includes("search-icon")) {
    inputWrapper.src = "assets/images/close-icon.png";
  } else {
    inputWrapper.src = "assets/images/search-icon.png";
  }
});
