const categoriesLoader = () => 
    {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((res) => res.json())
      .then((data) => 
    { 
        displayPets(data.pets);
    })
      .catch((error) => console.log(error));
    };


    let petsData = []; 
    const sortByPrice = () => {
      const sortedPets = petsData.sort((a, b) => {
          const priceA = a.price ? parseFloat(a.price) : 0;
          const priceB = b.price ? parseFloat(b.price) : 0;
          return priceB - priceA; 
      });
  
      const petContainer = document.getElementById("pet-deals");
      petContainer.innerHTML = '';
  
  
      sortedPets.forEach(pet => {
          const card = document.createElement("div");
          card.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
              <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
              <h3 class="text-xl font-semibold mb-2 "> ${pet.pet_name|| "Not Available"}</h3>
              <p class="text-gray-600 text-sm mb-2 flex justify-start items-center gap-1"><img class="w-4 h-4" src="images/frame2.jpg" alt=""/> Breed: ${pet.breed || "Not Available"}</p>
              <p class="text-gray-600 text-sm mb-2"><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth || "Not Available"}</p>
              <p class="text-gray-600 text-sm mb-2"><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender|| "Not Available"}</p>
              <p class="text-gray-600 text-sm mb-2 price"><i class="fa-solid fa-dollar-sign"></i> Price: $${pet.price || "Not Available"}</p>
              <div class="flex justify-around">
                <button class="like-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
                <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
                <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
              </div>
            </div>`;
            const likeButton = card.querySelector('.like-btn')
            likeButton.addEventListener('click',()=> {
              LikedImages.push(pet.image)
              displayLikedImages();
          });
          petContainer.appendChild(card);
      });
  };
  
  document.getElementById("sort-price-btn").addEventListener("click", sortByPrice);
  const displayPets = (pets) => 
    {
    const petContainer = document.getElementById("pet-deals");
    petContainer.innerHTML = "";
    petsData = pets;
  
    if (!pets || pets.length === 0) 
    {
      petContainer.classList.remove("grid");
      petContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="images/error.png" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Category </h2> 
        </div>`;

    } 
    else 
    {
      petContainer.classList.add("grid");
    
      pets.forEach((pet) => 
        {
        const card = document.createElement("div");
        card.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 "> ${pet.pet_name|| "Not Available"}</h3>
            <p class="text-gray-600 text-sm mb-2 flex justify-start items-center gap-1"><img class="w-4 h-4" src="images/frame2.jpg" alt="" /> Breed: ${pet.breed || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2"><i class="fa-regular fa-calendar"></i> Birth: ${pet.date_of_birth || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2"><i class="fa-solid fa-mercury"></i> Gender: ${pet.gender|| "Not Available"}</p>
           <p class="text-gray-600 text-sm mb-2 price"><i class="fa-solid fa-dollar-sign"></i> Price: $${pet.price || "Not Available"}</p>
            <div class="flex justify-between gap-1">
              <button id="" class="like-btn btn border  rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn border btn  rounded-md">Adopt</button>
              <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn border btn rounded-md ">Details</button>
            </div>
          </div>`;

          const likeButton = card.querySelector('.like-btn')
          likeButton.addEventListener('click',()=> {
            LikedImages.push(pet.image)
            displayLikedImages();
        });

        petContainer.append(card);
        });
    }
  };
  
  let LikedImages =[];

  displayLikedImages=()=>
  {
      const likedPictureContainer = document.getElementById('Liked-Picture')
      likedPictureContainer.innerHTML='';
  
      LikedImages.forEach((imageSrc) =>{
          const imgEle = document.createElement('img');
  
          imgEle.src =imageSrc
          imgEle.alt= 'liked-pet';
          imgEle.className='liked-image mb-2';
          likedPictureContainer.appendChild(imgEle);
      });
  };

const loadDetails = async (petId) => {
    console.log(petId)
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    const res = await fetch(url)
    const data = await res.json();
    displayDetails(data.petData)
}
const displayDetails = (petData) => {
    console.log(petData)
    const detailsContainer = document.getElementById("modal-content")
    document.getElementById("customModal").showModal();

    detailsContainer.innerHTML = `

          <div class="bg-white rounded-lg p-6 hover: transition duration-300 ease-out w-full h-full">
            <img src="${petData.image}" alt="${petData.pet_name}" class="h-[150px] rounded-lg mb-2 ml-0 lg:ml-20">
            <h3 class="text-xl font-bold mb-2 "> ${petData.pet_name}</h3>
            <div class="grid grid-cols-2">
                <p class="text-gray-600 text-sm mb-2 flex justify-start items-center gap-1"><img class="w-4 h-4" src="images/frame2.jpg" alt="" /> Breed: ${petData.breed || "Not Available"}</p>
                <p class="text-gray-600 text-sm mb-2"><i class="fa-regular fa-calendar"></i> Birth: ${petData.date_of_birth || "Not Available"}</p>
                <p class="text-gray-600 text-sm mb-2"><i class="fa-solid fa-mercury"></i> Gender: ${petData.gender|| "Not Available"}</p>
                <p class="text-gray-600 text-sm mb-2"><i class="fa-solid fa-dollar-sign"></i> Price: ${petData.price || "Not Available"}</p>
                <p class="text-gray-600 text-sm mb-2">Vaccinated status: ${petData.vaccinated_status || "Not Available"}</p>
            </div>
            <p class="text-gray-600 font-bold mb-2">Details Information</p>
            <p class="text-gray-600 text-sm mb-2">Details Information: ${petData.pet_details || "Not Available"}</p>
             <div class="modal-action ml-10 lg:ml-0">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                     <button class="btn btn-wide">Cancel</button>
                </form>
            </div> 
          

          </div>
    `
}



const adoptPet = (petId, button) => {
    
    const adoptContent = document.querySelector(".adopt-content");
    adoptContent.innerHTML = `<div class="bg-white rounded-lg p-6  w-full h-full">
    <i class="fa-regular fa-handshake"></i>
    <p>Congratulations!</p><p>Adoption Process is start For your pet.</p><div id="countdown"></div></div>
    `
    const adoptModal = document.getElementById("adoptModal");
    adoptModal.showModal();

    let countdown = 3; 
    const countdownDiv = document.getElementById("countdown");

    const interval = setInterval(() => {
        countdownDiv.innerHTML = countdown;
        countdown--;

        
        if (countdown < 0) {
            clearInterval(interval);
            button.classList.add('text-gray-200', 'bg-gray-600');   
            button.setAttribute('disabled','true')
            
            button.textContent = "Adopted"; 
            setTimeout(() => {
                adoptModal.close();
            });
        }
    }, 1000);
};
  
  categoriesLoader();
  const loadPetsByCategory = (category) => {
   
    const apiUrl = `https://openapi.programming-hero.com/api/peddy/category/${category.toLowerCase()}`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            ViewpetsByCategory(data.data);
        })
        .catch((error) => console.log(error));
};

const ViewpetsByCategory = (pets) => {
  handleLoading(pets);
    const petContainer = document.getElementById("pet-deals");
    petContainer.innerHTML = "";

    if (!pets || pets.length === 0) {
        petContainer.classList.remove("grid");
        petContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
          <img src="images/error.webp"/> 
          <h2 class="text-center text-xl font-bold">No Information Available</h2>
        </div>
            <p class="text-gray-500 text-center text-sm sm:text-base md:text-lg">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.
            </p>`;
    }
    else {
        petContainer.classList.add("grid");

        pets.forEach((pet) => {
            const Viewpet = document.createElement("div");
            Viewpet.innerHTML = `
          <div class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-out min-w-full">
            <img src="${pet.image}" alt="${pet.pet_name}" class="rounded-lg mb-4">
            <h3 class="text-xl font-semibold mb-2 ">${pet.pet_name|| "Not Available"}</h3>
            <p class="text-gray-600 text-sm mb-2">Breed: ${pet.breed || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2">Birth: ${pet.date_of_birth || "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2">Gender: ${pet.gender|| "Not Available"}</p>
            <p class="text-gray-600 text-sm mb-2">Price: $${pet.price || "Not Available"}</p>
            <div class="flex justify-around">
              <button id="" class="like-btn bg-gray-200 px-4 py-2 rounded-md"><i class="fa-regular fa-thumbs-up"></i></button>
              <button onclick= "adoptPet('${pet.petId}', this)" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Adopt</button>
             <button onclick="loadDetails('${pet.petId}')" class="text-Primary-Btn bg-gray-200 px-4 py-2 rounded-md">Details</button>
            </div>
          </div>`;
          const likeButton = Viewpet.querySelector('.like-btn')
          likeButton.addEventListener('click',()=> {
            LikedImages.push(pet.image)
            displayLikedImages();
        });
            petContainer.append(Viewpet);
        });
    }
};

const setActiveButton = (activeBtnId) => {
  const buttons = document.querySelectorAll('.category-btn');
  buttons.forEach((button) => {
      if(button.id === activeBtnId)
      {
          button.classList.add('bg-Clicked-btn', 'text-black','rounded-full','border-Primary-Btn');
      }
      else{
          button.classList.remove('bg-Clicked-btn', 'text-black','rounded-full','border-Primary-Btn');
      }
  });
}
const loadLikedPhotos =(image) =>
    {
      fetch(`https://openapi.programming-hero.com/api/peddy/${pets.image}`)
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
    }
    const handleLoading = (pets) => {
      const petContainer = document.getElementById("pet-deals");
      const spinner = document.getElementById("spinner");
      const likedPictureContainer = document.getElementById("Liked-Picture");
      spinner.style.display = "flex";
      petContainer.style.display = "none";
      likedPictureContainer.style.display = "none"; 
  
      setTimeout(() => {
         
          if (!pets || pets.length === 0) {
              petContainer.classList.remove("grid");
              spinner.style.display = "none"; 
              petContainer.style.display = "block"; 
              likedPictureContainer.style.display = "grid"; 
          } else {

              petContainer.classList.add("grid");
              spinner.style.display = "none"; 
              petContainer.style.display = "grid";
              likedPictureContainer.style.display = "grid"; 
          }
      }, 2000);
  };
    
  document.getElementById("dogs-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("dog");
    setActiveButton("dogs-btn");
});
document.getElementById("cats-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("cat");
    setActiveButton("cats-btn");
});
document.getElementById("rabbits-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("rabbit");
    setActiveButton("rabbits-btn");
});
document.getElementById("birds-btn").addEventListener("click", () => {
    document.getElementById("spinner").style.display = "flex";
    loadPetsByCategory("bird");
    setActiveButton("birds-btn");
});
document.getElementById("Like-btn").addEventListener("click", () => loadLikedPhotos("Liked-Picture"));
